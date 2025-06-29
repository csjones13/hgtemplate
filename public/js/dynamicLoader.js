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
        console.log(`Attempting to load module from: ${src}`, 'loading with key:', key);
        if((key && (typeof window.__CLASSES__[key] == 'function' || typeof window.__FUNCTIONS__[key] == 'function'))) {
            console.log(`Module ${key} already loaded, returning existing instance.`);
            if(typeof window.__CLASSES__[key] == 'function') {
                resolve(new window.__CLASSES__[key](params));
            } else if(typeof window.__FUNCTIONS__[key] == 'function') {
                resolve(window.__FUNCTIONS__[key](params));
            }
        } else {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            
            document.body.appendChild(script);
            script.onload = function() {
                if(typeof window.__CLASSES__[key] == 'function') {
                    resolve(new window.__CLASSES__[key](params));
                } else if(typeof window.__FUNCTIONS__[key] == 'function') {
                    resolve(window.__FUNCTIONS__[key](params));
                }
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
