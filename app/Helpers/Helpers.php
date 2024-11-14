<?php

use Illuminate\Support\Facades\Storage;

if (!function_exists('storage')) {
    function storage(string $path): string
    {
        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }
        return Storage::url($path);
    }
}

if (!function_exists('flashMessage')) {
    function flashMessage($message, $type = 'success'): void
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}

if (!function_exists('moneyFormat')) {
    function moneyFormat($value): string
    {
        return 'Rp ' . number_format($value, 0, ',', '.');
    }
}
