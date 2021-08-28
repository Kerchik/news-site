<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateAdminUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(DB::table('users')->count() == 0) {
            DB::table('users')->insert([
              [
                'name' => 'Admin',
                'email' => 'admin@mail.com',
                'password' => '$2y$10$sEOGZCCoc7kz4auA2UZ/OufGoBPIgB0nNq/BsGXNptr7JbgL3HzM2',
                'role' => 1,
                'created_at' => now(),
                'updated_at' => now(),
              ]
            ]);
          }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
