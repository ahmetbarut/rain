<?php

namespace Core\FormRequest;

use Core\Http\Request;
use Core\Response\Response;

abstract class Form extends Request implements IForm
{
    protected Request $request;

    protected array $errors;

    protected array $messageBag = [];

    public function __construct()
    {
        $this->request = new Request;
    }

    abstract public function handle(): bool;

    public function returnErrors()
    {
        foreach ($this->errors as $rule => $message) {
            array_push($this->messageBag, ['rule' => $rule, 'message' => current($message)]);
        }
        if ($this->request->ajax()) {
            return (new Response())->json([
                "status" => false,
                "errors" => $this->messageBag
            ], 422);
        }

        $this->returnWithRedirect();
    }

    public function returnWithRedirect()
    {
        (new Response())->with('errors', $this->messageBag)->redirect();
    }
}
