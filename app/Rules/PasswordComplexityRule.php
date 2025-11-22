<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PasswordComplexityRule implements ValidationRule
{
    public function __construct(
        private readonly string $regex,
        private readonly array $description
    ) {}

    public static function fromConfig(): self
    {
        $rules = config('auth.password_rules');

        return new self(
            regex: $rules['regex'],
            description: $rules['description']
        );
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match($this->regex, $value)) {
            $fail("The {$attribute} must respect: " . implode(', ', $this->description));
        }
    }
}
