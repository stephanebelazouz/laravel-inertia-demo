<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\PasswordComplexityRule;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Customize if needed (ex: Gate::allows('update-user'))
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $config = config('auth.password_rules');

        return [
            'firstname' => ['sometimes', 'required', 'string', 'max:255'],
            'lastname'  => ['sometimes', 'required', 'string', 'max:255'],
            'email'     => ['sometimes', 'required', 'email', 'max:255'],
            'password'  => ['required', new PasswordComplexityRule($config['regex'], $config['description']), 'confirmed'],
        ];
    }

    /**
     * Custom attributes (optional)
     */
    public function attributes(): array
    {
        return [
            'firstname' => 'first name',
            'lastname'  => 'last name',
            'email'     => 'email address',
        ];
    }
}
