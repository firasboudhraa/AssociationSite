<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use Illuminate\Support\Facades\Log;

class DocumentController extends Controller
{
    public function upload(Request $request)
    {
        try {

            $request->validate([
                'user_id' => 'required|exists:users,id',
                'type' => 'required|in:CIN,passport',
                'recto' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
                'verso' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
                'passport' => 'nullable|file|mimes:jpeg,png,pdf|max:2048',
            ]);

            $userId = $request->input('user_id');

            $documentData = ['type' => $request->input('type'), 'user_id' => $userId];

            // Handle CIN Recto File
            if ($request->input('type') === 'CIN') {
                if ($request->hasFile('recto')) {
                    $rectoFile = $request->file('recto');
                    $rectoFileName = time() . '_recto_' . $rectoFile->getClientOriginalName();
                    $rectoPath = $rectoFile->move(public_path('uploads/documents/'), $rectoFileName);
                    $documentData['recto'] = $rectoPath;
                }

                // Handle CIN Verso File
                if ($request->hasFile('verso')) {
                    $versoFile = $request->file('verso');
                    $versoFileName = time() . '_verso_' . $versoFile->getClientOriginalName();
                    $versoPath = $versoFile->move(public_path('uploads/documents/'), $versoFileName);
                    $documentData['verso'] = $versoPath;
                }
            }

            // Handle Passport File
            if ($request->input('type') === 'passport') {
                if ($request->hasFile('passport')) {
                    $passportFile = $request->file('passport');
                    $passportFileName = time() . '_passport_' . $passportFile->getClientOriginalName();
                    $passportPath = $passportFile->move(public_path('uploads/documents/'), $passportFileName);
                    $documentData['passport'] = $passportPath;
                }
            }

            // Save Document Data
            Document::updateOrCreate(
                ['user_id' => $userId, 'type' => $request->input('type')],
                $documentData
            );

            return response()->json(['message' => 'Documents uploaded successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while uploading documents'], 500);
        }
    }

    public function getUserDocuments($userId)
    {
        try {
            $documents = Document::where('user_id', $userId)->get();
            if ($documents->isEmpty()) {
                return response()->json(['message' => 'No documents found for the user'], 404);
            }
    
            $documentData = [];
            foreach ($documents as $document) {
                $documentEntry = ['type' => $document->type];
                if ($document->type === 'CIN') {
                    if ($document->recto) {
                        $documentEntry['recto'] = asset('uploads/documents/' . $document->recto);
                    }
                    if ($document->verso) {
                        $documentEntry['verso'] = asset('uploads/documents/' . $document->verso);
                    }
                } elseif ($document->type === 'passport') {
                    if ($document->passport) {
                        $documentEntry['passport'] = asset('uploads/documents/' . $document->passport);
                    }
                }
                $documentData[] = $documentEntry;
            }
    
            return response()->json(['documents' => $documentData], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving documents: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while retrieving documents'], 500);
        }
    }
    
}

