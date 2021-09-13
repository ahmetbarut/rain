<?php

declare(strict_types=1);

namespace ahmetbarut\PhpRouter\Reflection;

use ahmetbarut\PhpRouter\Helper\Arr;
use ErrorException;
use Exception;
use ReflectionMethod;

class Method
{
    /**
     * The domain name of the controllers to be loaded. Its source is \ahmetbarut\Router\Router $namespace.
     *
     * @var string
     * @source \ahmetbarut\Router\Router $namespace
     */
    private $namespace;

    /**
     * Name of the controller to be loaded.
     *
     * @var string
     */
    private $controller;

    /**
     * Contains the name of the method requested to be loaded.
     *
     * @var string
     */
    private $method;

    /**
     * It contains the parameters of the method to be loaded, if any.
     *
     * @var array
     */
    private $arguments;

    /**
     * \ahmetbarut\Reflection\Method is the installer.
     * The field name of the controllers when the class object is created,
     * sends the corresponding controller and method ("controller@method") and parameters, if any.
     *
     * @param string     $namespace
     * @param string     $action
     * @param array|null $methodParameters
     *
     * @throws ErrorException
     */
    public function __construct(string $namespace, string $action, ?array $methodParameters)
    {
        $this->namespace($namespace)->resolve($action)->getMethod($methodParameters);
    }

    /**
     * Loads the controller and calls the method.
     *
     * @param array|null $parameters
     * @return mixed
     */
    public function getMethod($parameters)
    {
        // Burda \ReflectionMethod çağrılıyor, ilgili sınıf ve yöntem atanıyor.
        $reflectionMethod = new ReflectionMethod($this->controller, $this->method);

        $this->setParameters($reflectionMethod->getParameters());
        
        try {
            $injection = new Injection($reflectionMethod, $parameters);
            $merged = array_merge($injection->injection, $parameters);

            $reflectionMethod->invokeArgs(new $this->controller, $merged);
        } catch (Exception $th) {

            echo $th->getMessage();

            exit(0);
        }
    }

    /**
     * Resolves syntax "controllerName@method".
     *
     * @param string $controller
     * @return static
     */
    private function resolve($controller)
    {
        $controller = explode('@', $controller);
        $this->method = $controller[1];
        $this->controller = $this->namespace . $controller[0];
        return $this;
    }

    /**
     * Adds the domain name of the controller to be loaded.
     *
     * @param string $namespace
     * @return static
     */
    public function namespace($namespace)
    {
        $this->namespace = $namespace;
        return $this;
    }

    /**
     * Allows adding incoming parameters.
     *
     * @param array $parameters
     * @return void
     */
    public function setParameters(array $parameters)
    {
        foreach ($parameters as $key => $parameter) {
            $this->arguments[$key] = $parameter->name;
        }
    }
}
