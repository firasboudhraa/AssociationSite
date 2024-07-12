<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    // The 'cards' table is assumed to be used by default
    protected $table = 'cards';

    // Define mass assignable attributes (fields that can be filled via mass assignment)
    protected $fillable = [
        'user_id',
        'card_number',
        'card_holder',
        'expiry_month',
        'expiry_year',
        'cvv',
    ];

    // If you have fields that should be guarded (not mass assignable), use $guarded instead
    // protected $guarded = [];

    // Relationships (if any)
    // Example:
     public function user()
    {
         return $this->belongsTo(User::class);
     }
}
