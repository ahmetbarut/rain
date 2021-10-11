<?php

namespace Core\Commands;

use ReflectionException;
use Symfony\Component\Console\Application;
use Symfony\Component\Finder\Finder;

/**
 * @author Ahmet Barut <iletisim@ahmetbarut.net>
 * Responsible for loading commands.
 * Lifecycle in brief: when executing "rain" from the command line, commands are loaded and ready to use.
 */
class Command extends Application
{
    /**
     * Constructor class
     */
   public function __construct()
   {
       parent::__construct();
   }

    /**
     * Makes commands and ready to use.
     * @param string $path Specify the directory where the commands will be installed.
     * @throws ReflectionException
     */
   public function load(string $path)
   {
       $namespace = "App";

       // Bring scripts in the relevant directory using symfony/finder and lists their directories.
       // Then it takes the "domain name" of the generated commands, replaces it with the directory and tries to load them all.

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