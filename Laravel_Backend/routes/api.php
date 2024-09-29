<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;

// Middleware for JWT Authentication
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Register API routes
// Route::post('/register', [AuthController::class, 'register']);

// Authentication routes
Route::controller(AuthController::class)->group(function(){
    Route::post('register','register');
    Route::post('login','login');
    Route::get('usetdetail','userDetails');
    Route::post('emailverify','emailverify');
    Route::post('verify-email', 'verifyEmail');
    Route::post('forgotpassword','forgotpassword');
    Route::post('changepassword','changepassword');
});

// JWT authentication routes
// Route::group(['middleware' => 'auth:api'], function () {
//     Route::post('token/refresh', [AuthController::class, 'refresh']);
//     Route::post('logout', [AuthController::class, 'logout']);
    
//     // Protected resources
// });

Route::apiResource('users', UserController::class);
Route::apiResource('contacts', ContactController::class);