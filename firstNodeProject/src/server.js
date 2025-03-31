import http from 'node:http';

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req;

  console.log(method, url);

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-Type', 'application/json')
      .end(JSON.stringify(users));
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Jhon Doe',
      email: 'jhondoe@example.com'
    })
    return res.end('Create users');
  }

  return res.end('Hello World!');
});

server.listen(3333)
