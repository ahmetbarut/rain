<?php

namespace App\Console\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
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

    /**
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $command = $this->getApplication()->find('create:file');

        $commandName = $input->getArgument('name');

        $arguments = [
            'name' => $input->getArgument('name'),
            'path' => "src/Controller/{$commandName}.php",
            '--include'  => root_path('core/Stubs/Controller/class.stub'),
        ];

        $greetInput = new ArrayInput($arguments);

        return $command->run($greetInput, $output);

        /*
        if (file_put_contents($file, $stubFile) === false)
        {
            $output->writeln("<comment>{$file} could not be created</comment>");
            return Command::FAILURE;
        }
        $output->writeln("<info>{$file} successfully created</info>");
        return Command::SUCCESS;
        */
    }

}