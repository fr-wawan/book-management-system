<?php

namespace App\Http\Controllers;

use App\Models\Penalty;
use Illuminate\Http\Request;

class PenaltyController extends Controller
{
    public function show(Penalty $penalty)
    {
        return inertia('Admin/Penalty/Show', [
            'penalty' => $penalty->load('bookReturn.borrowing.user'),
        ]);
    }
}
