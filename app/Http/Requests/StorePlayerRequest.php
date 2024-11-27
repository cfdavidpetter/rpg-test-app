<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\PlayerClass;

class StorePlayerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:150',
            'class' => 'required|in:' . implode(',', array_column(PlayerClass::cases(), 'value')),
            'xp' => 'required|integer|between:1,100',
            'confirmed' => 'boolean',
        ];
    }
}
