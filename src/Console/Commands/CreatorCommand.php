<?php

namespace App\Console\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class CreatorCommand extends Command
{
    protected static $defaultName = 'create:file';

    protected static $defaultDescription = 'Create a new file.';

    protected function configure()
    {
        $this->addArgument('name', InputArgument::REQUIRED, 'File name');
        $this->addArgument('path', InputArgument::REQUIRED, 'File path');
        $this->addOption('overwrite', 'o', InputOption::VALUE_OPTIONAL, 'In normal case, if there is a file, it will not write, but if you want it to write, write the -o flag.');
        $this->addOption('include', null, InputOption::VALUE_OPTIONAL, );
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $name = $input->getArgument('name');
        $path = root_path($input->getArgument('path'));

        $include = $input->getOption('include');

        if (null !== $include){
            $file = file_get_contents($include);
            $content = preg_replace("/{className}/", $name, $file);

        } else{
            $content = $include;
        }

        if (file_put_contents($path, $content) === false)
        {
            $output->writeln("<comment>{$path} could not be created</comment>");
            return Command::FAILURE;
        }
        $output->writeln("<info>{$path} successfully created</info>");
        return Command::SUCCESS;
    }

}