<?php

namespace ahmetbarut\Validation\Validation\Rules;

use ahmetbarut\Validation\Validation\Rule;

class Required implements Rule
{

    public function check($attr, $value): bool
    {
     
        return strlen($value) !== 0 ? true : false;
    }

    public function message(): string
    {
        return "Zorunlu alan!";
    }
}