<?php

namespace App\Http\Controllers;

use App\Models\EventRegistration;
use Illuminate\Http\Request;

class EventRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'event_id' => 'required|exists:events,id',
        ]);

        $registration = EventRegistration::create([
            'user_id' => $request->user_id,
            'event_id' => $request->event_id,
        ]);

        return response()->json($registration, 201);
    }

    public function destroy($id)
    {
        $registration = EventRegistration::findOrFail($id);
        $registration->delete();

        return response()->json(null, 204);
    }
}

