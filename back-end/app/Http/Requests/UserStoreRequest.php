<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:258',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'is_admin' => 'nullable|boolean',
            'photo' => 'nullable|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
    public function messages() {
        return [
            'name.required' => 'Name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least :min characters.',
            'photo.required' => 'Photo is required.',
            'photo.mimes' => 'Photo must be a valid image format (jpeg, png, jpg, gif).',
            'photo.max' => 'Photo size must not exceed :max KB.',
        ];
    }
}