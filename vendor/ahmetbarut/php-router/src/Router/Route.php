<?php

namespace ahmetbarut\PhpRouter\Router;

use ahmetbarut\PhpRouter\Request\Request;

class Route
{
    public $name;

    public $action;

    public $uri;

    public $prefix;

    public $regexpURL;

    public $middleware;

    public $parameters;

    public $query;

    public $namespace;

    private $options;

    public function __construct()
    {
    }

    public function addRoute($path, $callback, $namespace = "")
    {
        // Verilen parametreleri düzenli ifadelere göre düzenler ve eşleştirmeye hazırlar
        $path = rtrim($path, "/") === "" ? "/" : rtrim($path, "/");
        
        $this->uri($path);

        $this->regexpURL(preg_replace("/([:][a-z0-9_]+|[?]$)/", "([\w-]+)", $path));

        $this->parameters(preg_filter("/(^[:][a-z0-9_]+|[?]$)/", "$0", explode("/", $path)));

        $this->action($callback);

        $this->namespace($namespace);
        
        return $this;
    }

    public function name($name)
    {
        $this->name = $name;
        return $this;
    }

    protected function action($action)
    {
        $this->action = $action;
        return $this;
    }

    public function prefix($prefix)
    {
        $this->prefix = $prefix;
        return $this;
    }

    protected function parameters($parameters)
    {
        $this->parameters = $parameters;
        return $this;
    }

    public function regexpURL($regexpURL)
    {
        $this->regexpURL = $regexpURL;
    }

    protected function uri($uri)
    {
        $this->uri = $uri;
        return $this;
    }

    public function query($query)
    {
        $this->query = $query;
    }
    public function namespace($namespace)
    {
        $this->namespace = $namespace;
    }
    
}
