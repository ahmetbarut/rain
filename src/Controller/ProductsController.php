<?php

namespace App\Controller;

use Core\Controller\BaseController;
use Core\Curl\Client;

class ProductsController extends BaseController
{
    public function products(string $urun, Client $client)
    {
        return $this->view('products', [
            'products' => $client->get("/common/products/detail", ["lang" => "tr", "slug" => $urun, "src" => 1]),
        ]);
    }
}