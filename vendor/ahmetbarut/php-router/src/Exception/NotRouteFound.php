<?php 

namespace ahmetbarut\PhpRouter\Exception;

use ahmetbarut\PhpRouter\Errors\ErrorLoader;
use ahmetbarut\PhpRouter\Router\Router;
use Exception;

class NotRouteFound extends Exception
{    
    public function __construct($message, $code = 500)
    {
        http_response_code($code);
        
        parent::__construct($message, $code);
    }
}