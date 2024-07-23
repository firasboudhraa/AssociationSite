<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Support\Facades\File;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::all();

        // Add base URL to image paths if necessary
        foreach ($notifications as $notification) {
            if ($notification->image) {
                $notification->image = url('uploads/notifications/' . $notification->image);
            }
        }

        return response()->json($notifications);
    }


    public function markAsRead($id)
    {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json(['message' => 'Notification not found.'], 404);
        }
    
        $notification->is_read = true;
        $notification->save();
    
        return response()->json($notification);
    }
    public function markAllAsRead()
    {
    Notification::where('is_read', false)->update(['is_read' => true]);

    return response()->json(['message' => 'All notifications marked as read.']);
    } 

    public function destroy($id)
    {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json(['message' => 'Notification not found.'], 404);
        }

        if (!is_null($notification->image)) {
            $image = public_path('uploads/notifications/' . $notification->image);
            if (File::exists($image)) {
                unlink($image);
            }
        }

        $notification->delete();

        return response()->json(['message' => 'Notification deleted successfully.']);
    }
}
