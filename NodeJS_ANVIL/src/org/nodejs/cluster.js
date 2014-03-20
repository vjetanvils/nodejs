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
 * Stability: 1 - Experimental
 * <p>
 * A single instance of Node runs in a single thread. To take advantage of multi-core 
 * systems the user will sometimes want to launch a cluster of Node processes to handle 
 * the load.
 * <p>
 * The cluster module allows you to easily create a network of processes that all share 
 * server ports.
 * <pre>
 * var cluster = require('cluster');
 * var http = require('http');
 * var numCPUs = require('os').cpus().length;
 * 
 * if (cluster.isMaster) {
 *   // Fork workers.
 *   for (var i = 0; i < numCPUs; i++) {
 *     cluster.fork();
 *   }
 *   
 *   cluster.on('exit', function(worker, code, signal) {
 *     console.log('worker ' + worker.process.pid + ' died');
 *   });
 * } else {
 *   // Workers can share any TCP connection
 *   // In this case its a HTTP server
 *   http.createServer(function(req, res) {
 *     res.writeHead(200);
 *     res.end("hello world\n");
 *   }).listen(8000);
 * }
 * </pre>
 * Running node will now share port 8000 between the workers:
 * <pre>
 * % node server.js
 * Worker 2438 online
 * Worker 2437 online
 * </pre>
 * This feature was introduced recently, and may change in future versions. Please try it 
 * out and provide feedback.
 * <p>
 * Also note that, on Windows, it is not yet possible to set up a named pipe server in a 
 * worker.
 * 
 * <h3>How It Works</h3>
 * The worker processes are spawned using the child_process.fork method, so that they can 
 * communicate with the parent via IPC and pass server handles back and forth.
 * <p>
 * When you call server.listen(...) in a worker, it serializes the arguments and passes 
 * the request to the master process. If the master process already has a listening server 
 * matching the worker's requirements, then it passes the handle to the worker. If it does 
 * not already have a listening server matching that requirement, then it will create one, 
 * and pass the handle to the child.
 * <p>
 * This causes potentially surprising behavior in three edge cases:
 * <ol>
 * <li>server.listen({fd: 7}) Because the message is passed to the master, file descriptor 
 * 7 in the parent will be listened on, and the handle passed to the worker, rather than 
 * listening to the worker's idea of what the number 7 file descriptor references.
 * <li>server.listen(handle) Listening on handles explicitly will cause the worker to use 
 * the supplied handle, rather than talk to the master process. If the worker already has 
 * the handle, then it's presumed that you know what you are doing.
 * <li>server.listen(0) Normally, this will cause servers to listen on a random port. 
 * However, in a cluster, each worker will receive the same "random" port each time they 
 * do listen(0). In essence, the port is random the first time, but predictable thereafter. 
 * If you want to listen on a unique port, generate a port number based on the cluster 
 * worker ID.
 * </ol>
 * <p>
 * When multiple processes are all accept()ing on the same underlying resource, the 
 * operating system load-balances across them very efficiently. There is no routing logic 
 * in Node.js, or in your program, and no shared state between the workers. Therefore, it 
 * is important to design your program such that it does not rely too heavily on in-memory 
 * data objects for things like sessions and login.
 * <p>
 * Because workers are all separate processes, they can be killed or re-spawned depending 
 * on your program's needs, without affecting other workers. As long as there are some 
 * workers still alive, the server will continue to accept connections. Node does not 
 * automatically manage the number of workers for you, however. It is your responsibility 
 * to manage the worker pool for your application's needs.
 */
