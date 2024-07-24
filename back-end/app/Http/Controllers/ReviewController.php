<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Illuminate\Support\Facades\File;


class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::all()->map(function($review) {
            if ($review->image) {
                $review->image = url('uploads/reviews/' . $review->image);
            }
            return $review;
        });

        return response()->json($reviews);
    } 

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'text' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'review_rating' => 'required|integer|min:1|max:5',

        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/reviews'), $imageName);
            $imagePath =  $imageName;
        }
    
        $review = Review::create([
            'name' => $request->input('name'),
            'image' => $imagePath,
            'text' => $request->input('text'),
            'review_rating' => $request->input('review_rating'),
            'published' => false, 
        ]);
    
        return response()->json($review, 201);
    }

    public function destroy($id)
    {
        $review = Review::find($id);
        if (!$review) {
            return response()->json([
                "message" => "Review Not Found."
            ], 404);
        }
        $review->delete();
        if (!is_null($review->image)) {
            $image = public_path('uploads/reviews' . $review->image);
            if (File::exists($image)) {
                unlink($image);
            }
        }
    }

    public function accept($id)
{
    $review = Review::find($id);
    if (!$review) {
        return response()->json([
            "message" => "Review Not Found."
        ], 404);
    }

    $review->published = true; 
    $review->save();

    return response()->json([
        "message" => "Review accepted and published successfully."
    ], 200);
}

    
}
