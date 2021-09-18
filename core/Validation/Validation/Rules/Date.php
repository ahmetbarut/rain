<?php

namespace ahmetbarut\Validation\Rules;

use ahmetbarut\Validation\Validation\Rule;

class Date implements Rule
{
    public function check($attr, $value): bool
    {
        $value = explode('/', $value);
        return checkdate($value[1], $value[0], $value[2]); 
    }

    public function message(): string
    {
        return "Tarih formatına uymalı. Kabul edilen format:(01/01/9999).";
    }
}
