<?php

namespace ahmetbarut\PhpRouter\Router;

use ahmetbarut\PhpRouter\Request\Request;

class Route
{
    /**
     * Holds the name given to the route.
     *
     * @var string
     */
    public $name;

    /**
     * Controller or \Closure to run specified for the route.
     *
     * @var Closure|string
     */
    public $action;

    /**
     * The way of the route.
     *
     * @var string
     */
    public $uri;

    /**
     * The prefix of the route.
     *
     * @var string
     */
    public $prefix;

    /**
     * Holds the edited expression of the route.
     *
     * @var string
     */
    public $regexpURL;

    /**
     * Search your route (if any).
     *
     * @var void
     */
    public $middleware;

    /**
     * Specific for the route (if any).
     *
     * @var array
     */
    public $parameters;

    /**
     * Form-data is accepted when requested.
     *
     * @var string
     */
    public $query;

    /**
     * The domain name of the route.
     *
     * @var string
     */
    public $namespace;

    /**
     * Saves the route.
     *
     * @param string $path Rotanın yolu. Örn:/abc
     * @param \Closure|string $callback 
     * @param string $namespace
     * @return static
     */
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

    /**
     * Supplements to the route.
     *
     * @param string $name
     * @return void
     */
    public function name(string $name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * It will add \Closure or references where the route will work.
     *
     * @param \Closure|string $action
     * @return static
     */
    protected function action($action)
    {
        $this->action = $action;
        return $this;
    }

    /**
     * Those who add the prefix of the route.
     *
     * @param string $prefix
     * @return static
     */
    public function prefix(string $prefix)
    {
        $this->prefix = $prefix;
        return $this;
    }

    /**
     * Additional tracks given to the route.
     *
     * @param array $parameters
     * @return static
     */
    protected function parameters(array $parameters)
    {
        $this->parameters = $parameters;
        return $this;
    }

    /**
     * Those who added the edited expressions.
     *
     * @param string $regexpURL
     * @return static
     */
    public function regexpURL(string $regexpURL)
    {
        $this->regexpURL = $regexpURL;
        return $this;
    }

    /**
     * On the route of the route.
     *
     * @param string $uri
     * @return static
     */
    protected function uri(string $uri)
    {
        $this->uri = $uri;
        return $this;
    }

    /**
     * They wear form-data to the route.
     *
     * @param string $query
     * @return static
     */
    public function query(string $query)
    {
        $this->query = $query;
        return $this;
    }

    /**
     * Those who add the prefix of the route.
     *
     * @param string $namespace
     * @return static
     */
    public function namespace(string $namespace)
    {
        $this->namespace = $namespace;
        return $this;
    }
    
}
