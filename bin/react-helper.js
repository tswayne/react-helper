var program = require('commander');
var exec = require('child_process').exec;
var async = require('async');
var path = require('path');
var jsonfile = require('jsonfile')

program
  .version('1.0.0')

program
  .command('init')
  .description('add react to your app')
  .option('-p, --bundle-path <bundlePath>', 'Bundle path', 'public/javascript')
  .option('-n, --bundle-name <bundleName>', 'Bundle name', 'bundle.js')
  .option('-c, --client-dir <clientDir>', 'React app directory', './client')
  .action(function(options) {
    async.series([
      function(callback){
        console.log('Adding react-helper to app...')
        exec('npm install react-helper --save', function(err, stdout, stderr) {
          console.log(stdout);
          callback(err);
        })
      },
      function(callback){
        console.log(`Creating react app directory at ${options.clientDir}`)
        exec(`mkdir ${options.clientDir}`, function(err, stdout, stderr) {
          console.log(stdout);
          callback(err);
        })
      },
      function(callback){
        var registrationFilePath = path.resolve(__dirname, 'files/registration-file.js');
        console.log(`Creating component registry ${options.clientDir}/registry.js`)
        exec(`cp ${registrationFilePath} ${options.clientDir}/registry.js`, function(err, stdout, stderr) {
          console.log(stdout);
          callback(err);
        })
      },
      function(callback){
        var config = {
          'bundleName': options.bundleName,
          'bundlePath': options.bundlePath,
          'registry': `./${options.clientDir}/registry.js`
        }
        console.log(`Creating build config`)
        const filePath = path.resolve(__dirname, 'files/react-helper.json');
        console.log(filePath)
        jsonfile.writeFile(filePath, config, function(err) {
          if (err) {return callback(err)}

          exec(`mv ${filePath} ./ `, function(err, stdout, stderr) {
            console.log(stdout);
            callback(err);
          })
        })
      }
    ], function(err, results) {
      if (err) {
        console.log(err)
      } else {
        console.log('Done!')
      }
    })
  })


program
  .command('build-watch')
  .description('Watch your app for changes and re-build the bundle')
  .option('-p --path <watchDir>', 'Directory to watch for changes', './client')
  .action(function(options) {
    webpackDir = path.resolve(__dirname, '../node_modules/.bin/webpack');
    webpackConfig = path.resolve(__dirname, './lib/webpack.config.js');
    exec(`${webpackDir} --config ${webpackConfig} ${options.watchDir} --display-error-details`, function(err, stdout, stderr) {
      console.log(stdout);
    })
  })

program.parse(process.argv);
