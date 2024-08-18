<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use App\Services\MailService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;



class UserController extends Controller
{
    protected $mailService;

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }

    public function index(Request $request)
    {
        try {
            $perPage = $request->query('perPage', 2); 
            $page = $request->query('page', 1); 
            $search = $request->query('q', ''); 
    
            $query = User::query();
    
            if (!empty($search)) {
                $query->where('name', 'LIKE', "%$search%")
                      ->orWhere('email', 'LIKE', "%$search%")
                      ->orWhere('address', 'LIKE', "%$search%")
                      ->orWhere('phone', 'LIKE', "%$search%")
                      ->orWhereRaw("CAST(is_admin AS CHAR) LIKE ?", ["%$search%"]);
            }
    
            $users = $query->paginate($perPage, ['*'], 'page', $page);
    
            $usersWithPhotoUrl = $users->getCollection()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'photo' => asset('uploads/users/' . $user->photo),
                    'phone' => $user->phone,
                    'password' => $user->password,
                    'is_admin' => $user->is_admin,
                    'address' => $user->address,
                    'created_at' => $user->created_at,
                ];
            });
    
            return response()->json([
                'results' => $usersWithPhotoUrl,
                'pagination' => [
                    'total' => $users->total(),
                    'per_page' => $users->perPage(),
                    'current_page' => $users->currentPage(),
                    'last_page' => $users->lastPage(),
                    'from' => $users->firstItem(),
                    'to' => $users->lastItem(),
                ]
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch users.'], 500);
        }
    }
    

    public function store(UserStoreRequest $request)
    {
        try {
            $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = bcrypt($request->input('password'));
            $user->phone = $request->input('phone');
            $user->address = $request->input('address');
            $user->is_admin = $request->input('is_admin');

            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $fileName = time() . '_' . $photo->getClientOriginalName();
                $photo->move(public_path('uploads/users/'), $fileName);
                $user->photo = $fileName;
            }

            $user->save();
            $token = $user->createToken("auth_token")->plainTextToken;

            $this->sendWelcomeEmail($user);

            return response()->json(['message' => 'User created successfully', 'user' => $user, 'token' => $token], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating user: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                "message" => "User Not Found."
            ], 404);
        }
        $user->photo = asset('uploads/users/' . $user->photo);
        return response()->json([
            "user" => $user
        ], 200);
    }
    
    public function update(Request $request, $id)
{
    $rules = [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:users,email,' . $id,
        'phone' => 'nullable|string|max:20',
        'address' => 'nullable|string|max:255',
        'password' => 'sometimes|required|string|min:8',
        'is_admin' => 'sometimes|boolean',
    ];

    $validator = Validator::make($request->all(), $rules);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $user = User::find($id);
    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $user->name = $request->input('name');
    $user->email = $request->input('email');
    $user->phone = $request->input('phone');
    $user->address = $request->input('address');
    $user->is_admin = $request->input('is_admin', $user->is_admin);

    if ($request->filled('password')) {
        $user->password = bcrypt($request->input('password'));
    }

    $user->save();

    return response()->json(['message' => 'User fields updated successfully', 'user' => $user], 200);
}
public function updatePhoto(Request $request, $id)
{
    $validator = Validator::make($request->all(), [
        'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    $user = User::findOrFail($id);

    if ($request->hasFile('photo')) {
        if ($user->photo) {
            $oldPhotoPath = public_path('uploads/users/' . $user->photo);
            if (file_exists($oldPhotoPath)) {
                unlink($oldPhotoPath);
            }
        }

        $file = $request->file('photo');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('uploads/users'), $filename);

        $user->photo = $filename;
        $user->save();

        return response()->json(['success' => 'Photo mise à jour avec succès!', 'photo' => $filename], 200);
    }

    return response()->json(['error' => 'Aucune photo téléchargée'], 400);
}

    
    
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                "message" => "User Not Found."
            ], 404);
        }
        $user->delete();
        if (!is_null($user->photo)) {
            $photo = public_path('uploads/users/' . $user->photo);
            if (File::exists($photo)) {
                unlink($photo);
            }
        }

        return response()->json([
            "message" => "User Successfully Deleted."
        ], 200);
    }

    public function counts()
    {
        $totalCount = User::count();
        
        $thisWeekCount = User::where('created_at', '>=', now()->startOfWeek())
                             ->count();
        
        $thisMonthCount = User::whereMonth('created_at', now()->month)
                              ->whereYear('created_at', now()->year)
                              ->count();
        
        $lastWeekCount = User::where('created_at', '>=', now()->subWeek()->startOfWeek())
                             ->where('created_at', '<', now()->startOfWeek())
                             ->count();
        
        $lastMonthCount = User::whereMonth('created_at', now()->subMonth()->month)
                              ->whereYear('created_at', now()->subMonth()->year)
                              ->count();
        
        return response()->json([
            'total_users' => $totalCount,
            'this_week_users' => $thisWeekCount,
            'this_month_users' => $thisMonthCount,
            'last_week_users' => $lastWeekCount,
            'last_month_users' => $lastMonthCount,
        ], 200);
    }
    

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);
    
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
    
            // Determine user role based on the integer `is_admin` field
            $userRole = $user->is_admin ? 'admin' : 'user';
    
            // Include additional user fields in the response
            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'photo' => $user->photo ? asset('uploads/users/' . $user->photo) : null,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'is_admin' => $user->is_admin,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'role' => $userRole, 
                ],
                'token' => $token,
            ], 200);
        }
    
        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }    
    

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $token= $user->createToken("password_reset_token")->plainTextToken;
        $user->save();

        $token = Password::createToken($user);    
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $token, 'created_at' => now()]
        );

        $this->sendForgotPasswordEmail($user, $token);

        return response()->json(['message' => 'Password reset email sent'], 200);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'password' => 'required|min:8',
        ]);

        $tokenRow = DB::table('password_reset_tokens')->where('token', $request->token)->first();
        if (!$tokenRow) {
            return response()->json(['message' => 'Invalid or expired token.'], 400);
        }

        $user = User::where('email', $tokenRow->email)->first();
        $user->password = bcrypt($request->password);
        $user->save();

        DB::table('password_reset_tokens')->where('token', $request->token)->delete();

        return response()->json(['message' => 'Password successfully reset'], 200);
    }

    protected function sendWelcomeEmail(User $user)
    {
        $toEmail = $user->email;
        $toName = $user->name;
        $subject = 'Welcome to Our Website!';
        $htmlBody = '<p>Hello ' . $user->name . ',</p><p>Welcome to our website!</p>';

        $result = $this->mailService->sendEmail($toEmail, $toName, $subject, $htmlBody);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    protected function sendForgotPasswordEmail(User $user, $token)
    {
        $toEmail = $user->email;
        $toName = $user->name;
        $subject = 'Reinitialisation du Mot de passe';
        $htmlBody = '
            <p>Bonjour ' . $user->name . ',</p>
            <p>Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe:</p>
            <a href="' . env('FRONTEND_URL') . '/reset-password?token=' . $token . '" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">
                Réinitialiser mot de passe
            </a>
            <p>Si vous n\'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet email.</p>
        ';

        $result = $this->mailService->sendEmail($toEmail, $toName, $subject, $htmlBody);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword(Request $request)
{
    $request->validate([
        'current_password' => 'required|min:8',
        'new_password' => 'required|min:8|confirmed',
    ]);

    $user = Auth::user();

    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json(['error' => 'Current password is incorrect'], 400);
    }

    $user->password = bcrypt($request->new_password);
    $user->save();

    return response()->json(['message' => 'Password successfully changed'], 200);
}

}
