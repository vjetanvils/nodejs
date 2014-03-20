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
 * // Base class of both CleartextStream and EncryptedStream
 */
vjo.ctype('org.nodejs.tls.CryptoStream') //< public
//< needs(org.nodejs.buffer.Buffer)
//< needs(org.nodejs.tls.SecurePair)
.inherits('org.nodejs.stream.Duplex')
.protos({
	/**
	 * 
	 */
	//> public constructs(SecurePair pair)
	constructs: function() {},

// MrP: In super
//	/**
//	 * 
//	 */
//	//> public boolean write(Object data, String? encoding)
//	write: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public void pause()
	pause: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public void resume()
	resume: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public void setTimeout(int timeout)
	setTimeout: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public void setNoDelay()
	setNoDelay: vjo.NEEDS_IMPL,
	
	//> public void setKeepAlive(boolean enable, int initialDelay)
	setKeepAlive: vjo.NEEDS_IMPL,

// In super
//	/**
//	 * 
//	 */
//	//> public void setEncoding(String encoding)
//	setEncoding: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public Object getPeerCertificate()
	getPeerCertificate: vjo.NEEDS_IMPL,
	
	//> public Object getSession()
	getSession: vjo.NEEDS_IMPL,
	
	//> public boolean isSessionReused()
	isSessionReused: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public Object getCipher()
	getCipher: vjo.NEEDS_IMPL,

// In super
//	/**
//	 * 
//	 */
//	//> public void end(Object d)
//	end: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public boolean destroySoon(Error? error)
	destroySoon: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public boolean destroy(Error? error)
	destroy: vjo.NEEDS_IMPL,
	
//	/**
//	 * 
//	 */
//	//> public int
//	fd: null,

	//> public Function
	bytesWritten: null,
	
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
	//> public CryptoStream ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public CryptoStream ^on(String type, Function listener)
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
	//> public CryptoStream ^once(String event, Function listener)
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
	//> public CryptoStream removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public CryptoStream removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()