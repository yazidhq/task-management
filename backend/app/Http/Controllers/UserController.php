<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        
        if(User::where("email", $data["email"])->count() == 1){
            throw new HttpResponseException(response([
                "errors" => [
                    "email" => [
                        "The email must be unique"
                    ],
                ]
            ], 400));
        }

        $user = new User($data);
        $user->password = Hash::make($data["password"]);
        $user->save();

        return (new UserResource($user))->response()->setStatusCode(201);
    }

    public function login(UserLoginRequest $request): UserResource
    {
        $data = $request->validated();
        $user = User::where("email", $data["email"])->first();

        if(!$user || !Hash::check($data["password"], $user->password)){
            throw new HttpResponseException(response([
                "errors" => [
                    "message" => "username or passsword is wrong"
                ]
            ], 401));
        }

        $user->token = Str::uuid()->toString();
        $user->save();
        
        return new UserResource($user);
    }

    public function get_current(): UserResource
    {
        $user = Auth::user();
        return new UserResource($user);
    }

    public function update_current(UserUpdateRequest $request): UserResource
    {
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $data = $request->validated();

        if(isset($data["name"])){
            $user->name = $data["name"];
        }

        if(isset($data["email"])){
            $user->email = $data["email"];
        }

        if(isset($data["password"])){
            $user->password = Hash::make($data["password"]);
        }

        $user->save();

        return new UserResource($user);
    }

    public function logout_current()
    {
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $user->token = null;
        $user->save();
        return response()->json([
            "data" => true
        ])->setStatusCode(200);
    }
}
