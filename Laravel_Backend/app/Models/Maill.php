<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail as MailFacade;

class Maill extends Model
{
    use HasFactory;

    // Add any necessary properties or methods here

    public static function send($email, $token)
    {
        MailFacade::send('emails.password_reset', ['token' => $token], function ($message) use ($email) {
            $message->to($email);
            $message->subject('Password Reset Request');
        });
    }
}
