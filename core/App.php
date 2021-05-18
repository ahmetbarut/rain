<?php

namespace Core;

use Symfony\Component\HttpFoundation\Request;

class App
{
    /**
     * Konfigürasyon dosyasını tutar.
     * @var array $config
     */
    protected static array $config = [];
    
    public function __construct()
    {
        self::$config = include rootPath('config/app.php');
        self::setLocale(Session::get('language'));
    }

    /**
     * Varsayılan olarak tanımlanmış yereli getirir
     * @return string
     */
    static public function getLocale()
    {
        return self::$config['locale'];
    }

    /**
     * Varsayılan yereli değiştirir.
     * @param string $locale
     * @return void
     */
    static public function setLocale(string $locale)
    {
        self::$config['locale'] = $locale;
        Cookie::set('language',$locale, time() + 60 * 60 * 24);
        Session::set('language', $locale);
    }
}
