<?php

namespace Core\Services;

use Core\Container\Container;

abstract class Base extends Container
{
    /**
     * Stored service name.
     * @var string $serviceName
     */
    protected ?string $serviceName = null;

    public function __construct()
    {
        $this->setServiceName(get_class($this));
    }

    abstract public function register(): void;

    abstract public function handle(): void;

    /**
     * @param string $serviceName
     */
    private function setServiceName(string $serviceName): void
    {
        if ($this->serviceName === null)
        {
            $this->serviceName = $serviceName;
        }
    }

    /**
     * @return string
     */
    public function getServiceName(): string
    {
        return $this->serviceName;
    }

}