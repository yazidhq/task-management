<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where("email", "email@gmail.com")->first();
        Task::create([
            "title" => "title",
            "status" => "to do",
            "description" => "first task",
            "duedate" => "20/04/2024",
            "priority" => "critical",
            "user_id" => $user->id
        ]);
    }
}
