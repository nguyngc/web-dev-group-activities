const sysCalls = require('./sys-calls');

sysCalls.read('sample.txt');
// sysCalls.write('output.txt', 'This is some sample data.');
sysCalls.displayOSInfo();
sysCalls.writeOSInfo('os-info.txt');
