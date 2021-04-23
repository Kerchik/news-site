<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comments;
use App\User;

class CommentsController extends Controller
{
    public function addComment(Request $request) {
		$request->validate([
            'content' => ['required'],
        ]);

        $data = $request->json()->all();
		
		$comment = new \App\Models\Comments([
			'content' => $request['content'],
			'author' => $request['author'],
			'news_id' => $request['news_id'],
			"created_at"=> now(),
			"updated_at"=> now(),
		]);

		$comment->save();

		return response('Comment has been added!', 200)->header('Content-Type', 'text/plain');
    }

	public function getComments($id) {
		$comments = Comments::where('news_id', $id)->orderBy('created_at', 'DESC')->get();
		foreach ($comments as $comment) {
			$comment->author = User::where('id', $comment->author)->first();
		}
		return response()->json($comments);
	} 
}
