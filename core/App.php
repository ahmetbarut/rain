<?php

namespace Core;

use Core\Controller\BaseController;

class App
{
    public function __construct()
    {
        $this->inject();
        $this->loadRouter();
    }

    private function loadRouter(){
        
        if (file_exists(dirname(__DIR__) . "/router/router.php")) {
            include dirname(__DIR__) . "/config/router.php" ;           
            include dirname(__DIR__) . "/router/router.php" ;           
        }

        include dirname(__DIR__) . "/router/router.php";

        $router->run();
    }

    private function inject()
    {
        $reflection = new \ReflectionClass(BaseController::class);
        $reflection->newInstanceArgs([$_SERVER, $_REQUEST]);
        // dd(, $reflection);
        // $reflection->newInstance($_SERVER, $_REQUEST);
    }

}
