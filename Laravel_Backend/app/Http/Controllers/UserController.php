<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Method to fetch all users
    public function index()
    {
        return response()->json(User::all());
    }

    // Method to store a new user
    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);
    
        // Create the user if validation passes
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => ($request->password),
        ]);
    
        // Return a JSON response indicating success
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }
    
    // Method to update an existing user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|max:255', // Password is optional
        ]);

        $user->name = $request->name;
        $user->email = $request->email;

        if ($request->password) {
            $user->password = bcrypt($request->password); // Hash the password
        }

        $user->save();

        return response()->json($user);
    }

    // Method to delete a user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
