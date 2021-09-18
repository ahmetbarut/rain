<?php

namespace ahmetbarut\Validation\Validation\Rules;

use ahmetbarut\Validation\Validation\Rule;

class Number implements Rule
{

    public function check(string $attr, string $value): bool
    {
        return is_numeric($value);
    }

    public function message(): string
    {
        return "Sayısal olmalıdır!";
    }
}