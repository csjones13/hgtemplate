const crypto = require('crypto');
//require('dotenv').config();

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

const generateIndexHtml = (req, csp, nonce, fileHashes) => {
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
                    <script nonce="${nonce}">
                        window.__FILE_HASHES__ = ${fileHashes};
                        window.__NODE_ENV__ = "${process.env.NODE_ENV}";
                        window.__LOCAL_DB__ = "${process.env.LOCAL_DB}";
                        window.__STORE_NAME_PENDING__ = "${process.env.STORE_NAME_PENDING}";
                    </script>
                    <link rel="stylesheet" href="/css/styles.css">
                </head>
                <body>
                    <h1>My Frontend App</h1>
                    <div id="root"></div>
                    <script type="module" nonce="${nonce}" src="/js/app.js"></script>
                </body>
            </html>`;

    return html;
}

module.exports = { generateCSP, generateIndexHtml };