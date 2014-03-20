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
 * Abstract base class for ServerRequest and ClientResponse
 * <p>
 * This type is not directly documented in the public node.js but is used as a base class
 * for other public types.  The contents of this type are from manual code inspection from
 * the Node.js distro.
 * <p>
 * This type inherits from stream.Readable
 */
vjo.ctype('org.nodejs.http.IncomingMessage') //< public
//< needs(org.nodejs.net.Socket)
.inherits('org.nodejs.stream.Readable')
.protos({
	/**
	 * The net.Socket object associated with the connection.
	 * <p>
	 * With HTTPS support, use request.connection.verifyPeer() and request.connection.getPeerCertificate() 
	 * to obtain the client's authentication details.
	 */
	socket: null, 	//< public Socket
	
//	/**
//	 * 
//	 */
//	connection: null, //< public Socket
	
	/**
	 * In case of server request, the HTTP version sent by the client. In the case of client 
	 * response, the HTTP version of the connected-to server. Probably either '1.1' or '1.0'.
	 * <p>
	 * Also response.httpVersionMajor is the first integer and response.httpVersionMinor 
	 * is the second.
	 */
	httpVersion: null, //< public String
	
	/**
	 * 
	 */
	complete: null,	 //< public boolean
	
	/**
	 * The request/response headers object.
	 * <p>
	 * Read only map of header names and values. Header names are lower-cased. Example:
	 * <p>
	 * Prints something like:
	 * <pre>
	 * { 'user-agent': 'curl/7.22.0',
	 *   host: '127.0.0.1:8000',
	 *   accept: '* /*'
	 * }
	 * console.log(request.headers);
	 * </pre>
	 */
	headers: null,	//< public Object	
	
	/**
	 * The request/response trailers object. Only populated after the 'end' event.
	 */
	trailers: null,  //< public Object
	
		 	
// MrP - already in super
//	/**
//	 * 
//	 */
//	readable: null,  //< public boolean

	/**
	 * Only valid for request obtained from http.Server.
	 * <p>
	 * Request URL string. This contains only the URL that is present in the actual HTTP 
	 * request. If the request is:
	 * <pre>
	 * GET /status?name=ryan HTTP/1.1\r\n
	 * Accept: text/plain\r\n
	 * \r\n
	 * 
	 * Then request.url will be:
	 * '/status?name=ryan'
	 * 
	 * If you would like to parse the URL into its parts, you can use 
	 * require('url').parse(request.url). 
	 * Example:
	 * node> require('url').parse('/status?name=ryan')
	 * { href: '/status?name=ryan',
	 *   search: '?name=ryan',
	 *   query: 'name=ryan',
	 *   pathname: '/status' 
	 * }
	 * 
	 * If you would like to extract the params from the query string, you can use the 
	 * require('querystring').parse function, or pass true as the second argument to 
	 * require('url').parse. 
	 * Example:
	 * node> require('url').parse('/status?name=ryan', true)
	 * { href: '/status?name=ryan',
	 *   search: '?name=ryan',
	 *   query: { name: 'ryan' },
	 *   pathname: '/status' 
	 * }
	 * </pre>
	 */
	url: null, 		//< public String
	
	/**
	 * Only valid for request obtained from http.Server.
	 * <p>
	 * The request method as a string. Read only. Example: 'GET', 'DELETE'.
	 */
	method: null, 	//< public String
	
	/**
	 * Only valid for response obtained from http.ClientRequest.
	 * <p>
	 * The 3-digit HTTP response status code. E.G. 404.
	 */
	statusCode: null,	//< public int
	
	/**
	 * 
	 */
	client: null,	//< public Socket

	/**
	 * 
	 */
	//> public void setTimeout(int msecs, Function callback)
	setTimeout: vjo.NEEDS_IMPL,
	 
// MrP - in super
//	 setEncoding: vjo.NEEDS_IMPL,
	 
// MrP - in super
//	pause: vjo.NEEDS_IMPL,

// MrP - in super
//	resume: vjo.NEEDS_IMPL,
	
// MrP - in super
//	destroy: vjo.NEEDS_IMPL,

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
	//> public IncomingMessage ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public IncomingMessage ^on(String type, Function listener)
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
	//> public IncomingMessage ^once(String event, Function listener)
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
	//> public IncomingMessage removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public IncomingMessage removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()
	