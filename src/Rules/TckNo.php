<?php

namespace App\Rules;

use ahmetbarut\Validation\Validation\Rule;

/**
 * T.C. Kimlik numarasını doğrular. 
 */
class TCKNo implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function check($attr, $value): bool
    {
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return trans("validation.tck_no");
    }
}