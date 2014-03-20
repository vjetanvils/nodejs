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
 * A Worker object contains all public information and method about a worker. In the master 
 * it can be obtained using cluster.workers. In a worker it can be obtained using 
 * cluster.worker.
 */
vjo.ctype('org.nodejs.cluster.Worker') //< public
//< needs(org.nodejs.child_process.ChildProcess)
.inherits('org.nodejs.events.EventEmitter')
.props({
	event: vjo.otype().defs({	//< public
		/**
		 * This event is the same as the one provided by child_process.fork(). In the 
		 * master you should use this event, however in a worker you can also use 
		 * process.on('message')
		 * <p>
		 * As an example, here is a cluster that keeps count of the number of requests in 
		 * the master process using the message system:
		 * <pre>
		 * var cluster = require('cluster');
		 * var http = require('http');
		 * 
		 * if (cluster.isMaster) {
		 *   // Keep track of http requests
		 *   var numReqs = 0;
		 *   setInterval(function() {
		 *     console.log("numReqs =", numReqs);
		 *   }, 1000);
		 *   
		 *   // Count requests
		 *   function messageHandler(msg) {
		 *     if (msg.cmd && msg.cmd == 'notifyRequest') {
		 *       numReqs += 1;
		 *     }
		 *   }
		 *   
		 *   // Start workers and listen for messages containing notifyRequest
		 *   var numCPUs = require('os').cpus().length;
		 *   for (var i = 0; i < numCPUs; i++) {
		 *     cluster.fork();
		 *   }
		 *   
		 *   Object.keys(cluster.workers).forEach(function(id) {
		 *     cluster.workers[id].on('message', messageHandler);
		 *   });
		 * } else {
		 *   // Worker processes have a http server.
		 *   http.Server(function(req, res) {
		 *     res.writeHead(200);
		 *     res.end("hello world\n");
		 *     
		 *     // notify master about the request
		 *     process.send({ cmd: 'notifyRequest' });
		 *   }).listen(8000);
		 * }
		 * </pre>
		 */
		//> public void message(Object? object)
		message: vjo.NEEDS_IMPL,
		
		/**
		 * Same as the cluster.on('online') event, but emits only when the state change on 
		 * the specified worker.
		 * <pre>
		 * cluster.fork().on('online', function() {
		 *   // Worker is online
		 * };
		 * </pre>
		 */
		//> public void online()
		online: vjo.NEEDS_IMPL,
		
		/**
		 * Same as the cluster.on('listening') event, but emits only when the state change 
		 * on the specified worker.
		 * <pre>
		 * cluster.fork().on('listening', function(address) {
		 *   // Worker is listening
		 * };
		 * </pre>
		 */
		listening: vjo.NEEDS_IMPL,
		
		/**
		 * Same as the cluster.on('disconnect') event, but emits only when the state change 
		 * on the specified worker.
		 * <pre>
		 * cluster.fork().on('disconnect', function() {
		 *   // Worker has disconnected
		 * };
		 * </pre>
		 */
		//> public void disconnect()
		disconnect: vjo.NEEDS_IMPL,
		
		/**
		 * Emitted by the individual worker instance, when the underlying child process is 
		 * terminated. See child_process event: 'exit'.
		 * <pre>
		 * var worker = cluster.fork();
		 * worker.on('exit', function(code, signal) {
		 *   if( signal ) {
		 *     console.log("worker was killed by signal: "+signal);
		 *   } else if( code !== 0 ) {
		 *     console.log("worker exited with error code: "+code);
		 *   } else {
		 *     console.log("worker success!");
		 *   }
		 * };
		 * </pre>
		 */
		//> public void exit(int? exitCode, String? signal)
		exit: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	/**
	 * Each new worker is given its own unique id, this id is stored in the id.
	 * <p>
	 * While a worker is alive, this is the key that indexes it in cluster.workers
	 */
	//> public String
	id: null,
	
	/**
	 * All workers are created using child_process.fork(), the returned object from this 
	 * function is stored in process.
	 * <p>
	 * See: Child Process module
	 */
	//> public ChildProcess
	process: null,
	
	/**
	 * This property is a boolean. It is set when a worker dies after calling .destroy() 
	 * or immediately after calling the .disconnect() method. Until then it is undefined.
	 */
	//> public boolean
	suicide: null,
	
	/**
	 * This function is equal to the send methods provided by child_process.fork(). In the 
	 * master you should use this function to send a message to a specific worker. However 
	 * in a worker you can also use process.send(message), since this is the same function.
	 * <p>
	 * This example will echo back all messages from the master:
	 * <pre>
	 * if (cluster.isMaster) {
	 *   var worker = cluster.fork();
	 *   worker.send('hi there');
	 * } else if (cluster.isWorker) {
	 *   process.on('message', function(msg) {
	 *     process.send(msg);
	 *   });
	 * }
	 * </pre>
	 */
	//> public void send(String message, Object? sendHandle)
	send: vjo.NEEDS_IMPL,
	
	/**
	 * This function will kill the worker, and inform the master to not spawn a new worker. 
	 * The boolean suicide lets you distinguish between voluntary and accidental exit.
	 * <pre>
	 * cluster.on('exit', function(worker, code, signal) {
	 *   if (worker.suicide === true) {
	 *     console.log('Oh, it was just suicide\' � no need to worry').
	 *   }
	 * });
	 * 
	 * // destroy worker
	 * worker.destroy();
	 * </pre>
	 */
	//> public void destroy()
	destroy: vjo.NEEDS_IMPL,
	
	/**
	 * When calling this function the worker will no longer accept new connections, but 
	 * they will be handled by any other listening worker. Existing connection will be 
	 * allowed to exit as usual. When no more connections exist, the IPC channel to the 
	 * worker will close allowing it to die graceful. When the IPC channel is closed the 
	 * disconnect event will emit, this is then followed by the exit event, there is 
	 * emitted when the worker finally die.
	 * <p>
	 * Because there might be long living connections, it is useful to implement a timeout. 
	 * This example ask the worker to disconnect and after 2 seconds it will destroy the 
	 * server. An alternative would be to execute worker.destroy() after 2 seconds, but 
	 * that would normally not allow the worker to do any cleanup if needed.
	 * <pre>
	 * if (cluster.isMaster) {
	 *   var worker = cluster.fork();
	 *   var timeout;
	 *   
	 *   worker.on('listening', function(address) {
	 *     worker.disconnect();
	 *     timeout = setTimeout(function() {
	 *       worker.send('force kill');
	 *     }, 2000);
	 *   });
	 *   
	 *   worker.on('disconnect', function() {
	 *     clearTimeout(timeout);
	 *   });
	 * } else if (cluster.isWorker) {
	 *   var net = require('net');
	 *   var server = net.createServer(function(socket) {
	 *     // connection never end
	 *   });
	 *   
	 *   server.listen(8000);
	 *   
	 *   server.on('close', function() {
	 *     // cleanup
	 *   });
	 *   
	 *   process.on('message', function(msg) {
	 *     if (msg === 'force kill') {
	 *       server.destroy();
	 *     }
	 *   });
	 * }
	 * </pre>
	 */
	//> public void disconnect()
	disconnect: vjo.NEEDS_IMPL,
	
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
	//> public Worker ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Worker ^on(String type, Function listener)
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
	//> public Worker ^once(String event, Function listener)
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
	//> public Worker removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Worker removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType();