<?php

namespace ahmetbarut\Validation\Validation;

interface Rule
{
    /**
     * Burda koşulları girmemizi sağlıyor.
     *
     * @param string $attr
     * @param string $value
     * @return boolean
     */
    public function check(string $attr, string $value): bool;

    /**
     * Başarısızlık durumunda ilgili mesajı döndürür.
     *
     * @return string
     */
    public function message(): string;
}