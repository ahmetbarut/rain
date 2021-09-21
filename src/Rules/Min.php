<?php

namespace App\Rules;

use ahmetbarut\Validation\Validation\Rule;

class Min implements Rule
{
    protected $min;
    
    public function __construct(int $min)
    {
        $this->min = $min;
    }
    
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function check(string $attr, string $value): bool
    {
        return strlen($value) >= $this->min;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return trans("validation.custom_min");
    }
}
