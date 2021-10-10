<?php

namespace Core;


class App
{
    /**
     * Router.php dosyasını, yapılandırmasını yükler ve yürütür. 
     * Artık istekleri almaya hazır hale getirir.
     *
     * @return void
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
}
