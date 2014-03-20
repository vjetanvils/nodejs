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
 * The Domain class encapsulates the functionality of routing errors and uncaught exceptions 
 * to the active Domain object.
 * <p>
 * Domain is a child class of EventEmitter. To handle the errors that it catches, listen 
 * to its error event.
 */
vjo.ctype('org.nodejs.domain.Domain') //< public
.inherits('org.nodejs.events.EventEmitter')
//< needs(org.nodejs.domain.DomainError)
.props({
	//> public
	event: vjo.otype().defs({
		/**
		 * 
		 */
		//> public void error(DomainError? err)
		error: vjo.NEEDS_IMPL,
		
		//> public void dispose()
		dispose: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	/**
	 * Run the supplied function in the context of the domain, implicitly binding all event 
	 * emitters, timers, and lowlevel requests that are created in that context.
	 * <p>
	 * This is the most basic way to use a domain.
	 * <p>
	 * Example:
	 * <pre>
	 * var d = domain.create();
	 * d.on('error', function(er) {
	 *   console.error('Caught error!', er);
	 * });
	 * 
	 * d.run(function() {
	 *   process.nextTick(function() {
	 *     setTimeout(function() { // simulating some various async stuff
	 *       fs.open('non-existent file', 'r', function(er, fd) {
	 *         if (er) throw er;
	 *         // proceed...
	 *       });
	 *     }, 100);
	 *   });
	 * });
	 * </pre>
	 * In this example, the d.on('error') handler will be triggered, rather than crashing 
	 * the program.
	 */
	//> public void run(Function fn)
	run: vjo.NEEDS_IMPL,
	
	/**
	 * An array of timers and event emitters that have been explicitly added to the domain.
	 */
	//> public Array members()
	members: null,
	
	/**
	 * Explicitly adds an emitter to the domain. If any event handlers called by the emitter 
	 * throw an error, or if the emitter emits an error event, it will be routed to the 
	 * domain's error event, just like with implicit binding.
	 * <p>
	 * This also works with timers that are returned from setInterval and setTimeout. If 
	 * their callback function throws, it will be caught by the domain 'error' handler.
	 * <p>
	 * If the Timer or EventEmitter was already bound to a domain, it is removed from that 
	 * one, and bound to this one instead.
	 */
	//> public void add(EventEmitter emitter)
	//> public void add(int timer)
	add: vjo.NEEDS_IMPL,
	
	/**
	 * The opposite of domain.add(emitter). Removes domain handling from the specified emitter.
	 */
	//> public void remove(EventEmitter emitter)
	//> public void remove(int timer)
	remove: vjo.NEEDS_IMPL,
	
	/**
	 * The returned function will be a wrapper around the supplied callback function. When 
	 * the returned function is called, any errors that are thrown will be routed to the 
	 * domain's error event.
	 * <p>
	 * Example:
	 * <pre>
	 * var d = domain.create();
	 * function readSomeFile(filename, cb) {
	 *   fs.readFile(filename, 'utf8', d.bind(function(er, data) {
	 *     // if this throws, it will also be passed to the domain
	 *     return cb(er, data ? JSON.parse(data) : null);
	 *   }));
	 * }
	 * 
	 * d.on('error', function(er) {
	 *   // an error occurred somewhere.
	 *   // if we throw it now, it will crash the program
	 *   // with the normal line number and stack message.
	 * });
	 * </pre>
	 */
	//> public Function bind(Function callback)
	bind: vjo.NEEDS_IMPL,
	
	/**
	 * This method is almost identical to domain.bind(callback). However, in addition to 
	 * catching thrown errors, it will also intercept Error objects sent as the first 
	 * argument to the function.
	 * <p>
	 * In this way, the common if (er) return callback(er); pattern can be replaced with 
	 * a single error handler in a single place.
	 * <p>
	 * Example:
	 * <pre>
	 * var d = domain.create();
	 * 
	 * function readSomeFile(filename, cb) {
	 *   fs.readFile(filename, 'utf8', d.intercept(function(data) {
	 *     // note, the first argument is never passed to the
	 *     // callback since it is assumed to be the 'Error' argument
	 *     // and thus intercepted by the domain.
	 *     
	 *     // if this throws, it will also be passed to the domain
	 *     // so the error-handling logic can be moved to the 'error'
	 *     // event on the domain instead of being repeated throughout
	 *     // the program.
	 *     return cb(null, JSON.parse(data));
	 *   }));
	 * }
	 * 
	 * d.on('error', function(er) {
	 *   // an error occurred somewhere.
	 *   // if we throw it now, it will crash the program
	 *   // with the normal line number and stack message.
	 * });
	 * </pre>
	 */
	//> public Function intercept(Function callback)
	intercept: vjo.NEEDS_IMPL,
	
	/**
	 * The dispose method destroys a domain, and makes a best effort attempt to clean up 
	 * any and all IO that is associated with the domain. Streams are aborted, ended, 
	 * closed, and/or destroyed. Timers are cleared. Explicitly bound callbacks are no 
	 * longer called. Any error events that are raised as a result of this are ignored.
	 * <p>
	 * The intention of calling dispose is generally to prevent cascading errors when a 
	 * critical part of the Domain context is found to be in an error state.
	 * <p>
	 * Once the domain is disposed the dispose event will emit.
	 * <p>
	 * Note that IO might still be performed. However, to the highest degree possible, once 
	 * a domain is disposed, further errors from the emitters in that set will be ignored. 
	 * So, even if some remaining actions are still in flight, Node.js will not communicate 
	 * further about them.
	 */
	//> public void dispose()
	dispose: vjo.NEEDS_IMPL,
	
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
	//> public Domain ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Domain ^on(String type, Function listener)
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
	//> public Domain ^once(String event, Function listener)
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
	//> public Domain removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Domain removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType();