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
 * The underlying server object for "repl".
 * <p>
 * This is an interal object but is included for "grokking" what supported on the default
 * node.js command line.
 */
vjo.ctype('org.nodejs.repl.REPLServer') //< public
//< needs(org.nodejs.stream.Readable)
.protos({
	/**
	 * 
	 */
	//> public Object ; MrP internal member from code	
	context: null,	
	
	/**
	 * 
	 */
	//> public REPLServer start(String? prompt, Readable? source)
	constructs: function() {},
	
	/**
	 * 
	 */
	//> public void displayPrompt()
	displayPrompt: vjo.NEEDS_IMPL,
	
	/**
	 * Associate the passed in function with the keyword.
	 */
	//> public void defineCommand(String keyword, Function cmd)
	defineCommand: vjo.NEEDS_IMPL,
	
	/**
	 * Read a line from the stream, then eval it
	 */
	//> public void readline(String cmd)
	readline: vjo.NEEDS_IMPL,
	
	/**
	 * Provide a list of completions for the given leading text. This is
	 * given to the readline interface for handling tab completion.
	 *
	 * @param {line} The text (preceding the cursor) to complete
	 * @returns {Array} Two elements: (1) an array of completions; and
	 *    (2) the leading text completed.
	 *
	 * <pre>
	 *  complete('var foo = sys.')
	 *    -> [['sys.print', 'sys.debug', 'sys.log', 'sys.inspect', 'sys.pump'],
	 *        'sys.' ]
	 * </pre>
	 * Warning: This eval's code like "foo.bar.baz", so it will run property
	 * getter code.
	 */
	//> public void complete(String line)
	complete: vjo.NEEDS_IMPL,
	
	/**
	 * Used to parse and execute the Node REPL commands
	 * <p> cmd - The command entered to check
	 * <p> Returns true to mean don't continue parsing the command
	*/
	//> public boolean parseREPLKeyword(String cmd)
	parseREPLKeyword: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public String trimWhitespace(String cmd)
	trimWhitespace: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public String regexpEscape(String s)
	regexpEscape: vjo.NEEDS_IMPL,
	
	/**
	 * Converts commands that use var and function <name>() to use the local 
	 * exports.context when evaled. This provides a local context on the REPL.
	 * Takes the cmd in to and returns the converted command.
	 */
	//> public String convertToText(String cmd)
	convertToText: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType()