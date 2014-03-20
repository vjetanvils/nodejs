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
 * Stability: 4 - API Frozen
 * <p>
 * For printing to stdout and stderr. Similar to the console object functions provided by 
 * most web browsers, here the output is sent to stdout or stderr.
 */
//> public
vjo.ctype('org.nodejs.console')
.props({
	// empty on purpose
})
.protos({
	/**> public void log(Object... args);
	 * 
	 * Prints to stdout with newline. This function can take multiple arguments in a 
	 * printf()-like way. Examples:
	 * <pre>
	 * console.log( );
	 * console.log("A nod to node");
	 * console.log('count: %d', count);
	 * </pre>
	 * If formatting elements are not found in the first string then util.inspect is used 
	 * on each argument. See util.format() for more information.
	 */
	log: vjo.NEEDS_IMPL,
	
	/**> public void info(Object... args);
	 * 
	 * Same as console.log.
	 */
	info: vjo.NEEDS_IMPL,
	
	/**> public void warn(Object... args);
	 * 
	 * Same as console.error.
	 */
	warn: vjo.NEEDS_IMPL,
	
	/**> public void error(Object... args);
	 * 
	 * Same as console.log but prints to stderr.
	 */
	error: vjo.NEEDS_IMPL,
	
	/**> public void dir(Object object);
	 * 
	 * Uses util.inspect on obj and prints resulting string to stdout.
	 */
	dir: vjo.NEEDS_IMPL,
	
	/**> public void time(String label);
	 * 
	 * Mark a time.
	 */
	time: vjo.NEEDS_IMPL,
	
	/**> public void timeEnd(String label);
	 * 
	 * Finish timer, record output. Example:
	 * <pre>
	 * console.time('100-elements');
	 * for (var i = 0; i < 100; i++) {
	 *   ;
	 * }
	 * console.timeEnd('100-elements');
	 * </pre>
	 */
	timeEnd: vjo.NEEDS_IMPL,
	

	/**> public void trace(String label) ;
	 * 
	 * Print a stack trace to stderr of the current position.
	 */
	trace: vjo.NEEDS_IMPL,
	
	/**> public void assert(Object expression, String? message);
	 * 
	 * Same as assert.ok() where if the expression evaluates as false throw an 
	 * AssertionError with message.
	 */
	assert: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();