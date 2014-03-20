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
 * This is a stream on top of the Encrypted stream that makes it possible to read/write 
 * an encrypted data as a cleartext data.
 * <p>
 * This instance implements a duplex Stream interfaces. It has all the common stream 
 * methods and events.
 * <p>
 * A ClearTextStream is the clear member of a SecurePair object.
 */
vjo.ctype('org.nodejs.tls.CleartextStream') //< public
.inherits('org.nodejs.tls.CryptoStream')
.props({
	//> public
	data: vjo.otype().defs({
		cipherNameVer: { 	//< public
			name: null,	 	//< public String
			version: null 	//< public String
		},
		
		address: {			//< public
			port: null,		//< public int
			family: null,	//< public String
			address: null	//< public String
		},
		
		certPiece: {		//< public
			C: null,		//< public String?
			ST: null,		//< public String?
			O: null,		//< public String?
			OU: null,		//< public String?
			CN: null		//< public String?
		},
		
		certProperties: {		//< public 
			subject: null,		//< public CleartextStream.data.certPiece?
			issuer: null,		//< public CleartextStream.data.certPiece?
			valid_from: null,	//< public String?
			valid_to: null,		//< public String?
			fingerprint: null	//< public String?
		}
	}).endType(),
	
	//> public
	event: vjo.otype().defs({
		/**
		 * This event is emitted after a new connection has been successfully handshaked. 
		 * The listener will be called no matter if the server's certificate was authorized 
		 * or not. It is up to the user to test cleartextStream.authorized to see if the 
		 * server certificate was signed by one of the specified CAs. If 
		 * cleartextStream.authorized === false then the error can be found in 
		 * cleartextStream.authorizationError. Also if NPN was used - you can check 
		 * cleartextStream.npnProtocol for negotiated protocol.
		 */
		secureConnect: vjo.NEEDS_IMPL	//< public void secureConnect()
	}).endType()
})
.protos({
	/**
	 * A boolean that is true if the peer certificate was signed by one of the specified 
	 * CAs, otherwise false
	 */
	authorized: null,	//< public boolean
	
	/**
	 * The reason why the peer's certificate has not been verified. This property becomes 
	 * available only when cleartextStream.authorized === false.
	 */
	authorizationError: null,	//< public String
	
	/**
	 * Returns an object representing the peer's certificate. The returned object has some 
	 * properties corresponding to the field of the certificate.
	 * <p>
	 * Example:
	 * <pre>
	 * { subject: 
	 *  { C: 'UK',
	 *    ST: 'Acknack Ltd',
	 *    L: 'Rhys Jones',
	 *    O: 'node.js',
	 *    OU: 'Test TLS Certificate',
	 *    CN: 'localhost' 
	 *   },
	 * issuer: 
	 *   { C: 'UK',
	 *     ST: 'Acknack Ltd',
	 *     L: 'Rhys Jones',
	 *     O: 'node.js',
	 *     OU: 'Test TLS Certificate',
	 *     CN: 'localhost' 
	 *  },
	 *  valid_from: 'Nov 11 09:52:22 2009 GMT',
	 *  valid_to: 'Nov  6 09:52:22 2029 GMT',
	 *  fingerprint: '2A:7A:C2:DD:E5:F9:CC:53:72:35:99:7A:02:5A:71:38:52:EC:8A:DF' 
	 * }
	 * </pre>
	 * If the peer does not provide a certificate, it returns null or an empty object.
	 */
	getPeerCertificate: vjo.NEEDS_IMPL, //< public CleartextStream.data.certProperties getPeerCertificate()
	
	/**
	 * Returns an object representing the cipher name and the SSL/TLS protocol version of
	 * the current connection.
	 * <p>
	 * Example: { name: 'AES256-SHA', version: 'TLSv1/SSLv3' }
	 * <p>
	 * See SSL_CIPHER_get_name() and SSL_CIPHER_get_version() in 
	 * http://www.openssl.org/docs/ssl/ssl.html#DEALING_WITH_CIPHERS for more information.
	 */
	getCipher: vjo.NEEDS_IMPL, //< public org.nodejs.tls.CleartextStream.data.cipherNameVer getCipher()
	
	/**
	 * Returns the bound address, the address family name and port of the underlying socket 
	 * as reported by the operating system. Returns an object with three properties, e.g. 
	 * { port: 12346, family: 'IPv4', address: '127.0.0.1' }
	 */
	address: vjo.NEEDS_IMPL, //< public CleartextStream.data.address address()
	
	/**
	 * The string representation of the remote IP address. For example, '74.125.127.100' 
	 * or '2001:4860:a005::68'.
	 */
	remoteAddress: null, //< public String
	
	/**
	 * The numeric representation of the remote port. For example, 443.
	 */
	remotePort: null, //< public int
	
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
	//> public CleartextStream ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public CleartextStream ^on(String type, Function listener)
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
	//> public CleartextStream ^once(String event, Function listener)
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
	//> public CleartextStream removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public CleartextStream removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()