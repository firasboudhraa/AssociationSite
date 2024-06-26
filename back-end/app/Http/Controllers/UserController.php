<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use App\Services\MailService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    protected $mailService;

    public function __construct(MailService $mailService)
    {
        $this->mailService = $mailService;
    }
    public function index()
    {
        $users = User::all();
        return response()->json(['results' => $users], 200);
    }
    public function store(UserStoreRequest $request)
    {
        try {
            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => bcrypt($request->password)
            ]);

            $this->sendWelcomeEmail($user);

            $token = $user->createToken("auth_token")->plainTextToken;
            return response()->json([
                'message' => 'User successfully created.',
                'token' => $token
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong !"
            ], 500);
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
        return response()->json([
            "user" => $user
        ], 200);
    }

    public function update(UserStoreRequest $request, $id)
    {
        try {
            $user = User::find($id);
            if (!$user) {
                return response()->json([
                    "message" => "User Not Found."
                ], 404);
            }

            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();

            return response()->json([
                "message" => "User Successfully Updated."
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                "message" => "Something Went really wrong!"
            ], 500);
        }
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
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'user' => $user,
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

}
