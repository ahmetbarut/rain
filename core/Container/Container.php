<?php
 
namespace Core\Container;

use ahmetbarut\PhpRouter\Exception\NotRouteFound;
use Psr\Container\ContainerInterface;

class Container implements ContainerInterface 
{

    /**
     * Girişi yapılan sınıfları tutar.
     *
     * @var array
     */
    protected array $entries = [];

    /**
     * Çözümlenen sınıfları tutar.
     *
     * @var array
     */
    public static $resolved = [];

    public function __construct()
    {
        static::$resolved["container"] = $this;
    }

    /**
     * Kapsayıcıdan istenen sınıfı döndürür.
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

    /**
     * Kapsayıcıda belirtilen sınıfın örneğini kontrol eder.
     *
     * @param string $id
     * @return boolean
     */
    public function has(string $id): bool
    {
        return isset($this->entries[$id]);
    }

    /**
     * Kapsayıcıya yeni sınıf örneğini ekler.
     *
     * @param string $abstract
     * @param string $concrete
     * @return static
     */
    public function set($abstract, $concrete = null): static
    {
        if(null === $concrete){
            $concrete = $abstract;
        }
        static::$resolved[$abstract] = $concrete;
        return $this;
    }

    /**
     * Belirtilen sınıfın yansımasını getirir.
     *
     * @param string $id
     * @return \ReflectionClass $reflection
     */
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

    public static function __callStatic($name, $arguments)
    {
        if("instance" === $name)
        {
            return (new static)->get(current($arguments));
        }
    }
}