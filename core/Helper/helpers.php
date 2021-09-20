<?php

use Core\Container\Container;

if (!function_exists('config')) {

    /**
     * Yapılandırma dosyalarından istenen yapılandırmaları çeker. 
     * Bu yardımcı fonksiyon config/ içindeki bütün yapılandırma dosyalarına erişebiliyor.
     *
     * @param string $key
     * @return mixed
     */
    function config($key): mixed
    {
        return Container::instance("config")->get($key);
    }
}

if (!function_exists('asset')) {
    /**
     * public dizinini döndürür.
     *
     * @param string $asset
     * @return void
     */
    function asset($asset = null)
    {
        return trim(config('app.app_url') . "/" . $asset, '/');
    }
}

if (!function_exists('__')) {
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
