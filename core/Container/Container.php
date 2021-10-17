<?php
 
namespace Core\Container;

use ahmetbarut\PhpRouter\Exception\NotRouteFound;
use Closure;
use Psr\Container\ContainerInterface;

/**
 * @author Ahmet Barut <iletisim@ahmetbarut.net>
 */
class Container implements ContainerInterface 
{

    /**
     * It holds the entered classes.
     *
     * @var array
     */
    protected array $entries = [];

    /**
     * Holds the resolved classes.
     * @var array
     */
    public static array $resolved = [];

    public function __construct()
    {
        static::$resolved["container"] = $this;
    }

    /**
     * Returns the requested class from the container.
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
     * Checks the instance of the class specified in the container.
     *
     * @param string $id
     * @return boolean
     */
    public function has(string $id): bool
    {
        return isset($this->entries[$id]);
    }

    /**
     * Adds new class instance to container.
     *
     * @param string $abstract
     * @param null $concrete
     * @return static
     */
    public function set(string $abstract, $concrete = null): static
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
     * @throws NotRouteFound
     */
    public static function instance(string $key)
    {
        return (new self)->get($key);
    }
}