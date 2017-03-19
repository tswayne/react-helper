var program = require('commander');
var exec = require('child_process').exec;
var async = require('async');
var path = require('path');
var jsonfile = require('jsonfile')

program
  .version('1.0.0')
  .command('init')
  .description('add react to your app')
  .option('-bp, --bundle-path <bundlePath>', 'Bundle path', 'public/javascript')
  .option('-bn, --bundle-name <bundleName>', 'Bundle name', 'bundle.js')
  .option('-cd, --client-dir <clientDir>', 'React app directory', './client')
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
        var registrationFilePath = path.resolve(__dirname, 'registration-file.js');
        console.log(`Creating component registry ${options.clientDir}/index.js`)
        exec(`cp ${registrationFilePath} ${options.clientDir}/index.js`, function(err, stdout, stderr) {
          console.log(stdout);
          callback(err);
        })
      },
      function(callback){
        var config = {
          'bundle': `${options.bundlePath}/${options.bundleName}`,
          'registry': `${options.clientDir}/index.js`
        }
        console.log(`Creating build config`)
        const filePath = path.resolve(__dirname, 'tmp/react-helper.json');
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
  //
  // .option('-cd, --client-dir', 'React app directory')

// program
//   .command('build-watch [options]', 'Watch your app for changes and re-build the bundle')
//   .option('-p', '--path', 'Directory to watch for changes')

program.parse(process.argv);
