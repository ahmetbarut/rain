<?php

use Core\App;

/**
 * public dizinin döndürür.
 * @param string $asset
 */
function asset(string $asset)
{
    return $_ENV['APP_URL'] . '/' . $asset;
}

/**
 * Kök dizinini döndürür.
 * @param string $dir
 * @return string
 */
function rootPath(string $dir = null)
{
    return dirname(__DIR__) . (($dir !== null) ?  '/' . $dir : '');
}

/**
 * Şablon döndürür
 * @param string $viewName
 * @param array $data
 */
function view(string $viewName, $data = [])
{
    extract($data);
    require_once rootPath('view/') . $viewName . ".php";
}

/**
 * çoklu dil kullanımı
 * @param string $key
 * @return string $value
 */
function __(string $key)
{
    $lang = include rootPath('view/lang/' . App::getLocale() . '.php');
    return $lang[$key];
}
