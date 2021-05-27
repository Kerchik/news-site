<?php

use Illuminate\Http\Request;
use App\Models\News;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', 'registerController@register');

Route::post('/login', 'loginCOntroller@login');

Route::post('/logout', 'loginCOntroller@logout');

Route::get('news', 'newsController@index');

Route::get('news/{id}', 'newsController@viewArticle');

Route::middleware('auth:sanctum')->post('news/{id}', 'newsController@editArticle');

Route::middleware('auth:sanctum')->delete('news/remove/{id}', 'newsController@removeArticle');

Route::middleware('auth:sanctum')->post('add-news', 'newsController@addArticle');

Route::middleware('auth:sanctum')->post('add-comment/{id}', 'commentsController@addComment');

Route::get('get-comments/{id}', 'commentsController@getComments');
