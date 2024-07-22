<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;


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
        // Validate request
        $request->validate([
            'name' => 'required|string|max:255',
            'text' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'review_rating' => 'required|integer|min:1|max:5',

        ]);

        // Handle image upload
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
        ]);
    
        return response()->json($review, 201);
    }
    
}
