#!/usr/bin/env node
/* index.js */
/**
 * Installer CLI for the UCT Mars Rover project
 */

import chalk from 'chalk';
import 'shelljs/global';
import program from 'commander';

echo(chalk.underline.blue(chalk.bold('UCT'), 'Mars Rover installer'));

// Usage
program.arguments('<cmd>')
  .action((cmd) => {
    switch (cmd) {
      case 'clone':
        clone();
        break;
      case 'clone-all':
        cloneAll();
        break;
      case 'install':
        install();
        break;
      default:
        echo(chalk.red(`Command '${cmd}' does not exist.`));
        program.help();
        break;
    }
  })
  .usage('[Command]')
  .command('clone', 'clone the UCT Mars Rover projects')
  .command('clone-all', 'clone all projects including the writeup source and 3D models')
  .command('install', 'build and install the UCT Mars Rover projects')
  .parse(process.argv);

function install() {
  echo(chalk.green('Install'));
}

function clone() {
  echo(chalk.red('Clone'));
}

function cloneAll() {
  echo(chalk.blue('Clone all!'));
}
