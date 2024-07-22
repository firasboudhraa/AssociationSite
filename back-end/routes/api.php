<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\TeamController;
use App\Models\User;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



// User routes
Route::get('/users', [UserController::class,'index']);
Route::get('/users/counts', [UserController::class, 'counts']);
Route::get('/users/{id}', [UserController::class,'show']);
Route::patch('/usersupdate/{id}', [UserController::class,'update']);
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


/*Route::post('/auth/google', function (Request $request) {
    $input = $request->json()->all();

    $email = $input['email'];
    $name = $input['name'];
    $image = $input['image'];
    $googleId = $input['googleId'];

    // Validate input
    if (!$email || !$name || !$googleId) {
        return response()->json([
            'status' => 'error',
            'message' => 'Invalid input',
        ], 400);
    }

    // Check if user exists
    $user = User::where('email', $email)->first();

    if ($user) {
        // Update existing user
        $user->update([
            'name' => $name,
            'photo' => $image,
            'password' => bcrypt($googleId), // Just an example, adjust as necessary
        ]);

        $response = [
            'status' => 'success',
            'message' => 'User updated',
        ];
    } else {
        // Create new user
        User::create([
            'email' => $email,
            'name' => $name,
            'photo' => $image,
            'password' => bcrypt($googleId), // Just an example, adjust as necessary
        ]);

        $response = [
            'status' => 'success',
            'message' => 'User created',
        ];
    }

    return response()->json($response);
});*/


Route::post('/auth/{provider}', function (Request $request, $provider) {
    $input = $request->json()->all();
    $email = $input['email'] ?? null;
    $name = $input['name'] ?? null;
    $providerId = $input['providerId'] ?? null;
    $imageUrl = $input['image'] ?? null;

    // Validate input
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

    $user = User::where('email', $email)->first();
    if ($user) {
        $user->update([
            'name' => $name,
            'photo' => $photoPath,
            'password' => bcrypt($providerId),
        ]);
        $response = [
            'status' => 'success',
            'message' => 'User updated',
        ];
    } else {
        User::create([
            'email' => $email,
            'name' => $name,
            'photo' => $photoPath,
            'password' => bcrypt($providerId),
        ]);
        $response = [
            'status' => 'success',
            'message' => 'User created',
        ];
    }

    return response()->json($response);
});
