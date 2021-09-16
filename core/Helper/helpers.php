<?php

use Core\Container\Container;

if (!function_exists('config')) {

    /**
     * Yapılandırma dosyalarından istenen yapılandırmaları çeker. 
     * Bu yardımcı fonksiyon config/ içindeki bütün yapılandırma dosyalarına erişebiliyor.
     *
     * @param string $key
     * @return Core\Container\Container
     */
    function config($key)
    {
        return Container::instance("config")->get($key);
    }
}

if(!function_exists('asset'))
{
    /**
     * public dizinini döndürür.
     *
     * @param string $asset
     * @return void
     */
    function asset($asset = null) {

        $url = "";
        if(array_key_exists('SERVER_PORT', $_SERVER)){
            $url = ':' .  $_SERVER['SERVER_PORT']  .  "/" . $asset;
        }
        return trim(config('app.app_url') . $url, '/');
    }
}

if(!function_exists('__'))
{
    /**
     * Çeviri dosyalarındaki değerlere erişir.
     *
     * @param string $key
     * @return string
     */
    function __(string $key)
    {
        return trans($key);
    }
}

/**
 * Kapsayıcıdan istenen sınıf örneğini döndürür.
 *
 * @param string $abstract
 * @return mixed
 */
function app(string $abstract)
{
    return Container::instance($abstract);
}