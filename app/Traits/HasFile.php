<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HasFile
{
    public function upload_file(Request $request, string $column, string $folder): ?string
    {
        return $request->hasFile($column) ? $request->file($column)->store($folder, 'public') : null;
    }

    public function update_file(Request $request, Model $model, string $column, string $folder): ?string
    {
        if ($request->hasFile($column)) {
            if ($model->$column) {
                Storage::disk('public')->delete($model->$column);
            }

            $thumbnail = $request->fole($column)->store($folder, 'public');
        } else {
            $thumbnail = $model->$column;
        }

        return $thumbnail;
    }

    public function delete_file(Model $model, string $column): void
    {
        if ($model->$column) {
            Storage::disk('public')->delete($model->$column);
        }
    }
}
