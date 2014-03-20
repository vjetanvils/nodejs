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
 * version: 0.10.3
 * <p>
 * Stability: 2 - Unstable
 * <p>
 * A duplex stream is just a stream that is both readable and writable.
 * <p>
 * Since JS doesn't have multiple prototypal inheritance, this class prototypically inherits 
 * from Readable, and then parasitically from Writable.
 */
vjo.ctype('org.nodejs.stream.Duplex') //< public
//< needs(org.nodejs.buffer.Buffer)
.inherits('org.nodejs.stream.Readable')
//
// *** For now we just copy Writable capabilities and can refactor later with Mixin?
//
.props({
	//> public ; *** NOTE: These are a direct copy from Writable!
	event: vjo.otype().defs({
		/**
		 * function () { }
		 * <p>
		 * Emitted when the stream's write queue empties and it's safe to write without buffering again. 
		 * Listen for it when stream.write() returns false.
		 * <p>
		 * The 'drain' event can happen at any time, regardless of whether or not stream.write() has previously 
		 * returned false. To avoid receiving unwanted 'drain' events, listen using stream.once().
		 */
		//> public void drain()
		 drain: vjo.NEEDS_IMPL,	 
					
		/**
		 * function () { }
		 * <p>Emitted when the underlying file descriptor has been closed.
		 */
		//> public void close()
		close: vjo.NEEDS_IMPL,
		
		/**
		 * When end() is called and there are no more chunks to write, this event is emitted.
		 */
		//> public void finish()
		finish: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted when the stream is passed to a readable stream's pipe method.
		 */
		//> public void pipe(Readable? stream)
		pipe: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted when a previously established pipe() is removed using the source Readable 
		 * stream's unpipe() method.
		 */
		//> public void unpipe(Readable? stream)
		unpipe: vjo.NEEDS_IMPL
		
//		/**
//		 * function (exception) { }
//		 * <p>Emitted on error with the exception exception.
//		 */
//		//> public void error(Error? exception)
//		error: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	// *** NOTE: ALL these are a direct copy from Writable!
	
	/**
	 * All Writable stream implementations must provide a _write method to send data to 
	 * the underlying resource.
	 * <p>
	 * Note: This function MUST NOT be called directly. It should be implemented by child 
	 * classes, and called by the internal Writable class methods only.
	 */
	//> public void _write({String | Buffer} chunk, String encoding, (void f(Error? err))? callback)
	_write: vjo.NEEDS_IMPL,
	
//	/**
//	 * A boolean that is true by default, but turns false after an 'error' occurred 
//	 * or end() / destroy() was called.
//	 */
//	//> public boolean
//	writeable: null,
	
	/**
	 * Writes string with the given encoding to the stream. Returns true if the string has 
	 * been flushed to the kernel buffer. Returns false to indicate that the kernel buffer 
	 * is full, and the data will be sent out in the future. The 'drain' event will indicate 
	 * when the kernel buffer is empty again. The encoding defaults to 'utf8'.
	 */
	//> public boolean write({String | Buffer}, String encoding, (void f())? callback)
	//> public boolean write({String | Buffer}, (void f())? callback)
	write: vjo.NEEDS_IMPL,
	
	/**
	 * Call this method to signal the end of the data being written to the stream.
	 */
	//> public void end({String | Buffer}? chunk, String? encoding, (void f())? callback)
	//> public void end({String | Buffer} chunk, (void f()) callback)
	end: vjo.NEEDS_IMPL,
	
	
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
	//> public Duplex ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Duplex ^on(String type, Function listener)
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
	//> public Duplex ^once(String event, Function listener)
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
	//> public Duplex removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Duplex removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType();