<?php

namespace Core;

use Core\Exception\NotRouteException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Route
{
    /**
     * Url eşleşme parametreleri
     * @var array $match
     */
    protected array $match = [
        '{id}' => '([0-9]+)',
        '{slug}' => '([a-zA-Z0-9_\.-]+)',
        '{lang}' => '([a-zA-Z]+)',
    ];

    /**
     * Önek rotaları
     * @var array $langs
     */
    protected array $langs = [];

    /**
     * Rotaların dizisi
     * @var array $routes
     */
    protected array $routes = [];

    protected $prefix;

    protected Request $request;

    public function __construct()
    {
        $this->request = Request::createFromGlobals();
    }

    public function set($uri, $callback, $method)
    {
        $method = strtoupper($method);

        // $uri = $this->prefix . str_replace(array_keys($this->match), array_values($this->match), $uri);
        print_r($this->prefix)
        ;
        if (preg_match("@" . $uri . "@", $this->request->getRequestUri(), $params)) {
            if ($this->request->getMethod() !== $method) {
                throw new NotRouteException("Sadece {$method} Yöntemini Kabul Eder", 404);
            }
        
            $uri = $params[0];
            unset($params[0]);
            App::setLocale(prev($params));
            if (is_callable($callback)) {
                $this->routes[$method][$uri] = [
                    "controller" => $callback,
                    "params" => $params
                ];
            } else {
                $this->routes[$method][$uri] = [
                    "controller" => $callback[0],
                    "method" => $callback[1],
                    "params" => $params
                ];
            }
        }
    }

    public function prefix($prefix)
    {
        $this->prefix = str_replace(array_keys([$this->prefix]),array_values($this->match),$prefix);
    }

    public function run()
    {
        if (array_key_exists($this->request->getMethod(), $this->routes) && array_key_exists($this->request->getRequestUri(), $this->routes[$this->request->getMethod()])) {
            $callback = $this->routes[$this->request->getMethod()][$this->request->getRequestUri()];
            if (is_callable($callback['controller'])) {
                return call_user_func_array($callback['controller'], $callback['params']);
            } else {
                $params = $callback["params"];
                $controller = new $callback["controller"]();
                $method = $callback["method"];
                return call_user_func_array([$controller, $method], $params);
            }
        } else {
            throw new NotRouteException('Rota Tanımlı Değil.', 404, $this->request->getRequestUri());
        }
    }
}
