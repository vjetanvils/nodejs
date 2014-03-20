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
 * This class is a subclass of net.Server and has the same methods on it. Instead of accepting 
 * just raw TCP connections, this accepts encrypted connections using TLS or SSL.
 */
vjo.ctype('org.nodejs.tls.Server') //< public
//< needs(org.nodejs.tls.SecurePair)
//.needs('org.nodejs.net.Server', 'NETServer')
.inherits('org.nodejs.net.Server')
.props({
	/**
	 * This is a constructor for the tls.Server class. The options object 
	 * has these possibilities:
	 * <p>
	 * key: A string or Buffer containing the private key of the server 
	 * in PEM format. (Required)
	 * <p>
	 * cert: A string or Buffer containing the certificate key of the 
	 * server in PEM format. (Required)
	 * <p>
	 * ca: An array of strings or Buffers of trusted certificates. If 
	 * this is omitted several well known "root" CAs will be used, like 
	 * VeriSign. These are used to authorize connections.
	 * <p>
	 * requestCert: If true the server will request a certificate from 
	 * clients that connect and attempt to verify that certificate. Default: false.
	 * <p>
	 * rejectUnauthorized: If true the server will reject any connection 
	 * which is not authorized with the list of supplied CAs. This option 
	 * only has an effect if requestCert is true. Default: false.
	 */
	//> public
	data: vjo.otype().defs({
		//> needs(org.nodejs.buffer.Buffer)
		/**
		 * 
		 */
		credentials: {	//< public			
			/**
			 * A string or Buffer containing the private key of the client in aPEM format. 
			 */			
			key: null,	//< public {String | Buffer}?			 
			
			/**
			 * A string or Buffer containing the certificate key of the client in a PEM format; 
			 * in other words, the public x509 certificate to use.
			 */			
			cert: null,	//< public {String | Buffer}?		 
			
			/**
			 * An array of strings or Buffers of trusted certificates. These are used to 
			 * authorize connections. If this is omitted, several "well-known root" CAs 
			 * will be used, like VeriSign.
			 */		
			ca: null 	//< {String[] | Buffer[]}?
		},
		/**
		 * 
		 */
		//> public void work(String)
		work: vjo.NEEDS_IMPL 
	}).endType(),
	
	func: vjo.otype().defs({
		/**
		 * Used by the resumeSession event.
		 */
		//> public void resumeSessionCb(Error? error, Object? sessionData)
		resumeSessionCb: vjo.NEEDS_IMPL
	}).endType(),
	
	/**
	 * 
	 */
	//> public
	event: vjo.otype().defs({
		/**
		 * function (cleartextStream) {}
		 * <p>
		 * This event is emitted after a new connection has been successfully handshaked. 
		 * The argument is a instance of CleartextStream. It has all the common stream methods 
		 * and events.
		 * <p>
		 * cleartextStream.authorized is a boolean value which indicates if the client has 
		 * verified by one of the supplied certificate authorities for the server. If 
		 * cleartextStream.authorized is false, then cleartextStream.authorizationError is 
		 * set to describe how authorization failed. Implied but worth mentioning: depending 
		 * on the settings of the TLS server, you unauthorized connections may be accepted. 
		 * <p>
		 * cleartextStream.npnProtocol is a string containing selected NPN protocol. 
		 * <p>cleartextStream.servername is a string containing servername requested with SNI.
		 */
		//> public void secureConnection(org.nodejs.tls.CleartextStream? cleartextStream)
		secureConnection: vjo.NEEDS_IMPL,
		
		/**
		 * function (exception) { }
		 * <p>
		 * When a client connection emits an 'error' event before secure connection is 
		 * established - it will be forwarded here.
		 */
		//> public void clientError(Error? err, SecurePair? securePair)
		clientError: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted on creation of TLS session. May be used to store sessions in external storage.
		 */
		//> public void newSession(String sessionId, Object sessionData)
		newSession: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted when client wants to resume previous TLS session. Event listener may perform 
		 * lookup in external storage using given sessionId, and invoke callback(null, sessionData) 
		 * once finished. If session can't be resumed (i.e. doesn't exist in storage) one 
		 * may call callback(null, null). Calling callback(err) will terminate incoming 
		 * connection and destroy socket.
		 */
		//> public void resumeSession(String sessionId, tls.func:resumeSessionCb? callback)
		resumeSession: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	// In super
	// listen: vjo.NEEDS_IMPL,
	
	// In super
	// close: vjo.NEEDS_IMPL,
	
	// In supper
	// address: vjo.NEEDS_IMPL,
	
	//> public int addContext(String hostName, org.nodejs.tls.Server.data.credentials creds)
	addContext: vjo.NEEDS_IMPL,
	
	// In super
	// maxConnections: null,
	
	// In super
	// connections null
	
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
	//> public org.nodejs.tls.Server ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public org.nodejs.tls.Server ^on(String type, Function listener)
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
	//> public org.nodejs.tls.Server ^once(String event, Function listener)
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
	//> public org.nodejs.tls.Server removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public org.nodejs.tls.Server removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()