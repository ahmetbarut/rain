<?php

namespace Core\Commands;

use Symfony\Component\Console\Application;
use Symfony\Component\Console\Command\Command as SymfonyCommand;
use Symfony\Component\Finder\Finder;

class Command extends Application
{
   public function __construct()
   {
       parent::__construct();
   }

   public function load($path)
   {
       $namespace = "App";

       foreach ((new Finder())->files()->in($path) as $command)
       {
           $command = $namespace.str_replace(["/", ".php"], ["\\", ""],
                   after($command->getRealPath(), 'src'));

           if (is_subclass_of($command, \Symfony\Component\Console\Command\Command::class) && !(new \ReflectionClass(new $command))->isAbstract())
           {
               $this->add(new $command);
           }
       }
   }


}