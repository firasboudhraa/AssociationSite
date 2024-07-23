<?php

namespace App\Observers;

use App\Models\User;
use App\Models\Notification;
use Illuminate\Support\Facades\File;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        $imagePath = $this->handleImage($user->photo);

        Notification::create([
            'type' => 'user_created',
            'message' => 'A new user has been created: ' . $user->name,
            'is_read' => false,
            'image' => $imagePath,
        ]);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        $imagePath = $this->handleImage($user->photo);

        Notification::create([
            'type' => 'user_updated',
            'message' => 'User information has been updated: ' . $user->name,
            'is_read' => false,
            'image' => $imagePath,
        ]);
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        $imagePath = $this->handleImage($user->photo);

        Notification::create([
            'type' => 'user_deleted',
            'message' => 'A user has been deleted: ' . $user->name,
            'is_read' => false,
            'image' => $imagePath,
        ]);
    }

    /**
     * Handle the image by copying it to the notifications directory and returning the path.
     */
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
