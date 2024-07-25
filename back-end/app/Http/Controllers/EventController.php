<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Carbon\Carbon; // Make sure to import Carbon
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();
        return response()->json($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'start' => 'required|date',
            'allDay' => 'boolean',
        ]);

        $startDate = Carbon::parse($request->input('start'))->format('Y-m-d H:i:s');

        $event = Event::create([
            'title' => $request->input('title'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
            'start' => $startDate,
            'allDay' => $request->input('allDay'),
        ]);

        return response()->json($event, 201);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        return response()->json($event);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'string|max:255',
            'price' => 'numeric',
            'description' => 'string',
            'start' => 'date',
            'allDay' => 'boolean',
        ]);

        $event = Event::findOrFail($id);
        $event->update($request->all());

        return response()->json($event);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json(null, 204);
    }
}
