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
 * The class for creating Diffie-Hellman key exchanges.
 * <p>
 * Returned by crypto.createDiffieHellman.
 */
vjo.ctype('org.nodejs.crypto.DiffieHellman') //< public
//< needs(org.nodejs.buffer.Buffer)
.props({ })
.protos({
	/**
	 * Generates private and public Diffie-Hellman key values, and returns the public key 
	 * in the specified encoding. This key should be transferred to the other party. 
	 * Encoding can be 'binary', 'hex', or 'base64'. Defaults to 'binary'.
	 */
	//> public String generateKeys(String? encoding)
	generateKeys: vjo.NEEDS_IMPL,
	
	/**
	 * Computes the shared secret using other_public_key as the other party's public key 
	 * and returns the computed shared secret. Supplied key is interpreted using specified 
	 * input_encoding, and secret is encoded using specified output_encoding. Encodings 
	 * can be 'binary', 'hex', or 'base64'. The input encoding defaults to 'binary'. If no 
	 * output encoding is given, the input encoding is used as output encoding.
	 */
	//> public String computeSecret({Buffer | String} other_public_key, String? input_encoding, String? output_encoding)
	computeSecret: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the Diffie-Hellman prime in the specified encoding, which can be 'binary', 
	 * 'hex', or 'base64'. Defaults to 'binary'.
	 */
	//> public Buffer getPrime()
	//> public String getPrime(String encoding)
	getPrime: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the Diffie-Hellman prime in the specified encoding, which can be 'binary', 
	 * 'hex', or 'base64'. Defaults to 'binary'.
	 */
	//> public Buffer getGenerator()
	//> public String getGenerator(String encoding)
	getGenerator: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the Diffie-Hellman public key in the specified encoding, which can be 'binary', 
	 * 'hex', or 'base64'. If no encoding is provided, then a buffer is returned.
	 */
	//> public Buffer getPrivateKey()
	//> public String getPrivateKey(String encoding)
	getPublicKey: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the Diffie-Hellman public key in the specified encoding, which can be 
	 * 'binary', 'hex', or 'base64'. Defaults to 'binary'.
	 */
	//> public Buffer getPrivateKey()
	//> public String getPrivateKey(String encoding)
	getPrivateKey: vjo.NEEDS_IMPL,
	
	/**
	 * Sets the Diffie-Hellman public key. Key encoding can be 'binary', 'hex', or 'base64'. 
	 * Defaults to 'binary'.
	 */
	//> public DiffieHellman setPublicKey({String | Buffer} public_key, String? encoding)
	setPublicKey: vjo.NEEDS_IMPL,
	
	/**
	 * Sets the Diffie-Hellman private key. Key encoding can be 'binary', 'hex', or 'base64'. 
	 * Defaults to 'binary'.
	 */
	//> public DiffieHellman setPrivateKey({String | Buffer} private_key, String? encoding)
	setPrivateKey: vjo.NEEDS_IMPL,
	
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
	//> public DiffieHellman ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public DiffieHellman ^on(String type, Function listener)
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
	//> public DiffieHellman ^once(String event, Function listener)
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
	//> public DiffieHellman removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public DiffieHellman removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType();