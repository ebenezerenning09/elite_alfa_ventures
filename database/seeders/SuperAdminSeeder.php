<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // TODO: Add your password here
        // Replace 'your-password-here' with your desired password
        $password = Hash::make('@Obinim99');

        Admin::firstOrCreate(
            ['email' => 'ebenezerenning09@gmail.com'],
            [
                'name' => 'Super Admin',
                'email' => 'ebenezerenning09@gmail.com',
                'password' => $password,
                'email_verified_at' => now(),
            ]
        );
    }
}
