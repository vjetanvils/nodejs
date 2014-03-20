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
 * Use require('tls') to access this module.
 * <p>
 * The tls module uses OpenSSL to provide Transport Layer Security and/or Secure Socket 
 * Layer: encrypted stream communication.
 * <p>
 * TLS/SSL is a public/private key infrastructure. Each client and each server must have a 
 * private key. A private key is created like this:
 * <pre>
 * openssl genrsa -out ryans-key.pem 1024
 * </pre>
 * All severs and some clients need to have a certificate. Certificates are public keys 
 * signed by a Certificate Authority or self-signed. The first step to getting a certificate 
 * is to create a "Certificate Signing Request" (CSR) file. This is done with:
 * <pre>
 * openssl req -new -key ryans-key.pem -out ryans-csr.pem
 * </pre>
 * To create a self-signed certificate with the CSR, do this:
 * <pre>
 * openssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem
 * </pre>
 * Alternatively you can send the CSR to a Certificate Authority for signing.
 * <p>
 * (TODO: docs on creating a CA, for now interested users should just look at 
 * test/fixtures/keys/Makefile in the Node source code)
 * <p>
 * To create .pfx or .p12, do this:
 * <pre>
 * openssl pkcs12 -export -in agent5-cert.pem -inkey agent5-key.pem \
 *   -certfile ca-cert.pem -out agent5.pfx
 * <ul>
 * <li>in: certificate
 * <li>inkey: private key
 * <li>certfile: all CA certs concatenated in one file like cat ca1-cert.pem ca2-cert.pem > ca-cert.pem
 * </ul>
 */
