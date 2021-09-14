<?php

use Core\View\Render;

if (!function_exists('config')) {
    function config($key)
    {
        return (new \Core\Config\App)->get($key);
    }
}

if (!function_exists('load_page')) {

    function load_page($view, $properties = null)
    {
        (new Render)->getPage($view, $properties);
    }
}

if(!function_exists('asset'))
{
    function asset($asset = null) {
        return  "//". $_SERVER["HTTP_HOST"] . (null == $asset) ? "" :  "/" . $asset;
    }
}

if(!function_exists('__'))
{
    function __($key)
    {
        return trans($key);
    }
}