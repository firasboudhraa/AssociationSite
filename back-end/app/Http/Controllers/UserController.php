<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use App\Services\MailService;
use Illuminate\Support\Facades\Auth;



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
         $user= User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password)
        ]);

        $this->sendWelcomeEmail($user);

        $token= $user->createToken("auth_token")->plainTextToken;
        return response()->json([
            'message' => 'User successfully created.' ,
            'token'=> $token
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => "Something went really wrong !"
        ], 500);
    }
    }
    public function show( $id){
        $user = User::find($id);
        if(!$user){
            return response()->json([
                "message"=> "User Not Found."
                ],404);
        }
        return response()->json([
            "user"=> $user
            ], 200);
    }

    public function update(UserStoreRequest $request, $id)
    {
        try {
            $user = User::find($id);
            if (! $user) {
                 return response()->json([
                    "message"=> "User Not Found."
                    ],404);
            }

            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();

            return response()->json([
                "message"=> "User Successfully Updated."
                ], 200);

        } catch (\Exception $e) {
            return response()->json([
                "message"=> "Something Went really wrong!"
                ], 500);
            }
        }
        public function destroy( $id)
        {
            $user = User::find($id);
            if(!$user) {
                return response()->json([
                    "message"=> "User Not Found."
                    ],404);
            }
            $user->delete();

            return response()->json([
                "message"=> "User Successfully Deleted."
                ],200);
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
        
}
