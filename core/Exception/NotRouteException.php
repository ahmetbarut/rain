<?php

namespace Core\Exception;

use Core\Controller;
use Exception;

class NotRouteException extends Exception
{
    protected $code;
    protected $message;

    public function __construct($message, $code, $uri = null)
    {
        $this->code = $code;
        $this->message = $message;
        
        return (new Controller)->error($this->message,  $this->code, $this->getFile(),  $this->getLine(),$uri);
   
    }
}
