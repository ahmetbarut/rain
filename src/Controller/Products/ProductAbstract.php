<?php

namespace App\Controller\Products;

use App\Rules\Min;
use Core\Controller\BaseController;
use Core\Curl\Client;
use Core\FormRequest\Form;
use Core\FormRequest\IForm;
use Core\Http\Request;

abstract class ProductAbstract extends BaseController
{
    abstract public function validate(Form $request, Client $client);

    abstract public function offerView(Request $request);
}