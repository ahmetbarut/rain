<?php

namespace App\Services;

use ahmetbarut\PhpRouter\Exception\NotRouteFound;
use Core\Services\Base;
use ahmetbarut\PhpRouter\Router\Router;
use Exception;

class RouterService extends Base
{
   /**
    * The registration method registers the services.
    * @return void
    */
    public function register(): void
    {
        $this->set("router", new Router([
            "namespace" => "App\\Controller\\",
            "debug" => true,
        ]));
    }

    /**
     * Handle management also enables users to benefit from the services requested to be used here.
     * @return void
     * @throws NotRouteFound
     * @throws Exception
     */
    public function handle(): void
    {
        if (file_exists(root_path('config/router.php'))) {
            include root_path("config/router.php");

            $router = include config('router.path') . '/route.php';
            $router();
        } else {
            throw new Exception('config/route.php not found');
        }
    }
}