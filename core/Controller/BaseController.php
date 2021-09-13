<?php

namespace Core\Controller;

use Core\View\Render;

class BaseController extends Render{

    protected $app;

    protected $routes;

    public function __construct($app = null, $routes = null) 
    {
        $this->app = $app;
        $this->routes = $routes;
    }
    
    public function view($view, $data = null)
    {
        $this->render($view, $data);
    }
}