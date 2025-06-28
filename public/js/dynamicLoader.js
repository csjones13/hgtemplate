export function loader(key, params) {
    if (!key) {
        throw new Error('No key provided for dynamic import.');
    }

    //load the hashes json
    const fileHashes = window.__FILE_HASHES__;

    //ensure the hash exists
    if (!fileHashes || !fileHashes[`${key}.js`]) {
        throw new Error(`No file hash found for key: ${key}`);
    }

    //set the import path as via minimized files
    let src = `/js/min/${key}.min.js?v=${fileHashes[`${key}.js`].hash}`;

    if(window.__NODE_ENV__ === 'development') {
        // In development, load the non-minified version
        src = `/js/${key}.js?v=${fileHashes[`${key}.js`].hash}`;
    }

     let p = new Promise(function(resolve, reject) {
        if((key && typeof key == 'function')) {
            resolve(true);
        } else {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            
            document.body.appendChild(script);
            script.onload = function() {
                resolve(true);
            }

            script.onerror = function() {
                resolve(false);
            }
        }

    });


    /*
    //set the promise we will return
    let p = new Promise(function(resolve, reject) {
        try {
            console.log(`Attempting to load module from: ${pathToImport}`);
            import(pathToImport)
                .then(module => {
                    console.log(`Module ${pathToImport} loaded successfully.`);
                    resolve(module);
                })
                .catch(err => {
                    console.error(`Error loading module ${pathToImport}:`, err);
                    throw err;
                });
        } catch (error) {
            try {
                pathToImport = `/public/js/${key}.js?v=${fileHashes[`${key}.js`].hash}`;
                console.log(`Attempting to load module from: ${pathToImport}`);
                import(pathToImport)
                    .then(module => {
                        console.log(`Module ${pathToImport} loaded successfully.`);
                        resolve(module);
                    })
                    .catch(err => {
                        console.error(`Error loading module ${pathToImport}:`, err);
                        throw err;
                    });
            } catch (error) {
                console.error(`Dynamic import failed for ${pathToImport}:`, error);
                reject(error);
            }
        }
    });*/

    return p;
}
