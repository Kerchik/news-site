<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comments;
use App\Models\User;
use App\Models\News;

class CommentsController extends Controller
{
    public function addComment($id, Request $request) {
		$request->validate([
            'content' => ['required'],
        ]);
		$authorId = auth()->user()->id;
		
		$news = News::where('id', $id)->first();

		if (!$news) {
			return response('Article does not exist!', 404);
		}

        $data = $request->json()->all();
		
		$comment = new Comments([
			'content' => $request['content'],
			'author' => $authorId,
			'news_id' => $id
		]);

		$comment->save();

		return response('Comment has been added!', 200)->header('Content-Type', 'text/plain');
    }

	public function getComments($id) {
		$news = News::where('id', $id)->first();

		if (!$news) {
			return response('Article does not exist!', 404);
		}

		$comments = Comments::where('news_id', $id)->orderBy('created_at', 'DESC')->get();
		foreach ($comments as $comment) {
			$comment->author = User::where('id', $comment->author)->first();
		}
		return response()->json($comments);
	} 
}
