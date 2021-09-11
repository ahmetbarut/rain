<?php

namespace Config;

class App
{
    public function __construct()
    {
        include __DIR__ . "/view.php";

        $this->loadRouter();
    }

    private function loadRouter(){
        
        if (file_exists(dirname(__DIR__) . "/router/router.php")) {
            include __DIR__ . "/router.php" ;           
        }

        include dirname(__DIR__) . "/router/router.php";

        $router->run();
    }
    
}
