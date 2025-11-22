<?php

use App\Actions\Users\CreateUserAction;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('creates a user successfully through the API', function () {
    $this->actingAs(\App\Models\User::factory()->create());

    $payload = [
        'firstname' => 'John',
        'lastname'  => 'Doe',
        'email'     => 'john@example.com',
        'password'  => 'Password123!',
        'password_confirmation' => 'Password123!',
    ];

    $response = $this->postJson('/api/users', $payload);

    $response->assertCreated()
        ->assertJsonStructure([
            'message',
            'data' => [
                'id',
                'firstname',
                'lastname',
                'email',
            ],
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'john@example.com',
    ]);
});
