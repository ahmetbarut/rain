<?php

namespace Core;


class App
{
    public function __construct()
    {
    }

    public function loadRouter(){
        
        if (file_exists(dirname(__DIR__) . "/router/router.php")) {
            include dirname(__DIR__) . "/config/router.php" ;           
            include dirname(__DIR__) . "/router/router.php" ;           
        }

        include dirname(__DIR__) . "/router/router.php";

        $router->run();
    }

}
