<?php

namespace App\Controller;

use ahmetbarut\PhpRouter\Request\Request;
use Core\Controller\BaseController;
use Core\Curl\Client;
use Core\Response\Response;

class ServicesController extends BaseController
{
    public function slider(Client $client, Response $response)
    {
        $slider = $client->get("/common/slider/list", ["lang" => "tr", "src" => 2]);

        // header('Content-Type: application/json');

        if ($slider->s === 1) {
            echo $response->json($slider->d);
            return;
        }
    }


    public function blog(Client $client, Response $response): void
    {
        if ($client->get("/common/blog/latest", ["lang" => "tr", "src" => 3])->s === 1) {
            // dd($client->get("/common/blog/latest", ["lang" => "tr", "src" => 3])->d);
            echo $response->json($client->get("/common/blog/latest", ["lang" => "tr", "src" => 3])->d);
        }
    }
}
