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

        $exists = EventRegistration::where('user_id', $request->user_id)
            ->where('event_id', $request->event_id)
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Already registered for this event.'], 400);
        }

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

    public function checkRegistration(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'event_id' => 'required|exists:events,id',
        ]);

        $userId = $request->input('user_id');
        $eventId = $request->input('event_id');

        $exists = EventRegistration::where('user_id', $userId)
            ->where('event_id', $eventId)
            ->exists();

        return response()->json(['registered' => $exists]);
    }
public function getUserParticipations(Request $request)
{
    $userId = $request->input('user_id');

    $events = EventRegistration::where('user_id', $userId)
        ->with('event')  
        ->get()
        ->pluck('event');  

    return response()->json($events);
}
public function getEventParticipants($eventId)
{
    $participants = EventRegistration::where('event_id', $eventId)
        ->with('user') 
        ->get()
        ->pluck('user'); 

    return response()->json($participants);
}

}
