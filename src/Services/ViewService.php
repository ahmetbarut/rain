<?php

namespace App\Services;

use ahmetbarut\PhpRouter\Exception\NotRouteFound;
use ahmetbarut\View\Render;
use Core\Services\Base;

class ViewService extends Base
{
    /**
     * The registration method registers the services.
     * @return void
     * @throws NotRouteFound
     */
    public function register(): void
    {
        $this->set('view', new \ahmetbarut\View\Render([
            'view' => view_path(),
            'cache' => var_path('view')
        ]));
    }
    /**
     * Handle management also enables users to benefit from the services requested to be used here.
     * @return void
     */
    public function handle(): void
    {
    }
}