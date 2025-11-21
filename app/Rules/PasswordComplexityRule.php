<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PasswordComplexityRule implements ValidationRule
{
    public function __construct(
        private readonly string $regex,
        private readonly array $description = []
    ) {}

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!preg_match($this->regex, $value)) {
            $fail("The :attribute must respect the following rules:\n" . implode(", ", $this->description));
        }
    }
}