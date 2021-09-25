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
    public function validate(TrafficFormRequest $request, Client $client): void
    {
        //
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

        return $this->view('OfferPage/off_traffic');
    }
}
