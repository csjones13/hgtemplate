const crypto = require('crypto');

const generateCSP = () => {
    const nonce = crypto.randomBytes(16).toString('base64');
    const csp = [
        `default-src 'self'`,
        `script-src 'self' 'nonce-${nonce}'`,
        `style-src 'self'`,
        `img-src 'self' data:`,
        `connect-src 'self'`,
        `font-src 'self'`,
        `object-src 'none'`,
        `frame-src 'none'`,
    ].join('; ');

    return{ csp, nonce };
}

const generateIndexHtml = (req, csp, nonce) => {
    const metaTags = [
        `<meta charset="UTF-8">`,
        `<meta http-equiv="Content-Security-Policy" content="${csp}">`,
    ].join('\n   ');

    let html = '';

    html = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>My App - ${req.path || 'Home'}</title>
                    ${metaTags}
                    <link rel="stylesheet" href="/css/styles.css">
                </head>
                <body>
                    <h1>My Frontend App</h1>
                    <div id="root"></div>
                    <script nonce="${nonce}" src="/js/app.js"></script>
                </body>
            </html>`;

    return html;
}

module.exports = { generateCSP, generateIndexHtml };