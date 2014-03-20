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
 * The net module provides you with an asynchronous network wrapper. It contains methods 
 * for creating both servers and clients (called streams). You can include this module 
 * with require('net');
 */
//> public
vjo.ctype('org.nodejs.net') 
//< needs(org.nodejs.buffer.Buffer)
//< needs(org.nodejs.net.Server)
//< needs(org.nodejs.net.Socket)
.props({
	/**
	 * 
	 */
	//> public
	data: vjo.otype().defs({//< public
		/**
		 * For TCP sockets, options argument should be an object which specifies:
		 * <ul>
		 * <li>port: Port the client should connect to (Required).
		 * <li>host: Host the client should connect to. Defaults to 'localhost'.
		 * <li>localAddress: Local interface to bind to for network connections.
		 * </ul>
		 * For UNIX domain sockets, options argument should be an object which specifies:
		 * <ul>
		 * <li>path: Path the client should connect to (Required).
		 * </ul>
		 * Common options are:
		 * <ul>
		 * <li>allowHalfOpen: if true, the socket won't automatically send a FIN packet 
		 * when the other end of the socket sends a FIN packet. Defaults to false. See 
		 * 'end' event for more information.
		 * </ul>
		 */
		connect: {				//< public 
			/**
			 * Port the client should connect to (Required).
			 */
			port: null,			//< public int
			
			/**
			 * Host the client should connect to. Defaults to 'localhost'.
			 */
			host: null,			//< public String?
			
			/**
			 * Local interface to bind to for network connections.
			 */
			localAddress: null,	//< public String?
			
			/**
			 * For UNIX domain sockets: Path the client should connect to (Required).
			 */
			path: null,			//< public String
			
			/**
			 * For UNIX domain sockets: if true, the socket won't automatically send a FIN 
			 * packet when the other end of the socket sends a FIN packet. Defaults to false. 
			 * <p>
			 * See * 'end' event for more information.
			 */
			allowHalfOpen: null	//< public boolean?
		},
		
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
	}).endType(), // end net.data
	
	func: vjo.otype().defs({	//< public 
		//> public void connectionListener(Socket? socket)
		connectionListener: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	Socket: null, //< public type::org.nodejs.net.Socket	
	Server: null, //< public type::org.nodejs.net.Server
	
	/** Legacy naming.  Use Socket instead */
	Stream: null, //< public type::org.nodejs.net.Socket
	
	/**
	 * Constructs a new socket object and opens the socket to the given location. When the 
	 * socket is established, the 'connect' event will be emitted.
	 * <p>
	 * The createConnection(...) API is an alias function with the same capabilities.
	 * <p>
	 * There are 3 flavors to this API.  The descriptions are in order the declarations
	 * signatures are defined:
	 * <ol>
	 * <li>
	 * <li>
	 * <li>
	 * </ol>
	 */
	//> public Socket connect(net.data.connect options, Function? connectListener)
	//> public Socket connect(int              port,    String?   host,           Function? connectListener)
	//> public Socket connect(String           path,    Function? connectListener)
	connect: vjo.NEEDS_IMPL,
	
	/**
	 * Constructs a new socket object and opens the socket to the given location. When the 
	 * socket is established, the 'connect' event will be emitted.
	 * <p>
	 * The connect(...) API is an alias function with the same capabilities.
	 * <p>
	 * There are 3 flavors to this API.  The notes are in order the declarations
	 * signatures are defined:
	 * <ol>
	 * <li>TCP Sockets
	 * <li>Unix Domain Sockets
	 * <li>Common Options
	 * </ol>
	 */
	//> public Socket createConnection(net.data.connect options, Function? connectListener)
	//> public Socket createConnection(int              port,    String?   host,           Function? connectListener)
	//> public Socket createConnection(String           path,    Function? connectListener)
	createConnection: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public Server createServer(net.data.create? options)
	//> public Server createServer(net.func:connectionListener listener)
	//> public Server createServer(net.data.create options, net.func:connectionListener listener)
	createServer: vjo.NEEDS_IMPL,
	
	//
	// isIP functions
	//
	/**
	 * net.isIP(input)
	 * <p>
	 * Tests if input is an IP address. Returns 0 for invalid strings, 
	 * returns 4 for IP version 4 addresses, and returns 6 for IP version 6 
	 * addresses.
	 */
	//> public int isIP(String input)
	isIP: vjo.NEEDS_IMPL,
	
	/**
	 * net.isIPv4(input)
	 * <p>
	 * Returns true if input is a version 4 IP address, otherwise returns false.
	 */
	//> public boolean isIPv4(String input)
	isIPv4: vjo.NEEDS_IMPL,
	
	/**
	 * net.isIPv46(input)
	 * <p>
	 * Returns true if input is a version 6 IP address, otherwise returns false.
	 */	
	//> public boolean isIPv6(String input)
	isIPv6: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();