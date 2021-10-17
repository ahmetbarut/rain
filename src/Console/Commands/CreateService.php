<?php

namespace App\Console\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateService extends Command
{
    /**
     * The name to invoke the command.
     * @var static string $defaultName
     */
    protected static $defaultName = 'make:service';

    /**
     * command description.
     * @var static string $defaultDescription
     */
    protected static $defaultDescription = 'The command create a service.';

    /**
     * Makes command configurations.
     */
    protected function configure()
    {
        $this->addArgument('serviceName', InputArgument::REQUIRED, 'Set service name');

        $this->setHelp('This command create a new service file in src/Service directory.');

        // $this->addArgument('argumentName', InputArgument::OPTIONAL, 'argument description', 'argument_default');
        // $this->setHelp('Set command help');
        // $this->addOption('option',  null, InputOption::VALUE_REQUIRED, 'option description');
    }

    /**
     * This method is executed after interact() and initialize().
     * It contains the logic you want the command to execute
     * and it must return an integer which will be used as the command exit status.
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $command = $this->getApplication()->find('create:file');

        $commandName = $input->getArgument('serviceName');

        $arguments = [
            'name' => $input->getArgument('serviceName'),
            'path' => "src/Services/{$commandName}.php",
            '--include'  => root_path('core/Stubs/Services/service.stub'),
        ];

        $greetInput = new ArrayInput($arguments);

        return $command->run($greetInput, $output);
    }

}