<?php

namespace Core;

use Core\Services\Base;
use Symfony\Component\Finder\Finder;

class App
{
    private array $resolvedServices = [];

    /**
     * Router.php dosyasını, yapılandırmasını yükler ve yürütür.
     * Artık istekleri almaya hazır hale getirir.
     *
     * @return void
     * @throws \ahmetbarut\PhpRouter\Exception\NotRouteFound
     */
    public function loadRouter()
    {

        if (file_exists(dirname(__DIR__) . '/config/router.php')) {
            include dirname(__DIR__) . "/config/router.php";

            $router = include config('router.path') . '/route.php';
            
            $router();
        } else {
            throw new \Exception('config/route.php not found');
        }
    }

    public function run()
    {

    }

    public function loadServices ()
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
            (new $service)->handle();
        }
    }
}
