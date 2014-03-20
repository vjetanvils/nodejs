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
vjo.ctype('org.nodejs.crypto.Decipher') //< public
//< needs(org.nodejs.buffer.Buffer)
.inherits('org.nodejs.stream.Transform')
.protos({
	/**
	 * Updates the decipher with data, which is encoded in 'binary', 'base64' or 'hex'. 
	 * Defaults to 'binary'.
	 * <p>
	 * The output_decoding specifies in what format to return the deciphered plaintext: 
	 * 'binary', 'ascii' or 'utf8'. Defaults to 'binary'..
	 */
	//> public Decipher update({String | Buffer} data, String? input_encoding, String? output_encoding)
	update: vjo.NEEDS_IMPL,
	
	/**
	 * Returns any remaining plaintext which is deciphered, with output_encoding being one 
	 * of: 'binary', 'ascii' or 'utf8'. Defaults to 'binary'.
	 * <p>
	 * Note: decipher object can not be used after final() method been called.
	 */
// TODO: MrP - Need to be able to allow reservered words as properties/functions names
	//> public {String | Buffer} final_(String? output_encoding)
	final: vjo.NEEDS_IMPL,
	
	/**
	 * You can disable auto padding if the data has been encrypted without standard block 
	 * padding to prevent decipher.final from checking and removing it. Can only work if 
	 * the input data's length is a multiple of the ciphers block size. You must call this 
	 * before streaming data to decipher.update.
	 */
	//> public Decipher setAutoPadding(boolean? auto_padding)
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
	//> public Decipher ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Decipher ^on(String type, Function listener)
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
	//> public Decipher ^once(String event, Function listener)
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
	//> public Decipher removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Decipher removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()