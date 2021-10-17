<?php

namespace Core;

use Core\Services\Base;
use Symfony\Component\Finder\Finder;

class App
{
    private array $resolvedServices = [];

    public function run()
    {
        $this->loadServices();
    }

    private function loadServices ()
    {
        $finder = new Finder();

        $namespace = 'App';

        $finder->files()->in(app_path('Services'));
        foreach ($finder as $item) {
           $service = $namespace.str_replace(['/','.php'], ['\\', ''], after($item->getRealPath(), 'src'));

           $this->instanceServices($service);

        }

    }

    private function instanceServices($service): void
    {
        if (is_subclass_of($service, Base::class))
        {
            $service = new $service;
            $service->register();
            $service->handle();
        }
    }
}
