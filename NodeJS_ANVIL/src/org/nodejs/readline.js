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
 * verion: 0.10.3
 * <p>
 * Stability: 2 - Unstable
 * <p>
 * To use this module, do require('readline'). Readline allows reading of a stream (such 
 * as process.stdin) on a line-by-line basis.
 * <p>
 * Note that once you've invoked this module, your node program will not terminate until 
 * you've closed the interface. Here's how to allow your program to gracefully exit:
 * <pre>
 * var readline = require('readline');
 * 
 * var rl = readline.createInterface({
 *   input: process.stdin,
 *   output: process.stdout
 * });
 * 
 * rl.question("What do you think of node.js? ", function(answer) {
 *   // TODO: Log the answer in a database
 *   console.log("Thank you for your valuable feedback:", answer);
 *   rl.close();
 * });
 * </pre>
 * 
 * <h3>Example: Tiny CLI</h3>
 * Here's an example of how to use all these together to craft a tiny command line interface:
 * <pre>
 * var readline = require('readline'),
 * rl = readline.createInterface(process.stdin, process.stdout);
 * 
 * rl.setPrompt('OHAI> ');
 * rl.prompt();
 * 
 * rl.on('line', function(line) {
 *   switch(line.trim()) {
 *     case 'hello':
 *       console.log('world!');
 *       break;
 *     default:
 *       console.log('Say what? I might have heard `' + line.trim() + '`');
 *       break;
 *   }
 *   rl.prompt();
 * }).on('close', function() {
 *   console.log('Have a great day!');
 *   process.exit(0);
 * });
 * </pre>
 */
vjo.ctype('org.nodejs.readline') //< public
//< needs(org.nodejs.stream.Readable)
//< needs(org.nodejs.stream.Writable)
.props({
	func: vjo.otype().defs({	//< public
		//> public Array completer(String? currentLine)
		//> public void completer(String linePartial, Function? callback)
		completer: vjo.NEEDS_IMPL
	}).endType(),
	
	data: vjo.otype().defs({	//< public
		options: {				//< public
			/**
			 * The readable stream to listen to (Required).
			 */
			input: null,		//< public Readable
			
			/**
			 * The writable stream to write readline data to (Required).
			 */
			output: null,		//< public Writable
			
			/**
			 * An optional function that is used for Tab autocompletion. See below for an 
			 * example of using this.
			 */
			//> public readline.func:completer?
			completer: vjo.NEEDS_IMPL,
			
			/**
			 * pass true if the input and output streams should be treated like a TTY, and 
			 * have ANSI/VT100 escape codes written to it. Defaults to checking isTTY on 
			 * the output stream upon instantiation.
			 */
			terminal: null		//< public boolean?
		}
	}).endType()
})
.protos({
	Interface: null, //< public type::org.nodejs.readline.Interface
	
	/**
	 * Creates a readline Interface instance. Accepts an "options" Object that takes the 
	 * following values:
	 * <ul>
	 * <li>input - the readable stream to listen to (Required).
	 * <li>output - the writable stream to write readline data to (Required).
	 * <li>completer - an optional function that is used for Tab autocompletion. See below 
	 * for an example of using this.
	 * <li>terminal - pass true if the input and output streams should be treated like a 
	 * TTY, and have ANSI/VT100 escape codes written to it. Defaults to checking isTTY on 
	 * the output stream upon instantiation.
	 * </ul>
	 * <p>
	 * The completer function is given a the current line entered by the user, and is 
	 * supposed to return an Array with 2 entries:
	 * <ol>
	 * <li>An Array with matching entries for the completion.
	 * <li>The substring that was used for the matching.
	 * </ol>
	 * Which ends up looking something like: [[substr1, substr2, ...], originalsubstring].
	 * <p>
	 * Example:
	 * <pre>
	 * function completer(line) {
	 *   var completions = '.help .error .exit .quit .q'.split(' ')
	 *   var hits = completions.filter(function(c) { return c.indexOf(line) == 0 })
	 *   // show all completions if none found
	 *   return [hits.length ? hits : completions, line]
	 * }
	 * </pre>
	 * Also completer can be run in async mode if it accepts two arguments:
	 * <pre>
	 * function completer(linePartial, callback) {
	 *   callback(null, [['123'], linePartial]);
	 * }
	 * </pre>
	 * createInterface is commonly used with process.stdin and process.stdout in order to 
	 * accept user input:
	 * <pre>
	 * var readline = require('readline');
	 * var rl = readline.createInterface({
	 *   input: process.stdin,
	 *   output: process.stdout
	 * });
	 * </pre>
	 * Once you have a readline instance, you most commonly listen for the "line" event.
	 * <p>
	 * If terminal is true for this instance then the output stream will get the best 
	 * compatibility if it defines an output.columns property, and fires a "resize" event 
	 * on the output if/when the columns ever change (process.stdout does this automatically 
	 * when it is a TTY).
	 */
	//> public readline.Interface createInterface(readline.data.options options)
	// public readline.Interface createInterface(Readable input, Writable output, readline.func:completer? completer, boolean? terminal)
	createInterface: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();