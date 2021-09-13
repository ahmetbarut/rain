<?php

declare(strict_types=1);

namespace ahmetbarut\PhpRouter\Reflection;

use ReflectionFunctionAbstract;
use ReflectionType;

class Injection
{
    /**
     * Contains the parameters to be injected.
     *
     * @var array
     */
    private $parameters = [];


    /**
     * Contains parameters ready to be injected.
     *
     * @var array
     */
    public $injection = [];

    /**
     * Injection class constructor
     *
     * @param ReflectionFunctionAbstract $reflectionFunctionAbstract
     */
    public function __construct(ReflectionFunctionAbstract $reflectionFunctionAbstract)
    {
        $this->setParameters($reflectionFunctionAbstract);
        $this->callClass();
    }

    /**
     * It stores the parameters to be injected.
     *
     * @param ReflectionFunctionAbstract $reflectionFunctionAbstract
     * @return void
     */
    private function setParameters(ReflectionFunctionAbstract $reflectionFunctionAbstract)
    {
        foreach ($reflectionFunctionAbstract->getParameters() as $parameters) {
            if (($parameters->hasType()) && $parameters->getType()->isBuiltin() === false) {
            
                $this->parameters[$parameters->getName()] = $parameters->getType()->getName();
            }
        }
        unset($customClass);
    }

    /**
     * Returns the parameters to be injected.
     *
     * @return void
     */
    public function getParameters()
    {
        return $this->parameters;
    }

    /**
     * Generates and returns the object.
     *
     * @return void
     */
    private function callClass()
    {
        foreach ($this->parameters as $key => $parameter) {
            $this->injection[$key] = new $parameter;
        }
    }
}
