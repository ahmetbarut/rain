<?php

namespace ahmetbarut\PhpRouter\Helper;

class Arr
{
    /**
     * find $parameters in $search.
     *
     * @param array $parameters
     * @param array $search
     * @return string|true
     */
    public static function searchParameters(array $parameters, array $search):mixed
    {   
        $counter = 0;

        foreach($parameters as $key => $parameter)
        {
            if($key !== $search[$counter])
            {
                return "\${$key}, \${$search[$counter]}";
            }
            $counter++;
        }
        return true;
    }
}
