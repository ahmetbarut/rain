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

     public function json(array $data, int $code = 200): bool|string
     {
        http_response_code($code);
        return json_encode($data);
    }

    public function with($name, $data)
    {
        session()->flash($name, $data);
        return $this;
    }

    public function redirect(string $to = "", $code = 302)
    {
        http_response_code($code);

        header(sprintf("Location: %s/%s", (new Request)->referer(), $to));

        exit;
    }
}
