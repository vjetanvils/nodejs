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
 * This object is created internally by a HTTP server--not by the user. It is passed 
 * as the second parameter to the 'request' event.
 * <p>
 * The response implements the Writable Stream interface and is also an EventEmitter.
 */
 vjo.ctype('org.nodejs.http.ServerResponse') //< public
//< needs(org.nodejs.buffer.Buffer)
//< needs(org.nodejs.net.Socket)
//< needs(org.nodejs.http.Agent)
//< needs(org.nodejs.http.ClientRequest)
.inherits('org.nodejs.http.OutgoingMessage')
.props({
	//> public 
	event: vjo.otype().defs({
		/**
		 * function () { }
		 * <p>
		 * Indicates that the underlaying connection was terminated before response.end() 
		 * was called or able to flush.
		 */
		//> public void close()
		close: vjo.NEEDS_IMPL	
	}).endType(),
	
	//> public
	data: vjo.otype().defs({
		requestOptions: {	//< public
			/**
			 * A domain name or IP address of the server to issue the request to. Defaults 
			 * to 'localhost'.
			 */
			host: null, 	//< public String?
			
			/**
			 * To support url.parse() hostname is preferred over host
			 */
			hostName: null,	//< public String?
			
			/**
			 * Port of remote server. Defaults to 80.
			 */
			port: null,		//< public int?
			
			/**
			 * Local interface to bind for network connections.
			 */
			localAddress: null, //< public String?
			
			/**
			 * Unix Domain Socket (use one of host:port or socketPath)
			 */
			socketPath: null, 	//< public String?
			
			/**
			 * A string specifying the HTTP request method. Defaults to 'GET'.
			 */
			method: null,	//< public String?
			
			/**
			 * Request path. Defaults to '/'. Should include query string if any. E.G. 
			 * '/index.html?page=12'
			 */
			path: null,		//< public String?
			
			/**
			 * An object containing request headers.
			 */
			headers: null,	//< public Object?
			
			/**
			 * Basic authentication i.e. 'user:password' to compute an Authorization header.
			 */
			auth: null,		//< public String?
			
			/**
			 * Controls Agent behavior. When an Agent is used request will default to 
			 * Connection: keep-alive. Possible values:
			 * <ul>
			 * <li>undefined (default): use global Agent for this host and port.
			 * <li>Agent object: explicitly use the passed in Agent.
			 * <li> false: opts out of connection pooling with an Agent, defaults request 
			 * to Connection: close.
			 * </ul>
			 */
			agent: null		//< public {boolean | Agent}?
		}
	}).endType()
})
.protos({
//	/**
//	 * 
//	 */
//	//> public http.OutgoingMessage constructs(Socket socket)
//	constructs: function() {},
	
	/**
	 * Sends a HTTP/1.1 100 Continue message to the client, indicating that the request body 
	 * should be sent. See the 'checkContinue' event on Server.
	 */
	//> public void writeContinue()
	writeContinue: vjo.NEEDS_IMPL,
	
	/**
	 * Sends a response header to the request. The status code is a 3-digit HTTP status code, 
	 * like 404. The last argument, headers, are the response headers. Optionally one can 
	 * give a human-readable reasonPhrase as the second argument.
	 * <p>
	 * Example:
	 * <pre>
	 * var body = 'hello world';
	 * response.writeHead(200, {
	 *   'Content-Length': body.length,
	 *   'Content-Type': 'text/plain' 
	 * });
	 * </pre>
	 * This method must only be called once on a message and it must be called before 
	 * response.end() is called.
	 * <p>
	 * If you call response.write() or response.end() before calling this, the implicit/mutable 
	 * headers will be calculated and call this function for you.
	 * <p>
	 * Note: that Content-Length is given in bytes not characters. The above example works 
	 * because the string 'hello world' contains only single byte characters. If the body 
	 * contains higher coded characters then Buffer.byteLength() should be used to determine 
	 * the number of bytes in a given encoding. And Node does not check whether Content-Length 
	 * and the length of the body which has been transmitted are equal or not.
	 */
    //> public void writeHead(int statusCode, Object headers)
	//> public void writeHead(int statusCode, String? reasonPhrase, Object? headers)
	writeHead: vjo.NEEDS_IMPL, // TODO: MrP - should create some common Headers OL	
		
	/**
	 * Sets the Socket's timeout value to msecs. If a callback is provided, then it is added 
	 * as a listener on the 'timeout' event on the response object.
	 * <p>
	 * If no 'timeout' listener is added to the request, the response, or the server, then 
	 * sockets are destroyed when they time out. If you assign a handler on the request, 
	 * the response, or the server's 'timeout' events, then it is your responsibility to 
	 * handle timed out sockets.
	 */
	//> public void setTimeout(int msecs, Function callback)
	setTimeout: vjo.NEEDS_IMPL,
	
	/**
	 * When using implicit headers (not calling response.writeHead() explicitly), this property 
	 * controls the status code that will be sent to the client when the headers get flushed.
	 * <p>
	 * Example:
	 * <pre>
	 * response.statusCode = 404;
	 * </pre>
	 * After response header was sent to the client, this property indicates the status code 
	 * which was sent out.
	 */
	//> public int
	statusCode: null, 
	
	/**
	 * Sets a single header value for implicit headers. If this header already exists in the 
	 * to-be-sent headers, its value will be replaced. Use an array of strings here if you 
	 * need to send multiple headers with the same name.
	 * <p>
	 * Example:
	 * <pre>
	 * response.setHeader("Content-Type", "text/html");
	 *  // or
	 * response.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
	 * </pre>
	 */
	//> public void setHeader(String name, {String | String[ ]} value)
	setHeader: vjo.NEEDS_IMPL,
	
	headersSent: null,
	
// MrP - in OutgoingMessage
//	/**
//	 * When true, the Date header will be automatically generated and sent in the response 
//	 * if it is not already present in the headers. Defaults to true.
//	 * <p>
//	 * This should only be disabled for testing; HTTP requires the Date header in responses.
//	 */
//	//> public boolean
//	sendDate: null,
	
// In super OutgoingMessage
//	/**
//	 * Reads out a header that's already been queued but not sent to the client. Note that 
//	 * the name is case insensitive. This can only be called before headers get implicitly 
//	 * flushed.
//	 * <p>
//	 * Example:
//	 * <pre>
//	 * var contentType = response.getHeader('content-type');
//	 * </pre>
//	 */
//	//> public String getHeader(String name)
//	getHeader: vjo.NEEDS_IMPL,
	
// In super OutgoingMessage
//	/**
//	 * Removes a header that's queued for implicit sending.
//	 * <p>
//	 * Example:
//	 * <pre>
//	 * response.removeHeader("Content-Encoding");
//	 * </pre>
//	 */
//	//> public void removeHeader(String name)
//	removeHeader: vjo.NEEDS_IMPL,

// In super OutgoingMessage
//	/**
//	 * If this method is called and response.writeHead() has not been called, it will switch 
//	 * to implicit header mode and flush the implicit headers.
//	 * <p>
//	 * This sends a chunk of the response body. This method may be called multiple times to 
//	 * provide successive parts of the body.
//	 * <p>chunk can be a string or a buffer. If chunk is a string, the second parameter 
//	 * specifies how to encode it into a byte stream. 
//	 * <p>By default the encoding is 'utf8'.
//	 * <p>
//	 * Note: This is the raw HTTP body and has nothing to do with higher-level multi-part 
//	 * body encodings that may be used.
//	 * <p>The first time response.write() is called, it will send the buffered header 
//	 * information and the first body to the client. The second time response.write() is 
//	 * called, Node assumes you're going to be streaming data, and sends that separately. 
//	 * That is, the response is buffered up to the first chunk of body.
//	 * <p>
//	 * Returns true if the entire data was flushed successfully to the kernel buffer. Returns 
//	 * false if all or part of the data was queued in user memory. 'drain' will be emitted 
//	 * when the buffer is again free.
//	 */
//	//> public boolean write({String | Buffer} chunk, String? encoding)
//	write: vjo.NEEDS_IMPL,

// In super OutgoingMessage
//	/**
//	 * This method adds HTTP trailing headers (a header but at the end of the message) to 
//	 * the response.
//	 * <p>
//	 * Trailers will only be emitted if chunked encoding is used for the response; if it is 
//	 * not (e.g., if the request was HTTP/1.0), they will be silently discarded.
//	 * <p>
//	 * Note that HTTP requires the Trailer header to be sent if you intend to emit trailers, 
//	 * with a list of the header fields in its value. E.g.,
//	 * <pre>
//	 * response.writeHead(200, { 
//	 *   'Content-Type': 'text/plain',
//	 *   'Trailer': 'Content-MD5' 
//	 * });
//	 * response.write(fileData);
//	 * response.addTrailers({'Content-MD5': "7895bf4b8828b55ceaf47747b4bca667"});
//	 * response.end();
//	 * </pre>
//	 */
//	//> public void addTrailers(Object headers)
//	addTrailers: vjo.NEEDS_IMPL,
	
	// MrP: Already defined in inherited Writeable
	// end: vjo.NEEDS_IMPL,
	
	/**
	 * Node maintains several connections per server to make HTTP requests. This function 
	 * allows one to transparently issue requests.
	 * <p>
	 * options can be an object or a string. If options is a string, it is automatically 
	 * parsed with url.parse().
	 * <p>
	 * Options:
	 * <ul>
	 * <li>host: A domain name or IP address of the server to issue the request to. Defaults to 'localhost'.
	 * <li>hostname: To support url.parse() hostname is preferred over host
	 * <li>port: Port of remote server. Defaults to 80.
	 * <li>localAddress: Local interface to bind for network connections.
	 * <li>socketPath: Unix Domain Socket (use one of host:port or socketPath)
	 * <li>method: A string specifying the HTTP request method. Defaults to 'GET'.
	 * <li>path: Request path. Defaults to '/'. Should include query string if any. E.G. '/index.html?page=12'
	 * <li>headers: An object containing request headers.
	 * <li>auth: Basic authentication i.e. 'user:password' to compute an Authorization header.
	 * <li>agent: Controls Agent behavior. When an Agent is used request will default to Connection: keep-alive. Possible values:
	 *   <ul>
	 *   <li>undefined (default): use global Agent for this host and port.
	 *   <li>Agent object: explicitly use the passed in Agent.
	 *   <li>false: opts out of connection pooling with an Agent, defaults request to Connection: close.
	 *   </ul>
	 * </ul>
	 * <p>
	 * http.request() returns an instance of the http.ClientRequest class. The ClientRequest 
	 * instance is a writable stream. If one needs to upload a file with a POST request, then 
	 * write to the ClientRequest object.
	 * <p>
	 * Example:
	 * <pre>
	 * var options = {
	 *   hostname: 'www.google.com',
	 *   port: 80,
	 *   path: '/upload',
	 *   method: 'POST'
	 * };
	 * 
	 * var req = http.request(options, function(res) {
	 *   console.log('STATUS: ' + res.statusCode);
	 *   console.log('HEADERS: ' + JSON.stringify(res.headers));
	 *   res.setEncoding('utf8');
	 *   res.on('data', function (chunk) {
	 *     console.log('BODY: ' + chunk);
	 *   });
	 * });
	 * 
	 * req.on('error', function(e) {
	 *   console.log('problem with request: ' + e.message);
	 * });
	 * 
	 * // write data to request body
	 * req.write('data\n');
	 * req.write('data\n');
	 * req.end();
	 * </pre>
	 * Note that in the example req.end() was called. With http.request() one must always 
	 * call req.end() to signify that you're done with the request - even if there is no 
	 * data being written to the request body.
	 * <p>
	 * If any error is encountered during the request (be that with DNS resolution, TCP 
	 * level errors, or actual HTTP parse errors) an 'error' event is emitted on the returned 
	 * request object.
	 * <p>
	 * There are a few special headers that should be noted.
	 * <p>
	 * <ul>
	 * <li>Sending a 'Connection: keep-alive' will notify Node that the connection to the server should be persisted until the next request.
	 * <li>Sending a 'Content-length' header will disable the default chunked encoding.
	 * <li>Sending an 'Expect' header will immediately send the request headers. Usually, when sending 'Expect: 100-continue', you should both set a timeout and listen for the continue event. See RFC2616 Section 8.2.3 for more information.
	 * <li>Sending an Authorization header will override using the auth option to compute basic authentication.
	 * </ul>
	 */
	//> public ClientRequest request({String | org.nodejs.http.ServerResponse.data.requestOptions} options, Function? callback)
	request: vjo.NEEDS_IMPL,
	
	/**
	 * Since most requests are GET requests without bodies, Node provides this convenience 
	 * method. The only difference between this method and http.request() is that it sets 
	 * the method to GET and calls req.end() automatically.
	 * <p>
	 * Example:
	 * <pre>
	 * http.get("http://www.google.com/index.html", function(res) {
	 *   console.log("Got response: " + res.statusCode);
	 * }).on('error', function(e) {
	 *   console.log("Got error: " + e.message);
	 * });
	 * </pre>
	 */
	//> public ClientRequest get({String | org.nodejs.http.ServerResponse.data.requestOptions} options, Function? callback)
	get: vjo.NEEDS_IMPL,
	
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
	//> public ServerResponse ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public ServerResponse ^on(String type, Function listener)
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
	//> public ServerResponse ^once(String event, Function listener)
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
	//> public ServerResponse removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public ServerResponse removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()