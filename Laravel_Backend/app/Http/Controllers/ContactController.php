<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    // Fetch all contacts
    public function index(): JsonResponse
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    // Store a new contact
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:contacts',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($validatedData);
        return response()->json(['contact' => $contact], 201);
    }

    // Show a specific contact
    public function show($id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        return response()->json($contact);
    }

    // Update a specific contact
    public function update(Request $request, $id): JsonResponse
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:contacts,email,' . $id,
            'subject' => 'sometimes|required|string|max:255',
            'message' => 'sometimes|required|string',
        ]);

        $contact = Contact::findOrFail($id);
        $contact->update($validatedData);
        return response()->json(['contact' => $contact]);
    }

    // Delete a specific contact
    public function destroy($id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(['message' => 'Contact deleted successfully.']);
    }
}
