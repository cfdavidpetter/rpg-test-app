<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\PlayerClass;

class UpdatePlayerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|max:150',
            'class' => 'in:' . implode(',', array_column(PlayerClass::cases(), 'value')),
            'xp' => 'integer|between:1,100',
            'confirmed' => 'boolean',
        ];
    }
}
