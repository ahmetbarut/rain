<?php

namespace Core\Response;

class Response
{
    public array $data;

    public function __construct(array $data = [])
    {
        $this->data = $data;
    }

    public function json(array $data, int $code = 200)
    {
        http_response_code($code);
        echo json_encode($data);
    }
}
