/*******************************************************************************
 * Copyright (c) 2014 Mark Palaima and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Mark Palaima - initial API and implementation
 *     Justin Early - refinements and testing
 *******************************************************************************/
/**
 * This object is created internally and returned from http.request(). It represents an 
 * in-progress request whose header has already been queued. The header is still mutable 
 * using the setHeader(name, value), getHeader(name), removeHeader(name) API. The actual 
 * header will be sent along with the first data chunk or when closing the connection.
 * <p>
 * To get the response, add a listener for 'response' to the request object. 'response' 
 * will be emitted from the request object when the response headers have been received. 
 * The 'response' event is executed with one argument which is an instance of 
 * http.ClientResponse
 * <p>
 * During the 'response' event, one can add listeners to the response object; particularly 
 * to listen for the 'data' event. Note that the 'response' event is called before any part 
 * of the response body is received, so there is no need to worry about racing to catch the 
 * first part of the body. As long as a listener for 'data' is added during the 'response' 
 * event, the entire body will be caught.
 * <pre>
 * // Good
 * request.on('response', function (response) {
 *   response.on('data', function (chunk) {
 *     console.log('BODY: ' + chunk);
 *   });
 * });
 * 
 * // Bad - misses all or part of the body
 * request.on('response', function (response) {
 *   setTimeout(function () {
 *     response.on('data', function (chunk) {
 *       console.log('BODY: ' + chunk);
 *     });
 *   }, 10);
 * });
 * </pre>
 * Note: Node does not check whether Content-Length and the length of the body which has 
 * been transmitted are equal or not.
 * <p>
 * The request implements the Writable Stream interface. This is an EventEmitter 
 */
vjo.ctype('org.nodejs.http.ClientRequest') //< public
//< needs(org.nodejs.net.Socket)
//< needs(org.nodejs.buffer.Buffer)
//< needs(org.nodejs.http.ServerResponse)
//< needs(org.nodejs.http.IncomingMessage)
.inherits('org.nodejs.http.OutgoingMessage')
.props({
	/**
	 * 
	 */
	//> public
	event: vjo.otype().defs({
		/**
		 * function (response) { }
		 * <p>
		 * Emitted when a response is received to this request. This event is emitted only 
		 * once. The response argument will be an instance of http.ClientResponse.
		 * <p>
		 * Options:
		 * <ul>
		 * <li>host: A domain name or IP address of the server to issue the request to.
		 * <li>port: Port of remote server.
		 * <li>socketPath: Unix Domain Socket (use one of host:port or socketPath)
		 * </ul>
		 */
		//> public void response(IncomingMessage response)
		response: vjo.NEEDS_IMPL,
		
		/**
		 * function (socket) { }
		 * <p>
		 * Emitted after a socket is assigned to this request.
		 */
		//> public void socket(Socket socket)
		socket: vjo.NEEDS_IMPL,
		
		/**
		 * function (response, socket, head) { }
		 * <p>
		 * Emitted each time a server responds to a request with a CONNECT method. If this 
		 * event isn't being listened for, clients receiving a CONNECT method will have their 
		 * connections closed.
		 * <p>
		 * A client server pair that show you how to listen for the connect event.
		 * <pre>
		 * var http = require('http');
		 * var net = require('net');
		 * var url = require('url');
		 * 
		 * // Create an HTTP tunneling proxy
		 * var proxy = http.createServer(function (req, res) {
		 *   res.writeHead(200, {'Content-Type': 'text/plain'});
		 *   res.end('okay');
		 * });
		 * 
		 * proxy.on('connect', function(req, cltSocket, head) {
		 *   // connect to an origin server
		 *   var srvUrl = url.parse('http://' + req.url);
		 *   var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, function() {
		 *      cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
		 *        'Proxy-agent: Node-Proxy\r\n' +
		 *        '\r\n');
		 *      srvSocket.write(head);
		 *      srvSocket.pipe(cltSocket);
		 *      cltSocket.pipe(srvSocket);
		 *    });
		 *  });
		 *  
		 *  // now that proxy is running
		 *  proxy.listen(1337, '127.0.0.1', function() {
		 *  // make a request to a tunneling proxy
		 *  var options = {
		 *    port: 1337,
		 *    hostname: '127.0.0.1',
		 *    method: 'CONNECT',
		 *    path: 'www.google.com:80'
		 *  };
		 *  
		 *  var req = http.request(options);
		 *  req.end();
		 *  
		 *  req.on('connect', function(res, socket, head) {
		 *    console.log('got connected!');
		 *    
		 *    // make a request over an HTTP tunnel
		 *    socket.write('GET / HTTP/1.1\r\n' +
		 *      'Host: www.google.com:80\r\n' +
		 *      'Connection: close\r\n' +
		 *      '\r\n');
		 *    socket.on('data', function(chunk) {
		 *      console.log(chunk.toString());
		 *    });
		 *    socket.on('end', function() {
		 *      proxy.close();
		 *    });
		 *  });
		 *});
		 * </pre>
		 */
		//> public void connect(ServerResponse response, Socket socket, {String | Buffer} head)
		connect: vjo.NEEDS_IMPL,
		
		/**
		 * function (response, socket, head) { }
		 * <p>
		 * Emitted each time a server responds to a request with an upgrade. If this event 
		 * isn't being listened for, clients receiving an upgrade header will have their 
		 * connections closed.
		 * <p>
		 * A client server pair that show you how to listen for the upgrade event.
		 * <pre>
		 * var http = require('http');
		 * // Create an HTTP server
		 * var srv = http.createServer(function (req, res) {
		 *   res.writeHead(200, {'Content-Type': 'text/plain'});
		 *   res.end('okay');
		 * });
		 * 
		 * srv.on('upgrade', function(req, socket, head) {
		 *   socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
		 *     'Upgrade: WebSocket\r\n' +
		 *     'Connection: Upgrade\r\n' +
		 *     '\r\n');
		 *     
		 *   socket.pipe(socket); // echo back
		 * });
		 * 
		 * // now that server is running
		 * srv.listen(1337, '127.0.0.1', function() {
		 *   // make a request
		 *   var options = {
		 *     port: 1337,
		 *     hostname: '127.0.0.1',
		 *     headers: {
		 *       'Connection': 'Upgrade',
		 *       'Upgrade': 'websocket'
		 *     }
		 *   };
		 *   
		 *   var req = http.request(options);
		 *   req.end();
		 *   
		 *   req.on('upgrade', function(res, socket, upgradeHead) {
		 *     console.log('got upgraded!');
		 *     socket.end();
		 *     process.exit(0);
		 *   });
		 * });
		 * </pre>
		 */
		//> public void upgrade(ServerResponse response, Socket socket, {String | Buffer} head)
		upgrade: vjo.NEEDS_IMPL,
		
		/**
		 * function () { }
		 * <p>
		 * Emitted when the server sends a '100 Continue' HTTP response, usually because 
		 * the request contained 'Expect: 100-continue'. This is an instruction that the 
		 * client should send the request body.
		 */
		//> public void continue()
		continue: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	/**
	 * 
	 */
	//> public http.ClientRequest constructs(Socket socket, String method, String url, Object headers)
	constructs: function() {},
	
	// In super
	// write: vjo.NEEDS_IMPL,
	
	// In super
	// end: vjo.NEEDS_IMPL,
	
	// In super
	// abort: vjo.NEEDS_IMPL
	
	/**
	 * Once a socket is assigned to this request and is connected socket.setTimeout() will 
	 * be called.
	 */
	//> public void setTimeout(int timeoutInMillis, Function? callback)
	setTimeout: vjo.NEEDS_IMPL,
	
	/**
	 * Once a socket is assigned to this request and is connected socket.setNoDelay() will 
	 * be called.
	 */
	//> public void setNoDelay(boolean? noDelay)
	setNoDelay: vjo.NEEDS_IMPL,
	
	/**
	 * Once a socket is assigned to this request and is connected socket.setKeepAlive() 
	 * will be called.
	 */
	//> public void setSocketKeepAlive(boolean? enable, int? initialDelayInMillis)
	setSocketKeepAlive: vjo.NEEDS_IMPL,
	
	//------------------------------------------------------------------------------------
	// EventEmitter overrides to return correct type so you can use chain-style functions.
	// *** NOTE *** Do not modify these separately as they are literally copied from the
	// org.nodejs.events.EventEmitter type.  Later when we have a way to return the target
	// type of a mixin will allow us to factor all this copying away...
	//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
		/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public ClientRequest ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public ClientRequest ^on(String type, Function listener)
	on: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a one time listener for the event. This listener is invoked only the 
	 * next time the event is fired, after which it is removed.
	 * <pre>
	 * server.once('connection', function (stream) {
	 *   console.log('Ah, we have our first user!');
	 * });
	 * </pre>
	 */
	//> public ClientRequest ^once(String event, Function listener)
	once: vjo.NEEDS_IMPL,
	
	/**
	 * Remove a listener from the listener array for the specified event. 
	 * <p>
	 * Caution: changes array indices in the listener array behind the listener.
	 * <pre>
	 * var callback = function(stream) {
	 *   console.log('someone connected!');
	 * };
	 * server.on('connection', callback);
	 * // ...
	 * server.removeListener('connection', callback);
	 * </pre>
	 */
	//> public ClientRequest removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public ClientRequest removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()