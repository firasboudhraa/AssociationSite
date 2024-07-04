<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        try {
            $perPage = $request->query('perPage', 2);
            $page = $request->query('page', 1);
            $search = $request->query('q', '');

            $query = Team::query();

            if (!empty($search)) {
                $query->where('name', 'LIKE', "%$search%")
                      ->orWhere('email', 'LIKE', "%$search%")
                      ->orWhere('function', 'LIKE', "%$search%");
            }

            $teams = $query->paginate($perPage, ['*'], 'page', $page);

            // Transform the collection
            $teams->getCollection()->transform(function ($team) {
                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'email' => $team->email,
                    'photo' => asset('uploads/' . $team->photo),
                    'function' => $team->function,
                    'created_at' => $team->created_at,
                ];
            });

            return response()->json([
                'results' => $teams->items(),
                'pagination' => [
                    'total' => $teams->total(),
                    'per_page' => $teams->perPage(),
                    'current_page' => $teams->currentPage(),
                    'last_page' => $teams->lastPage(),
                    'from' => $teams->firstItem(),
                    'to' => $teams->lastItem(),
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch teams.'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $user = new Team();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->function = $request->input('function');
            
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $fileName = time() . '_' . $photo->getClientOriginalName();
                $photo->move(public_path('uploads'), $fileName);
                $user->photo = $fileName;
            }

            $user->save();
            $token = $user->createToken("auth_token")->plainTextToken;

            return response()->json(['message' => 'Team created successfully', 'user' => $user, 'token' => $token], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating user: ' . $e->getMessage()], 500);
        }
    }
}