vjo.ctype('org.nodejs.cluster') //< public
//< needs(org.nodejs.cluster.Worker)
.inherits('org.nodejs.events.EventEmitter<cluster>')
.props({
	data: vjo.otype().defs({	//< public
		settings: {				//< public
			/**
			 * String file path to worker file. (Default=__filename)
			 */
			//> public String?
			exec: null,
			
			/**
			 * Array string arguments passed to worker. (Default=process.argv.slice(2))
			 */
			//> public String[ ]?
			args: null,
			
			/**
			 * Boolean whether or not to send output to parent's stdio. (Default=false)
			 */
			//> public boolean?
			silent: null
		}
	
	}).endType(),
	
	event: vjo.otype().defs({
		/**
		 * When a new worker is forked the cluster module will emit a 'fork' event. This 
		 * can be used to log worker activity, and create you own timeout.
		 * <pre>
		 * var timeouts = [];
		 * function errorMsg() {
		 *   console.error("Something must be wrong with the connection ...");
		 * }
		 * 
		 * cluster.on('fork', function(worker) {
		 *   timeouts[worker.id] = setTimeout(errorMsg, 2000);
		 * });
		 * 
		 * cluster.on('listening', function(worker, address) {
		 *   clearTimeout(timeouts[worker.id]);
		 * });
		 * 
		 * cluster.on('exit', function(worker, code, signal) {
		 *   clearTimeout(timeouts[worker.id]);
		 *   errorMsg();
		 * });
		 * </pre>
		 */
		//> public void fork(cluster.Worker? worker)
		fork: vjo.NEEDS_IMPL,
		
		/**
		 * After forking a new worker, the worker should respond with a online message. 
		 * When the master receives a online message it will emit such event. The difference 
		 * between 'fork' and 'online' is that fork is emitted when the master tries to 
		 * fork a worker, and 'online' is emitted when the worker is being executed.
		 * <pre>
		 * cluster.on('online', function(worker) {
		 *   console.log("Yay, the worker responded after it was forked");
		 * });
		 * </pre>
		 */
		//> public void online(cluster.Worker? worker)
		online: vjo.NEEDS_IMPL,
		
		/**
		 * When calling listen() from a worker, a 'listening' event is automatically assigned 
		 * to the server instance. When the server is listening a message is send to the 
		 * master where the 'listening' event is emitted.
		 * <p>
		 * The event handler is executed with two arguments, the worker contains the worker 
		 * object and the address object contains the following connection properties: address, 
		 * port and addressType. This is very useful if the worker is listening on more 
		 * than one address.
		 * <p>
		 * cluster.on('listening', function(worker, address) {
		 *   console.log("A worker is now connected to " + address.address + ":" + address.port);
		 * });
		 * </pre>
		 */
		//> public void listening(cluster.Worker? worker, Object? address)
		listening: vjo.NEEDS_IMPL,
		
		/**
		 * When a workers IPC channel has disconnected this event is emitted. This will 
		 * happen when the worker dies, usually after calling .destroy().
		 * <p>
		 * When calling .disconnect(), there may be a delay between the disconnect and exit 
		 * events. This event can be used to detect if the process is stuck in a cleanup or 
		 * if there are long-living connections.
		 * <pre>
		 * cluster.on('disconnect', function(worker) {
		 *   console.log('The worker #' + worker.id + ' has disconnected');
		 * });
		 * </pre>
		 */
		//> public void disconnect(cluster.Worker? worker)
		disconnect: vjo.NEEDS_IMPL,
		
		/**
		 * When any of the workers die the cluster module will emit the 'exit' event. This 
		 * can be used to restart the worker by calling fork() again.
		 * <pre>
		 * cluster.on('exit', function(worker, code, signal) {
		 *   var exitCode = worker.process.exitCode;
		 *   console.log('worker ' + worker.process.pid + ' died ('+exitCode+'). restarting...');
		 *   cluster.fork();
		 * });
		 * </pre>
		 */
		//> public void exit(cluster.Worker? worker, int? code, String? signal)
		exit: vjo.NEEDS_IMPL,
		
		/**
		 * When the .setupMaster() function has been executed this event emits. If 
		 * .setupMaster() was not executed before fork() this function will call 
		 * .setupMaster() with no arguments.
		 */
		//> public void setup(cluster.Worker? worker)
		setup: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	Worker: null,	  //< public type::org.nodejs.cluster.Worker
	
	/**
	 * Object
	 * <ul>
	 * <li>exec String file path to worker file. (Default=__filename)
	 * <li>args Array string arguments passed to worker. (Default=process.argv.slice(2))
	 * <li>silent Boolean whether or not to send output to parent's stdio. (Default=false)
	 * </ul>
	 * All settings set by the .setupMaster is stored in this settings object. This object 
	 * is not supposed to be change or set manually, by you.
	 */
	//> public cluster.data.settings
	settings: null,
	
	/**
	 * True if the process is a master. This is determined by the process.env.NODE_UNIQUE_ID. 
	 * If process.env.NODE_UNIQUE_ID is undefined, then isMaster is true.
	 */
	//> public boolean
	isMaster: null,
	
	/**
	 * This boolean flag is true if the process is a worker forked from a master. If the 
	 * process.env.NODE_UNIQUE_ID is set to a value, then isWorker is true.
	 */
	//> public boolean
	isWorker: null,
	
	/**
	 * setupMaster is used to change the default 'fork' behavior. The new settings are 
	 * effective immediately and permanently, they cannot be changed later on.
	 * <p>
	 * Example:
	 * <pre>
	 * var cluster = require("cluster");
	 * cluster.setupMaster({
	 *    exec : "worker.js",
	 *    args : ["--use", "https"],
	 *    silent : true
	 * });
	 * cluster.fork();
	 * </pre>
	 */	
	//> public void setupMaster(cluster.data.settings? settings)
	setupMaster: vjo.NEEDS_IMPL,
	
	/**
	 * Spawn a new worker process. This can only be called from the master process.
	 */
	//> public Worker fork(Object? env)
	fork: vjo.NEEDS_IMPL,
	
	/**
	 * When calling this method, all workers will commit a graceful suicide. When they are 
	 * disconnected all internal handlers will be closed, allowing the master process to 
	 * die graceful if no other event is waiting.
	 * <p>
	 * The method takes an optional callback argument which will be called when finished.
	 */
	//> public void disconnect(Function? callback)
	disconnect: vjo.NEEDS_IMPL,
	
	/**
	 * A reference to the current worker object. Not available in the master process.
	 * <pre>
	 * var cluster = require('cluster');
	 * 
	 * if (cluster.isMaster) {
	 *   console.log('I am master');
	 *   cluster.fork();
	 *   cluster.fork();
	 * } else if (cluster.isWorker) {
	 *   console.log('I am worker #' + cluster.worker.id);
	 * }
	 * </pre>
	 */
	//> public cluster.Worker
	worker: null,
	
	/**
	 * A hash that stores the active worker objects, keyed by id field. Makes it easy to 
	 * loop through all the workers. It is only available in the master process.
	 * <pre>
	 * // Go through all workers
	 * function eachWorker(callback) {
	 *   for (var id in cluster.workers) {
	 *     callback(cluster.workers[id]);
	 *   }
	 * }
	 * eachWorker(function(worker) {
	 *   worker.send('big announcement to all workers');
	 * });
	 * </pre>
	 * Should you wish to reference a worker over a communication channel, using the worker's 
	 * unique id is the easiest way to find the worker.
	 * <pre>
	 * socket.on('data', function(id) {
	 *   var worker = cluster.workers[id];
	 * });
	 * </pre>
	 */
	//> public cluster.Worker[ ]
	workers: null,
	
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
	//> public cluster ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public cluster ^on(String type, Function listener)
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
	//> public cluster ^once(String event, Function listener)
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
	//> public cluster removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public cluster removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType();