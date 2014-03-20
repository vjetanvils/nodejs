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
 * The class that represents a readline interface with an input and output stream.
 */
vjo.ctype('org.nodejs.readline.Interface') //< public
.inherits('org.nodejs.events.EventEmitter')
.props({
	data: vjo.otype().defs({	//< public
		writeKey: {				//< public
			ctrl: null,			//< public boolean
			name: null			//< public String
		}
	}).endType(),
	
	func: vjo.otype().defs({	//< public
		//> public void questionCallback(String? response)
		questionCallback: vjo.NEEDS_IMPL
	}).endType(),
	
	event: vjo.otype().defs({	//< public
		/**
		 * function (line) {}
		 * <p>
		 * Emitted whenever the input stream receives a \n, usually received when the user 
		 * hits enter, or return. This is a good hook to listen for user input.
		 * <p>
		 * Example of listening for line:
		 * <pre>
		 * rl.on('line', function (cmd) {
		 *   console.log('You just typed: '+cmd);
		 * });
		 * </pre>
		 */
		//> public void line(String? line)
		line: vjo.NEEDS_IMPL,
		
		/**
		 * function () {}
		 * <p>
		 * Emitted whenever the input stream is paused.
		 * <p>
		 * Also emitted whenever the input stream is not paused and receives the SIGCONT 
		 * event. (See events SIGTSTP and SIGCONT)
		 * <p>
		 * Example of listening for pause:
		 * <pre>
		 * rl.on('pause', function() {
		 *   console.log('Readline paused.');
		 * });
		 * </pre>
		 */
		//> public void pause()
		pause: vjo.NEEDS_IMPL,
		
		/**
		 * function () {}
		 * <p>
		 * Emitted whenever the input stream is resumed.
		 * <p>
		 * Example of listening for resume:
		 * <pre>
		 * rl.on('resume', function() {
		 *   console.log('Readline resumed.');
		 * });
		 * </pre>
		 */
		//> public void resume()
		resume: vjo.NEEDS_IMPL,
		
		/**
		 * function () {}
		 * <p>
		 * Emitted when close() is called.
		 * <p>
		 * Also emitted when the input stream receives its "end" event. The Interface 
		 * instance should be considered "finished" once this is emitted. For example, when 
		 * the input stream receives ^D, respectively known as EOT.
		 * <p>
		 * This event is also called if there is no SIGINT event listener present when the 
		 * input stream receives a ^C, respectively known as SIGINT.
		 */
		//> public void close()
		close: vjo.NEEDS_IMPL,
		
		/**
		 * function () {}
		 * <p>
		 * Emitted whenever the input stream receives a ^C, respectively known as SIGINT. 
		 * If there is no SIGINT event listener present when the input stream receives a 
		 * SIGINT, pause will be triggered.
		 * <p>
		 * Example of listening for SIGINT:
		 * <pre>
		 * rl.on('SIGINT', function() {
		 *   rl.question('Are you sure you want to exit?', function(answer) {
		 *     if (answer.match(/^y(es)?$/i)) rl.pause();
		 *   });
		 * });
		 * </pre>
		 */
		//> public void SIGINT()
		SIGINT: vjo.NEEDS_IMPL,
		
		/**
		 * function () {}
		 * <p>
		 * This does not work on Windows.
		 * <p>
		 * Emitted whenever the input stream receives a ^Z, respectively known as SIGTSTP. 
		 * If there is no SIGTSTP event listener present when the input stream receives a 
		 * SIGTSTP, the program will be sent to the background.
		 * <p>
		 * When the program is resumed with fg, the pause and SIGCONT events will be emitted. 
		 * You can use either to resume the stream.
		 * <p>
		 * The pause and SIGCONT events will not be triggered if the stream was paused 
		 * before the program was sent to the background.
		 * <p>
		 * Example of listening for SIGTSTP:
		 * <pre>
		 * rl.on('SIGTSTP', function() {
		 *   // This will override SIGTSTP and prevent the program from going to the background.
		 *   console.log('Caught SIGTSTP.');
		 * });
		 * </pre>
		 */
		//> public void SIGTSTP()
		SIGTSTP: vjo.NEEDS_IMPL,
		
		/**
		 * function () {}
		 * <p>
		 * This does not work on Windows.
		 * <p>
		 * Emitted whenever the input stream is sent to the background with ^Z, respectively 
		 * known as SIGTSTP, and then continued with fg(1). This event only emits if the 
		 * stream was not paused before sending the program to the background.
		 * <p>
		 * Example of listening for SIGCONT:
		 * <pre>
		 * rl.on('SIGCONT', function() {
		 *   // `prompt` will automatically resume the stream
		 *   rl.prompt();
		 * });
		 * </pre>
		 */
		//> public void SIGCONT()
		SIGCONT: vjo.NEEDS_IMPL
	}).endType()
})
.protos({	
	/**
	 * Sets the prompt, for example when you run node on the command line, you see > , 
	 * which is node's prompt.
	 */
	//> public void setPrompt(String prompt, int? length)
	setPrompt: vjo.NEEDS_IMPL,
	
	/**
	 * Readies readline for input from the user, putting the current setPrompt options on 
	 * a new line, giving the user a new spot to write. Set preserveCursor to true to prevent 
	 * the cursor placement being reset to 0.
	 * <p>
	 * This will also resume the input stream used with createInterface if it has been paused.
	 */
	//> public void prompt(boolean? preserveCursor)
	prompt: vjo.NEEDS_IMPL,
	
	/**
	 * Prepends the prompt with query and invokes callback with the user's response. 
	 * Displays the query to the user, and then invokes callback with the user's response 
	 * after it has been typed.
	 * <p>
	 * This will also resume the input stream used with createInterface if it has been paused.
	 * <p>
	 * Example usage:
	 * <pre>
	 * interface.question('What is your favorite food?', function(answer) {
	 *   console.log('Oh, so your favorite food is ' + answer);
	 * });
	 * </pre>
	 */
	//> public void question(String query, Interface.func:questionCallback? callback)
	question: vjo.NEEDS_IMPL,
	
	
	/**
	 * Pauses the readline input stream, allowing it to be resumed later if needed.
	 */
	//> public void pause()
	pause: vjo.NEEDS_IMPL,
	
	/**
	 * Resumes the readline input stream.
	 */
	//> public void resume()
	resume: vjo.NEEDS_IMPL,
	
	/**
	 * Closes the Interface instance, relinquishing control on the input and output streams. 
	 * The "close" event will also be emitted.
	 */
	//> public void close()
	close: vjo.NEEDS_IMPL,
	
	/**
	 * Writes data to output stream. key is an object literal to represent a key sequence; 
	 * available if the terminal is a TTY.
	 * <p>
	 * This will also resume the input stream if it has been paused.
	 * <p>
	 * Example:
	 * <pre>
	 * rl.write('Delete me!');
	 * // Simulate ctrl+u to delete the line written previously
	 * rl.write(null, {ctrl: true, name: 'u'});
	 * </pre>
	 */
	//> public void write(String data, Interface.data.writeKey? key)
	write: vjo.NEEDS_IMPL,
	
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
	//> public Interface ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Interface ^on(String type, Function listener)
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
	//> public Interface ^once(String event, Function listener)
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
	//> public Interface removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Interface removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()