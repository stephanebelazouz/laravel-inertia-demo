<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

uses(RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get(route('users.index'))->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('users.index'))->assertOk();
});

it('displays the users list with correct pagination structure', function () {
    User::query()->delete();

    $admin = User::factory()->create([
        'email' => 'admin@example.com',
    ]);

    actingAs($admin);

    $response = get(route('users.index'));
    $response->assertInertia(
        fn($page) =>
        $page
            ->component('users/list')
            ->has('users.data')
            ->has('users.links')
    );
});
