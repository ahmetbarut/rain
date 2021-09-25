<?php

namespace App\Controller\Products;

use App\FormRequest\TrafficFormRequest;
use App\Rules\Min;
use Core\Curl\Client;
use Core\Http\Request;
use Core\Response\Response;

class TrafficController
{
    /**
     * Undocumented function
     *
     * @param Request $request
     * @param Client $client
     * @return Response
     */
    public function validate(TrafficFormRequest $request, Client $client)
    {
        return (new Response())->json(['status' => true]);
    }

    public function offerView(TrafficFormRequest $request)
    {
        return (new Response())->json($request->post, 200);
    }
}
