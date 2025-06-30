import(`./dynamicLoader.js?v=${window.__FILE_HASHES__['dynamicLoader.js'].hash}`)
    .then(({ loader }) => {
        // Ensure the loader is available globally
        window.JSLoader = loader;
        import(`./customFetch.js?v=${window.__FILE_HASHES__['customFetch.js'].hash}`)
            .then(({ customPost, customFetch }) => {
                // Ensure custom fetch functions are available globally
                window.CPost = customPost;
                window.CFetch = customFetch;    
                // Start the app
                console.log('Dynamic loader and custom fetch functions loaded successfully. Starting app...');
                
                // Initialize global variables
                window.__CLASSES__ = {};
                window.__FUNCTIONS__ = {};

                // Intercept click events on links
                document.addEventListener('click', (e) => {
                    const link = e.target.closest('[data-link]');
                    if(link) {
                        e.preventDefault();
                        JSLoader('navigateTo', {link: link.getAttribute('href')});
                    }
                });

                // Handle popstate events (back/forward navigation) this will also initialize the router on page load
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
                                }, 100); // Delay to ensure service worker is ready
                            })
                            .catch(err => console.error('Service Worker registration failed:', err));
                    });
                }
            })
            .catch(err => {
                console.error('Error loading custom fetch tools:', err);
            });
    })
    .catch(err => {
        console.error('Error loading dynamic loader:', err);
    });
    