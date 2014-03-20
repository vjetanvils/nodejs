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
 * Datagram sockets are available through require('dgram'). Datagrams are most 
 * commonly handled as IP/UDP messages, but they can also be used over Unix 
 * domain sockets.
 * <p>
 * Event: 'message'
 * function (msg, rinfo) { }
 *
 * Emitted when a new datagram is available on a socket. msg is a Buffer and 
 * rinfo is an object with the sender's address information and the number of 
 * bytes in the datagram.
 * <p>
 * Event: 'listening'
 * function () { }
 * Emitted when a socket starts listening for datagrams. This happens as soon 
 * as UDP sockets are created. Unix domain sockets do not start listening until 
 * calling bind() on them.
 * <p>
 * Event: 'close'
 * function () { }
 * Emitted when a socket is closed with close(). No new message events will be 
 * emitted on this socket.
 */
//> public
vjo.ctype('org.nodejs.dgram') 
.props({	
		
})
.protos({	
	Socket: null, //< public type::org.nodejs.dgram.Socket
	
	/**
	 * dgram.createSocket(type, [callback])
	 * <p>Creates a datagram socket of the specified types. Valid types are: 
	 * udp4, udp6, and unix_dgram.
	 * <p>Takes an optional callback which is added as a listener for message 
	 * events.
	 * <pre>
	 * dgram.send(buf, offset, length, path, [callback])
	 * </pre>
	 * For Unix domain datagram sockets, the destination address is a pathname 
	 * in the filesystem. An optional callback may be supplied that is invoked 
	 * after the sendto call is completed by the OS. It is not safe to re-use 
	 * buf until the callback is invoked. Note that unless the socket is bound 
	 * to a pathname with bind() there is no way to receive messages on this socket.
	 * <p>
	 * Example of sending a message to syslogd on OSX via Unix domain socket 
	 * /var/run/syslog:
	 * <pre>
	 * var dgram = require('dgram');
	 * var message = new Buffer("A message to log.");
	 * var client = dgram.createSocket("unix_dgram");
	 * client.send(
	 *   message, 0, message.length, "/var/run/syslog",
	 *   function (err, bytes) {
	 *       if (err) {
	 *             throw err;
	 *       }
	 *       console.log("Wrote " + bytes + " bytes to socket.");
	 *    });
	 *  </pre>
	 */
	//> public dgram.Socket createSocket(String type, Function? callback)
	createSocket: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();