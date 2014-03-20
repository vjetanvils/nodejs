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
 * A Read-Eval-Print-Loop (REPL) is available both as a standalone program and easily 
 * includable in other programs. The REPL provides a way to interactively run JavaScript 
 * and see the results. It can be used for debugging, testing, or just trying things out.
 * <p>
 * By executing node without any arguments from the command-line you will be dropped into 
 * the REPL. It has simplistic emacs line-editing.
 * <pre>
 * mjr:~$ node
 * Type '.help' for options.
 * > a = [ 1, 2, 3];
 * [ 1, 2, 3 ]
 * > a.forEach(function (v) {
 * ...   console.log(v);
 * ...   });
 * 1
 * 2
 * 3
 * </pre>
 * For advanced line-editors, start node with the environmental variable NODE_NO_READLINE=1. 
 * This will start the main and debugger REPL in canonical terminal settings which will allow 
 * you to use with rlwrap.
 * <p>
 * For example, you could add this to your bashrc file:
 * <pre>
 * alias node="env NODE_NO_READLINE=1 rlwrap node"
 * </pre>
 */
vjo.ctype('org.nodejs.repl') 	//< public
//< needs(org.nodejs.stream.Readable)
//< needs(org.nodejs.stream.Writable)
.inherits('org.nodejs.events.EventEmitter<repl>')
.props({ })
.protos({
	REPLServer: null, //< public type::org.nodejs.repl.REPLServer

	event: vjo.otype().defs({ //< public
		/**
		 * function () {}
		 * <p>
		 * Emitted when the user exits the REPL in any of the defined ways. Namely, typing 
		 * .exit at the repl, pressing Ctrl+C twice to signal SIGINT, or pressing Ctrl+D 
		 * to signal "end" on the input stream.
		 * <p>
		 * Example of listening for exit:
		 * <pre>
		 * r.on('exit', function () {
		 *   console.log('Got "exit" event from repl!');
		 *   process.exit();
		 * });
		 * </pre>
		 */
		//> public void exit()
		exit: vjo.NEEDS_IMPL
	}).endType(),
	
	funcs: vjo.otype().defs({ //< public
		/**
		 * eval() function for use in the start(options)
		 */
		//> public int? eval(String cmd, Object context, String filename, Function callback)
		eval_: vjo.NEEDS_IMPL
	}).endType(),
	
	data: vjo.otype().defs({		//< public
		options: { 					//< public
			/**
			 * The prompt and stream for all I/O. Defaults to > .
			 */
			prompt: null,			//< public String?
			
			/**
			 * The readable stream to listen to. Defaults to process.stdin.
			 */
			input: null,			//< public Readable?
			
			/**
			 * The writable stream to write readline data to. Defaults to process.stdout.
			 */
			output: null,			//< public Writable?
			
			/**
			 * Pass true if the stream should be treated like a TTY, and have ANSI/VT100 
			 * escape codes written to it. Defaults to checking isTTY on the output stream 
			 * upon instantiation.
			 */
			terminal: null,			//< public boolean?
			
			/**
			 * Function that will be used to eval each given line. Defaults to an async 
			 * wrapper for eval().
			 * <p>
			 * You can use your own eval function if it has following signature:
			 * <pre>
			 * function eval(cmd, context, filename, callback) {
			 *   callback(null, result);
			 * }
			 * </pre>
			 */
			eval_: vjo.NEEDS_IMPL,	//< public repl.funcs:eval_?
			
			/**
			 * A boolean which specifies whether or not the writer function should output 
			 * colors. If a different writer function is set then this does nothing. 
			 * <p>
			 * Defaults to the repl's terminal value.
			 */
			useColors: null,		//< public boolean?
			
			/**
			 *  If set to true, then the repl will use the global object, instead of running 
			 *  scripts in a separate context. Defaults to false.
			 */
			useGlobal: null,		//< public boolean?
			
			/**
			 * if set to true, then the repl will not output the return value of command if 
			 * it's undefined. Defaults to false.
			 */
			ignoreUndefined: null,	//< public boolean?
			
			/**
			 * the function to invoke for each command that gets evaluated which returns the 
			 * formatting (including coloring) to display. Defaults to util.inspect.
			 */
			writer: vjo.NEEDS_IMPL	//< public Function?
		}
	}).endType(),
	
	/**
	 * Returns and starts a REPLServer instance. Accepts an "options" Object that takes 
	 * the following values:
	 * <ul>
	 * <li>prompt - the prompt and stream for all I/O. Defaults to > .
	 * <li>input - the readable stream to listen to. Defaults to process.stdin.
	 * <li>output - the writable stream to write readline data to. Defaults to process.stdout.
	 * <li>terminal - pass true if the stream should be treated like a TTY, and have ANSI/VT100 
	 * escape codes written to it. Defaults to checking isTTY on the output stream upon instantiation.
	 * <li>eval - function that will be used to eval each given line. Defaults to an async 
	 * wrapper for eval(). See below for an example of a custom eval.
	 * <li>useColors - a boolean which specifies whether or not the writer function should 
	 * output colors. If a different writer function is set then this does nothing. Defaults 
	 * to the repl's terminal value.
	 * <li>useGlobal - if set to true, then the repl will use the global object, instead 
	 * of running scripts in a separate context. Defaults to false.
	 * <li>ignoreUndefined - if set to true, then the repl will not output the return value 
	 * of command if it's undefined. Defaults to false.
	 * <li>writer - the function to invoke for each command that gets evaluated which returns 
	 * the formatting (including coloring) to display. Defaults to util.inspect.
	 * </ul>
	 * You can use your own eval function if it has following signature:
	 * <pre>
	 * function eval(cmd, context, filename, callback) {
	 *   callback(null, result);
	 * }
	 * </pre>
	 * Multiple REPLs may be started against the same running instance of node. Each will 
	 * share the same global object but will have unique I/O.
	 * <p>
	 * Here is an example that starts a REPL on stdin, a Unix socket, and a TCP socket:
	 * <pre>
	 * var net = require("net"), repl = require("repl");
	 * var connections = 0;
	 * repl.start({
	 *   prompt: "node via stdin> ",
	 *   input: process.stdin,
	 *   output: process.stdout
	 * });
	 * 
	 * net.createServer(function (socket) {
	 *   connections += 1;
	 *   repl.start({
	 *     prompt: "node via Unix socket> ",
	 *     input: socket,
	 *     output: socket
	 *   }).on('exit', function() {
	 *     socket.end();
	 *   })
	 * }).listen("/tmp/node-repl-sock");
	 * 
	 * net.createServer(function (socket) {
	 *   connections += 1;
	 *   repl.start({
	 *     prompt: "node via TCP socket> ",
	 *     input: socket,
	 *     output: socket
	 *   }).on('exit', function() {
	 *     socket.end();
	 *   });
	 * }).listen(5001);
	 * </pre>
	 * Running this program from the command line will start a REPL on stdin. Other REPL 
	 * clients may connect through the Unix socket or TCP socket. telnet is useful for 
	 * connecting to TCP sockets, and socat can be used to connect to both Unix and TCP 
	 * sockets.
	 * <p>
	 * By starting a REPL from a Unix socket-based server instead of stdin, you can connect 
	 * to a long-running node process without restarting it.
	 * <p>
	 * For an example of running a "full-featured" (terminal) REPL over a net.Server and 
	 * net.Socket instance, see: https://gist.github.com/2209310
	 * <p>
	 * For an example of running a REPL instance over curl(1), see: https://gist.github.com/2053342
	 */
	//> public repl start(repl.data.options)
	start: vjo.NEEDS_IMPL,
	
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
	//> public repl ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public repl ^on(String type, Function listener)
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
	//> public repl ^once(String event, Function listener)
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
	//> public repl removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public repl removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType();