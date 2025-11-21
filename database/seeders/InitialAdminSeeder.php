<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class InitialAdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('SEED_ADMIN_EMAIL');
        $password = env('SEED_ADMIN_PASSWORD');

        if (!$email || !$password) {
            $this->command->warn("❗ SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD missing in .env");
            return;
        }

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'firstname' => 'Admin',
                'lastname' => 'User',
                'password' => Hash::make($password),
            ]
        );

        $this->command->info("✔ Admin created or already exists: {$user->email}");
    }
}
