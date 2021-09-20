<?php 

namespace Core\Http\Input;

interface InputInterface
{
    /**
     * Open PUT stream
     *
     * @return void
     */
    public function open();

    /**
     * Read PUT stream
     *
     * @return void
     */
    public function read();

    /**
     * Return the open stream in object
     *
     * @return object
     */
    public function get();

}