<?php

namespace App\Console\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateController extends Command
{
    protected static $defaultName = 'command:name';
    protected static $defaultDescription = 'Command description.';

    protected function configure()
    {
        //
    }

    protected function initialize(InputInterface $input, OutputInterface $output)
    {
        //
    }

    protected function interact(InputInterface $input, OutputInterface $output)
    {
        //
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        return Command::SUCCESS;
    }

}