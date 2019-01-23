export default (
  url,
  context,
  styleUrl = 'assets/styles.css',
  jsUrl = 'assets/bundle.js',
) => {
  const indexHtml = `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
      <title>react starter</title>
      <link href="${styleUrl}" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <div id="app">
      </div>
    </body>
    <script type="text/javascript" src="${jsUrl}"></script>
  </html>`
  return indexHtml
}
