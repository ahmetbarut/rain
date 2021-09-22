<?php
 
namespace Core\Container;

use ahmetbarut\PhpRouter\Exception\NotRouteFound;
use Closure;
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
        if (is_callable($callback)) {
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
     * Return resolved container.
     *
     * @param string $key
     * @return self
     */
    public static function instance(string $key)
    {
        return (new self)->get($key);
    }
}