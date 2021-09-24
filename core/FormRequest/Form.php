<?php

namespace Core\FormRequest;

use Core\Http\Request;
use Core\Response\Response;

abstract class Form extends Request implements IForm
{
    protected Request $request;

    protected array $errors;

    public function __construct()
    {
        $this->request = new Request;
    }

    abstract public function handle(): bool;

    public function returnErrors()
    {
        if ($this->request->ajax()) {
            $messageBag = [];
            foreach ($this->errors as $rule => $message) {
                array_push($messageBag, ['rule' => $rule, 'message' => current($message)]);
            }
            return (new Response())->json([
                "status" => false,
                "errors" => $messageBag
            ], 422);
        }

        $this->returnWithRedirect();
    }

    public function returnWithRedirect()
    {
        return (new Response())->redirect();
    }
}
