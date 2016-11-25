#!/usr/bin/env node
/* index.js */
/**
 * Installer CLI for the UCT Mars Rover project
 */

import chalk from 'chalk';
import shell from 'shelljs';
import program from 'commander';
import path from 'path';

let pkgMgr;

shell.echo(chalk.blue('------------------------'));
shell.echo(chalk.blue(chalk.bold('UCT'), 'Mars Rover installer'));
shell.echo(chalk.blue('------------------------'));

program
  .version('0.1.4')
  .usage('[options] <command>')
  .option('-D, --debug-mode', 'do not suppress stdout');

program
  .command('install').alias('i')
  .description('build and install the UCT Mars Rover projects')
  .action(() => {
    _preChecks();
    install();
  });

program
  .command('clone').alias('c')
  .description('clone the UCT Mars Rover projects')
  .action(() => {
    _preChecks();
    clone();
  });

program
  .command('clone-all').alias('ca')
  .description('clone all projects including the writeup source and 3D models')
  .action(() => {
    _preChecks();
    cloneAll();
  });

program
  .command('start-server').alias('start')
  .description('start the RSVP Server as a forever process')
  .action(() => {
    _preChecks();
    startServer();
  });

program
  .command('stop-server').alias('stop')
  .description('stop the RSVP Server forever process')
  .action(() => {
    _preChecks();
    stopServer();
  });

program.parse(process.argv);

if (program.args.length === 0) program.help();

function install() {
  clone();

  shell.echo(chalk.green.bold('\nInstalling projects...\n'));
  // Check tools
  _checkPkgMgr();
  _checkBower();

  // Install projects
  _installRSVPServer();
  _installRSVPClient();
}


function clone() {
  shell.echo(chalk.green.bold('\nCloning projects...\n'));
  _checkGit();
  _cloneRSVPServer();
  _cloneRSVPClient();
  _cloneRCE();
}

function cloneAll() {
  clone();
  shell.echo(chalk.green.bold('\nCloning extra projects...\n'));

  _cloneModels();
  _cloneWriteup();
}

function startServer() {
  shell.echo(chalk.green.bold('\nStarting RSVP Server...\n'));
  _checkPkgMgr();
  _checkForever();

  if (!shell.test('-d', 'mars-rover-rsvp-server')) {
    shell.echo(chalk.red('\n   Not all of the repositories have been cloned and install. Please run \'mars-rover install\' before starting the server.'));
    process.exit(-1);
  }

  shell.cd('mars-rover-rsvp-server');
  if (shell.exec(`${pkgMgr} run forever`).code !== 0) {
    shell.echo(chalk.red('\n   Failed to start the RSVP Server!'));
    process.exit(-1);
  } else {
    shell.echo(chalk.green('   ✓ RSVP Server started at https://localhost:3000'));
  }

  shell.cd('..');
}

function stopServer() {
  shell.echo(chalk.green.bold('\nStopping RSVP Server...\n'));
  _checkForever();

  shell.cd('mars-rover-rsvp-server');
  if (shell.exec('forever stop mars-rover-rsvp-server').code !== 0) {
    shell.echo(chalk.red('\n   Failed to stop the RSVP Server!'));
    process.exit(-1);
  } else {
    shell.echo(chalk.green('   ✓ RSVP Server stopped'));
  }

  shell.cd('..');
}

// === Private ===
function _preChecks() {
  if (!program.debugMode) {
    shell.config.silent = true;
  }
}

function _checkGit() {
  if (!shell.which('git')) {
    shell.echo(chalk.red('\n   \'git\' not found! Please install \'git\' before continuing'));
    process.exit(-1);
  }
}

function _checkPkgMgr() {
  if (shell.which('yarn')) {
    pkgMgr = 'yarn';
  } else if (shell.which('npm')) {
    pkgMgr = 'npm';
  } else {
    shell.echo(chalk.red('\n   No node package manager found! Please install either \'yarn\' or \'npm\' before continuing'));
    process.exit(-1);
  }
}

function _checkBower() {
  if (!shell.which('bower')) {
    shell.echo(chalk.red('\n   \'bower\' not found! Please install \'bower\' by running \'npm i -g bower\' before continuing'));
    process.exit(-1);
  }
}

function _checkForever() {
  if (!shell.which('forever')) {
    shell.echo(chalk.red('\n   \'forever\' not found! Please install \'forever\' by running \'npm i -g forever\' before continuing'));
    process.exit(-1);
  }
}

function _cloneRSVPServer() {
  shell.echo(chalk.blue('-> Cloning \'mars-rover-rsvp-server\'...'));
  if (!shell.test('-d', 'mars-rover-rsvp-server')) {
    if (shell.exec('git clone https://github.com/WoodyWoodsta/mars-rover-rsvp-server.git').code !== 0) {
      shell.echo(chalk.red('   Failed to clone \'mars-rover-rsvp-server\'!'));
      process.exit(-1);
    }
  } else {
    shell.echo(chalk.yellow('   \'mars-rover-rsvp-server\' already cloned'));
  }
}

