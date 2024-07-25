<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\EventController;
use App\Models\User;

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
Route::post('/change-password', [UserController::class, 'changePassword'])->middleware('auth:sanctum');

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

// Review routes
Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/createReview', [ReviewController::class, 'store']);
Route::delete('/deleteReview/{id}' , [ReviewController::class , 'destroy']);
Route::post('/acceptReview/{id}', [ReviewController::class, 'accept']);

// Notification routes
Route::get('/notifications', [NotificationController::class, 'index']);
Route::delete('/deleteNotification/{id}' , [NotificationController::class , 'destroy']);
Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
Route::patch('notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);

// Event routes

Route::get('events', [EventController::class, 'index']);
Route::post('createEvent', [EventController::class, 'store']);
Route::get('events/{id}', [EventController::class, 'show']);
Route::put('updateEvent/{id}', [EventController::class, 'update']);
Route::delete('deleteEvent/{id}', [EventController::class, 'destroy']);


Route::post('/auth/{provider}', function (Request $request, $provider) {
    $input = $request->json()->all();
    $email = $input['email'] ?? null;
    $name = $input['name'] ?? null;
    $providerId = $input['providerId'] ?? null;
    $imageUrl = $input['image'] ?? null;

    if (!$email || !$name || !$providerId) {
        return response()->json([
            'status' => 'error',
            'message' => 'Invalid input',
        ], 400);
    }

    $photoPath = null;
    if ($imageUrl) {
        try {
            $imageContent = Http::get($imageUrl)->body();
            $fileName = time() . '_' . $providerId . '.jpg';
            $filePath = public_path('uploads/' . $fileName);
            file_put_contents($filePath, $imageContent);
            $photoPath = $fileName;
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to download image',
            ], 500);
        }
    }

    // Create or update user
    $user = User::where('email', $email)->first();
    if ($user) {
        $user->update([
            'name' => $name,
            'photo' => $photoPath,
            'password' => bcrypt($providerId), // Consider a more secure method for password
        ]);
    } else {
        $user = User::create([
            'email' => $email,
            'name' => $name,
            'photo' => $photoPath,
            'password' => bcrypt($providerId), // Consider a more secure method for password
        ]);
    }

    // Generate token
    $token = $user->createToken('AuthToken')->plainTextToken;

    return response()->json([
        'status' => 'success',
        'token' => $token,
        'user' => $user
    ]);
});

