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
 * This class is used to create a TCP or UNIX server. A server is a net.Socket that can 
 * listen for new incoming connections.
 */
vjo.ctype('org.nodejs.net.Server') //< public
//< needs(org.nodejs.net.Socket)
.inherits('org.nodejs.net.Socket')
.props({	
	func: vjo.otype().defs({
		/**
		 * Callback for getConnections()
		 */
		//> public void getConnectionsCb(Error? err, int? count)
		getConnectionsCb: vjo.NEEDS_IMPL
	}).endType(),
	
	/**
	 * 
	 */
	//> public
	event: vjo.otype().defs({
		/**
		 * Emitted when the server has been bound after calling server.listen.
		 */
		//> public void listening()
		listening: vjo.NEEDS_IMPL,
		
		/**
		 * function (socket) {}
		 * <p>
		 * Emitted when a new connection is made. socket is an instance of 
		 * net.Socket.
		 */
		//> public void connection(Socket socket)
		connection: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted when the server closes. Note that if connections exist, this event is 
		 * not emitted until all connections are ended.
		 */
		//> public void close()
		close: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted when an error occurs. The 'close' event will be called directly 
		 * following this event. See example in discussion of server.listen.
		 */
		//> public void error(Error error)
		error: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	/**
	 * Begin accepting connections on the specified port and host. If the host is omitted, 
	 * the server will accept connections directed to any IPv4 address (INADDR_ANY). A port 
	 * value of zero will assign a random port.
	 * <p>
	 * Backlog is the maximum length of the queue of pending connections. The actual length 
	 * will be determined by your OS through sysctl settings such as tcp_max_syn_backlog and 
	 * somaxconn on linux. The default value of this parameter is 511 (not 512).
	 * <p>
	 * This function is asynchronous. When the server has been bound, 'listening' event will 
	 * be emitted. The last parameter callback will be added as an listener for the 'listening' 
	 * event.
	 * <p>
	 * One issue some users run into is getting EADDRINUSE errors. This means that another server 
	 * is already running on the requested port. One way of handling this would be to wait a 
	 * second and then try again. This can be done with:
	 * <pre>
	 * server.on('error', function (e) {
	 *   if (e.code == 'EADDRINUSE') {
	 *       console.log('Address in use, retrying...');
	 *       setTimeout(function () {
	 *          server.close();
	 *          server.listen(PORT, HOST);
	 *       }, 1000);
	 *    }
	 *  });
	 *  </pre>
	 *  (Note: All sockets in Node set SO_REUSEADDR already)
	 */
	// public void listen(int port, String? host, int? backlog, Function? callback)
	/**
	 * Start a UNIX socket server listening for connections on the given path.
	 * <p>
	 * This function is asynchronous. When the server has been bound, 'listening' event will 
	 * be emitted. The last parameter callback will be added as an listener for the 'listening' 
	 * event.
	 */
	// public void listen(String path, Function? callback)

	/**
	 * The handle object can be set to either a server or socket (anything with an underlying 
	 * _handle member), or a {fd: <n>} object.
	 * <p>
	 * This will cause the server to accept connections on the specified handle, but it is 
	 * presumed that the file descriptor or handle has already been bound to a port or domain 
	 * socket.
	 * <p>
	 * Listening on a file descriptor is not supported on Windows.
	 * <p>
	 * This function is asynchronous. When the server has been bound, 'listening' event will be 
	 * emitted. the last parameter callback will be added as an listener for the 'listening' event.
	 */
	//> public void listen(int port,      String host,       Function callback)
	//> public void listen(int port,      String? host,      int? backlog,     Function? callback)
	//> public void listen(String path,   Function? callback)
	//> public void listen(Object handle, Function? callback)
	listen: vjo.NEEDS_IMPL,
				
	/**
	 * Stops the server from accepting new connections and keeps existing connections. This 
	 * function is asynchronous, the server is finally closed when all connections are ended 
	 * and the server emits a 'close' event. Optionally, you can pass a callback to listen for 
	 * the 'close' event.
	 */
	//> public void close(Function? callback)
	close: vjo.NEEDS_IMPL,			 

// MrP - in super net.Socket
//	/**
//	 * Returns the bound address, the address family name and port of the server as reported by 
//	 * the operating system. Useful to find which port was assigned when giving getting an 
//	 * OS-assigned address. Returns an object with three properties, e.g. 
//	 * { port: 12346, family: 'IPv4', address: '127.0.0.1' }
//	 * <p>
//	 * Example:
//	 * <pre>
//	 * var server = net.createServer(function (socket) {
//	 *   socket.end("goodbye\n");
//	 * });
//	 * // grab a random port.
//	 * server.listen(function() {
//	 *   address = server.address();
//	 *   console.log("opened server on %j", address);
//	 * });
//	 * </pre>
//	 * Don't call server.address() until the 'listening' event has been emitted.
//	 */
//	//> public Server.data.address address()
//	address: vjo.NEEDS_IMPL,

// In super Socket
//	unref: vjo.NEEDS_IMPL,

// In super Socket
//	ref: vjo.NEEDS_IMPL,
	
	/**
	 * Set this property to reject connections when the server's connection count gets high.
	 * <p>
	 * It is not recommended to use this option once a socket has been sent to a child with 
	 * child_process.fork().
	 */			
	//> public int
	maxConnections: null,
	
	/**
	 * The number of concurrent connections on the server. Deprecated
	 * <p>
	 * This becomes null when sending a socket to a child with child_process.fork().
	 */
	//> public int
	connections: null,
	
	/**
	 * Asynchronously get the number of concurrent connections on the server. Works when 
	 * sockets were sent to forks.
	 * <p>
	 * Callback should take two arguments err and count.
	 */
	//> public void getConnections(Server.func:getConnectionsCb)
	getConnections: vjo.NEEDS_IMPL,
	
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
	//> public Server ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Server ^on(String type, Function listener)
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
	//> public Server ^once(String event, Function listener)
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
	//> public Server removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Server removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()