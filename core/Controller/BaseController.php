<?php

namespace Core\Controller;

use Mudita\View\Engine;

class BaseController
{

    /**
     * Görünüm döndürür.
     *
     * @param string $view
     * @param array|null $data
     * @return Engine
     */
    public function view(string $view, array $data = null): Engine
    {
        return app('view')->load($view, $data);
    }
}
