<?php

use ahmetbarut\PhpRouter\Exception\NotRouteFound;
use Core\Container\Container;

if (!function_exists('config')) {

    /**
     * Yapılandırma dosyalarından istenen yapılandırmaları çeker.
     * Bu yardımcı fonksiyon config/ içindeki bütün yapılandırma dosyalarına erişebiliyor.
     *
     * @param  string  $key
     *
     * @throws NotRouteFound
     * @return mixed
     */
    function config(string $key): mixed
    {
        return (Container::instance("config")->get($key));
    }
}

if (!function_exists('asset')) {
    /**
     * public dizinini döndürür.
     *
     * @param  string|null  $asset
     *
     * @throws NotRouteFound
     * @return string
     */
    function asset(string $asset = null): string
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
    function __(string $key): string
    {
        return trans($key);
    }
}

/**
 * Kapsayıcıdan istenen sınıf örneğini döndürür.
 *
 * @param string $abstract
 *
 * @return mixed
 * @throws NotRouteFound
 */
function app(string $abstract): mixed
{
    return Container::instance($abstract);
}

/**
 * Verilen dizgeyi belirtilen karakterle maskeler. Varsayılan *.
 *
 * @param string $string  Maskelenecek dizge
 * @param string $mask Maskeleme için kullanılacak karakter
 *
 * @return string
 */
function strMask (string $string, string $mask = "*"): string
{
    return (substr($string,0,2) . str_repeat($mask, strlen($string)) . substr($string,-2,2));
}

function after($subject, $search)
{
    return array_reverse(explode($search, $subject, 2))[0];
}

/**
 * Get core path.
 * @param string $path
 * @return string
 */
function core_path(string $path = ''): string
{
    $path = $path != '' ? '/' . $path : '';
    return dirname(__DIR__, 2) . '/core' . $path;
}

/**
 * Get src path
 * @param string $path
 * @return string
 */
function app_path(string $path = ''): string
{
    $path = $path != '' ? '/' . $path : '';
    return dirname(__DIR__, 2) . '/src' . $path;
}

function var_path(string $path = ''): string
{
    $path = $path != '' ? '/' . $path : '';
    return dirname(__DIR__, 2) . '/var' . $path;
}

/**
 * @throws NotRouteFound
 */
function view_path(string $path = ''): string
{
    $path = $path != '' ? '/' . $path : '';
    return config('view.path') . $path;
}

function root_path(string $path = ''): string
{
    $path = $path != '' ? '/' . $path : '';
    return rtrim(dirname(__DIR__, 2) . $path ,'/');
}