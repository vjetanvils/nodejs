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
 * Stability: 2 - Unstable
 * <p>
 * A net.Socket subclass that represents the writable portion of a tty. In normal 
 * circumstances, process.stdout will be the only tty.WriteStream instance ever created 
 * (and only when isatty(1) is true).
 */
vjo.ctype('org.nodejs.tty.WriteStream') //< public
.inherits('org.nodejs.net.Socket') 
.props({
	event: vjo.otype().defs({	//< public
		/**
		 * function () {}
		 * <p>
		 * Emitted by refreshSize() when either of the columns or rows properties has changed.
		 * <pre>
		 * process.stdout.on('resize', function() {
		 *   console.log('screen size has changed!');
		 *   console.log(process.stdout.columns + 'x' + process.stdout.rows);
		 * });
		 * </pre>
		 */
		//> public void resize()
		resize: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	/**
	 * A Number that gives the number of columns the TTY currently has. This property gets 
	 * updated on "resize" events.
	 */
	columns: null,	//< public int
	
	/**
	 * A Number that gives the number of rows the TTY currently has. This property gets 
	 * updated on "resize" events.
	 */
	rows: null,		//< public int
	
	isTTY: true,		//< public final boolean
	
	/**
	 * backwards-compat
	 */
	//> public void cursorTo(int x, int y)
	cursorTo: vjo.NEEDS_IMPL,
	
	/**
	 * backwards-compat
	 */
	//> public void moveCursor(int dx, int dy)
	moveCursor: vjo.NEEDS_IMPL,
	
	/**
	 * backwards-compat
	 */
	//> public void clearScreenDown()
	clearScreenDown: vjo.NEEDS_IMPL,
	
	/**
	 * backwards-compat
	 * <p>
	 * Returns an array like [columns, rows]
	 */
	//> public int[ ] getWindowSize()
	getWindowSize: vjo.NEEDS_IMPL,
	
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
	//> public WriteStream ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public WriteStream ^on(String type, Function listener)
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
	//> public WriteStream ^once(String event, Function listener)
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
	//> public WriteStream removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public WriteStream removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType();