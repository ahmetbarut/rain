<?php

namespace App\Services;

use Core\Services\Base;

class AppService extends Base
{
   /**
    * The registration method registers the services.
    * @return void
    */
    public function register(): void
    {
        $this->set("app", new \Core\App());
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