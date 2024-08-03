<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Card;

class CardController extends Controller
{
    public function index()
    {
        $cards = Card::all();
        return response()->json($cards);
    }

    public function show($id)
    {
        $card = Card::find($id);
        if (!$card) {
            return response()->json(['error' => 'Card not found'], 404);
        }
        return response()->json($card);
    }

    public function showByUserId($user_id)
{
    $card = Card::where('user_id', $user_id)->first();
    if (!$card) {
        return response()->json(['error' => 'Card not found'], 404);
    }
    return response()->json($card);
}

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'card_number' => 'required|string|max:20',
            'card_holder' => 'required|string|max:255',
            'expiry_month' => 'required|integer|min:1|max:12',
            'expiry_year' => 'required|integer|min:2024|max:2100',
            'cvv' => 'required|string|max:4',
        ]);

        $card = Card::create($validatedData);

        return response()->json(['card' => $card], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'card_number' => 'required',
            'card_holder' => 'required',
            'expiry_month' => 'required',
            'expiry_year' => 'required',
            'cvv' => 'required',
        ]);

        $card = Card::find($id);
        if (!$card) {
            return response()->json(['error' => 'Card not found'], 404);
        }

        $card->update($request->all());
        return response()->json(['message' => 'Card updated successfully', 'card' => $card], 200);
    }

    public function destroy($id)
    {
        $card = Card::find($id);
        if (!$card) {
            return response()->json(['error' => 'Card not found'], 404);
        }

        $card->delete();
        return response()->json(['message' => 'Card deleted successfully'], 200);
    }
}
