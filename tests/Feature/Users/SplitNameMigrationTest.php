<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\User;

beforeEach(function () {
    $this->artisan('migrate:fresh');
});

test('users table has firstname and lastname columns', function () {
    expect(Schema::hasColumns('users', ['firstname', 'lastname']))->toBeTrue();
});

test('can create a user with firstname and lastname', function () {
    $user = \App\Models\User::create([
        'firstname' => 'John',
        'lastname' => 'Doe',
        'email' => 'john@example.com',
        'password' => bcrypt('secret'),
    ]);

    expect($user->firstname)->toBe('John');
    expect($user->lastname)->toBe('Doe');
});