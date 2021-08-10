<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\Models\User;
use App\Models\Comments;

class NewsController extends Controller
{
	const ROLE_ADMIN = 1;
	const ROLE_AUTHOR = 5;
	const ROLE_USER = 10;

    public function index()
	{
	    $news = News::orderBy('created_at', 'DESC')->paginate(10);
		return response()->json($news);
	}

    public function viewArticle($id)
	{
	    $news = News::where('id', $id)->first();

		if (!$news) {
			return response()->json([
				'message' => 'Article is not found!'
			], 404);
		}

		$news->photo = url($news->photo);
		$author = User::where('id', $news->author)->first();

		$news->author = $author ?: null;

		return response()->json($news);
	}

    public function editArticle(Request $request, $id)
	{
		if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}
		$request->validate([
            'title' => ['required', 'min:3'],
            'content' => ['required', 'min:8'],
            'photo' => ['required']
        ]);
		
		$news = News::where('id', $id)->first();

		if (!$news) {
			return response('Article is not found!', 404);
		}

		$news->title = $request['title'];
		$news->content = $request['content'];
		
		if ($request->file('photo')) {
			$news->photo = $request->file('photo')->store('news-photos', 'public');
		}

		$news->save();

		return response("News have been sucessfully edited!", 200);
	}

    public function removeArticle($id)
	{
		if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}

	    $news = News::where('id', $id)->first();

		if (!$news) {
			return response('Article is not found!', 404);
		}

		$news->delete();

		Comments::where('news_id', $news->id)->delete();

		return response('Article has been deleted!', 200)->header('Content-Type', 'text/plain');
	}

    public function addArticle(Request $request)
	{
		if (auth()->user()->role !== self::ROLE_ADMIN && auth()->user()->role !== self::ROLE_AUTHOR) {
			return response("You do not have a permission to execute this operation!", 403);
		}

		$request->validate([
            'title' => ['required', 'min:3'],
            'content' => ['required', 'min:8'],
            'photo' => ['required']
        ]);

		$authorId = auth()->user()->id;

		$news = new News([
			'title' => $request['title'],		
			'content' => $request['content'],
			'photo' => $request->file('photo')->store('news-photos', 'public'),
			'author' => $authorId,
		]);

		$news->save();

		return response('Article has been added!', 200)->header('Content-Type', 'text/plain');
	}
}
