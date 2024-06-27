<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;



class UserController extends Controller
{
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
        
}
