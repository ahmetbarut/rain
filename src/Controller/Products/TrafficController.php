<?php

namespace App\Controller\Products;

use App\FormRequest\TrafficFormRequest;
use App\Rules\Min;
use Core\Controller\BaseController;
use Core\Curl\Client;
use Core\Http\Request;
use Core\Response\Response;

class TrafficController extends BaseController
{
    /**
     * Undocumented function
     *
     * @param Request $request
     * @param Client $client
     * @return Response
     */
    public function validate(TrafficFormRequest $request, Client $client): Response
    {

        return (new Response())->json([
            'status' => true,
        ]);
    }

    public function offerView(TrafficFormRequest $request, Client $client)
    {
        $product = $client->get("/common/products/detail", ["lang" =>"tr", "slug" => "trafik", "src" => 3]);

        $response = $client->post("/common/client/search", [
            'restype' => '1',
            'identity_type' => 1,
            'identity' => $request->post['identity'],
            'nationality' => 'TUR',
            'src' => 2]);

        return $this->view('OfferPage/off_traffic', [
            'products' => $product,
            'response' => $response,
            'slug' => 'trafik',
            'jobs' => $client->get("/common/jobs", ["lang" => "tr"]),
            "user_data" => $request->input(),
            "plaque_number" => $request->input('plateNo'),
            "cities" => $client->get("/common/city"),
            "usageTypes" => $client->get("/common/vehicle/usagetype", ["lang" => "tr", "src" => 2]),
        ]);
    }
}
