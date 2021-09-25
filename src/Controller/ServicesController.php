<?php

namespace App\Controller;

use ahmetbarut\PhpRouter\Request\Request;
use Core\Controller\BaseController;
use Core\Curl\Client;
use Core\Response\Response;

class ServicesController extends BaseController
{
    public function slider(Client $client, Response $response): \Core\Response\Response
    {
        $slider = $client->get("/common/slider/list", ["lang" => "tr", "src" => 2]);

        if ($slider->s === 1) {
            return $response->json($slider->d);
        }
        return $response->json([
            "status" => false,
            "message" => "İçerik bulunamadı."
        ], 404);
    }


    public function blog(Client $client, Response $response): Response
    {
        $data = $client->get("/common/blog/latest", ["lang" => "tr", "src" => 3]);
        if ($data->s === 1) {
            return $response->json($data->d);
        }

        return $response->json([
            "status" => false,
            "message" => "İçerik bulunamadı."
        ], 404);
    }

    public function jobs(Client $client, Response $response): Response
    {
        return $response->json(
            [
                "data" => $client->get("/common/jobs", ["lang" => "tr", "src" => 4])->d,
                "key" => __("all.jobs_select")
            ]
        );
    }

    public function city(Client $client, Response $response): Response
    {
        return $response->json([
            "data" => array_reverse($client->get("/common/city")->d),
            "key" => __("all.select_plaque")
        ]);
    }
}
