<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string("title")->nullable(false);
            $table->string("status")->nullable();
            $table->string("description")->nullable(false);
            $table->string("duedate")->nullable(false);
            $table->string("priority")->nullable(false);
            
            $table->unsignedBigInteger("user_id")->nullable(false);
            $table->foreign("user_id")->on("users")->references("id");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
