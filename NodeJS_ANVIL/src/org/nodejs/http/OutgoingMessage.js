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
 * Not formally exported by Node.js
 * <p>
 * Code is from manual inspection of http.js in Node.js distro.
 */
 vjo.ctype('org.nodejs.http.OutgoingMessage') //< public
//< needs(org.nodejs.buffer.Buffer)
.inherits('org.nodejs.stream')
.protos({	
	/**
	 * 
	 */
	output: null,  //< public Array
	
	/**
	 * 
	 */
	outputEncodings: null, //< public Array
	
	/**
	 * 
	 */
	writable: null, //< public boolean
	
	/**
	 * 
	 */
	chunkedEncoding: null, //< public boolean
	
	/**
	 * 
	 */
	shouldKeepAlive: null, //< public boolean
	
	/**
	 * 
	 */
	useChunkedEncodingByDefault: null, //< public boolean
	
	/**
	 * 
	 */
	sendDate: null,  //< public boolean
	
	/**
	 * 
	 */
	finished: null,  //< public boolean
	
	socket: null,	//< public Object ; TODO: get correct type
	
	connection: null, //< public Object ; TODO: get correct type
		
	/**
	 * 
	 */
	//> public void destroy(Error? error)
	destroy: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public void setHeader(String name, Object value)
	setHeader: vjo.NEEDS_IMPL,
	
	/**
	 * Reads out a header that's already been queued but not sent to the client. Note that 
	 * the name is case insensitive. This can only be called before headers get implicitly 
	 * flushed.
	 * <p>
	 * Example:
	 * <pre>
	 * var contentType = response.getHeader('content-type');
	 * </pre>
	 */
	//> public String getHeader(String name)
	getHeader: vjo.NEEDS_IMPL,
	
	/**
	 * Removes a header that's queued for implicit sending.
	 * <p>
	 * Example:
	 * <pre>
	 * response.removeHeader("Content-Encoding");
	 * </pre>
	 */
	//> public void removeHeader(String name)
	removeHeader: vjo.NEEDS_IMPL,
	
	/**
	 * Boolean (read-only). True if headers were sent, false otherwise.
	 */
	//> public boolean
	headersSent: null,
	
	/**
	 * If this method is called and response.writeHead() has not been called, it will switch 
	 * to implicit header mode and flush the implicit headers.
	 * <p>
	 * This sends a chunk of the response body. This method may be called multiple times to 
	 * provide successive parts of the body.
	 * <p>chunk can be a string or a buffer. If chunk is a string, the second parameter 
	 * specifies how to encode it into a byte stream. 
	 * <p>By default the encoding is 'utf8'.
	 * <p>
	 * Note: This is the raw HTTP body and has nothing to do with higher-level multi-part 
	 * body encodings that may be used.
	 * <p>The first time response.write() is called, it will send the buffered header 
	 * information and the first body to the client. The second time response.write() is 
	 * called, Node assumes you're going to be streaming data, and sends that separately. 
	 * That is, the response is buffered up to the first chunk of body.
	 * <p>
	 * Returns true if the entire data was flushed successfully to the kernel buffer. Returns 
	 * false if all or part of the data was queued in user memory. 'drain' will be emitted 
	 * when the buffer is again free.
	 */
	//> public boolean write({String | Buffer} chunk, String? encoding)
	write: vjo.NEEDS_IMPL,
	
	/**
	 * This method adds HTTP trailing headers (a header but at the end of the message) to 
	 * the response.
	 * <p>
	 * Trailers will only be emitted if chunked encoding is used for the response; if it is 
	 * not (e.g., if the request was HTTP/1.0), they will be silently discarded.
	 * <p>
	 * Note that HTTP requires the Trailer header to be sent if you intend to emit trailers, 
	 * with a list of the header fields in its value. E.g.,
	 * <pre>
	 * response.writeHead(200, { 
	 *   'Content-Type': 'text/plain',
	 *   'Trailer': 'Content-MD5' 
	 * });
	 * response.write(fileData);
	 * response.addTrailers({'Content-MD5': "7895bf4b8828b55ceaf47747b4bca667"});
	 * response.end();
	 * </pre>
	 */
	//> public void addTrailers(Object headers)
	addTrailers: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public boolean end({String | Buffer}? chunk, String? encoding)
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
	//> public OutgoingMessage ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public OutgoingMessage ^on(String type, Function listener)
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
	//> public OutgoingMessage ^once(String event, Function listener)
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
	//> public OutgoingMessage removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public OutgoingMessage removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType();