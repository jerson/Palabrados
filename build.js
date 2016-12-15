var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: './build/**/**', 
    platforms: ['osx64', 'win32', 'win64'],
    macIcns:'./build/icon.icns',
    winIco:'./build/favicon.ico',
});

nw.on('log',  console.log);

nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});