<?php

declare(strict_types=1);

namespace ahmetbarut\PhpRouter\Router;

use ahmetbarut\PhpRouter\{
    Exception\NotRouteFound,
    Reflection\Method,
    Request\Request
};
use Closure;

class Router
{

    /**
     * All route parameters are store.
     *
     * @var \ahmetbarut\PhpRouter\Router\Route
     */
    protected $route;

    /**
     * Kullanılan tüm rotaları depolar.
     *
     * @var array
     */
    protected $router = [];

    /**
     *
     * @var Request
     */
    protected $request;
    /**
     * İsimlendirilen rotaları depolar.
     *
     * @var static array
     */
    public static $nameList = [];

    /**
     * Geçici url'i depolar
     *
     * @var string
     */
    protected $path;

    /**
     * Kullanıcıya gösterilecek hata mesajları sayfaların dizini.
     *
     * @var string
     */
    public static $error = null;

    /**
     * Controller dizini
     *
     * @var string
     */
    protected $namespace = "test\\";

    /**
     * Hata ayıklama modunu açar/kapatır.
     *
     * @var boolean
     */
    public static $debugMode = true;

    protected $group = [];

    protected $prefix = [];

    public function __construct($options = [])
    {
        $this->route = new Route;

        $this->request = new Request;

        if (!empty($options)) {
            if (array_key_exists('namespace', $options)) {
                $this->namespace = $options['namespace'];
            }
            if (array_key_exists('error', $options)) {
                static::$error = $options['error'];
            }
            if (array_key_exists('debug', $options)) {
                static::$debugMode = $options['debug'];
            }
        }
    }

    /**
     * HTTP get yönteminde kullanılır
     *
     * @param string $uri
     * @param array|Closure $callback
     * @return static
     */
    public function get($uri,  string|Closure $callback, $name = null)
    {
        $this->addHandler("GET", $uri, $callback);
        $this->path = $uri;

        return $this;
    }

    public function name($name)
    {
        $this->route->name($name);
        static::$nameList[$name] = clone $this->route;
        return $this;
    }

    /**
     * HTTP POST yönteminde kullanılır
     *
     * @param string $uri
     * @param array|Closure $callback
     * @return static
     */
    public function post($uri, string|Closure $callback)
    {
        $this->addHandler("POST", $uri, $callback);
        $this->path = $uri;

        return $this;
    }

    /**
     * HTTP DELETE yönteminde kullanılır
     *
     * @param string $uri
     * @param string|Closure $callback
     * @return static
     */
    public function delete($uri, string|Closure $callback)
    {
        $this->addHandler("DELETE", $uri, $callback);
        $this->path = $uri;
        
        return $this;

    }

    /**
     * HTTP PUT yönteminde kullanılır
     *
     * @param string $uri
     * @param array|Closure $callback
     * @return static
     */
    public function put($uri, string|Closure $callback)
    {
        $this->addHandler("PUT", $uri, $callback);
        $this->path = $uri;

        return $this;

    }

    /**
     * HTTP PATCH yönteminde kullanılır
     *
     * @param string $uri
     * @param array|Closure $callback
     * @return static
     */
    public function pacth($uri, array|Closure $callback)
    {
        $this->addHandler("PATCH", $uri, $callback);
        $this->path = $uri;

        return $this;
    }

    /**
     * Verilen rotaları ekler
     *
     * @param string $method
     * @param string $path
     * @param array|Closure $callback
     * @return static
     */
    private function addHandler($method, $path, $callback)
    {

        $this->router[$method][rtrim($path, "/") == "" ? "/" : rtrim($path, "/")]
            = clone $this->route->addRoute($path, $callback, $this->namespace);
    }

    /**
     * Runs Router.
     * @return \ahmetbarut\PhpRouter\Reflection\Method
     */
    public function run()
    {
        if (!in_array($this->request->method, array_keys($this->router))) {
            http_response_code(405);

            header("Method not allowed HTTP/1.1", response_code: 405);
            exit;
        }
        // Invokes the corresponding routes based on the incoming HTTP request.
        foreach ($this->router[Request::method()] as $callback) {
            $parameters = [];

            if (false !== strpos(Request::uri(), '?')) {
                $callback->query = strstr(Request::uri(), '?');
            }

            // Tries to match the route with the prepared regular expression.
            if (preg_match("@" . $callback->regexpURL . "$@", $this->request->url, $parameters)) {

                // Since the first parameter is the entire url, it has to delete the first value.
                array_shift($parameters);

                // Prepares and returns the parameters defined in the route for the defined variables.
                // For example: the route is defined as /home/:user, it takes it as "user" and saves it.
                $routeParameters = rm_first_letter($callback->parameters);

                // Combines the parameters of the method and the route.
                $methodParameters = array_combine($routeParameters, $parameters);

                // $callback if it's an array so this is controller and method
                // takes action accordingly.
                if (is_string($callback->action)) {
                    return new Method($this->namespace, $callback->action, $methodParameters);
                } else {
                    return call_user_func_array($callback->action, $methodParameters);
                }
            }
        }
        throw new NotRouteFound(sprintf("%s not found", $this->request->url), 404);
    }


    /**
     * Get route with name.
     *
     * @param string $name
     * @return false|string
     */
    public static function routes(string $name)
    {
        if (array_key_exists($name, (array) static::$nameList)) {
            return static::$nameList[$name];
        }
        return false;
    }
}
