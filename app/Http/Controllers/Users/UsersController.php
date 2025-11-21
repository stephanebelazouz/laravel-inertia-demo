<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        return Inertia::render('users/list', [
            'users' => User::select('id', 'firstname', 'lastname', 'email', 'created_at', 'updated_at')
                ->orderBy('created_at', 'asc')
                ->paginate(10)
                ->withQueryString()
        ]);
    }
}
