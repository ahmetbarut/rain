<?php

namespace Core;

class Cookie
{
    /**
     * Yeni bir çerez depolar
     * @param string $key
     * @param array|string $value
     * @param mixed $expired
     */
    static public function set(string $key, array|string $value, $expired )
    {
        setcookie($key, $value, $expired);
    }

    /**
     * Varolan çerezi getirir
     * @param string $key
     * @return string|false
     */
    static public function get(string $key): string | false
    {
        if(isset($_COOKIE[$key])){
            return $_COOKIE[$key];
        }
        return false;
    }
}
