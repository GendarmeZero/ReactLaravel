<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(), // Set to now() to mark as verified by default
            'email_verification_token' => fake()->randomNumber(8), // No token when verified
            'email_verified' => true, // Mark as verified
            'password' => fake()->password(), // Password
            'role' => fake()->randomElement(['user', 'admin']), // Randomly assign role
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return $this
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null, // Unverified
            'email_verification_token' => Str::random(40), // Generate a random token for email verification
            'email_verified' => false, // Mark as not verified
        ]);
    }
}
