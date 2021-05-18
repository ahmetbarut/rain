<?php

namespace Core;

class Request
{
    public array $parametters;
    public string $requestMethod;

    public function __construct($parametters = [])
    {
        $this->parametters = $parametters;
        $this->requestMethod = strtolower($_SERVER["REQUEST_METHOD"]);
    }

    /**
     * İstekte bulunan yöntemi döndürü post,get..
     * @return string $requestMethod
     */
    public function getMethod()
    {
        return $this->requestMethod;
    }

    public function isPost()
    {
        return $this->getMethod() === 'post';
    }
    public function isGet()
    {
        return $this->getMethod() === 'get';
    }

    public function requestUri()
    {
        return $_SERVER['REQUEST_URI'];
    }

    public function requestMethod()
    {
        return $_SERVER['REQUEST_METHOD'];
    }
}
