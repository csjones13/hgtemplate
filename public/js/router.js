window.__FUNCTIONS__.router = (params = {}) => {
    console.log('Router function called with params:', params);
    let d = document.getElementById('root');
    if (!d) {
        console.error('Root element not found');
        return '';
    }

    // Clear the root element
    d.innerHTML = '';

    // get the current path normalized to lowercase
    let path = window.location.pathname.toLowerCase();

    // Parse the path to determine the component to load
    let componentName = path.split('/').pop() || 'home'; // Default to '
    let componentArray = path.split('/');

    console.log('Current path:', path, 'Component to load:', componentName, 'Component Array:', componentArray);

    d.innerHTML = `<div class="loading">Loading ${componentName}...</div>
                <div class="component-name"><a href="/about/frank" data-link>Test Link 2</a></div>  `;


}