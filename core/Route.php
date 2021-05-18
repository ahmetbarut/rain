<?php

namespace Core;

use Closure;
use Core\Exception\NotRouteException;
use Exception;

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

    protected array $langs = [];
    
    /**
     * Rotaların dizisi
     * @var array $routes
     */
    protected array $routes = [];

    protected Request $request;

    public function __construct()
    {
        $this->request = new Request;
    }

    public function set($uri, $callback, $method)
    {
        $uri = str_replace(array_keys($this->match), array_values($this->match), $uri);
        if (preg_match("@" . $uri . "@", $this->request->requestUri(), $params)) {
            if ($this->request->getMethod() !== $method) {
                throw new NotRouteException("Sadece {$method} Yöntemini Kabul Eder", 404);
            }
            $uri = $params[0];
            unset($params[0]);
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

    public function run()
    {
        if (array_key_exists($this->request->getMethod(), $this->routes) && array_key_exists($this->request->requestUri(), $this->routes[$this->request->getMethod()])) {
            $callback = $this->routes[$this->request->getMethod()][$this->request->requestUri()];
            if (is_callable($callback['controller'])) {
                return call_user_func_array($callback['controller'], $callback['params']);
            } else {
                $params = $callback["params"];
                $controller = new $callback["controller"]();
                $method = $callback["method"];
                return call_user_func_array([$controller, $method], $params);
            }
        } else {
            throw new NotRouteException('Rota Tanımlı Değil.', 404, $this->request->requestUri());
        }
    }
}
