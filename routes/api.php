<?php

use Illuminate\Http\Request;
use App\Models\News;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('news', 'newsController@index');

Route::get('news/{id}', 'newsController@viewArticle');

Route::post('news/{id}', 'newsController@editArticle');

Route::delete('news/remove/{id}', 'newsController@removeArticle');

Route::post('add-news', 'newsController@addArticle');
