<?php

namespace Core\Config;

class App
{

    protected $config;

    public function get($key)
    {
        $key = explode(".", $key);
        $this->config = include dirname(dirname(__DIR__)) . "/config/{$key[0]}.php";
        return $this->config[$key[1]];
    }
}
