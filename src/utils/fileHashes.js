const fs = require('fs');
const { jParse }  = require('./jsonParse');

const fileHashParser = (path) => {
    //get json file
    const pathToFile = path || './src/utils/fileHashes.json';
    if (!fs.existsSync(pathToFile)) {
        throw new Error(`File not found: ${pathToFile}`);
    }

    let fileData;
    //read file
    try {
        fileData = fs.readFileSync(pathToFile, 'utf8'); 
    } catch (err) {
        console.error('Error reading file:', err);
    }
    let fileHashes = jParse(fileData);

    let keys = Object.keys(fileHashes);
    if (keys.length === 0) {
        throw new Error(`No hashes found in file: ${pathToFile}`);
    }

    //loop thorugh the keys and sort only the ones we want into new json object
    let sortedHashes = {};
    let map = {};
    keys.forEach(key => {
        if (key.startsWith('public/js/') && !key.startsWith('public/js/min/') && key.endsWith('.js')) {
            let k = key.replace('public/js/', '');
            sortedHashes[k] = {};
            sortedHashes[k].hash = fileHashes[key].hash;      
        }
        if(key.indexOf('sw.js') !== -1) {
            sortedHashes['sw.js'] = {};
            sortedHashes['sw.js'].hash = fileHashes[key].hash;
        }
    });

    return sortedHashes;
}


module.exports = { fileHashParser };