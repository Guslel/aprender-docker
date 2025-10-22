const fastify = require('fastify')({logger: true});

fastify.get('/', async(req,res) => {
  return {
    ola: "mundo3"
  }
})


//Inicia
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Servidor rodando em http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();