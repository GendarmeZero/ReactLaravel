<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;

    public function __construct($token)
    {
        $this->token = $token; // Ensure this is a string
    }
    

    public function build()
    {
        return $this->subject('Password Reset Request')
                    ->view('emails.reset_password')
                    ->with(['token' => $this->token]);
    }
}
