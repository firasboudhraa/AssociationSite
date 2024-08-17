<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Team;
use Illuminate\Support\Facades\File;


class TeamController extends Controller
{
    public function index(Request $request)
    {
        try {
            $perPage = $request->query('perPage', 5);
            $page = $request->query('page', 1);
            $search = $request->query('q', '');

            $query = Team::query();

            if (!empty($search)) {
                $query->where('name', 'LIKE', "%$search%")
                      ->orWhere('email', 'LIKE', "%$search%")
                      ->orWhere('function', 'LIKE', "%$search%");
            }

            $teams = $query->paginate($perPage, ['*'], 'page', $page);

            $teams->getCollection()->transform(function ($team) {
                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'email' => $team->email,
                    'photo' => asset('uploads/teams/' . $team->photo),
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
            $team = new Team();
            $team->name = $request->input('name');
            $team->email = $request->input('email');
            $team->function = $request->input('function');
            $team->phone = $request->input('phone'); 
            $team->address = $request->input('address');
            
            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $fileName = time() . '_' . $photo->getClientOriginalName();
                $photo->move(public_path('uploads/teams/'), $fileName);
                $team->photo = $fileName;
            }

            $team->save();

            return response()->json(['message' => 'Team created successfully', 'team' => $team], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating team: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $member = Team::find($id);
        if (!$member) {
            return response()->json([
                "message" => "Member Not Found."
            ], 404);
        }
        $member->photo = asset('uploads/teams/' . $member->photo);
        return response()->json([
            "member" => $member
        ], 200);
    }

    public function destroy($id)
    {
        $member = Team::find($id);
        if (!$member) {
            return response()->json([
                "message" => "User Not Found."
            ], 404);
        }
        $member->delete();
        if (!is_null($member->photo)) {
            $photo = public_path('uploads/teams/' . $member->photo);
            if (File::exists($photo)) {
                unlink($photo);
            }
        }

        return response()->json([
            "message" => "User Successfully Deleted."
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'function' => 'sometimes|string|max:255',
        ];
    
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $member = Team::find($id);
        if (!$member) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        $member->name = $request->input('name');
        $member->email = $request->input('email');
        $member->phone = $request->input('phone');
        $member->address = $request->input('address');
        $member->function = $request->input('function');
    
    
        $member->save();
    
        return response()->json(['message' => 'User fields updated successfully', 'member' => $member], 200);
    }

    public function updatePhoto(Request $request, $id)
{
    $member = Team::find($id);
    if (!$member) {
        return response()->json(['error' => 'User not found'], 404);
    }

    if ($request->hasFile('photo')) {
        $photo = $request->file('photo');
        $fileName = time() . '_' . $photo->getClientOriginalName();
        $photo->move(public_path('uploads/teams/'), $fileName);

        // Delete old photo if it exists
        if ($member->photo && File::exists(public_path('uploads/teams/' . $member->photo))) {
            File::delete(public_path('uploads/members/' . $member->photo));
        }

        $member->photo = $fileName;
        $member->save();

        return response()->json(['message' => 'User photo updated successfully', 'member' => $member], 200);
    } else {
        return response()->json(['error' => 'No photo file uploaded'], 400);
    }
}
}
