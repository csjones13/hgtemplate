import { loader } from './dynamicLoader.js';
function app() {
    // Initialize global variables
    window.__CLASSES__ = {};
    window.__FUNCTIONS__ = {};

    // initiate the dynamic loader
    window.JSLoader = loader;

    // load the app router the router will handle url mapping and component loading
    JSLoader('router')
        .then((c) => {
            // Intercept click events on links
            document.addEventListener('click', (e) => {
                const link = e.target.closest('[data-link]');
                if(link) {
                    e.preventDefault();
                    JSLoader('navigateTo', {link: link.getAttribute('href')});
                }
            });

            // Handle popstate events (back/forward navigation)
            window.addEventListener('popstate', JSLoader('router'));

            // load the service worker
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    const cacheName = `pwa-spa-cache-v${window.__FILE_HASHES__['sw.js'].hash}`; // Dynamic cache name
                    navigator.serviceWorker.register(`/sw.js?v=${window.__FILE_HASHES__['sw.js'].hash}`)
                        .then(reg => {
                            console.log('Service Worker registered');
                            setTimeout(() => {
                                // Send cache name to service worker
                                if (navigator.serviceWorker.controller) {
                                
                                    console.log('Sending cache name to service worker:', cacheName);
                                    navigator.serviceWorker.controller.postMessage({
                                        type: 'SET_CACHE_NAME',
                                        cacheName: cacheName
                                    });
                                }
                            }, 1000); // Delay to ensure service worker is ready
                        })
                        .catch(err => console.error('Service Worker registration failed:', err));
                });
            }
        });
}


app();