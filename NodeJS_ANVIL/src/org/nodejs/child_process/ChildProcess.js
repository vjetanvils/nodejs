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
 * ChildProcess is an EventEmitter.
 * <p>
 * Child processes always have three streams associated with them. child.stdin, child.stdout, 
 * and child.stderr. These may be shared with the stdio streams of the parent process, or 
 * they may be separate stream objects which can be piped to and from.
 * <p>
 * The ChildProcess class is not intended to be used directly. Use the spawn() or fork() 
 * methods to create a Child Process instance.
 * <p>
 * Stability: 3 - Stable
 */
vjo.ctype('org.nodejs.child_process.ChildProcess') //< public
//< needs(org.nodejs.net.Socket)
//< needs(org.nodejs.net.Server)
//< needs(org.nodejs.stream.Readable)
//< needs(org.nodejs.stream.Writable)
.inherits('org.nodejs.events.EventEmitter')
.props({
	event: vjo.otype().defs({	//< public
		/**
		 * Emitted when:
		 * <ol>
		 * <li>The process could not be spawned, or
		 * <li>The process could not be killed, or
		 * <li>Sending a message to the child process failed for whatever reason
		 * </ol>
		 */
		error: vjo.NEEDS_IMPL,	//< public int? error(Error? err)
		
		/**
		 * code Number the exit code, if it exited normally.
		 * <p>
		 * signal String the signal passed to kill the child process, if it was killed 
		 * by the parent.
		 * <p>
		 * This event is emitted after the child process ends. If the process terminated 
		 * normally, code is the final exit code of the process, otherwise null. If the 
		 * process terminated due to receipt of a signal, signal is the string name of the 
		 * signal, otherwise null.
		 * <p>
		 * Note that the child process stdio streams might still be open.
		 * <p>See waitpid(2).
		 */
		exit: vjo.NEEDS_IMPL,	//< public int? exit(int exitCode, String? signal)
		
		/**
		 * This event is emitted when the stdio streams of a child process have all terminated. 
		 * This is distinct from 'exit', since multiple processes might share the same stdio 
		 * streams.
		 */
		close: vjo.NEEDS_IMPL,	//< public int? close(int exitCode, String? signal)
		
		/**
		 * This event is emitted after using the .disconnect() method in the parent or in 
		 * the child. After disconnecting it is no longer possible to send messages. An 
		 * alternative way to check if you can send messages is to see if the child.connected 
		 * property is true.
		 */
		disconnect: vjo.NEEDS_IMPL,	//< public int? disconnect()
		
		message: vjo.NEEDS_IMPL	//< public int? message({Number | String | Object} message, {Socket | Server | Object}? sendHandle)
	}).endType()
})
.protos({	
	/**
	 * Stream object
	 * <p>
	 * A Writable Stream that represents the child process's stdin. Closing this stream via 
	 * end() often causes the child process to terminate.
	 * <p>
	 * If the child stdio streams are shared with the parent, then this will not be set.
	 */
	stdin: null,	//< public Writable	
	
	/**
	 * Stream object
	 * <p>
	 * A Readable Stream that represents the child process's stdout.
	 * <p>
	 * If the child stdio streams are shared with the parent, then this will not be set.
	 */
	stdout: null,	//< public Readable	
	
	/**
	 * Stream object
	 * <p>
	 * A Readable Stream that represents the child process's stderr.
	 * <p>
	 * If the child stdio streams are shared with the parent, then this will not be set.
	 */
	stderr: null,	//< public Readable	
	
	/**
	 * The PID of the child process.
	 * <p>
	 * Example:
	 * <pre>
	 * var spawn = require('child_process').spawn ;
	 * var grep  = spawn('grep', ['ssh']);
	 * console.log('Spawned child pid: ' + grep.pid);
	 * grep.stdin.end();
	 */
	pid: null,		//< public int
	
	/**
	 * Send a signal to the child process. If no argument is given, the process will be sent 
	 * 'SIGTERM'. See signal(7) for a list of available signals.
	 * <pre>
	 * var spawn = require('child_process').spawn, grep  = spawn('grep', ['ssh']);
	 * grep.on('exit', function (code, signal) {
	 *   console.log('child process terminated due to receipt of signal '+signal);
	 * });
	 * // send SIGHUP to process
	 * grep.kill('SIGHUP');
	 * </pre>
	 * Note that while the function is called kill, the signal delivered to the child process 
	 * may not actually kill it. kill really just sends a signal to a process.
	 * <p>
	 * See kill(2)
	 */
	kill: vjo.NEEDS_IMPL,	//< public int? kill(String? signal)
	
	/**
	 * When using child_process.fork() you can write to the child using 
	 * child.send(message, [sendHandle]) and messages are received by a 'message' event on 
	 * the child.
	 * <p>
	 * For example:
	 * <pre>
	 * var cp = require('child_process');
	 * var n = cp.fork(__dirname + '/sub.js');
	 * 
	 * n.on('message', function(m) {
	 *   console.log('PARENT got message:', m);
	 * });
	 * 
	 * n.send({ hello: 'world' });
	 * </pre>
	 * And then the child script, 'sub.js' might look like this:
	 * <pre>
	 * process.on('message', function(m) {
	 *   console.log('CHILD got message:', m);
	 * });
	 * process.send({ foo: 'bar' });
	 * </pre>
	 * In the child the process object will have a send() method, and process will emit 
	 * objects each time it receives a message on its channel.
	 * <p>
	 * There is a special case when sending a {cmd: 'NODE_foo'} message. All messages 
	 * containing a NODE_ prefix in its cmd property will not be emitted in the message 
	 * event, since they are internal messages used by node core. Messages containing the 
	 * prefix are emitted in the internalMessage event, you should by all means avoid using 
	 * this feature, it is subject to change without notice.
	 * <p>
	 * The sendHandle option to child.send() is for sending a TCP server or socket object 
	 * to another process. The child will receive the object as its second argument to the 
	 * message event.
	 * <p>
	 * <h3>send server object</h3>
	 * <p>
	 * Here is an example of sending a server:
	 * <pre>
	 * var child = require('child_process').fork('child.js');
	 * // Open up the server object and send the handle.
	 * var server = require('net').createServer();
	 * server.on('connection', function (socket) {
	 *   socket.end('handled by parent');
	 * });
	 * server.listen(1337, function() {
	 *   child.send('server', server);
	 * });
	 * </pre>
	 * And the child would the receive the server object as:
	 * <pre>
	 * process.on('message', function(m, server) {
	 *   if (m === 'server') {
	 *     server.on('connection', function (socket) {
	 *       socket.end('handled by child');
	 *     });
	 *   }
	 * });
	 * </pre>
	 * Note that the server is now shared between the parent and child, this means that some 
	 * connections will be handled by the parent and some by the child.
	 * <h3>send socket object</h3>
	 * <p>
	 * Here is an example of sending a socket. It will spawn two children and handle connections 
	 * with the remote address 74.125.127.100 as VIP by sending the socket to a "special" 
	 * child process. Other sockets will go to a "normal" process.
	 * <pre>
	 * var normal = require('child_process').fork('child.js', ['normal']);
	 * var special = require('child_process').fork('child.js', ['special']);
	 * 
	 * // Open up the server and send sockets to child
	 * var server = require('net').createServer();
	 * server.on('connection', function (socket) {
	 *   // if this is a VIP
	 *   if (socket.remoteAddress === '74.125.127.100') {
	 *     special.send('socket', socket);
	 *     return;
	 *   }
	 *   // just the usual dudes
	 *   normal.send('socket', socket);
	 * });
	 * server.listen(1337);
	 * </pre>
	 * The child.js could look like this:
	 * <pre>
	 * process.on('message', function(m, socket) {
	 *   if (m === 'socket') {
	 *     socket.end('You were handled as a ' + process.argv[2] + ' person');
	 *   }
	 * });
	 * </pre>
	 * Note that once a single socket has been sent to a child the parent can no longer keep 
	 * track of when the socket is destroyed. To indicate this condition the .connections 
	 * property becomes null. It is also recommended not to use .maxConnections in this 
	 * condition.
	 */
	//> public int? send({String | Number | Object} message, Object? sendHandle)
	send: vjo.NEEDS_IMPL,
	
	/**
	 * To close the IPC connection between parent and child use the child.disconnect() method. 
	 * This allows the child to exit gracefully since there is no IPC channel keeping it alive. 
	 * When calling this method the disconnect event will be emitted in both parent and child, 
	 * and the connected flag will be set to false. Please note that you can also call 
	 * process.disconnect() in the child process.
	 */
	//> public int? disconnect()
	disconnect: vjo.NEEDS_IMPL,
		
	/** --- Not in docs; from code inspection --- */
	//> public void ref()
	ref: vjo.NEEDS_IMPL,
	
	/** --- Not in docs; from code inspection ---
	 * By default, the parent will wait for the detached child to exit. To prevent the parent 
	 * from waiting for a given child, use the child.unref() method, and the parent's event 
	 * loop will not include the child in its reference count.
	 */
	//> public void unref()
	unref: vjo.NEEDS_IMPL,
	
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
	//> public ChildProcess ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public ChildProcess ^on(String type, Function listener)
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
	//> public ChildProcess ^once(String event, Function listener)
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
	//> public ChildProcess removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public ChildProcess removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()