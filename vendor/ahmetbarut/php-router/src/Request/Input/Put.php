<?php 

namespace ahmetbarut\PhpRouter\Request\Input;

use ahmetbarut\PhpRouter\Request\Request;

use ahmetbarut\PhpRouter\Request\Input\InputInterface;

class Put implements InputInterface
{
    public $data;

    protected $stream;
    
    public function __construct(Request $request)
    {
        if($request->method() === "PUT")
        {
            $this->open()->read()->get();
        }
    }

    /**
     * Undocumented function
     *
     * @return object
     */
    public function open()
    {
        $this->stream = fopen("php://input", "r");
        return $this;
    }

    /**
     * Undocumented function
     *
     * @return string
     */
    public function read()
    {
        $this->data = (object) json_decode(fread($this->stream, 10000000)) ;

        fclose($this->stream);

        return $this;
    }

    /**
     * Undocumented function
     *
     * @return object
     */
    public function get()
    {
        return $this->data;
    }
    
}