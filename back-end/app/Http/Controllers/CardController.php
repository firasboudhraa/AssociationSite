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

    public function store(Request $request)
    {
        $request->validate([
            'card_number' => 'required',
            'card_holder' => 'required',
            'expiry_month' => 'required',
            'expiry_year' => 'required',
            'cvv' => 'required',
        ]);

        $card = Card::create($request->all());
        return response()->json(['message' => 'Card created successfully', 'card' => $card], 201);
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
