<?php

namespace App\Console\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateCommand extends Command
{
    protected static $defaultName = 'make:command';

    protected static $defaultDescription = 'Create a new command.';

    protected function configure()
    {
        $this->addArgument('name', InputArgument::REQUIRED, 'Command name');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $stubFile = file_get_contents(core_path('Stubs/Command/create.stub'));

        $commandName = $input->getArgument('name');

        $stubFile = preg_replace("/{command}/", $commandName, $stubFile);

        $file = app_path("Console/Commands/{$commandName}.php");

        if (file_put_contents($file, $stubFile) === false)
        {
            $output->writeln("<comment>{$file} could not be created</comment>");
            return Command::FAILURE;
        }
            $output->writeln("<info>{$file} successfully created</info>");
        return Command::SUCCESS;
    }

}