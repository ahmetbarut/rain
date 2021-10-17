<?php

namespace App\Console\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ServerCommand extends Command
{
    /**
     * The name to invoke the command.
     * @var static string $defaultName
     */
    protected static $defaultName = 'server:start';

    /**
     * command description.
     * @var static string $defaultDescription
     */
    protected static $defaultDescription = 'Started development server.';

    /**
     * Makes command configurations.
     */
    protected function configure()
    {
        $this->addOption('host', null,InputArgument::OPTIONAL, 'Set host', 'localhost');
        $this->addOption('port', null,InputArgument::OPTIONAL, 'Set host', 8000);
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
     */
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        exec("php -S {$input->getOption('host')}:{$input->getOption('port')} -t " . root_path('public'));
        return Command::SUCCESS;
    }

}