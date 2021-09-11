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
     * Yüklenecek olan denetleyicilerin alan adı. Kaynağı 
     * \ahmetbarut\Router\Router $namespace dayanmakatadır
     *
     * @var string
     * @source \ahmetbarut\Router\Router $namespace
     */
    private $namespace;

    /**
     * Yükleneck olan denetleyici adı
     *
     * @var string
     */
    private $controller;

    /**
     * Yüklenmesi istenen yöntemin adını içerir
     *
     * @var string
     */
    private $method;

    /**
     * Yüklenmesi istenen yöntemin varsa parametreleri
     *
     * @var array
     */
    private $arguments;

    /**
     * \ahmetbarut\Reflection\Method yükleyicisidir.
     * Sınıf objesi oluşturulunca denetleyicilerin alan adı,
     * ilgili denetleyici ve yöntemi ("controller@method") ve varsa parametreleri gönderir.
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
     * Denetleyiciyi yükler ve yöntemi çağırır.
     *
     * @param array|null $parameters
     * @return mixed
     */
    public function getMethod($parameters)
    {
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
     * Sözdizimi "controllerName@method" şeklinde olanı çözümler
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
     * Yüklenecek olan denetleyicinin alan adını ekler.
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
     * Gelen parametrelerin eklenmesini sağlar
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
