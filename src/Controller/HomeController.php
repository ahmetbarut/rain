<?php

namespace App\Controller;

use ahmetbarut\PhpRouter\Request\Request;
use Core\Container\Container;
use Core\Controller\BaseController;
use Core\Curl\Client;

class HomeController extends BaseController
{
    public function index(Request $request, Client $client)
    {

        return $this->view('index', [
            "products" => $client->get("/common/products/list", [
                "src" => 1,
                "lang" => "tr"
            ])->d,
            
        ]);
    }
}
