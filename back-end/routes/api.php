<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('users', [UserController::class,'index']);
Route::get('users/{id}', [UserController::class,'show']);
Route::put('usersupdate/{id}', [UserController::class,'update']);
Route::post('create', [UserController::class,'store']);
Route::delete('usersdelete/{id}', [UserController::class,'destroy']);
Route::post('login', [UserController::class,'login']);
