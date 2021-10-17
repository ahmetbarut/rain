<?php

namespace App\Services;

use Core\Services\Base;

class ValidationService extends Base
{
    /**
     * The registration method registers the services.
     * @return void
     * @throws \ahmetbarut\PhpRouter\Exception\NotRouteFound
     */
    public function register(): void
    {
        $this->set('validation', new \ahmetbarut\Validation\Validate(config('validation.rules')));
    }
    /**
     * Handle management also enables users to benefit from the services requested to be used here.
     * @return void
     */
    public function handle(): void
    {
        //
    }
}