function _cloneRSVPClient() {
  shell.echo(chalk.blue('-> Cloning \'mars-rover-rsvp-client\'...'));
  if (!shell.test('-d', 'mars-rover-rsvp-client')) {
    if (shell.exec('git clone https://github.com/WoodyWoodsta/mars-rover-rsvp-client.git').code !== 0) {
      shell.echo(chalk.red('   Failed to clone \'mars-rover-rsvp-client\'!'));
      process.exit(-1);
    }
  } else {
    shell.echo(chalk.yellow('   \'mars-rover-rsvp-client\' already cloned'));
  }
}

function _cloneRCE() {
  shell.echo(chalk.blue('-> Cloning \'mars-rover-rce\'...'));
  if (!shell.test('-d', 'mars-rover-rce')) {
    if (shell.exec('git clone https://github.com/WoodyWoodsta/mars-rover-rce.git').code !== 0) {
      shell.echo(chalk.red('   Failed to clone \'mars-rover-rce\'!'));
      process.exit(-1);
    }
  } else {
    shell.echo(chalk.yellow('   \'mars-rover-rce\' already cloned'));
  }
}

function _cloneWriteup() {
  shell.echo(chalk.blue('-> Cloning \'mars-rover-writeup\'...'));
  if (!shell.test('-d', 'mars-rover-writeup')) {
    if (shell.exec('git clone https://github.com/WoodyWoodsta/mars-rover-writeup.git').code !== 0) {
      shell.echo(chalk.red('   Failed to clone \'mars-rover-writeup\'!'));
      process.exit(-1);
    }
  } else {
    shell.echo(chalk.yellow('   \'mars-rover-writeup\' already cloned'));
  }
}

function _cloneModels() {
  shell.echo(chalk.blue('-> Cloning \'mars-rover-models\'...'));
  if (!shell.test('-d', 'mars-rover-models')) {
    if (shell.exec('git clone https://github.com/WoodyWoodsta/mars-rover-models.git').code !== 0) {
      shell.echo(chalk.red('   Failed to clone \'mars-rover-models\'!'));
      process.exit(-1);
    }
  } else {
    shell.echo(chalk.yellow('   \'mars-rover-models\' already cloned'));
  }
}

function _installRSVPServer() {
  // Install
  shell.echo(chalk.blue('-> Installing the RSVP Server...'));
  shell.cd('mars-rover-rsvp-server');
  if (shell.exec(`${pkgMgr} install`).code !== 0) {
    shell.echo(chalk.red('   Failed to install \'mars-rover-rsvp-server\'!'));
  } else {
    shell.echo(chalk.green('   ✓ RSVP Server installed successfully!'));
  }

  // Build
  shell.echo(chalk.blue('-> Building the RSVP Server...'));
  if (shell.exec(`${pkgMgr} run build`).code !== 0) {
    shell.echo(chalk.red('   Failed to build \'mars-rover-rsvp-server\'!'));
  } else {
    shell.echo(chalk.green('   ✓ RSVP Server built successfully!'));
  }

  shell.cd('..');
}

function _installRSVPClient() {
  // Node modules
  shell.echo(chalk.blue('-> Installing the RSVP Client node modules...'));
  shell.cd('mars-rover-rsvp-client');
  if (shell.exec(`${pkgMgr} install`).code !== 0) {
    shell.echo(chalk.red('   Failed to install \'mars-rover-rsvp-client\' node modules!'));
  } else {
    shell.echo(chalk.green('   ✓ RSVP Client node modules installed successfully!'));
  }

  // Bower components
  shell.echo(chalk.blue('-> Installing the RSVP Client bower components...'));
  if (shell.exec('bower install').code !== 0) {
    shell.echo(chalk.red('   Failed to install \'mars-rover-rsvp-client\' bower components!'));
  } else {
    shell.echo(chalk.green('   ✓ RSVP Client bower components installed successfully!'));
  }

  // Build
  shell.echo(chalk.blue('-> Building the RSVP Client...'));
  shell.mkdir('../mars-rover-rsvp-server/app');

  if (shell.exec(`${pkgMgr} run build`).code !== 0) {
    shell.echo(chalk.red('   Failed to build \'mars-rover-rsvp-server\'!'));
  } else {
    shell.echo(chalk.green('   ✓ RSVP Client built successfully!'));
  }

  // Link bower to server
  shell.echo(chalk.blue('-> Linking bower components to RSVP Server...'));
  if (shell.ln('-sf', path.join(shell.pwd().toString(), 'bower_components'), '../mars-rover-rsvp-server/app/bower_components').code !== 0) {
    shell.echo(chalk.red('   Failed to link bower components to \'../mars-rover-rsvp-server/app/bower_components\'!'));
  }

  shell.cd('..');
}
