const crypto = require('crypto');
//require('dotenv').config();
const { jParse, jEncode } = require('./jsonParse');

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

    let fH = jParse(fileHashes);;

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
                    
                    <link async rel="preload" as="style" id="custom-bootstrap" href="/css/custom-bootstrap.css?v=${fH["custom-bootstrap.css"].hash}">
                    <link async rel="preload" as="style" id="grid-templates" href="/css/grid-templates.css?v=${fH["grid-templates.css"].hash}">
                    <link async rel="preload" as="style" id="generic" href="/css/generic.css?v=${fH["generic.css"].hash}">
                    <link async rel="preload" as="style" id="styles" href="/css/styles.css?v=${fH["styles.css"].hash}">
                </head>
                <body>
                    <div id="root"></div>
                    <script type="module" nonce="${nonce}" src="/js/app.js"></script>
                    <script type="text/javascript" nonce="${nonce}">
                        

                        document.addEventListener('DOMContentLoaded', function() {
                            document.getElementById("custom-bootstrap").rel = "stylesheet";
                            document.getElementById("grid-templates").rel = "stylesheet";
                            document.getElementById("generic").rel = "stylesheet";
                            document.getElementById("styles").rel = "stylesheet";
                        });
                    </script>
                </body>
            </html>`;

    return html;
}

module.exports = { generateCSP, generateIndexHtml };