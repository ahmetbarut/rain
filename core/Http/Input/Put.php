<?php 

namespace Core\Http\Input;

use Core\Http\Input\InputInterface;
use Core\Http\Request;

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
     * Open PUT stream
     *
     * @return object
     */
    public function open()
    {
        $this->stream = fopen("php://input", "r");
        return $this;
    }

    /**
     * Read PUT stream
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
     * Return the open stream in object
     *
     * @return object
     */
    public function get()
    {
        return $this->data;
    }
    
}