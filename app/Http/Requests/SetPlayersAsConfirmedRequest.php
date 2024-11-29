<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SetPlayersAsConfirmedRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:players,id',
        ];
    }

    public function messages(): array
    {
        return [
            'ids.required' => 'A lista de IDs é obrigatória.',
            'ids.array' => 'A lista de IDs deve ser uma lista.',
            'ids.*.integer' => 'Cada ID deve ser um número inteiro.',
            'ids.*.exists' => 'Um ou mais IDs não correspondem a jogadores existentes.',
        ];
    }
}
