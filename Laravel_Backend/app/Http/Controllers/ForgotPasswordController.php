<?php
namespace App\Http\Controllers;

use App\Models\User; // Ensure you have a User model
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Mail\PasswordResetMail;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        // Validate the email
        $request->validate(['email' => 'required|email']);
        \Log::info('Sending password reset email with token: ' . $token);

        // Generate a token
        $token = Str::random(60);

        // Send the password reset email
        Mail::to($request->email)->send(new PasswordResetMail($token));

        return response()->json(['status' => 'success', 'message' => 'Password reset email sent!']);
    }
}
