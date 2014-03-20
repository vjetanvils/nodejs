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
 * This object is created when making a request with http.request(). It is passed to the 
 * 'response' event of the request object.
 * <p>
 * The response implements the Readable Stream interface. This is an EventEmitter .
 */
vjo.ctype('org.nodejs.http.ClientResponse') //< public
//< needs(org.nodejs.stream.Readable)
.inherits('org.nodejs.http.IncomingMessage')
.props({ 
	/**
	 * 
	 */
	//> public
	event: vjo.otype().defs({
		/**
		 * function (chunk) { }
		 * <p>
		 * Emitted when a piece of the message body is received.
		 * <p>
		 * Note that the data will be lost if there is no listener when a ClientResponse 
		 * emits a 'data' event.
		 */
		//> public void data(String? chunk)
		data: vjo.NEEDS_IMPL,
		
		/**
		 * function () { }
		 * <p>
		 * Emitted exactly once for each response. After that, no more 'data' events will 
		 * be emitted on the response.
		 */
		//> public void end()
		end: vjo.NEEDS_IMPL,
		
		/**
		 * function () { }
		 * <p>
		 * Indicates that the underlaying connection was terminated before response.end() 
		 * was called or able to flush.
		 * <p>
		 * Just like 'end', this event occurs only once per response, and no more 'data' 
		 * events will fire afterwards. See [http.ServerResponse][]'s 'close' event for 
		 * more information.
		 * <p>
		 * Note: 'close' can fire after 'end', but not vice versa.
		 */
		//> public void close()
		close: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
// MrP - in IncomingMessage
//	/**
//	 * The 3-digit HTTP response status code. E.G. 404.
//	 */
//	//> public int
//	statusCode: null,

// MrP - in IncomingMessage
//	/**
//	 * The HTTP version of the connected-to server. Probably either '1.1' or '1.0'. 
//	 * Also response.httpVersionMajor is the first integer and 
//	 * response.httpVersionMinor is the second.
//	 */
//	//> public String
//	httpVersion: null,

// MrP - in IncomingMessage
//	/**
//	 * The response headers object
//	 */
//	//> public Object
//	headers: null,

// MrP - in IncomingMessage
//	/**
//	 * The response trailers object. Only populated after the 'end' event.
//	 */
//	//> public Object
//	trailers: null,
	
	/**
	 * Pauses response from emitting events. Useful to throttle back a download.
	 */
	//> public void pause()
	pause: vjo.NEEDS_IMPL,
	
	/**
	 * Resumes a paused response.
	 */
	//> public void resume()
	resume: vjo.NEEDS_IMPL,
	
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
	//> public ClientResponse ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public ClientResponse ^on(String type, Function listener)
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
	//> public ClientResponse ^once(String event, Function listener)
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
	//> public ClientResponse removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public ClientResponse removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()
	