import { loader } from './dynamicLoader.js';
function app() {
        window.JSLoader = loader;
                console.log('App is running and hashes', window.__FILE_HASHES__);
                document.getElementById('root').innerHTML = `Hello World! Here we are`;
                JSLoader('test', { p: 'Hello from dynamic loader!' })
                    .then(module => {
                        console.log('Module loaded:', module);
                    });
}


app();