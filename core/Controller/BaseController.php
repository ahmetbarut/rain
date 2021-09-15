<?php

namespace Core\Controller;

use Core\View\Render;

class BaseController extends Render
{

    /**
     * Görünüm döndürür.
     * @param string $view
     * @param array $data
     * @return void
     */
    public function view(string $view, array $data = null)
    {
        $this->render($view, $data);
    }
}
