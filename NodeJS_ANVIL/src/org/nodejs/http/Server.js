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
 * To use the HTTP server and client one must require('http').
 * <p>
 * The HTTP interfaces in Node are designed to support many features of the protocol which 
 * have been traditionally difficult to use. In particular, large, possibly chunk-encoded, 
 * messages. The interface is careful to never buffer entire requests or responses--the user 
 * is able to stream data.
 * <p>
 * HTTP message headers are represented by an object like this:
 * <pre>
 * { 'content-length': '123',
 *   'content-type': 'text/plain',
 *   'connection': 'keep-alive',
 *   'accept': '* / *'
 * }
 * </pre>
 * Keys are lowercased. Values are not modified.
 * <p>
 * In order to support the full spectrum of possible HTTP applications, Node's HTTP API is 
 * very low-level. It deals with stream handling and message parsing only. It parses a message 
 * into headers and body but it does not parse the actual headers or the body.
 */
vjo.ctype('org.nodejs.http.Server') //< public
//< needs(org.nodejs.net.Socket)
//< needs(org.nodejs.http.ServerRequest) 
//< needs(org.nodejs.http.ServerResponse)
//< needs(org.nodejs.buffer.Buffer)
.inherits('org.nodejs.net.Server')
.props({
	data: vjo.otype().defs({
		FD: {		//< public
			fd: 0	//< public int
		}
	}).endType(),
	
	/**
	 * 
	 */
	//> public
	event: vjo.otype().defs({						
		/**
		 * function (request, response) { }
		 * <p>
		 * Emitted each time there is a request. Note that there may be multiple requests 
		 * per connection (in the case of keep-alive connections). request is an instance 
		 * of http.ServerRequest and response is an instance of http.ServerResponse
		 */
		//> public void request(ServerRequest? request, ServerResponse? response)
		request: vjo.NEEDS_IMPL,
		
		/**
		 * function (socket) { }
		 * <p>
		 * When a new TCP stream is established. socket is an object of type net.Socket. Usually users will not 
		 * want to access this event. The socket can also be accessed at request.connection.
		 */
		//> public void connection(Socket? stream)
		connection: vjo.NEEDS_IMPL,
			
		/**
		 * function () { }
		 * <p>
		 * Emitted when the server closes.
		 */
		//> public void close() ; int? errorNo)
		close: vjo.NEEDS_IMPL,
		
		/**
		 * function (request, response) { }
		 * <p>
		 * Emitted each time a request with an http Expect: 100-continue is received. If this event isn't 
		 * listened for, the server will automatically respond with a 100 Continue as appropriate.
		 * <p>
		 * Handling this event involves calling response.writeContinue if the client should continue to send 
		 * the request body, or generating an appropriate HTTP response (e.g., 400 Bad Request) if the client 
		 * should not continue to send the request body.
		 * <p>
		 * Note that when this event is emitted and handled, the request event will not be emitted.
		 */
		//> public void checkContinue(ServerRequest? req, ServerResponse? resp)
		checkContinue: vjo.NEEDS_IMPL,
	
		/**
		 * function (request, socket, head) { }
		 * <p>
		 * Emitted each time a client requests a http CONNECT method. If this event isn't listened for, 
		 * then clients requesting a CONNECT method will have their connections closed.
		 * <p>
		 * request is the arguments for the http request, as it is in the request event.
		 * <p>
		 * socket is the network socket between the server and client.
		 * <p>
		 * head is an instance of Buffer, the first packet of the tunneling stream, this may be empty.
		 * <p>
		 * After this event is emitted, the request's socket will not have a data event listener, meaning 
		 * you will need to bind to it in order to handle data sent to the server on that socket.
		 */
		//> public void connect(ServerRequest? req, Socket? socket, Buffer? head)
		connect: vjo.NEEDS_IMPL,
		
		/**
		 * function (request, socket, head) { }
		 * <p>
		 * Emitted each time a client requests a http upgrade. If this event isn't listened for, then 
		 * clients requesting an upgrade will have their connections closed.
		 * <p>
		 * request is the arguments for the http request, as it is in the request event.
		 * <p>
		 * socket is the network socket between the server and client.
		 * <p>
		 * head is an instance of Buffer, the first packet of the upgraded stream, this may be empty.
		 * <p>
		 * After this event is emitted, the request's socket will not have a data event listener, meaning 
		 * you will need to bind to it in order to handle data sent to the server on that socket.
		 */
		//> public void upgrade(ServerRequest? req, Socket? socket, Buffer? head)
		upgrade: vjo.NEEDS_IMPL,
		 
		/**
		 * If a client connection emits an 'error' event - it will forwarded here
		 */
		//> public void clientError(Error err)
		clientError: vjo.NEEDS_IMPL	
	}).endType()
})
.protos({
	/**
	 * 
	 */
	//> public Server constructs(Function? requestListener)
	constructs: function() {
		
	},
	
	/**
	 * Begin accepting connections on the specified port and hostname. If the hostname is omitted, 
	 * the server will accept connections directed to any IPv4 address (INADDR_ANY).
	 * <p>
	 * To listen to a unix socket, supply a filename instead of port and hostname.
	 * <p>
	 * Backlog is the maximum length of the queue of pending connections. The actual length will be 
	 * determined by your OS through sysctl settings such as tcp_max_syn_backlog and somaxconn on linux. 
	 * The default value of this parameter is 511 (not 512).
	 * <p>
	 * This function is asynchronous. The last parameter callback will be added as a listener for the 
	 * 'listening' event. See also net.Server.listen(port).
	 */
	// public void listen(int port, String? host, int? backlog, Function? callback)
	/**
	 * Start a UNIX socket server listening for connections on the given path.
	 * <p>
	 * This function is asynchronous. The last parameter callback will be added as a listener for the 
	 * 'listening' event. See also net.Server.listen(path).
	 */
	// public void listen(String path, Function? callback)
	/**
	 * The handle object can be set to either a server or socket (anything with an underlying _handle member), 
	 * or a {fd: <n>} object.
	 * <p>
	 * This will cause the server to accept connections on the specified handle, but it is 
	 * presumed that the file descriptor or handle has already been bound to a port or domain 
	 * socket.
	 * <p>
	 * Listening on a file descriptor is not supported on Windows.
	 * <p>
	 * This function is asynchronous. The last parameter callback will be added as a listener 
	 * for the 'listening' event. See also net.Server.listen().
	 */
	//> public void listen(int port, String host, Function callback)
	//> public void listen(int port, String? host, int? backlog, Function? callback)
	//> public void listen(String path, Function? callback)
	//> public void listen({Server | Socket | org.nodejs.http.Server.data.FD | Object} handle, Function? callback) ; TODO: Expand handle better
	listen: vjo.NEEDS_IMPL,
				
	/**
	 * Stops the server from accepting new connections. See net.Server.close().
	 */
	//> public void close(Function? callback)
	close: vjo.NEEDS_IMPL,
	
	/**
	 * Limits maximum incoming headers count, equal to 1000 by default. If set to 0 - no 
	 * limit will be applied.
	 */
	//> public int maxHeadersCount
	maxHeadersCount: 0,
	
// In super	
//	setTimeout: vjo.NEEDS_IMPL,

	/**
	 * Number Default = 120000 (2 minutes)
	 * <p>
	 * The number of milliseconds of inactivity before a socket is presumed to have timed out.
	 * <p>
	 * Note that the socket timeout logic is set up on connection, so changing this value 
	 * only affects new connections to the server, not any existing connections.
	 * <p>
	 * Set to 0 to disable any kind of automatic timeout behavior on incoming connections.
	 */
	//> public Number timeout
	timeout: null,
	
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
	//> public org.nodejs.http.Server ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public org.nodejs.http.Server ^on(String type, Function listener)
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
	//> public org.nodejs.http.Server ^once(String event, Function listener)
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
	//> public org.nodejs.http.Server removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public org.nodejs.http.Server removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()