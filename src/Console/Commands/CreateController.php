<?php

namespace App\Console\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @author Ahmet Barut <iletisim@ahmetbarut.net>
 * Create a new controller file.
 */
class CreateController extends Command
{
    protected static $defaultName = 'make:controller';

    protected static $defaultDescription = 'Create a new controller.';

    protected function configure()
    {
        $this->addArgument('name', InputArgument::REQUIRED, 'Command name');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $stubFile = file_get_contents(core_path('Stubs/Controller/class.stub'));

        $commandName = $input->getArgument('name');

        $stubFile = preg_replace("/{controllerName}/", $commandName, $stubFile);

        $file = app_path("Controller/{$commandName}.php");

        if (file_put_contents($file, $stubFile) === false)
        {
            $output->writeln("<comment>{$file} could not be created</comment>");
            return Command::FAILURE;
        }
        $output->writeln("<info>{$file} successfully created</info>");
        return Command::SUCCESS;
    }

}