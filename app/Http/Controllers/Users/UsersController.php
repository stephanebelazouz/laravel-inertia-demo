<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\UserCreateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('users/index', [
            'users' => User::select('id', 'firstname', 'lastname', 'email', 'created_at', 'updated_at')
                ->orderBy('created_at', 'asc')
                ->paginate(10)
                ->withQueryString()
        ]);
    }

    public function create()
    {
        return Inertia::render('users/create', [
            'users' => User::select('id', 'firstname', 'lastname', 'email', 'created_at', 'updated_at')
                ->orderBy('created_at', 'asc')
                ->paginate(10)
                ->withQueryString()
        ]);
    }

    public function store(UserCreateRequest $request)
    {
        $user = User::create([
            'firstname' => $request['firstname'],
            'lastname'  => $request['lastname'],
            'email'     => $request['email'],
            'password'  => Hash::make($request['password']),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }
}
