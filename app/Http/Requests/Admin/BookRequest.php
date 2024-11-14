<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
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
      'title' => 'required|string|max:255',
      'author' => 'required|string|max:255',
      'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
      'language' => 'required|string|max:255',
      'pages' => 'required|integer|min:1',
      'summary' => 'required|string',
      'isbn' => 'required|string|max:255',
      'cover' => 'required|image',
      'price' => 'required|numeric|min:0',
      'stock' => 'required|integer|min:0',
      'category_id' => 'required|exists:categories,id',
      'publisher_id' => 'required|exists:publishers,id',
    ];
  }
}
