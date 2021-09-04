<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Comments;
use App\Models\News;
use Illuminate\Support\Facades\Hash;

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

    public function getUserActivity($userId) {
        if (auth()->user()->id !== intval($userId) && auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}
		
		$commentsCount = count(Comments::where('author', $userId)->get());
		$articlesCount = count(News::where('author', $userId)->get());

		return response()->json(['commentsCount' => $commentsCount, 'articlesCount' => $articlesCount]);
    }

    public function changeUserRole(Request $request, $userId) {
        if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}

        $user = User::where('id', $userId)->first();

		if (!$user) {
			return response('User is not found!', 404);
		}

		if ($user->id === 1) {
			return response('You cannot chane role of main Admin!', 403);
		}

		if (!in_array($request['role'], self::USER_ROLES)) {
			return response('Wrong role!', 404);
		}
		
        $user->role = $request['role'];

		$user->save();
		return response("User role has been successfully changed!", 200);
    }

	public function editUserData(Request $request, $userId) {
		if (auth()->user()->id !== intval($userId)) {
			return response("You do not have a permission to execute this operation!", 403);
		}
		$request->validate([
            'avatar' => ['required'],
            'name' => ['required', 'unique:users,name,'.auth()->user()->id],
            'email' => ['required', 'email', 'unique:users,email,'.auth()->user()->id],
        ]);
		
		$user = User::where('id', $userId)->first();

		if (!$user) {
			return response('User is not found!', 404);
		}

		$user->name = $request['name'];
		$user->email = $request['email'];
		
		if ($request->file('avatar')) {
			$user->avatar = $request->file('avatar')->store('user-avatars', 'public');
		}

		$user->save();

		return response("User data has been succesfully updated!", 200);
	}

	public function editUserPassword(Request $request, $userId) {
		if (auth()->user()->id !== intval($userId)) {
			return response("You do not have a permission to execute this operation!", 403);
		}
		
		$request->validate([
			'password' => ['required', 'min:8', 'confirmed']
        ]);
		
		$user = User::where('id', $userId)->first();

		if (!$user) {
			return response('User is not found!', 404);
		}

		$user->password = Hash::make($request['password']);

		$user->save();

		return response("Password was succesfully changed!", 200);
	}

    public function deleteUser($userId) {
        if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}

        $user = User::where('id', $userId)->first();
		
		if (!$user) {
			return response('User is not found!', 404);
		}

		if ($user->id === 1) {
			return response('You cannot delete main Admin!', 403);
		}

        $user->delete();

		return response("User has been deleted!", 200);
    }
}
