const fs = require('fs');
const os = require('os');

function read(fileName) {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            console.log('File contents:', data);
        }
    });
}

function write(fileName, contents) {
    fs.writeFile(fileName, contents, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Data written to ' + fileName);
        }
    });
}

function displayOSInfo() {
    console.log("Platform: " + os.platform());
    console.log("Hostname: " + os.hostname());
    console.log("Architecture: " + os.arch());

    // Other types of information that can be accessed through the os module
    // console.log("Free system memory: " + os.freemem());
    // console.log("Home directory: " + os.homedir());
    // console.log("Machine: " + os.machine());
    // console.log("User info: " + os.userInfo().username);
    // console.log("Version: " + os.version());
}

function writeOSInfo(fileName) {
    var contents = "Hostname: " + os.hostname() + "\nOS Platform: " + os.platform();
    write(fileName, contents);
    // fs.writeFile(fileName, contents, (err) => {
    //     if (err) {
    //         console.error('Error writing file:', err);
    //     } else {
    //         console.log('Data written to ' + fileName);
    //     }
    // });
}

module.exports = {
    read,
    write,
    displayOSInfo,
    writeOSInfo
};