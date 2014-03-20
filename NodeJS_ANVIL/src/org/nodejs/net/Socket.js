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
 * This object is an abstraction of of a TCP or UNIX socket. net.Stream instance 
 * implement a duplex stream interface. They can be created by the user and used as a 
 * client (with connect()) or they can be created by Node and passed to the user 
 * through the 'connection' event of a server.
 * <p>net.Stream instances are EventEmitters with the following events:
 * <p>
 * Event: 'connect'<p>
 * function () { }
 * Emitted when a stream connection successfully is established. See connect().
 * <p>
 * Event: 'secure'<p>
 * function () { }
 * Emitted when a stream connection successfully establishes an SSL handshake with 
 * its peer.
 * <p>
 * Event: 'data'<p>
 * function (data) { }
 * Emitted when data is received. The argument data will be a Buffer or String. 
 * Encoding of data is set by stream.setEncoding(). (See the section on Readable 
 * Stream for more information.)
 * <p>
 * Event: 'end'<p>
 * function () { }
 * Emitted when the other end of the stream sends a FIN packet. After this is emitted 
 * the readyState will be 'writeOnly'. One should probably just call stream.end() 
 * when this event is emitted.
 * <p>
 * Event: 'timeout'<p>
 * function () { }
 * Emitted if the stream times out from inactivity. This is only to notify that the 
 * stream has been idle. The user must manually close the connection.
 * See also: stream.setTimeout()
 * <p>
 * Event: 'drain'<p>
 * function () { }
 * Emitted when the write buffer becomes empty. Can be used to throttle uploads.
 * <p>
 * Event: 'error'<p>
 * function (exception) { }
 * Emitted when an error occurs. The 'close' event will be called directly following 
 * this event.
 * <p>
 * Event: 'close'<p>
 * function (had_error) { }
 * Emitted once the stream is fully closed. The argument had_error is a boolean which 
 * says if the stream was closed due to a transmission error.
 */
