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
 * This object is created internally by a HTTP server -- not by the user -- and passed as 
 * the first argument to a 'request' listener.
 * <p>
 * The request implements the Readable Stream interface and is an EventEmitter.
 */
vjo.ctype('org.nodejs.http.ServerRequest') //< public
//< needs(org.nodejs.net.Socket)
.inherits('org.nodejs.http.IncomingMessage')
.props({	
	//> public 
	event: vjo.otype().defs({
		/**
		 * function (chunk) { }
		 * <p>
		 * Emitted when a piece of the message body is received. The chunk is a string if 
		 * an encoding has been set with request.setEncoding(), otherwise it's a Buffer.
		 * <p>
		 * Note that the data will be lost if there is no listener when a ServerRequest emits 
		 * a 'data' event.
		 */
		//> public void chunk()	
		data: vjo.NEEDS_IMPL,
		
		/**
		 * function () { }
		 * <p>
		 * Emitted exactly once for each request. After that, no more 'data' events will be 
		 * emitted on the request.
		 */
		//> public void end()
		end: vjo.NEEDS_IMPL,
		
		/**
		 * function () { }
		 * <p>
		 * Indicates that the underlaying connection was terminated before response.end() 
		 * was called or able to flush.
		 * <p>
		 * Just like 'end', this event occurs only once per request, and no more 'data' 
		 * events will fire afterwards.
		 * <p>
		 * Note: 'close' can fire after 'end', but not vice versa.
		 */
		//> public void close()
		close: vjo.NEEDS_IMPL	
	}).endType(),
	
	data: vjo.otype().defs({ //< public
	
		/**
		 * 
		 */
		create: {			//< public
			/**
			 * 
			 */
			fd: null,		//< public int?		
			
			/**
			 * 
			 */
			type: null,		//< public String?	
			
			/**
			 * 
			 */
			allowHalfOpen: null	//< public boolean?
		}
	}).endType()
})
.protos({
// MrP - in IncomingMessage
//	/**
//	 * The request method as a string. Read only. Example: 'GET', 'DELETE'.
//	 */
//	//> public final String
//	method: '',

// MrP - in IncomingMessage
//	/**
//	 * Request URL string. This contains only the URL that is present in the actual HTTP request. 
//	 * If the request is:
//	 * <p>
//	 * GET /status?name=ryan HTTP/1.1\r\n
//	 * Accept: text/plain\r\n
//	 * \r\n
//	 * <p>
//	 * Then request.url will be:
//	 * <p>
//	 * '/status?name=ryan'
//	 * <p>
//	 * If you would like to parse the URL into its parts, you can use require('url').parse(request.url). Example:
//	 * <pre>
//	 * node> require('url').parse('/status?name=ryan')
//	 * { href: '/status?name=ryan',
//	 *   search: '?name=ryan',
//	 *   query: 'name=ryan',
//	 *   pathname: '/status' }
//	 * </pre>
//	 * <p>
//	 * If you would like to extract the params from the query string, you can use the require('querystring').parse 
//	 * function, or pass true as the second argument to require('url').parse. Example:
//	 * <pre>
//	 * node> require('url').parse('/status?name=ryan', true)
//	 * { href: '/status?name=ryan',
//	 *   search: '?name=ryan',
//	 *   query: { name: 'ryan' },
//	 *   pathname: '/status' }
//	 * </pre>
//	 */
//	//> public String
//	url: null,

// MrP - in IncomingMessage
//	/**
//	 * Read only map of header names and values. Header names are lower-cased. Example:
//	 * <p>
//	 * // Prints something like:
//	 * //
//	 * // { 'user-agent': 'curl/7.22.0',
//	 * //   host: '127.0.0.1:8000',
//	 * //   accept: '* /*' }
//	 * console.log(request.headers);
//	 */
//	//> public Object ; Map<String, String> - Make this an ObjectLiteral type (maybe expand for common headers)
//	headers: null,

// MrP - in IncomingMessage
//	/**
//	 * Read only; HTTP trailers (if present). Only populated after the 'end' event.
//	 */
//	//> public final String
//	trailers: '',
	
// MrP - in IncomingMessage
//	/**
//	 * The HTTP protocol version as a string. Read only. Examples: '1.1', '1.0'. Also 
//	 * request.httpVersionMajor is the first integer and request.httpVersionMinor is 
//	 * the second.
//	 */
//	//> public String
//	httpVersion: null,
	
	/**
	 * Set the encoding for the request body. See stream.setEncoding() for more information.
	 */
	//> public void setEncoding(String? encoding)
	setEncoding: vjo.NEEDS_IMPL,
	
	/**
	 * Pauses request from emitting events. Useful to throttle back an upload.
	 */
	//> public void pause()
	pause: vjo.NEEDS_IMPL,
	
	/**
	 * Resumes a paused request.
	 */
	//> public void resume()
	resume: vjo.NEEDS_IMPL,
	
// MrP - in IncomingMessage
//	/**
//	 * The net.Socket object associated with the connection.
//	 * <p>
//	 * With HTTPS support, use request.connection.verifyPeer() and request.connection.getPeerCertificate() 
//	 * to obtain the client's authentication details.
//	 */
//	//> public Socket 
//	connection: null

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
	//> public ServerRequest ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public ServerRequest ^on(String type, Function listener)
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
	//> public ServerRequest ^once(String event, Function listener)
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
	//> public ServerRequest removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public ServerRequest removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()