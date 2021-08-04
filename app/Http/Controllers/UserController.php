<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{   
	const ROLE_ADMIN = 1;
	const ROLE_AUTHOR = 5;
	const ROLE_USER = 10;

	const USER_ROLES = [
		self::ROLE_ADMIN, 
		self::ROLE_AUTHOR, 
		self::ROLE_USER, 
	];
    
    public function getAllUsers() {
        if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}
        $users = User::orderBy('role', 'ASC')->get();
		return response()->json($users);
    }

    public function changeUserRole(Request $request, $userId) {
        if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}

        $user = User::where('id', $userId)->first();

		if (!$user) {
			return response('User is not found!', 404);
		}

		if (!in_array($request['role'], self::USER_ROLES)) {
			return response('Wrong role!', 404);
		}
		
        $user->role = $request['role'];

		$user->save();
		return response("User role has been successfully changed!", 200);
    }
}
