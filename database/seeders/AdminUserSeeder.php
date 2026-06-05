<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'admin@fiinddesign.com',
            ],
            [
                'name' => 'Admin Fiind Design',
                'email' => 'admin@fiinddesign.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
    }
}