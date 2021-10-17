<?php

namespace App\Services;

use ahmetbarut\PhpRouter\Exception\NotRouteFound;
use Core\Services\Base;

class TranslationService extends Base
{
    /**
     * The registration method registers the services.
     * @return void
     * @throws NotRouteFound
     */
    public function register(): void
    {
        $this->set("translation",
            new \ahmetbarut\Translation\Translation(
                config(
                    "translation.path",
                    config("translation.format")
                )
            ));
    }

    /**
     * Handle management also enables users to benefit from the services requested to be used here.
     * @return void
     * @throws NotRouteFound
     */
    public function handle(): void
    {
        app("translation")->setLocale("tr");
    }
}