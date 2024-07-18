<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TeamController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



// User routes
Route::get('/users', [UserController::class,'index']);
Route::get('/users/counts', [UserController::class, 'counts']);
Route::get('/users/{id}', [UserController::class,'show']);
Route::put('/usersupdate/{id}', [UserController::class,'update']);
Route::delete('/usersdelete/{id}', [UserController::class,'destroy']);
Route::get('/users/count', [UserController::class, 'count']);
Route::get('/users/last-week-count', [UserController::class, 'lastWeekCount']);


// Authentication routes
Route::post('/login', [UserController::class,'login']);
Route::post('/create', [UserController::class,'store']);

// Password reset route
Route::post('/forgetPass', [UserController::class,'forgotPassword']);
Route::post('/resetPass', [UserController::class,'reset']);

// card routes
Route::get('/cards', [CardController::class, 'index']);
Route::post('/createCard', [CardController::class, 'store']);
Route::get('/cards/{id}', [CardController::class, 'show']);
Route::put('/cards/{id}', [CardController::class, 'update']);
Route::delete('/cards/{id}', [CardController::class, 'destroy']);

// team routes
Route::get('/teams',[TeamController::class,'index']);
Route::post('/createTeam', [TeamController::class,'store']);
Route::delete('/teamsdelete/{id}', [TeamController::class,'destroy']);
Route::get('/teams/{id}', [TeamController::class,'show']);




