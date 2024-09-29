<?php

namespace App\Http\Controllers;

use App\Models\Maill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Mail;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','emailverify','verifyEmail','forgotpassword','changepassword']]);
    }

    /* Login API */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'email'=>'required|string|email',
                'password'=>'required|string'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $cridentials = $request->only('email', 'password');

        $token = Auth::attempt($cridentials);
        
        if(!$token){
            return response()->json([
                'status'=>'error',
                'message'=>'unauthorized'
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'status'=> 'success',
            'user'=> $user,
            'authorisation'=> [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);
    }

    /* Register API */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'name'=>'required|string|max:255',
                'email'=>'required|string|email|max:255|unique:users',
                'password'=>'required|string|min:6'
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $this->emailverify($user->email);

        // $token = Auth::login($user);
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message'=>'User Registered Successfully Verify Your Email Address',
            'user'=>$user,
            'authorisation'=> [
                'token' => $token,
                'type' => 'bearer'
            ]
        ]);

    }

    /*User Detail API */
    public function userDetails()
    {
        return response()->json(auth()->user());
    }

    /* send email Verification Link */
    public function emailverify($email)
    {
        // $email = $request['email'];
        $user = User::where('email', $email)->first();
        if($user){
            $user->emailverification();
            return response()->json(['status'=>'success','message'=>'Verify Your Email Address']);
        }else{
            return response()->json(['status'=>'error','message'=>'User Not Found']);
        }
    }

    /* confirm email Verification Status */
    // public function verifyEmail(Request $request)
    // {
    //     $token = $request->input('token');

    //     $user = User::where('email_verification_token', $token)->first();
    //     if ($user) {
            
    //         if ($user->email_verified_at === null) {
                
    //             $user->update([
    //                 'email_verified_at' => now(),
    //                 'email_verification_token' => null,
    //                 'email_verified' => 1,
    //             ]);

    //             return response()->json(['status' => 'success', 'message' => 'Email verified successfully']);
    //         } else {
    //             return response()->json(['status' => 'error', 'message' => 'Email already verified']);
    //         }
    //     } else {
    //         return response()->json(['status' => 'error', 'message' => 'Invalid token']);
    //     }
    // }

    /*Forgot Password */
    public function forgotpassword(Request $request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->first();
        if($user){
            $password = Str::random(10);
            Maill::send([],[],function($message) use($email, $password){
                $message->to($email)
                        ->subject("Reset Password")
                        ->html("<p>Tour New Password is</p><br/>".$password);
            });
            User::where('email', $email)->update(['password'=>Hash::make($password)]);
            return response()->json(['status'=>'success','message'=>'New Password send in your email']);
        }else{
            return response()->json(['status'=>'error','message'=>'User Not Found']);
        }
    }

    /* Change Password */
    public function changepassword(Request $request)
    {
        $userId = $request->userId;
        $currentPassword =  $request->cpassword;
        $newpassword = $request->npassword;

        $user = User::find($userId);
        if($user){
            if(Hash::check($currentPassword, $user->password)){
                User::where('id', $userId)->update(['password'=>Hash::make($newpassword)]);
              
                return response()->json(['status'=>'success','message'=>'Password Change Successfully']);
            }else{
                return response()->json(['status'=>'error','message'=>'Current Password Not Match']);
            }
        }else{
            return response()->json(['status'=>'error','message'=>'User Not Found']);
        }
    }

}