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
 * HTTPS is the HTTP protocol over TLS/SSL. In Node this is implemented as a separate module.
 */
//> public
vjo.ctype('org.nodejs.https') 
//< needs(org.nodejs.http.ClientRequest)
//< needs(org.nodejs.http.ServerRequest)
//< needs(org.nodejs.http.ServerResponse)
//< needs(org.nodejs.https.Agent)
//< needs(org.nodejs.buffer.Buffer)
.props({
	/**
	 * 
	 */
	//> public
	data: vjo.otype().defs({
		/**
		 * 
		 */
		//> public ; options for the request(...) function
		requestOptions: {
			/**
			 * A domain name or IP address of the server to issue the request to. Defaults 
			 * to 'localhost'.
			 */
			host: null,	 //< public String? 	
			
			/**
			 * To support url.parse() hostname is preferred over host
			 */
			hostname: null,	//< public String?
			
			/**
			 * Port of remote server. Defaults to 443.
			 */
			//> 
			port: null,	 //< public int?	
			
			/**
			 * Request path. Defaults to '/'. Should include query string if any. 
			 * E.G. '/index.html?page=12'
			 */
			path: null,	//< public String?
			
			/**
			 * A string specifying the HTTP request method. Defaults to 'GET'.
			 */
			method: null,	//< public String?
			
			 /** An object containing request headers. */
			 headers: null,	//< public Object?
			 
			 /**
			  * Basic authentication i.e. 'user:password' to compute an Authorization header.
			  */
			 auth: null,	//< public String?
			 
			 /**
			  * Controls Agent behavior. When an Agent is used request will default to 
			  * Connection: keep-alive. 
			  * <p>
			  * Possible values:
			  * <ul>
			  * <li>undefined (default): use globalAgent for this host and port.
			  * <li>Agent object: explicitly use the passed in Agent.
			  * <li>false: opts out of connection pooling with an Agent, defaults request 
			  * to Connection: close.
			  * </ul>
			  */
			 agent: null,	//< public {Agent | boolean}?
	
			/**
			 * A string or Buffer containing the private key, certificate and CA certs of 
			 * the server in PFX or PKCS12 format.
			 */
			pfx: null,		//< public {String | Buffer}?
			
			/**
			 * A string or Buffer containing the private key of the client in PEM format.
			 */
			key: null,		//< public {String | Buffer}?
			
			/**
			 * A string of passphrase for the private key or pfx.
			 */
			passphrase: null, //< public String?
			
			/**
			 * A string or Buffer containing the certificate key of the client in PEM format.
			 */
			cert: null,		//< public {String | Buffer}?
			
			/**
			 * An array of strings or Buffers of trusted certificates. If this is omitted 
			 * several well known "root" CAs will be used, like VeriSign. These are used 
			 * to authorize connections.
			 */
			ca: null,		//< public {String[] | Buffer}?
			
			/**
			 * If true, the server certificate is verified against the list of supplied CAs. 
			 * An 'error' event is emitted if verification fails. Default: false.
			 */
			rejectUnauthorized: null //< public boolean?
		},
			
		/**
		 * 
		 */
		//> public ; options for the getAgent(...) function
		getAgentOptions: {
			/**
			 * 
			 */
			host: null,	 //< public String?
			
			/**
			 * 
			 */
			port: null //< public int?		
		}
		
//		/**
//		 * 
//		 */
//		//> public ; options for the createServer(...) function
//		createServerOptions: {
//			key: null, //< public {String | Buffer}
//			
//			cert: null //< public {String | Buffer}
//		}
	}).endType(),
	
	/**
	 * 
	 */
	//> public
	func: vjo.otype().defs({
		//> public void createServer(ServerRequest? req, ServerResponse? res)
		createServer: vjo.NEEDS_IMPL,
		
		get: vjo.NEEDS_IMPL,  //< public void get(ServerResponse? res) 
		
		request: vjo.NEEDS_IMPL //< public void request(ServerResponse? res)
	}).endType()
})
.protos({
	Server: null,	//< public type::org.nodejs.https.Server
	Agent: null,	//< public type::org.nodejs.https.Agent

	/**
	 * Global instance of https.Agent for all HTTPS client requests.
	 */
	globalAgent: null, //< public https.Agent
	
	/**
	 * <pre>
	 * // curl -k https://localhost:8000/
	 * var https = require('https');
	 * var fs = require('fs');
	 * 
	 * var options = {
	 *   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
	 *   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
	 * };
	 * 
	 * https.createServer(options, function (req, res) {
	 *   res.writeHead(200);
	 *   res.end("hello world\n");
	 * }).listen(8000);
	 * </pre>
	 */
	//> public https.Server createServer(org.nodejs.tls.data.createServerOptions opts, org.nodejs.https.func:createServer callback)
	createServer: vjo.NEEDS_IMPL,
	
	/**
	 * Makes a request to a secure web server. Similar options to http.request().
	 * <p>Example:
	 * <pre>
	 * var https = require('https');
	 * var options = {
	 *   host: 'encrypted.google.com',
	 *   port: 443,
	 *   path: '/',
	 *   method: 'GET'
	 * };
	 * 
	 * var req = https.request(options, function(res) {
	 *   console.log("statusCode: ", res.statusCode);
	 *   console.log("headers: ", res.headers);
	 *   
	 *   res.on('data', function(d) {
	 *     process.stdout.write(d);
	 *   });
	 * });
	 * req.end();
	 * 
	 * req.on('error', function(e) {
	 *   console.error(e);
	 * });
	 * </pre>
	 */
	//> public ClientRequest request(https.data.requestOptions? options, org.nodejs.https.func:request? callback)
	request: vjo.NEEDS_IMPL,
	
	/**
	 * Like http.get() but for HTTPS.
	 * <p>Example:
	 * <pre>
	 * var https = require('https');
	 * https.get({ host: 'encrypted.google.com', path: '/' }, function(res) {
	 *   console.log("statusCode: ", res.statusCode);
	 *   console.log("headers: ", res.headers);
	 *   
	 *   res.on('data', function(d) {
	 *     process.stdout.write(d);
	 *   });
	 * }).on('error', function(e) {
	 *   console.error(e);
	 * });
	 * </pre>
	 */
	//> public ClientRequest get({String | https.data.requestOptions} options, org.nodejs.https.func:get? callback)
	get: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();