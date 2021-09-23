<?php

namespace Core\Response;

use Core\Http\Request;

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
        exit;
    }

    public function redirect(string $to = "", $code = 302)
    {
        http_response_code($code);

        header(sprintf("Location: %s/%s", (new Request)->referer(), $to));
        
        exit;
    }
}
