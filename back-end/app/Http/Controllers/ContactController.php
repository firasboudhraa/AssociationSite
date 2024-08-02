<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Create a new contact
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validated);

        return response()->json($contact, 201);
    }

    // Show all contacts
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    // Show a specific contact
    public function show($id)
    {
        $contact = Contact::find($id);
        if ($contact) {
            return response()->json($contact);
        } else {
            return response()->json(['message' => 'Contact not found'], 404);
        }
    }

    public function destroy($id)
    {
        $contact = Contact::find($id);
        if ($contact) {
            $contact->delete();
            return response()->json(['message' => 'Contact deleted successfully']);
        } else {
            return response()->json(['message' => 'Contact not found'], 404);
        }
    }
}


