<?php

namespace Core\Controller;

use Core\View\Render;

class BaseController extends Render
{

    /**
     * Görünüm döndürür.
     *
     * @param  string  $view
     * @param  array|null  $data
     *
     * @return Render
     */
    public function view(string $view, array $data = null): Render
    {
        return $this->render($view, $data);
    }
}
