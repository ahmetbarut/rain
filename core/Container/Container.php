<?php
 
namespace Core\Container;

use ahmetbarut\PhpRouter\Exception\NotRouteFound;
use Psr\Container\ContainerInterface;

class Container implements ContainerInterface 
{
    protected array $entries = [];

    public static $resolved = [];

    public function __construct()
    {
        static::$resolved["container"] = $this;
    }

    /**
     * @throws NotRouteFound
     */
    public function get(string $id)
    {
        if (!isset(static::$resolved[$id])) {
            throw new NotRouteFound(sprintf("Not found container [%s]", $id));
        }
        if (isset(static::$resolved[$id])) {
            return static::$resolved[$id];
        }

        $callback = $this->entries[$id] = $id;
        if ($callback instanceof \Closure) {
            $callback = $callback($this);
        }
        static::$resolved[$id] = $callback;
        return $callback;
    }

    public function has(string $id): bool
    {
        return isset($this->entries[$id]);
    }

    public function set($abstract, $concrete = null): static
    {
        if(null === $concrete){
            $concrete = $abstract;
        }
        static::$resolved[$abstract] = $concrete;
        return $this;
    }

    public function getReflector($id)
    {
        try {
            $reflection = new \ReflectionClass($this->entries[$id]);
        }catch (\ReflectionException $th)
        {
            die(sprintf("%s %s %s", $th->getMessage(), $th->getLine(), $th->getFile()));
        }

        return $reflection;
    }
}