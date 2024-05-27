<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ApiAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/user', [UserController::class, 'register']);
Route::post('/user/login', [UserController::class, 'login']);

Route::middleware(ApiAuthMiddleware::class)->group(function () {
    Route::get('/user/current', [UserController::class, 'get_current']);
    Route::patch('/user/update', [UserController::class, 'update_current']);
    Route::delete('/user/logout', [UserController::class, 'logout_current']);

    Route::post('/task', [TaskController::class, 'store']);
    Route::get('/task/get', [TaskController::class, 'get']);
    Route::put('/task/update/{id}', [TaskController::class, 'update']);
    Route::delete('/task/delete/{id}', [TaskController::class, 'destroy']);
});
