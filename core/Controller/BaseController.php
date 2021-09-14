<?php

namespace Core\Controller;

use ahmetbarut\PhpRouter\Request\Request;
use ahmetbarut\PhpRouter\Router\Router;
use Core\View\Render;

class BaseController extends Render{

    public function view($view, $data = null)
    {
        $this->render($view, $data);
    }
}