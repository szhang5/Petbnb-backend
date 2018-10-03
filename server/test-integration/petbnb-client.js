var PROTO_PATH = __dirname + '/../protos/pet_bnb_service.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
var petBnbService = protoDescriptor.petbnbservice;

function connect() {
  return Promise.resolve(
    new petBnbService.PetBnbService('localhost:50051', grpc.credentials.createInsecure());
    )
}

module.exports = {
  connect,
};
