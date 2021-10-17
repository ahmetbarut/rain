<?php

namespace App\Services;

use Core\Services\Base;

class TestService extends Base
{

    public function handle(): void
    {
        $this->set('view', new \ahmetbarut\View\Render([
            'view' => view_path(),
            'cache' => var_path('view')
        ]));
    }
}