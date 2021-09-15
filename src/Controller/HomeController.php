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

        $settings = $client->get("/common/general/generals", ["lang" => "tr"])->d;
      
        return $this->view('index', [
            "menus" => $client->post("/common/set/menus", [
                "pos" => 1,
                "lang" => "tr"
            ]),
            "products" => $client->get("/common/products/list", [
                "src" => 1,
                "lang" => "tr"
            ])->d,
            "settings" => $settings,
            "partners" => $client->get("/common/partners/list", ["lang" => "tr"]),
            "whyus_data" => $client->get("/common/whyus/get", ["lang" => "tr"]),
            "analytics" => json_decode($settings['third_services']),
            'corporates' => $client->get("/common/cooperate/list", ["lang" => "tr"]),
        ]);
    }
}
