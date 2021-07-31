<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    const ROLE_ADMIN = 1;
	const ROLE_USER = 10;
    
    public function getAllUsers() {
        if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}
        $users = User::orderBy('role', 'ASC')->get();
		return response()->json($users);
    }
}
