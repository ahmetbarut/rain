<?php

use Core\Container\Container;

if (!function_exists('config')) {

    /**
     * Yapılandırma dosyalarından istenen yapılandırmaları çeker.
     * Bu yardımcı fonksiyon config/ içindeki bütün yapılandırma dosyalarına erişebiliyor.
     *
     * @param  string  $key
     *
     * @throws \ahmetbarut\PhpRouter\Exception\NotRouteFound
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
     * @throws \ahmetbarut\PhpRouter\Exception\NotRouteFound
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
 */
function app(string $abstract): mixed
{
    return Container::instance($abstract);
}


/**
 * T.C kimlik numarasını kontrol eder.
 * @param string $TCK
 * @return bool
 */
function TCKnoCheck(string $TCK): bool
{
    if (strlen($TCK) != 11 || $TCK[0] == 0) {
        return false;
    } else {
        $first = 0;
        $old = 0;
        for ($i = 0; $i < 9; $i++) {
            if ($i % 2 == 0) {
                $first += $TCK[$i];
            } else {
                $old += $TCK[$i];
            }
        }
        $c1 = (($first) * 7 - ($old)) % 10;
        $c2 = ($first + $old + $c1) % 10;
        /* 10. karakter */          /* 11. karakter */
        if (substr($TCK, -2, 1) == $c1 && substr($TCK, -1, 1) == $c2) {
            return true;
        }
    }
    return false;
}

function session()
{
    return app('session');
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

function core_path(string $path = ''): string
{
    $path = $path != '' ? '/' . $path : '';
    return dirname(__DIR__, 2) . '/core' . $path;
}


function app_path(string $path = ''): string
{
    $path = $path != '' ? '/' . $path : '';
    return dirname(__DIR__, 2) . '/src' . $path;
}