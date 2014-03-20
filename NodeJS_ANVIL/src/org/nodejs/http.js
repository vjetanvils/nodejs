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
 * Stability: 3 - Stable
 * <p>
 * To use the HTTP server and client one must require('http').
 * <p>
 * The HTTP interfaces in Node are designed to support many features of the protocol which 
 * have been traditionally difficult to use. In particular, large, possibly chunk-encoded, 
 * messages. The interface is careful to never buffer entire requests or responses--the user 
 * is able to stream data.
 * <p>
 * HTTP message headers are represented by an object like this:
 * <pre>
 * { 'content-length': '123',
 *   'content-type': 'text/plain',
 *   'connection': 'keep-alive',
 *   'accept': '* / *'
 * }
 * </pre>
 * Keys are lowercased. Values are not modified.
 * <p>
 * In order to support the full spectrum of possible HTTP applications, Node's HTTP API is 
 * very low-level. It deals with stream handling and message parsing only. It parses a message 
 * into headers and body but it does not parse the actual headers or the body.
 */
vjo.ctype('org.nodejs.http') //< public
//< needs(org.nodejs.crypto.Credentials)
//< needs(org.nodejs.http.Server)
//< needs(org.nodejs.http.ClientRequest)
//< needs(org.nodejs.http.ClientResponse)
//< needs(org.nodejs.http.ServerRequest)
//< needs(org.nodejs.http.ServerResponse)
.props({
	data: vjo.otype().defs({ 	//< public
		requestOptions: {		//< public
			/**
			 * A domain name or IP address of the server to issue the request to. Defaults 
			 * to 'localhost'.
			 */
			host: null,			//< public String?
			
			/**
			 * To support url.parse() hostname is preferred over host
			 */
			hostname: null,		//< public String?
			
			/**
			 * Port of remote server. Defaults to 80.
			 */
			port: null,			//< public int?
			
			/**
			 *  Local interface to bind for network connections.
			 */
			localAddress: null,	//< public String?
			
			/**
			 * Unix Domain Socket (use one of host:port or socketPath)
			 */
			socketPath: null,	//< public String?
			
			/**
			 * A string specifying the HTTP request method. Defaults to 'GET'.
			 */
			method: null,		//< public String?
			
			/**
			 * Request path. Defaults to '/'. Should include query string if any. 
			 * E.G. '/index.html?page=12'
			 */
			path: null,			//< public String?
			
			/**
			 * An object containing request headers.
			 */
			headers: null,		//< public Object?
			
			/**
			 * Basic authentication i.e. 'user:password' to compute an Authorization header.
			 */
			auth: null,			//< public String?
			
			/**
			 * Controls Agent behavior. When an Agent is used request will default 
			 * to Connection: keep-alive. Possible values:
			 * <ul>
			 * <li>undefined (default): use global Agent for this host and port.
			 * <li>Agent object: explicitly use the passed in Agent.
			 * <li>false: opts out of connection pooling with an Agent, defaults request 
			 * to Connection: close.
			 * </ul>
			 */
			agent: null		//< public {http.Agent | boolean}?
		}
	}).endType(),
	
	event: vjo.otype().defs({  	//< public
		/**
		 * function (request, response) { }
		 * <p>
		 * Emitted each time there is a request. Note that there may be multiple requests 
		 * per connection (in the case of keep-alive connections). request is an instance 
		 * of http.ServerRequest and response is an instance of http.ServerResponse
		 */
		//> public void createServer(ServerRequest, ServerResponse)
		createServer: vjo.NEEDS_IMPL
	}).endType(),
	
	func: vjo.otype().defs({	//< public
		//> public void createServer(ServerRequest request, ServerResponse response)
		createServer: vjo.NEEDS_IMPL,
		
		//> public void clientResponse(ClientResponse? response)
		clientResponse: vjo.NEEDS_IMPL
	}).endType()
})
.protos({	
	Server:			null,	//< public type::org.nodejs.http.Server	
	ServerRequest: 	null,	//< public type::org.nodejs.http.ServerRequest
	ServerResponse: null,	//< public type::org.nodejs.http.ServerResponse
	Agent: 			null,	//< public type::org.nodejs.http.Agent
	ClientRequest: 	null,	//< public type::org.nodejs.http.ClientRequest
	ClientResponse: null,	//< public type::org.nodejs.http.ClientResponse
	
//	/**
//	 * This is a String -> int name mapping and is NOT the same as the STATUS_CODE (no X)
//	 * that is an Associative Array for status_code to String name.
//	 */
//	STATUS_CODESX: 	null,	//< public type::org.nodejs.http.STATUS_CODESX
	
	/**
	 * This is defined by Node.js to be an associative array keyed by the int status code
	 * where the value is the String description of that code.
	 */
	STATUS_CODES: null,	//< public String[ ]
	
	/**
	 * Returns a new web server object.
	 * <p>
	 * The requestListener is a function which is automatically added to the 'request' event.
	 */
	//> public Server createServer(http.func:createServer? requestListener)
	createServer: vjo.NEEDS_IMPL,
	
	/**
	 * This function is deprecated; please use http.request() instead. Constructs a new HTTP 
	 * client. port and host refer to the server to be connected to.
	 */
	//> public Object createClient(int? port, String? host)
	createClient: vjo.NEEDS_IMPL,
	
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
	 * <ul>
	 * <li>Sending a 'Connection: keep-alive' will notify Node that the connection to the server should be persisted until the next request.
	 * <li>Sending a 'Content-length' header will disable the default chunked encoding.
	 * <li>Sending an 'Expect' header will immediately send the request headers. Usually, when sending 'Expect: 100-continue', you should both set a timeout and listen for the continue event. See RFC2616 Section 8.2.3 for more information.
	 * <li>Sending an Authorization header will override using the auth option to compute basic authentication.
	 * </ul>
	 */
	//> public ClientRequest request({String | http.data.requestOptions} options, http.func:clientResponse? callback)
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
	//> public ClientRequest get(http.data.requestOptions options, http.func:clientResponse? callback)
	get: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();