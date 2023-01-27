# TCP-to-WebSocket

Creates a server that accepts TCP connections
and forwards them to a WebSocket connection.

# Installation

```
npm i -g tcp-to-websocket
```

This installs the utility in the global register that
can be called from the command line interface with `tcpws`.

# Usage

```
tcpws -p port -w wsaddress [-n name] [-usestrings]
```
- `port` is the local TCP port number
- `wsaddress` is the address of the remove WebSocket connection
- `name` (optional) the WebSocket sub-protocol name
- `usestrings` (optional) send data as strings instead of bytes, as some WebSockect servers treat strings different


# Example

```
tcpws -p 6510 wss://bbs.sblendorio.eu:8080 -n bbs
```

Creates a local server that accepts TCP connections on the port `6510`
and forwards them to `wss://bbs.sblendorio.eu:8080`. The name of the WebSocket
sub-protocol is `bbs`.

# License

Written by Antonino Porcino - MIT License

