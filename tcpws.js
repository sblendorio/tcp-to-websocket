#!/usr/bin/env node

const net = require('net');
const W3CWebSocket = require('websocket').w3cwebsocket;
const getOptions = require("./options");

const options = getOptions();
const port = options.port;
const wsaddress = options.wsaddress;
const usestrings = options.usestrings;
const name = options.name;

const server = net.createServer();

server.on('connection', function(sock) {
   console.log(`tcpws: new connection from ${sock.remoteAddress}:${sock.remotePort}`);
   onClientConnection(sock, wsaddress);
});

server.listen({port}, function() {
   console.log(`tcpws: started listening on port ${port}`);
});

function onClientConnection(sock, wsaddress) {

   let ws = new W3CWebSocket(wsaddress, name);
   let client = `[${sock.remoteAddress}:${sock.remotePort}]`;

   ws.onerror = function(error) {
      console.log(`${client} websocket error ${error}`);
      sock.end();
   };

   ws.onclose = function(ev) {
      console.log(`${client} websocket closed, reason: ${ev.reason} (${ev.code})`);
      sock.end();
   };

   ws.onmessage = function(e) {
      sock.write(e.data);
   };

   ws.onopen = function() {
      console.log(`${client} connected to websocket`);

      sock.on('data', function(data) {
         if(!usestrings) ws.send(data);
         else ws.send(data.toString());  // convert Buffer to String
      });

      sock.on('close', function() {
         console.log(`${client} TCP client closed the connection`);
         ws.close();
      });

      sock.on('error', function(error) {
         console.error(`${client} TCP error ${error}`);
         ws.close();
      });
   };
};

