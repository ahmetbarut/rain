<?php

namespace App\Rules;

use ahmetbarut\Validation\Validation\Rule;

class PlateNumber implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function check(string $attr, string $value): bool
    {
        return preg_match("/(^[A-Z]{2,3}[0-9]{2,4}$)/", $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return trans("validation.plate_number");
    }
}
