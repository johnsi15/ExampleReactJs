import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import Pages from './pages/containers/Page.jsx';

function requestHandler(request, response){
  //Se crea un contexto
  const context = {};

  const html = renderToString(
    <StaticRouter location={request.url} context={context}>
      <Pages />
    </StaticRouter>
  );

  response.setHeader('Content-Type', 'text/html');

  //Validamos si se esta pidiendo una url
  if (context.url) {
    response.writeHead(301, {
      Location: context.url,
    });
    response.end();
  }

  response.write(html);
  response.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);