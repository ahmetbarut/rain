<?php

namespace ahmetbarut\Validation\Validation\Rules;

use ahmetbarut\Validation\Validation\Rule;

class IsString implements Rule
{
    public function check($attr, $value): bool
    {
        return is_string($value);
    }

    public function message(): string
    {
        return "Sicim(String) kabul eder.";
    }
}