vjo.ctype('org.nodejs.tls') //< public
//< needs(org.nodejs.buffer.Buffer)
//< needs(org.nodejs.crypto.Credentials)
//< needs(org.nodejs.tls.CleartextStream)
//< needs(org.nodejs.tls.SecurePair)
//< needs(org.nodejs.tls.Server)
//< needs(org.nodejs.net.Socket)
.props({
	data: vjo.otype().defs({	//< public
		createServerOptions: {	//< public
			/**
			 * A string or Buffer containing the private key, certificate and CA certs of 
			 * the server in PFX or PKCS12 format. (Mutually exclusive with the key, cert 
			 * and ca options.)
			 */
			pfx: null,			//< public {String | Buffer}?
			
			/**
			 * A string or Buffer containing the private key of the server in PEM format. (Required)
			 */
			key: null,			//< public {String | Buffer}
			
			/**
			 *  A string of passphrase for the private key or pfx.
			 */
			passphrase: null,	//< public String?
			
			/**
			 * A string or Buffer containing the certificate key of the server in PEM format. (Required)
			 */
			cert: null,			//< public {String | Buffer}
			
			/**
			 * An array of strings or Buffers of trusted certificates. If this is omitted 
			 * several well known "root" CAs will be used, like VeriSign. These are used 
			 * to authorize connections.
			 */
			ca: null,			//< public {String[ ] | Buffer[ ]}?
			
			/**
			 * Either a string or list of strings of PEM encoded CRLs (Certificate Revocation List)
			 */
			crl: null,			//< public {String | String[]}?
			
			/**
			 * A string describing the ciphers to use or exclude.
			 * <p>
			 * To mitigate BEAST attacks it is recommended that you use this option in 
			 * conjunction with the honorCipherOrder option described below to prioritize 
			 * the non-CBC cipher.
			 * <p>
			 * Defaults to ECDHE-RSA-AES128-SHA256:AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH. 
			 * <p>
			 * Consult the OpenSSL cipher list format documentation for details on the format.
			 * <p>
			 * ECDHE-RSA-AES128-SHA256 and AES128-GCM-SHA256 are used when node.js is linked 
			 * against OpenSSL 1.0.1 or newer and the client speaks TLS 1.2, RC4 is used as 
			 * a secure fallback.
			 * <p>
			 * NOTE: Previous revisions of this section suggested AES256-SHA as an acceptable 
			 * cipher. Unfortunately, AES256-SHA is a CBC cipher and therefore susceptible 
			 * to BEAST attacks. Do not use it.
			 */
			ciphers: null,		//< public String?
			
			/**
			 * Abort the connection if the SSL/TLS handshake does not finish in this many 
			 * milliseconds. The default is 120 seconds. A 'clientError' is emitted on the 
			 * tls.Server object whenever a handshake times out.
			 */
			handshakeTimeout: null,	//< public Number?
			
			/**
			 * When choosing a cipher, use the server's preferences instead of the client 
			 * preferences. Note that if SSLv2 is used, the server will send its list of 
			 * preferences to the client, and the client chooses the cipher.
			 * <p>
			 * Although, this option is disabled by default, it is recommended that you use 
			 * this option in conjunction with the ciphers option to mitigate BEAST attacks.
			 */
			honorCipherOrder:null, 		//< public boolean?
			
			/**
			 * If true the server will request a certificate from clients that connect and 
			 * attempt to verify that certificate. Default: false.
			 */
			requestCert: null,			//< public boolean?
			
			/**
			 * If true the server will reject any connection which is not authorized with 
			 * the list of supplied CAs. This option only has an effect if requestCert is 
			 * true. Default: false.
			 */
			rejectUnauthorized: null, 	//< public boolean?
			
			/**
			 * An array or Buffer of possible NPN protocols. (Protocols should be ordered 
			 * by their priority).
			 */
			NPNPortocols: null,			//< {String[] | Buffer}?
			
			/**
			 * A function that will be called if client supports SNI TLS extension. Only 
			 * one argument will be passed to it: servername. And SNICallback should return 
			 * SecureContext instance. (You can use crypto.createCredentials(...).context 
			 * to get proper SecureContext). If SNICallback wasn't provided - default 
			 * callback with high-level API will be used (see below).
			 */
			SNICallback: vjo.NEEDS_IMPL,//< public (void f(String serverName))?
			
			/**
			 * A string containing a opaque identifier for session resumption. If requestCert 
			 * is true, the default is MD5 hash value generated from command-line. Otherwise, 
			 * the default is not provided.
			 */
			sessionIdContext: null		//< public String?
		},
		
		connectOptions: {	//< public
			/**
			 * Host the client should connect to
			 */
			host: null,		//< public String?
			
			/**
			 * Port the client should connect to
			 */
			port: null,		//< public int?
			
			/**
			 * Establish secure connection on a given socket rather than creating a new socket. 
			 * If this option is specified, host and port are ignored.
			 */
			socket: null, 	//< public Socket?
			
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
			rejectUnauthorized: null, //< public boolean?
			
			/**
			 * An array of string or Buffer containing supported NPN protocols. Buffer should 
			 * have following format: 0x05hello0x05world, where first byte is next protocol 
			 * name's length. (Passing array should usually be much simpler: ['hello', 'world'].)
			 */
			NPNProtocols: null,	//< public {String[] | Buffer}?
			
			/**
			 * Servername for SNI (Server Name Indication) TLS extension.
			 */
			serverName: null	//< public String?
		},
		
		createSecurePairCreds: {	//< public
			/**
			 * A credentials object from crypto.createCredentials( ... )
			 */
			credentials: null,		//< public Credentials?
			
			/**
			 *  A boolean indicating whether this tls connection should be opened as a 
			 *  server or a client.
			 */
			isServer: null,			//< public boolean?
			
			/**
			 * A boolean indicating whether a server should request a certificate from a 
			 * connecting client. Only applies to server connections.
			 */
			requestCert: null,		//< public boolean?
			
			/**
			 * A boolean indicating whether a server should automatically reject clients 
			 * with invalid certificates. Only applies to servers with requestCert enabled.
			 */
			rejectUnauthorized: null//< public boolean?
		}
	}).endType(),
	
	func: vjo.otype().defs({
		//> public void secureConnectionListener(CleartextStream stream)
		secureConnectionListener: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	Server: 		 null, 	//< public type::org.nodejs.tls.Server	  
	CryptoStream:	 null,	//< public type::org.nodejs.tls.CryptoStream
	CleartextStream: null,	//< public type::org.nodejs.tls.CleartextStream  
	SecurePair: 	 null,	//< public type::org.nodejs.tls.SecurePair 
	
	/**
	 * Returns an array with the names of the supported SSL ciphers.
	 * <p>
	 * Example:
	 * <pre>
	 * var ciphers = tls.getCiphers();
	 * console.log(ciphers); // ['AES128-SHA', 'AES256-SHA', ...]
	 * </pre>
	 */
	getCiphers: vjo.NEEDS_IMPL,
	
	/**
	 * Creates a new tls.Server. The connectionListener argument is automatically set as a 
	 * listener for the secureConnection event. The options object has these possibilities:
	 * <ul>
	 * <li>pfx: A string or Buffer containing the private key, certificate and CA certs of the server in PFX or PKCS12 format. (Mutually exclusive with the key, cert and ca options.)
	 * <li>key: A string or Buffer containing the private key of the server in PEM format. (Required)
	 * <li>passphrase: A string of passphrase for the private key or pfx.
	 * <li>cert: A string or Buffer containing the certificate key of the server in PEM format. (Required)
	 * <li>ca: An array of strings or Buffers of trusted certificates. If this is omitted several well known "root" CAs will be used, like VeriSign. These are used to authorize connections.
	 * <li>crl : Either a string or list of strings of PEM encoded CRLs (Certificate Revocation List)
	 * <li>ciphers: A string describing the ciphers to use or exclude.
	 * To mitigate BEAST attacks it is recommended that you use this option in conjunction 
	 * with the honorCipherOrder option described below to prioritize the non-CBC cipher.
	 * <p>
	 * Defaults to ECDHE-RSA-AES128-SHA256:AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH. 
	 * Consult the OpenSSL cipher list format documentation for details on the format.
	 * <p>
	 * ECDHE-RSA-AES128-SHA256 and AES128-GCM-SHA256 are used when node.js is linked against 
	 * OpenSSL 1.0.1 or newer and the client speaks TLS 1.2, RC4 is used as a secure fallback.
	 * <p>
	 * NOTE: Previous revisions of this section suggested AES256-SHA as an acceptable cipher. 
	 * Unfortunately, AES256-SHA is a CBC cipher and therefore susceptible to BEAST attacks.
	 * Do not use it.
	 * <p>
	 * <li>honorCipherOrder : When choosing a cipher, use the server's preferences instead of 
	 * the client preferences.
	 * <p>
	 * Note that if SSLv2 is used, the server will send its list of preferences to the client, 
	 * and the client chooses the cipher.
	 * <p>
	 * Although, this option is disabled by default, it is recommended that you use this option 
	 * in conjunction with the ciphers option to mitigate BEAST attacks.
	 * <li>requestCert: If true the server will request a certificate from clients that 
	 * connect and attempt to verify that certificate. Default: false.
	 * <li>rejectUnauthorized: If true the server will reject any connection which is not 
	 * authorized with the list of supplied CAs. This option only has an effect if requestCert 
	 * is true. Default: false.
	 * <li>NPNProtocols: An array or Buffer of possible NPN protocols. (Protocols should be ordered by their priority).
	 * <li>SNICallback: A function that will be called if client supports SNI TLS extension. Only one argument will be passed to it: servername. And SNICallback should return SecureContext instance. (You can use crypto.createCredentials(...).context to get proper SecureContext). If SNICallback wasn't provided - default callback with high-level API will be used (see below).
	 * <li>sessionIdContext: A string containing a opaque identifier for session resumption. If requestCert is true, the default is MD5 hash value generated from command-line. Otherwise, the default is not provided.
	 * <p>
	 * Here is a simple example echo server:
	 * <pre>
	 * var tls = require('tls');
	 * var fs = require('fs');
	 * 
	 * var options = {
	 *   key: fs.readFileSync('server-key.pem'),
	 *   cert: fs.readFileSync('server-cert.pem'),
	 *   // This is necessary only if using the client certificate authentication.
	 *   requestCert: true,
	 *   // This is necessary only if the client uses the self-signed certificate.
	 *   ca: [ fs.readFileSync('client-cert.pem') ]
	 * };
	 * 
	 * var server = tls.createServer(options, function(cleartextStream) {
	 *   console.log('server connected', cleartextStream.authorized ? 'authorized' : 'unauthorized');
	 *   cleartextStream.write("welcome!\n");
	 *   cleartextStream.setEncoding('utf8');
	 *   cleartextStream.pipe(cleartextStream);
	 * });
	 * server.listen(8000, function() {
	 *   console.log('server bound');
	 * });
	 * </pre
	 * <p>Or
	 * <pre>
	 * var tls = require('tls');
	 * var fs = require('fs');
	 * var options = {
	 *   pfx: fs.readFileSync('server.pfx'),
	 *   // This is necessary only if using the client certificate authentication.
	 *   requestCert: true,
	 * };
	 * 
	 * var server = tls.createServer(options, function(cleartextStream) {
	 *   console.log('server connected',cleartextStream.authorized ? 'authorized' : 'unauthorized');
	 *   cleartextStream.write("welcome!\n");
	 *   cleartextStream.setEncoding('utf8');
	 *   cleartextStream.pipe(cleartextStream);
	 * });
	 * server.listen(8000, function() {
	 *   console.log('server bound');
	 * });
	 * </pre>
	 * You can test this server by connecting to it with openssl s_client:
	 * <pre>
	 * openssl s_client -connect 127.0.0.1:8000
	 * </pre>
	 */
	// public Server createServer( tls.func:secureConnectionListener? callback)
	//> public Server createServer(tls.data.createServerOptions options, tls.func:secureConnectionListener? callback)
	createServer: vjo.NEEDS_IMPL,
	
	 /**
	  * Size of slab buffer used by all tls servers and clients. Default: 10 * 1024 * 1024.
	  * <p>
	  * Don't change the defaults unless you know what you are doing.
	  */
	//> public Number
	SLAB_BUFFER_SIZE: null,
	
	/**
	 * Creates a new client connection to the given port and host (old API) or options.port 
	 * and options.host. (If host is omitted, it defaults to localhost.) options should be 
	 * an object which specifies:
	 * <ul>
	 * <li>host: Host the client should connect to
	 * <li>port: Port the client should connect to
	 * <li>socket: Establish secure connection on a given socket rather than creating a new socket. If this option is specified, host and port are ignored.
	 * <li>pfx: A string or Buffer containing the private key, certificate and CA certs of the server in PFX or PKCS12 format.
	 * <li>key: A string or Buffer containing the private key of the client in PEM format.
	 * <li>passphrase: A string of passphrase for the private key or pfx.
	 * <li>cert: A string or Buffer containing the certificate key of the client in PEM format.
	 * <li>ca: An array of strings or Buffers of trusted certificates. If this is omitted several well known "root" CAs will be used, like VeriSign. These are used to authorize connections.
	 * <li>rejectUnauthorized: If true, the server certificate is verified against the list of supplied CAs. An 'error' event is emitted if verification fails. Default: false.
	 * <li>NPNProtocols: An array of string or Buffer containing supported NPN protocols. Buffer should have following format: 0x05hello0x05world, where first byte is next protocol name's length. (Passing array should usually be much simpler: ['hello', 'world'].)
	 * <li>servername: Servername for SNI (Server Name Indication) TLS extension.
	 * </ul>
	 * The callback parameter will be added as a listener for the 'secureConnect' event.
	 * <p>
	 * tls.connect() returns a CleartextStream object.
	 * <p>
	 * Here is an example of a client of echo server as described previously:
	 * <pre>
	 * var tls = require('tls');
	 * var fs = require('fs');
	 * 
	 * var options = {
	 *   // These are necessary only if using the client certificate authentication
	 *   key: fs.readFileSync('client-key.pem'),
	 *   cert: fs.readFileSync('client-cert.pem'),
	 *   // This is necessary only if the server uses the self-signed certificate
	 *   ca: [ fs.readFileSync('server-cert.pem') ]
	 * };
	 * 
	 * var cleartextStream = tls.connect(8000, options, function() {
	 *   console.log('client connected',
	 *     cleartextStream.authorized ? 'authorized' : 'unauthorized');
	 *   process.stdin.pipe(cleartextStream);
	 *   process.stdin.resume();
	 * });
	 * cleartextStream.setEncoding('utf8');
	 * cleartextStream.on('data', function(data) {
	 *   console.log(data);
	 * });
	 * cleartextStream.on('end', function() {
	 *   server.close();
	 * });
	 * </pre>
	 * // Or
	 * <pre>
	 * var tls = require('tls');
	 * var fs = require('fs');
	 * 
	 * var options = {
	 *   pfx: fs.readFileSync('client.pfx')
	 * };
	 * 
	 * var cleartextStream = tls.connect(8000, options, function() {
	 *   console.log('client connected',cleartextStream.authorized ? 'authorized' : 'unauthorized');
	 *   process.stdin.pipe(cleartextStream);
	 *   process.stdin.resume();
	 * });
	 * cleartextStream.setEncoding('utf8');
	 * cleartextStream.on('data', function(data) {
	 *   console.log(data);
	 * });
	 * cleartextStream.on('end', function() {
	 *   server.close();
	 * });
	 * </pre>
	 */
	//> public CleartextStream connect(tls.data.connectOptions, Function callback)
	//> public CleartextStream connect(int port, String? host, tls.data.connectOptions? options, Function? callback)
	connect: vjo.NEEDS_IMPL,
	
	/**
	 * Creates a new secure pair object with two streams, one of which reads/writes encrypted 
	 * data, and one reads/writes cleartext data. Generally the encrypted one is piped 
	 * to/from an incoming encrypted data stream, and the cleartext one is used as a 
	 * replacement for the initial encrypted stream.
	 * <ul>
	 * <li>credentials: A credentials object from crypto.createCredentials( ... )
	 * <li>isServer: A boolean indicating whether this tls connection should be opened as a server or a client.
	 * <li>requestCert: A boolean indicating whether a server should request a certificate from a connecting client. Only applies to server connections.
	 * <li>rejectUnauthorized: A boolean indicating whether a server should automatically reject clients with invalid certificates. Only applies to servers with requestCert enabled.
	 * </ul>
	 * tls.createSecurePair() returns a SecurePair object with [cleartext][] and encrypted 
	 * stream properties.
	 */
	//> public SecurePair createSecurePair(tls.data.createSecurePairCreds? credentials)
	//> public SecurePair createSecurePair(tls.data.createSecurePairCreds credentials, boolean isServer, boolean? requestCert, boolean? rejectUnauthorized) 
	createSecurePair: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType()