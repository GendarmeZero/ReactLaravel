<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'contacts';

    // Specify the fillable attributes
    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
    ];
}
