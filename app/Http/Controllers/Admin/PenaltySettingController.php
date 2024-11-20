<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PenaltySettingRequest;
use App\Models\PenaltySetting;
use Illuminate\Http\Request;
use App\Enums\PenaltyCondition;

class PenaltySettingController extends Controller
{
    public function index()
    {
        $penaltySetting = PenaltySetting::first();
        return inertia('Admin/PenaltySetting/Index', [
            'penaltySetting' => [
                'late' => $penaltySetting->where('condition', 'late')->first()->amount,
                'lost' => $penaltySetting->where('condition', 'lost')->first()->amount,
                'damage' => $penaltySetting->where('condition', 'damage')->first()->amount,
            ]
        ]);
    }
    public function update(PenaltySettingRequest $request, string $id)
    {
        PenaltySetting::where('condition', PenaltyCondition::Late->value)->update(['amount' => $request->late]);
        PenaltySetting::where('condition', PenaltyCondition::Lost->value)->update(['amount' => $request->lost]);
        PenaltySetting::where('condition', PenaltyCondition::Damage->value)->update(['amount' => $request->damage]);

        flashMessage('Penalty setting updated');

        return redirect()->back();
    }
}
