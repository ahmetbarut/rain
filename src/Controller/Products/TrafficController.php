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
        dd($request, $_SERVER);
        /* dd($request);
        $validate = $request->validation->setRules([
            'identity' => ["required","number","tck_no"],
            "plaque" => ["required", "number", new Min(1)],
            'jobs' => "number",
            'plateNo' => "plate_number",
            'phoneNumber' => "required",
            'contract1' => 'accepted',
            'contract2' => 'accepted',
        ]);
        if(true !== $validate->make())
        {
            $messageBag = [];
            foreach ($validate->make() as $rule => $message) {
                array_push($messageBag,['rule' => $rule, 'message' => current($message)]);
            }
            return (new Response())->json([
                "status" => false,
                "errors" => $messageBag
            ], 422);
        } */
        return (new Response())->json(['status' => true]);
    }

    public function offerView(TrafficFormRequest $request)
    {
        dd($request);  
    }
}
