module.exports.ping = function(source) {

return new Promise(function(resolve, reject){
var raw = require('raw-socket');
var parser = require('./parser');

var header = Buffer.alloc(12);
header.writeUInt8(0x8, 0);
header.writeUInt16LE(process.pid, 4);
header.writeUInt16LE(checksum(header), 2);

var socket = raw.createSocket( {
 protocol: raw.Protocol.ICMP
 });

socket.send(header, 0, 12, source, function(err, bytes) { 
 if (err) reject(err.toString());
 });

socket.on('message', function (buffer, source) {
 

 var offset = 20;
 var type = buffer.readUInt8(offset);
 var code = buffer.readUInt8(offset+1); 
 socket.close();
 resolve(parser.parseEcho(type,code));
 });

function checksum(array) {
 var buffer = Buffer.from(array);
 var sum = 0;
 for (var i=0; i<buffer.length; i=i+2) {
 sum += buffer.readUIntLE(i, 2); 
 } 
 sum = (sum >> 16) + (sum & 0xFFFF);
 sum += (sum >> 16);
 sum = ~sum;
 return (new Uint16Array([sum]))[0];
}

});
}