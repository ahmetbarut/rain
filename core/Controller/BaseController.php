<?php

namespace Core\Controller;

use Core\View\Render;

class BaseController extends Render{

    public function view($view, $data = null)
    {
        $this->render($view, $data);
    }
}