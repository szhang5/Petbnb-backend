const PROTO_PATH = __dirname + '/protos/pet_bnb_service.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const endpoints = require('./endpoints');

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
const petBnbProto = protoDescriptor.petbnbservice;

/**
 * Starts an RPC server that receives requests
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(petBnbProto.PetBnbService.service, endpoints);
  return server;
}

function main() {
  const petBnbServer = getServer();
  petBnbServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  petBnbServer.start();
}

main();
