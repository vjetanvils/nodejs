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
 * The dgram Socket class encapsulates the datagram functionality. It should be created 
 * via dgram.createSocket(type, [callback]).
 */
vjo.ctype('org.nodejs.dgram.Socket') //< public
//< needs(org.nodejs.buffer.Buffer)
.inherits('org.nodejs.events.EventEmitter')
.props({
	//> public
	data: vjo.otype().defs({
		/**
		 * 
		 */
		rinfo: {				//< public 
			senderAddr: null, 	//< public String	
				
			numBytes: null,		//< public int
			
			port: null,			//< public int
			
			address: null		//< public String
		},
		
		/**
		 * object containing the address information for a socket. For UDP 
		 * sockets, this object will contain address and port. For Unix domain 
		 * sockets, it will contain only address.
		 */
		addr: {				//< public
			address: null,	//< public String
			
			family: null, 	//< public String?
			
			port: null		//< public int?
		
		}
	})
	.endType(),
	
	func: vjo.otype().defs({	//< public
		/**
		 * 
		 */
		//> public void sendCallback(Error? err, int? bytes)
		sendCallback: vjo.NEEDS_IMPL,
		
		//> public void bindCallback()
		bindCallback: vjo.NEEDS_IMPL
	}).endType(),
	
	event: vjo.otype().defs({	//< public
		/**
		 * function (msg, rinfo) { }
		 * <p>Emitted when a new datagram is available on a socket. msg is a 
		 * Buffer and rinfo is an object with the sender's address information 
		 * and the number of bytes in the datagram.
		 */
		//> public void message(Buffer? msg, Socket.data.rinfo? rinfo)
		message: vjo.NEEDS_IMPL,
		
		/**
		 * function () { }
		 * <p>
		 * Emitted when a socket starts listening for datagrams. This happens as 
		 * soon as UDP sockets are created.
		 */
		//> public void listening()
		listening: vjo.NEEDS_IMPL,
		
		/**
		 * function () { }
		 * <p>
		 * Emitted when a socket is closed with close(). No new message events will 
		 * be emitted on this socket.
		 */
		//> public void close()
		close: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted when an error occurs.
		 */
		//> public void error(Error err)
		error: vjo.NEEDS_IMPL
	}).endType() 	
})
.protos({
	//> public constructs(String type, Function? callback)
	constructs: function() {},
	
	/**
	 * buf Buffer object. Message to be sent
	 * <p>offset Integer. Offset in the buffer where the message starts.
	 * <p>length Integer. Number of bytes in the message.
	 * <p>port Integer. destination port
	 * <p>address String. destination IP
	 * <p>callback Function. Callback when message is done being delivered. Optional.
	 * <p>
	 * For UDP sockets, the destination port and IP address must be specified. A 
	 * string may be supplied for the address parameter, and it will be resolved with 
	 * DNS. An optional callback may be specified to detect any DNS errors and when 
	 * buf may be re-used. Note that DNS lookups will delay the time that a send takes 
	 * place, at least until the next tick. The only way to know for sure that a send 
	 * has taken place is to use the callback.
	 * <p>
	 * If the socket has not been previously bound with a call to bind, it's assigned 
	 * a random port number and bound to the "all interfaces" address 
	 * (0.0.0.0 for udp4 sockets, ::0 for udp6 sockets).
	 * <p>
	 * Example of sending a UDP packet to a random port on localhost
	 * <pre>
	 * var dgram = require('dgram');
	 * var message = new Buffer("Some bytes");
	 * var client = dgram.createSocket("udp4");
	 * client.send(message, 0, message.length, 41234, "localhost", function(err, bytes) {
	 *   client.close();
	 * });
	 * </pre>
	 * A Note about UDP datagram size
	 * <p>
	 * The maximum size of an IPv4/v6 datagram depends on the MTU (Maximum Transmission Unit) 
	 * and on the Payload Length field size.
	 * <p>
	 * The Payload Length field is 16 bits wide, which means that a normal payload 
	 * cannot be larger than 64K octets including internet header and data 
	 * (65,507 bytes = 65,535 - 8 bytes UDP header - 20 bytes IP header); this is
	 * generally true for loopback interfaces, but such long datagrams are impractical 
	 * for most hosts and networks.
	 * <p>
	 * The MTU is the largest size a given link layer technology can support for 
	 * datagrams. For any link, IPv4 mandates a minimum MTU of 68 octets, while the 
	 * recommended MTU for IPv4 is 576 (typically recommended as the MTU for dial-up 
	 * type applications), whether they arrive whole or in fragments.
	 * <p>
	 * For IPv6, the minimum MTU is 1280 octets, however, the mandatory minimum fragment 
	 * reassembly buffer size is 1500 octets. The value of 68 octets is very small, 
	 * since most current link layer technologies have a minimum MTU of 1500 (like Ethernet).
	 * <p>
	 * Note that it's impossible to know in advance the MTU of each link through which 
	 * a packet might travel, and that generally sending a datagram greater than the 
	 * (receiver) MTU won't work (the packet gets silently dropped, without informing 
	 * the source that the data did not reach its intended recipient).
	 */
	//> public void send(Buffer buf, int offset, int length, int port, String address, Socket.func:sendCallback? callback)
	send: vjo.NEEDS_IMPL,

	/**
	 * dgram.bind(path)
	 * <p>For Unix domain datagram sockets, start listening for incoming datagrams 
	 * on a socket specified by path. Note that clients may send() without bind(), 
	 * but no datagrams will be received without a bind().
	 * <p>Example of a Unix domain datagram server that echoes back all messages 
	 * it receives:
	 * <pre>
	 * var dgram = require("dgram");
	 * var serverPath = "/tmp/dgram_server_sock";
	 * var server = dgram.createSocket("unix_dgram");
	 * server.on("message", function (msg, rinfo) {
	 *   console.log("got: " + msg + " from " + rinfo.address);
	 *   server.send(msg, 0, msg.length, rinfo.address);
	 * });
	 * server.on("listening", function () {
	 *   console.log("server listening " + server.address().address);
	 * })
	 * </pre>
	 * <p>
	 * server.bind(serverPath);
	 * <p>Example of a Unix domain datagram client that talks to this server:
	 * var dgram = require("dgram");
	 * var serverPath = "/tmp/dgram_server_sock";
	 * var clientPath = "/tmp/dgram_client_sock";
	 * var message = new Buffer("A message at " + (new Date()));
	 * var client = dgram.createSocket("unix_dgram");
	 * client.on("message", function (msg, rinfo) {
	 *   console.log("got: " + msg + " from " + rinfo.address);
	 * });
	 * client.on("listening", function () {
	 *   console.log("client listening " + client.address().address);
	 *   client.send(message, 0, message.length, serverPath);
	 * });
	 * <p>
	 * client.bind(clientPath);
	 * dgram.bind(port, [address])
	 * <p> For UDP sockets, listen for datagrams on a named port and optional 
	 * address. If address is not specified, the OS will try to listen on all 
	 * addresses.
	 * <p>Example of a UDP server listening on port 41234:
	 * <pre>
	 * var dgram = require("dgram");
	 * var server = dgram.createSocket("udp4");
	 * var messageToSend = new Buffer("A message to send");
	 * server.on("message", function (msg, rinfo) {
	 *   console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
	 * });
	 * server.on("listening", function () {
	 *   var address = server.address();
	 *   console.log("server listening " + address.address + ":" + address.port);
	 * });
	 * server.bind(41234);
	 * // server listening 0.0.0.0:41234
	 */
	//> public void bind(String address, Socket.func:bindCallback? callback)
	//> public void bind(int port, String? address, Socket.func:bindCallback? callback)
	bind: vjo.NEEDS_IMPL,
	
	/**
	 * dgram.close()
	 * <p>Close the underlying socket and stop listening for data on it. UDP 
	 * sockets automatically listen for messages, even if they did not call bind().
	 */
	//> public void close()
	close: vjo.NEEDS_IMPL,
	
	/**
	 * dgram.address()
	 * <p>Returns an object containing the address information for a socket. For 
	 * UDP sockets, this object will contain address and port. For Unix domain 
	 * sockets, it will contain only address.
	 */	
//	address: vjo.NEEDS_IMPL, //< public org.nodejs.dgram_.Socket.data.addr address()
	address: vjo.NEEDS_IMPL, //< public Socket.data.addr address()
	
	/**
	 * dgram.setBroadcast(flag)
	 * <p>Sets or clears the SO_BROADCAST socket option. When this option is set,
	 * UDP packets may be sent to a local interface's broadcast address.
	 */
	//> public void setBroadcast(boolean flag)
	setBroadcast: vjo.NEEDS_IMPL,
	
	/**
	 * dgram.setTTL(ttl)
	 * <p>Sets the IP_TTL socket option. TTL stands for "Time to Live," but in 
	 * this context it specifies the number of IP hops that a packet is allowed 
	 * to go through. Each router or gateway that forwards a packet decrements 
	 * the TTL. If the TTL is decremented to 0 by a router, it will not be 
	 * forwarded. Changing TTL values is typically done for network probes or 
	 * when multicasting.
	 * <p>The argument to setTTL() is a number of hops between 1 and 255. The 
	 * default on most systems is 64.
	 */
	//> public void setTTL(int ttl)
	setTTL: vjo.NEEDS_IMPL,
	
	/**
	 * Sets the IP_MULTICAST_TTL socket option. TTL stands for "Time to Live," 
	 * but in this context it specifies the number of IP hops that a packet is 
	 * allowed to go through, specifically for multicast traffic. Each router or 
	 * gateway that forwards a packet decrements the TTL. If the TTL is 
	 * decremented to 0 by a router, it will not be forwarded.
	 * <p>
	 * The argument to setMulticastTTL() is a number of hops between 0 and 255. 
	 * The default on most systems is 1.
	 */
	//> public void setMulticastTTL(int? ttl)
	setMulticastTTL: vjo.NEEDS_IMPL,
	
	/**
	 * Sets or clears the IP_MULTICAST_LOOP socket option. When this option is 
	 * set, multicast packets will also be received on the local interface
	 */
	//> public void setMulticastLoopback(boolean flag)
	setMulticastLoopback: vjo.NEEDS_IMPL,
	
	/**
	 * Tells the kernel to join a multicast group with IP_ADD_MEMBERSHIP socket 
	 * option.
	 * <p>
	 * If multicastAddress is not specified, the OS will try to add membership 
	 * to all valid interfaces.
	 */
	//> public void addMembership(String multicastAddress, String? multicastInterface)
	addMembership: vjo.NEEDS_IMPL,
	
	/**
	 * Opposite of addMembership - tells the kernel to leave a multicast group 
	 * with IP_DROP_MEMBERSHIP socket option. This is automatically called by 
	 * the kernel when the socket is closed or process terminates, so most apps 
	 * will never need to call this.
	 * <p>
	 * If multicastAddress is not specified, the OS will try to drop membership 
	 * to all valid interfaces.
	 */
	//> public void dropMembership(String multicastAddress, String? multicastInterface)
	dropMembership: vjo.NEEDS_IMPL,
	
	/**
	 * Calling unref on a socket will allow the program to exit if this is the only active 
	 * socket in the event system. If the socket is already unrefd calling unref again will 
	 * have no effect.
	 */
	//> public void unref()
	unref: vjo.NEEDS_IMPL,
	
	/**
	 * Opposite of unref, calling ref on a previously unrefd socket will not let the program 
	 * exit if it's the only socket left (the default behavior). If the socket is refd calling 
	 * ref again will have no effect.
	 */
	//> public void ref()
	ref: vjo.NEEDS_IMPL,
	
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
	//> public Socket ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Socket ^on(String type, Function listener)
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
	//> public Socket ^once(String event, Function listener)
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
	//> public Socket removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Socket removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()