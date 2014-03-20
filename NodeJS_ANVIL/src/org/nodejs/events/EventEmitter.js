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
 * To access the EventEmitter class, require('events').EventEmitter.
 * <p>
 * When an EventEmitter instance experiences an error, the typical action is to emit 
 * an 'error' event. Error events are treated as a special case in node. If there is 
 * no listener for it, then the default action is to print a stack trace and exit the 
 * program.
 * <p>
 * All EventEmitters emit the event 'newListener' when new listeners are added.
 */
vjo.ctype('org.nodejs.events.EventEmitter') //< public
.props({ 
	//> public
	event: vjo.otype().defs({ 
		/**
		 * This event is emitted any time someone adds a new listener.
		 */
		//> public void newListener(String? event, Function? listener)
		newListener: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	// public T ^addListener(String type, Function listener)
	//> public EventEmitter ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	// public T ^on(String type, Function listener)
	//> public EventEmitter ^on(String type, Function listener)
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
	// public T ^once(String event, Function listener)
	//> public EventEmitter ^once(String event, Function listener)
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
	// public T ^removeListener(String type, Function listener)
	//> public EventEmitter removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	// public T ^removeAllListeners(String? event)
	//> public EventEmitter removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL,
	
	/**
	 * By default EventEmitters will print a warning if more than 10 listeners are 
	 * added for a particular event. This is a useful default which helps finding 
	 * memory leaks. 
	 * <p>
	 * Obviously not all Emitters should be limited to 10. This function allows 
	 * that to be increased. Set to zero for unlimited.
	 */
	//> public void setMaxListeners(int n)
	setMaxListeners: vjo.NEEDS_IMPL,
	
	/**
	 * Returns an array of listeners for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * console.log(util.inspect(server.listeners('connection'))); // [ [Function] ]
	 * </pre>
	 * This array may be a mutable reference to the same underlying list of listeners 
	 * that is used by the event subsystem. However, certain actions (specifically, 
	 * removeAllListeners) will invalidate this reference.
	 * <p>
	 * If you would like to get a copy of the listeners at a specific point in time 
	 * that is guaranteed not to change, make a copy, for example by doing 
	 * emitter.listeners(event).slice(0).
	 * <p>
	 * In a future release of node, this behavior may change to always return a copy, 
	 * for consistency. In your programs, please do not rely on being able to modify 
	 * the EventEmitter listeners using array methods. Always use the 'on' method 
	 * to add new listeners.
	 */
	//> public Function[ ] listeners(String event)
	listeners: vjo.NEEDS_IMPL,
	
	/**
	 * Execute each of the listeners in order with the supplied arguments.
	 */
	//> public boolean emit(String event, Object... args)
	emit: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();