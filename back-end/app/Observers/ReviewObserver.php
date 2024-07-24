<?php

namespace App\Observers;

use App\Models\Review;
use App\Models\Notification;
use Illuminate\Support\Facades\File;

class ReviewObserver
{
    /**
     * Handle the Review "created" event.
     */
    public function created(Review $review): void
    {
        $imagePath = $this->handleImage($review->image);

        Notification::create([
            'type' => 'review_created',
            'message' => 'A new review has been created: ' . $review->name,
            'is_read' => false,
            'image' => $imagePath,
        ]);
    }

    /**
     * Handle the Review "updated" event.
     */
    public function updated(Review $review): void
    {
        //
    }

    /**
     * Handle the Review "deleted" event.
     */
    public function deleted(Review $review): void
    {
        $imagePath = $this->handleImage($review->image);

        Notification::create([
            'type' => 'review_deleted',
            'message' => 'A new review has been deleted: ' . $review->name,
            'is_read' => false,
            'image' => $imagePath,
        ]);
    }

    /**
     * Handle the Review "restored" event.
     */
    public function restored(Review $review): void
    {
        //
    }

    /**
     * Handle the Review "force deleted" event.
     */
    public function forceDeleted(Review $review): void
    {
        //
    }

    private function handleImage($photo)
    {
        if (!$photo) {
            return null;
        }

        $sourcePath = public_path('uploads' . $photo);
        $destinationPath = public_path('uploads/notifications/' . $photo);

        if (!File::exists(public_path('uploads/notifications'))) {
            File::makeDirectory(public_path('uploads/notifications'), 0755, true);
        }

        if (File::exists($sourcePath)) {
            // Copy the file
            File::copy($sourcePath, $destinationPath);

            return 'uploads/notifications/' . $photo;
        }

        return null;
    }
}
