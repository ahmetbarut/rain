<?php

namespace Core\Response;

use Core\Http\Request;

class Response
{
    public array $data;

    public function __construct(array $data = [])
    {
    }

     public function json(array $data, int $code = 200): static
     {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data);
        return $this;
    }

    public function with($name, $data): static
    {
        session()->flash($name, $data);
        return $this;
    }

    public function redirect(string $to = "", $code = 301): static
    {
        http_response_code($code);

        header(sprintf("Location: %s/%s", (new Request)->referer(), $to));

        return $this;
    }
}
