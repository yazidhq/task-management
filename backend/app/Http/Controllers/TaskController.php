<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskCreateRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(TaskCreateRequest $request): JsonResponse
    {
        $user = Auth::user();
        $data = $request->validated();

        $task = new Task($data);
        $task->user_id = $user->id;
        $task->status = "to do";
        $task->save();

        return (new TaskResource($task))->response()->setStatusCode(201);
    }

    public function get()
    {
        $user = Auth::user();
        $task = Task::where("user_id", $user->id)->get();

        return TaskResource::collection($task);
    }

    public function update(TaskUpdateRequest $request, int $id): TaskResource
    {
        $user = Auth::user();
        $data = $request->validated();

        $task = Task::where("id", $id)->where("user_id", $user->id)->first();
        if(!$task){
            throw new HttpResponseException(response()->json([
                "error" => [
                    "message" => "not found"
                ]
            ], 404));
        }

        $task->fill($data);
        $task->save();

        return new TaskResource($task);
    }

    public function destroy(int $id): JsonResponse
    {
        $user = Auth::user();
        
        $task = Task::where("id", $id)->where("user_id", $user->id)->first();
        if(!$task){
            throw new HttpResponseException(response()->json([
                "error" => [
                    "message" => "not found"
                ]
            ], 404));
        }
        $task->delete();
        
        return response()->json(["data" => true])->setStatusCode(200);
    }
}
