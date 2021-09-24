<?php

namespace App\FormRequest;

use Core\FormRequest\Form;
use App\Rules\Min;
use Core\FormRequest\IForm;

class TrafficFormRequest extends Form 
{
    public function __construct()
    {
        parent::__construct();
        if (!$this->handle())
        {
            return $this->returnErrors();
        }
    }
    
    public function handle(): bool
    {
        $validate = $this->request->validation->setRules([
            'identity' => ["required", "number", "tck_no"],
            "plaque" => ["required", "number", new Min(1)],
            'jobs' => "number",
            'plateNo' => "plate_number",
            'phoneNumber' => "required",
            'contract1' => 'accepted',
            'contract2' => 'accepted',
        ]);

        if (($errors = $validate->make()) !== true) {
            $this->errors = $errors;
            return false;
        }

        return true;
    }
}