<?php

namespace App\FormRequest;

use Core\FormRequest\Form;
use App\Rules\Min;
use Core\FormRequest\IForm;

class FormRequest extends Form
{
    public function __construct()
    {
        parent::__construct();
        if (false === $this->handle())
        {
            $this->returnErrors();
            exit;
        }
    }
    
    public function handle(): bool
    {
        return true;
    }
}
