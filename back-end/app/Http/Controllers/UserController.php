<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\UserStoreRequest;

class UserController extends Controller
{
    public function store(UserStoreRequest $request)
    {
        try {
            User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => bcrypt($request->password)
            ]);
            return response()->json([
                'message' => 'User successfully created.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => "Something went really wrong !"
            ], 500);
        }
    }

}