vjo.ctype('org.nodejs.net.Socket') //< public
//< needs(org.nodejs.crypto.Credentials)
//< needs(org.nodejs.crypto.Cipher)
//< needs(org.nodejs.buffer.Buffer)
.inherits('org.nodejs.stream.Duplex')
.props({
	/**
	 * 
	 */
	data: vjo.otype().defs({//< public
		/** Options used when constructing a Socket */
		create: {			//< public
			/**
			 * fd - allows you to specify the existing file descriptor of socket. 
			 */
			fd: null,		//< public int?		
			
			/**
			 * type - specified underlying protocol. It can be 'tcp4', 'tcp6', or 'unix'
			 */
			type: null,		//< public String?
			
			/**
			 * 
			 */
			allowHalfOpen: null	//< public boolean?
		},
		
		address: {			//< public		
			 /**
			  * 
			  */
			 port: null,	//< public int	
			 
			 /**
			  * 
			  */
			 family: null,	//< public String
			 
			/**
			 * 
			 */
			 address: null	//< public String
		}
	}).endType(),
	
	/**
	 * 
	 */
	//> public
	event: vjo.otype().defs({
		/**
		 * Emitted when a socket connection is successfully established. See connect().
		 */
		//> public void connect()
		connect: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted when data is received. The argument data will be a Buffer or String. 
		 * Encoding of data is set by socket.setEncoding(). (See the Readable Stream 
		 * section for more information.)
		 * <p>
		 * Note that the data will be lost if there is no listener when a Socket emits 
		 * a 'data' event.
		 */
		// public void data(org.nodejs.buffer.Buffer data) ; *** Bug: with overload here cause access control to be protected!
		//> public void data({String | Buffer} data) 
		data: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted when the other end of the socket sends a FIN packet.
		 * <p>
		 * By default (allowHalfOpen == false) the socket will destroy its file descriptor 
		 * once it has written out its pending write queue. However, by setting 
		 * allowHalfOpen == true the socket will not automatically end() its side allowing 
		 * the user to write arbitrary amounts of data, with the caveat that the user is 
		 * required to end() their side now.
		 */
		//> public void end()
		end: vjo.NEEDS_IMPL,
											
		/**
		 * Emitted if the socket times out from inactivity. This is only to notify that the 
		 * socket has been idle. The user must manually close the connection.
		 * <p>
		 * See also: socket.setTimeout()
		 */
		//> public void timeout()
		timeout: vjo.NEEDS_IMPL,
										
		/**
		 * Emitted when the write buffer becomes empty. Can be used to throttle uploads.
		 * <p>
		 * See also: the return values of socket.write()
		 */
		//> public void drain()
		drain: vjo.NEEDS_IMPL,
	
		/**
		 * function (exception) { }
		 * <p>Emitted if there was an error receiving data.
		 */
		//> public void error(Error err)
		error: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted when the underlying file descriptor has be closed. Not all 
		 * streams will emit this. (For example, an incoming HTTP request will not 
		 * emit 'close'.)
		 */
		//> public void close()
		close: vjo.NEEDS_IMPL
	}).endType(),
	
	//> public
	func: vjo.otype().defs({
		//> public void connectCb()
		connectCb: vjo.NEEDS_IMPL
	}).endType()
})
.protos({			
	/**
	 * Construct a new socket object.
	 * <p>
	 * options is an object with the following defaults:
	 * <pre>
	 * { 
	 *   fd: null,
	 *   type: null,
	 *   allowHalfOpen: false
	 * }
	 * </pre>
	 * fd allows you to specify the existing file descriptor of socket. 
	 * type specified underlying protocol. It can be 'tcp4', 'tcp6', or 'unix'. 
	 * About allowHalfOpen, refer to createServer() and 'end' event.
	 */
	//> public Socket constructs(Socket.data.create? options)
	constructs: function() {},
		
	/**
	 * Opens the connection for a given socket. If port and host are given, then the socket 
	 * will be opened as a TCP socket, if host is omitted, localhost will be assumed. If a 
	 * path is given, the socket will be opened as a unix socket to that path.
	 * <p>
	 * Normally this method is not needed, as net.createConnection opens the socket. Use 
	 * this only if you are implementing a custom Socket.
	 * <p>
	 * This function is asynchronous. When the 'connect' event is emitted the socket is 
	 * established. If there is a problem connecting, the 'connect' event will not be emitted, 
	 * the 'error' event will be emitted with the exception.
	 * <p>
	 * The connectListener parameter will be added as an listener for the 'connect' event.
	 */
	//> public void connect(Number port, String? host, Socket.func:connectCb? cb)
	//> public void connect(String path, Socket.func:connectCb? cb)
	connect: vjo.NEEDS_IMPL,
	
	/**
	 * net.Socket has the property that socket.write() always works. 
	 * This is to help users get up and running quickly. The computer 
	 * cannot always keep up with the amount of data that is written 
	 * to a socket - the network connection simply might be too slow. 
	 * Node will internally queue up the data written to a socket and s
	 * end it out over the wire when it is possible. (Internally it is 
	 * polling on the socket's file descriptor for being writable).
	 * <p>
	 * The consequence of this internal buffering is that memory may grow
	 * This property shows the number of characters currently buffered to 
	 * be written. (Number of characters is approximately equal to the number 
	 * of bytes to be written, but the buffer may contain strings, and the 
	 * strings are lazily encoded, so the exact number of bytes is not known.)
	 * <p>
	 * Users who experience large or growing bufferSize should attempt to 
	 * "throttle" the data flows in their program with pause() and resume().
	 */
	//> public int bufferSize
	bufferSize: null,			
							
	/**
	 * Set the encoding for the socket as a Readable Stream. See stream.setEncoding() 
	 * for more information.
	 * <p>
	 * Makes the 'data' event emit a string instead of a Buffer. encoding can be 
	 * 'utf8', 'utf16le' ('ucs2'), 'ascii', or 'hex'. Defaults to 'utf8'.
	 */
	//> public void setEncoding(String? encoding)
	setEncoding: vjo.NEEDS_IMPL, 
		 					
	/**
	 * Sends data on the socket. The second parameter specifies the encoding in the case 
	 * of a string--it defaults to UTF8 encoding.
	 * <p>
	 * Returns true if the entire data was flushed successfully to the kernel buffer. 
	 * Returns false if all or part of the data was queued in user memory. 'drain' will 
	 * be emitted when the buffer is again free.
	 * <p>
	 * The optional callback parameter will be executed when the data is finally written 
	 * out - this may not be immediately.
	 */
	//> public boolean write({String | Buffer} data)
	//> public boolean write({String | Buffer} data, String encoding)
	//> public boolean write({String | Buffer} data, String encoding, Function cb)
	write: vjo.NEEDS_IMPL,	
	
	/**
	 * Half-closes the socket. i.e., it sends a FIN packet. It is possible the server will '
	 * still send some data.
	 * <p>
	 * If data is specified, it is equivalent to calling socket.write(data, encoding) followed 
	 * by socket.end().
	 */
	//> public void end(Buffer? data)
	//> public void end(String data, String? encoding)
	end: vjo.NEEDS_IMPL, 
					
	/**
	 * stream.destroy()
	 * <p>Ensures that no more I/O activity happens on this stream. Only 
	 * necessary in case of errors (parse error or so).
	 */
	//> public void destroy(Object? exception)
	destroy: vjo.NEEDS_IMPL,
			 					
	/**
	 * Pauses the reading of data. That is, 'data' events will not be emitted. Useful to 
	 * throttle back an upload.
	 */
	//> public void pause()
	pause: vjo.NEEDS_IMPL,
		 		
	/**
	 * stream.resume()
	 * <p>Resumes reading after a call to pause().
	 */
	//> public void resume()
	resume: vjo.NEEDS_IMPL,
			
	/**
	 * Sets the socket to timeout after timeout milliseconds of inactivity on 
	 * the socket. By default net.Socket do not have a timeout.
	 * <p>
	 * When an idle timeout is triggered the socket will receive a 'timeout' event 
	 * but the connection will not be severed. The user must manually end() or 
	 * destroy() the socket.
	 * <p>
	 * If timeout is 0, then the existing idle timeout is disabled.
	 * <p>
	 * The optional callback parameter will be added as a one time listener for the 
	 * 'timeout' event.
	 */
	//> public void setTimeout(int timeoutMillis, Function? callback)
	setTimeout: vjo.NEEDS_IMPL,			 	
		
	/**
	 * Disables the Nagle algorithm. By default TCP connections use the Nagle algorithm, 
	 * they buffer data before sending it off. Setting true for noDelay will immediately 
	 * fire off data each time socket.write() is called. noDelay defaults to true.
	 */
	//> public void setNoDelay(boolean? noDelay)
	setNoDelay: vjo.NEEDS_IMPL,
		
	/**
	 * Enable/disable keep-alive functionality, and optionally set the initial delay before 
	 * the first keepalive probe is sent on an idle socket. enable defaults to false.
	 * <p>
	 * Set initialDelay (in milliseconds) to set the delay between the last data packet 
	 * received and the first keepalive probe. Setting 0 for initialDelay will leave the 
	 * value unchanged from the default (or previous) setting. Defaults to 0.
	 */
	//> public void setKeepAlive(boolean? enable, int? initialDelayMillis)
	setKeepAlive: vjo.NEEDS_IMPL,
		 
	/**
	 * Returns the bound address, the address family name and port of the socket as reported 
	 * by the operating system. Returns an object with three properties, e.g. 
	 * { port: 12346, family: 'IPv4', address: '127.0.0.1' }
	 */
	//> public Socket.data.address address()
	address: vjo.NEEDS_IMPL,
	
	/**
	 * Calling unref on a socket will allow the program to exit if this is the only active 
	 * socket in the event system. If the socket is already unrefd calling unref again will 
	 * have no effect.
	 */
	//> public void unref()
	unref: vjo.NEEDS_IMPL,
	
	/**
	 * Opposite of unref, calling ref on a previously unrefd socket will not let the program 
	 * exit if it's the only socket left (the default behavior). If the socket is refd 
	 * calling ref again will have no effect.
	 */
	//> public void ref()
	ref: vjo.NEEDS_IMPL,
	
	/**
	 * The string representation of the remote IP address. For example, '74.125.127.100' 
	 * or '2001:4860:a005::68'.
	 */
	//> public String
	remoteAddress: null,	
	
	/**
	 * The numeric representation of the remote port. For example, 80 or 21.
	 */
	//> public int
	remotePort: null,	
	
	/**
	 * The string representation of the local IP address the remote client is connecting on.
	 * For example, if you are listening on '0.0.0.0' and the client connects on '192.168.1.1', 
	 * the value would be '192.168.1.1'.
	 */
	//> public String
	localAddress: null,
	
	/**
	 * The numeric representation of the local port. For example, 80 or 21.
	 */
	//> public int localPort
	localPort: null,
	
	/**
	 * The amount of received bytes.
	 */
	//> public int bytesRead
	bytesRead: 0,
	
	/**
	 * The amount of bytes sent.
	 */
	//> public int bytesWritten
	bytesWritten: 0,
	
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
.endType();