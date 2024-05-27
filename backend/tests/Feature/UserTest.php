<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertNotEquals;
use function PHPUnit\Framework\assertNull;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_success(){
        $this->post("/api/user", [
            "name" => "test",
            "email" => "test@gmail.com",
            "password" => "test",
        ])->assertStatus(201)->assertJson([
            "data" => [
                "name" => "test",
                "email" => "test@gmail.com",
            ]
        ]);
    }

    public function test_register_required_failed(){
        $this->post("/api/user", [
            "email" => "test@gmail.com",
        ])->assertStatus(400)->assertJson([
            "errors" => [
                "name" => [
                    "The name field is required."
                ],
                "password" => [
                    "The password field is required."
                ]
            ]
        ]);
    }

    public function test_login_success(){
        $this->test_register_success();
        $this->post("/api/user/login", [
            "email" => "test@gmail.com",
            "password" => "test",
        ])->assertStatus(200)->assertJson([
            "data" => [
                "name" => "test",
                "email" => "test@gmail.com",
            ]
        ]);
    }

    public function test_login_failed(){
        $this->test_register_success();
        $this->post("/api/user/login", [
            "email" => "test@gmail.com",
            "password" => "wrong_password",
        ])->assertStatus(401)->assertJson([
            "errors" => [
                "message" => "username or passsword is wrong"
            ]
        ]);
    }

    public function test_login_required_failed(){
        $this->test_register_success();
        $this->post("/api/user/login", [
            "email" => "test@gmail.com",
        ])->assertStatus(400)->assertJson([
            "errors" => [
                "password" => [
                    "The password field is required."
                ]
            ]
        ]);
    }

    public function test_get_current_success(){
        $this->seed([UserSeeder::class]);
        $this->get("/api/user/current", [
            "Authorization" => "token_test"
        ])->assertStatus(200)->assertJson([
            "data" => [
                "name" => "fullname",
                "email" => "email@gmail.com",
            ]
        ]);
    }

    public function test_get_current_authorization_failed(){
        $this->seed([UserSeeder::class]);
        $this->get("/api/user/current", [
            "Authorization" => "wrong_token"
        ])->assertStatus(401)->assertJson([
            "errors" => [
                "message" => [
                    "unauthorized"
                ]
            ]
        ]);
    }

    public function test_update_current_success(){
        $this->seed([UserSeeder::class]);
        $old = User::where("token", "token_test")->first();
        $this->patch("/api/user/update", 
            [
                "name" => "fullnameUpdate",
                "email" => "emailUpdate@gmail.com",
                "password" => "passwordUpdate",
            ],
            [
                "Authorization" => "token_test"
            ]
        )->assertStatus(200)->assertJson([
            "data" => [
                "name" => "fullnameUpdate",
                "email" => "emailUpdate@gmail.com",
            ]
        ]);
        $new = User::where("token", "token_test")->first();
        assertNotEquals($old->name, $new->name);
        assertNotEquals($old->email, $new->email);
        assertNotEquals($old->password, $new->password);
    }

    public function test_email_update_current_success(){
        $this->seed([UserSeeder::class]);
        $oldEmail = User::where("name", "fullname")->first();
        $this->patch("/api/user/update", 
            [
                "email" => "testUpdate@gmail.com",
            ],
            [
                "Authorization" => "token_test"
            ]
        )->assertStatus(200)->assertJson([
            "data" => [
                "name" => "fullname",
                "email" => "testUpdate@gmail.com",
            ]
        ]);
        $newEmail = User::where("name", "fullname")->first();
        assertNotEquals($oldEmail->email, $newEmail->email);
    }

    public function test_update_current_authorization_failed(){
        $this->seed([UserSeeder::class]);
        $this->patch("/api/user/update", 
            [
                "name" => "fullnameUpdate",
                "email" => "emailUpdate@gmail.com",
                "password" => "passwordUpdate",
            ],
            [
                "Authorization" => "wrong_token"
            ]
        )->assertStatus(401)->assertJson([
            "errors" => [
                "message" => [
                    "unauthorized"
                ]
            ]
        ]);
    }

    public function test_logout_current_success(){
        $this->seed([UserSeeder::class]);
        $this->delete("/api/user/logout", headers: [
            "Authorization" => "token_test"
        ])->assertStatus(200)->assertJson([
            "data" => true
        ]);
        $user = User::where("name", "fullname")->first();
        assertNull($user->token);
    }

    public function test_logout_authorization_failed(){
        $this->seed([UserSeeder::class]);
        $this->delete("/api/user/logout", headers: [
            "Authorization" => "wrong_token"
        ])->assertStatus(401)->assertJson([
            "errors" => [
                "message" => [
                    "unauthorized"
                ]
            ]
        ]);
    }
}
