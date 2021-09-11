<?php

declare(strict_types=1);

namespace ahmetbarut\PhpRouter\Reflection;

use ReflectionFunctionAbstract;
use ReflectionType;

class Injection
{
    private $parameters = [];

    private $requesParameters = [];

    public $injection = [];

    public function __construct(ReflectionFunctionAbstract $reflectionFunctionAbstract, $requesParameters = [])
    {
        $this->setParameters($reflectionFunctionAbstract);
        $this->requesParameters = $requesParameters;
        $this->callClass();
    }

    private function setParameters(ReflectionFunctionAbstract $reflectionFunctionAbstract)
    {
        foreach ($reflectionFunctionAbstract->getParameters() as $parameters) {
            if ($parameters->getType()->isBuiltin() === false) {
                $this->parameters[$parameters->getName()] = $parameters->getType()->getName();
            }
        }
        unset($customClass);
    }

    public function getParameters()
    {
        return $this->parameters;
    }

    private function callClass()
    {
        foreach ($this->parameters as $key => $parameter) {
            $this->injection[$key] = new $parameter;
        }
    }
}
