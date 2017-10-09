import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';

import App from '../client/pages/App';

export default (
  url,
  context,
  styleUrl = 'assets/styles.css',
  jsUrl = 'assets/bundle.js'
) => {
  const innerHtml = ReactDOMServer.renderToString(
    <Router location={url} context={context}>
      <App />
    </Router>
  );

  const indexHtml = `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
      <title>react starter</title>
      <link href="${styleUrl}" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <div id="app">
      ${innerHtml}
      </div>
    </body>
    <script type="text/javascript" src="${jsUrl}"></script>
  </html>`;
  return indexHtml;
};
