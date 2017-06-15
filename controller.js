
var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);

var controllers = {}

//============== Collect all js files in controllers directory
fs
    .readdirSync(__dirname + '/controllers')
    //============== Filter this file, hidden files, and non js files
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    //============== Require each of those into the controllers object
    .forEach(function (file) {
        var controller = file;
        controllers[controller.slice(0, controller.length - 3)] = require('./controllers/' + controller);
    });

module.exports = function (app) {
    //============== Execute each controller function when this function is called
    Object.keys(controllers).forEach(function (controller) {
        controllers[controller](app);
    });
}