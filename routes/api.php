<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsersApiController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UsersApiController::class, 'index']);
    Route::post('/users', [UsersApiController::class, 'store']);
    Route::get('/users/{user}', [UsersApiController::class, 'show']);
    Route::put('/users/{user}', [UsersApiController::class, 'update']);
    Route::delete('/users/{user}', [UsersApiController::class, 'destroy']);
});
