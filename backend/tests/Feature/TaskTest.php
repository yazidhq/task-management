<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Database\Seeders\TaskSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_success(){
        $this->seed([UserSeeder::class]);
        $this->post("/api/task",
            [
                "title" => "title",
                "description" => "first task",
                "duedate" => "20/04/2024",
                "priority" => "critical",
            ],
            [
                "Authorization" => "token_test"
            ]
        )->assertStatus(201)->assertJson([
            "data" => [
                "title" => "title",
                "status" => "to do",
                "description" => "first task",
                "duedate" => "20/04/2024",
                "priority" => "critical",
            ]
        ]);
    }

    public function test_create_unauthorized(){
        $this->post("/api/task",
            [
                "title" => "title",
                "description" => "first task",
                "duedate" => "20/04/2024",
                "priority" => "critical",
            ],
            [
                "Authorization" => "token"
            ]
        )->assertStatus(401)->assertJson([
            "errors" => [
                "message" => [
                    "unauthorized"
                ]
            ]
        ]);
    }

    public function test_create_required_failed(){
        $this->seed([UserSeeder::class]);
        $this->post("/api/task",
            [],
            [
                "Authorization" => "token_test"
            ]
        )->assertStatus(400)->assertJson([
            "errors" => [
                "title" => [
                    "The title field is required."
                ],
                "description" => [
                    "The description field is required."
                ],
                "duedate" => [
                    "The duedate field is required."
                ],
                "priority" => [
                    "The priority field is required."
                ],
            ]
        ]);
    }

    public function test_update_success(){
        $this->seed([UserSeeder::class, TaskSeeder::class]);
        $task = Task::query()->limit(1)->first();
        $this->put("/api/task/update/" . $task->id,
            [
                "title" => "title new",
                "status" => "done",
                "description" => "first task new",
                "duedate" => "20/04/2025",
                "priority" => "high",
            ],
            [
                "Authorization" => "token_test"
            ]
        )->assertStatus(200)->assertJson([
            "data" => [
                "title" => "title new",
                "status" => "done",
                "description" => "first task new",
                "duedate" => "20/04/2025",
                "priority" => "high",
            ]
        ]);
    }

    public function test_update_not_found_failed(){
        $this->seed([UserSeeder::class, TaskSeeder::class]);
        $task = Task::query()->limit(1)->first();
        $this->put("/api/task/update/" . $task->id + 100,
            [
                "title" => "title new",
                "status" => "done",
                "description" => "first task new",
                "duedate" => "20/04/2025",
                "priority" => "high",
            ],
            [
                "Authorization" => "token_test"
            ]
        )->assertStatus(404)->assertJson([
            "error" => [
                "message" => "not found"
            ]
        ]);
    }

    public function test_get_success(){
        $this->seed([UserSeeder::class, TaskSeeder::class]);
        $this->get("/api/task/get",
            [
                "Authorization" => "token_test"
            ]
        )->assertStatus(200)->assertJson([
            "data" => [
                [
                    "title" => "title",
                    "status" => "to do",
                    "description" => "first task",
                    "duedate" => "20/04/2024",
                    "priority" => "critical",
                ]
            ]
        ]);
    }

    public function test_destroy_success(){
        $this->seed([UserSeeder::class, TaskSeeder::class]);
        $task = Task::query()->limit(1)->first();
        $this->delete("/api/task/delete/" . $task->id, headers:
            [
                "Authorization" => "token_test"
            ]
        )->assertStatus(200);
    }

    public function test_destroy_not_found(){
        $this->seed([UserSeeder::class, TaskSeeder::class]);
        $task = Task::query()->limit(1)->first();
        $this->delete("/api/task/delete/" . $task->id + 100, headers:
            [
                "Authorization" => "token_test"
            ]
        )->assertStatus(404)->assertJson([
            "error" => [
                "message" => "not found"
            ]
        ]);
    }
}
