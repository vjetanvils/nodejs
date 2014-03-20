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
 * Class for encrypting data.
 * <p>
 * Returned by crypto.createCipher and crypto.createCipheriv.
 */
vjo.ctype('org.nodejs.crypto.Cipher') //< public
//< needs(org.nodejs.buffer.Buffer)
.inherits('org.nodejs.stream.Transform')
.protos({
	/**
	 * Updates the cipher with data, the encoding of which is given in input_encoding and 
	 * can be 'utf8', 'ascii' or 'binary'. Defaults to 'binary'.
	 * <p>
	 * The output_encoding specifies the output format of the enciphered data, and can be 
	 * 'binary', 'base64' or 'hex'. Defaults to 'binary'.
	 * <p>
	 * Returns the enciphered contents, and can be called many times with new data as it 
	 * is streamed.
	 */
	//> public {String | Buffer} update({String | Buffer}, String? input_encoding, String? output_encoding)
	update: vjo.NEEDS_IMPL,
	
	/**
	 * Returns any remaining enciphered contents, with output_encoding being one of: 
	 * 'binary', 'base64' or 'hex'. Defaults to 'binary'.
	 * <p>
	 * Note: cipher object can not be used after final() method been called.
	 */
// TODO: MrP - Need to be able to allow reservered words as properties/functions names
	//> public {String | Buffer} final_(String? output_encoding)
	final: vjo.NEEDS_IMPL,
	
	/**
	 * You can disable automatic padding of the input data to block size. If auto_padding 
	 * is false, the length of the entire input data must be a multiple of the cipher's 
	 * block size or final will fail. Useful for non-standard padding, e.g. using 0x0 
	 * instead of PKCS padding. You must call this before cipher.final.
	 */
	//> public Cipher setAutoPadding(boolean? auto_padding)
	setAutoPadding: vjo.NEEDS_IMPL,
	
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
	//> public Cipher ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Cipher ^on(String type, Function listener)
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
	//> public Cipher ^once(String event, Function listener)
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
	//> public Cipher removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Cipher removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()