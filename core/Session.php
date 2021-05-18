<?php 

namespace Core;

class Session
{
    /**
     * Flash oturumları tutar.
     * @var array $flashData
     */
    protected array $flashData = [];
    
    /**
     * Yeni bir oturum değişkeni tanımlar.
     * @param string $key
     * @param array|string $value
     * @return void
     */
    static public function set(string $key, string | array $value)
    {
        return $_SESSION[$key] = $value;
    }

    /**
     * Oturum değişkenini geriye döndürür.
     * @param string $key
     * @return 
     */
    static public function get(string $key)
    {
        return $_SESSION[$key]; 
    }

    static public function flash(string $key, array|string $value)
    {
        $_SESSION[$key] = $value;
        self::$flashData = [$key];
    }

    public function __destruct()
    {
        foreach ($this->flashData as $key) {
            session_destroy($key);
        }
    }
}