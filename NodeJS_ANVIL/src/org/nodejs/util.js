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
 * Stability: 5 - Locked
 * <p>
 * These functions are in the module 'util'. Use require('util') to access them.
 */
//> public
vjo.ctype('org.nodejs.util') 
//< needs(org.nodejs.stream.Readable)
//< needs(org.nodejs.stream.Writable)
.protos({
	data: vjo.otype().defs({
		inspectOptions: {		//< public
			showHidden: null,	//< public boolean?
			depth: null,		//< public Number?
			colors: null,		//< public boolean?
			customInspect: null	//< public boolean
		}
	}).endType(),
	
	/**
	 * 
	 * Returns a formatted string using the first argument as a printf-like format.
	 * <p>
	 * The first argument is a string that contains zero or more placeholders. Each 
	 * placeholder is replaced with the converted value from its corresponding argument. 
	 * Supported placeholders are:
	 * <ul>
	 * <li>%s - String.
	 * <li>%d - Number (both integer and float).
	 * <li>%j - JSON.
	 * <li>% - single percent sign ('%'). This does not consume an argument.
	 * </ul>
	 * If the placeholder does not have a corresponding argument, the placeholder is not 
	 * replaced.
	 * <pre>
	 * util.format('%s:%s', 'foo'); // 'foo:%s'
	 * </pre>
	 * If there are more arguments than placeholders, the extra arguments are converted to 
	 * strings with util.inspect() and these strings are concatenated, delimited by a space.
	 * <pre>
	 * util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'
	 * </pre>
	 * If the first argument is not a format string then util.format() returns a string that 
	 * is the concatenation of all its arguments separated by spaces. Each argument is 
	 * converted to a string with util.inspect().
	 * <pre>
	 * util.format(1, 2, 3); // '1 2 3'
	 * </pre>
	 * 
	 */
	//> public String format(String format, Object... data);
	format: vjo.NEEDS_IMPL,
	
	/**
	 * util.debug(string)
	 * <p>A synchronous output function. Will block the process and output 
	 * string immediately to stderr.
	 * <pre>
	 * require('util').debug('message on stderr');
	 * </pre>
	 */
	//> public void debug(Object obj)
	debug: vjo.NEEDS_IMPL,
	
	/**
	 * Same as util.debug() except this will output all arguments immediately to stderr.
	 */
	//> public void error(Object... values)
	error: vjo.NEEDS_IMPL,
	
	/**
	 * A synchronous output function. Will block the process and output all arguments to 
	 * stdout with newlines after each argument.
	 */
	//> public void puts(Object... values)
	puts: vjo.NEEDS_IMPL,
	
	/**
	 * A synchronous output function. Will block the process, cast each argument to a string 
	 * then output to stdout. Does not place newlines after each argument.
	 */
	//> public void print(Object... values)
	print: vjo.NEEDS_IMPL,
		
	/**
	 * Output with timestamp on stdout.
	 */
	//> public void log(Object value)
	log: vjo.NEEDS_IMPL,
	
	/**
	 * Return a string representation of object, which is useful for debugging.
	 * <p>
	 * If showHidden is true, then the object's non-enumerable properties will be shown too. 
	 * Defaults to false.
	 * <p>
	 * If depth is provided, it tells inspect how many times to recurse while formatting 
	 * the object. This is useful for inspecting large complicated objects.
	 * <p>
	 * The default is to only recurse twice. To make it recurse indefinitely, pass in null 
	 * for depth.
	 * <p>
	 * If colors is true, the output will be styled with ANSI color codes. Defaults to false.
	 * <p>
	 * Example of inspecting all properties of the util object:
	 * <pre>
	 * console.log(util.inspect(util, true, null));
	 * </pre>
	 * Objects also may define their own inspect(depth) function which util.inspect() will 
	 * invoke and use the result of when inspecting the object:
	 * <pre>
	 * var obj = { name: 'nate' };
	 * obj.inspect = function(depth) {
	 *     return '{' + this.name + '}';
	 * };
	 * util.inspect(obj);
	 *   // "{nate}"
	 * </pre>
	 */
	//> public void inspect(Object object, util.data.inspectOptions? options)
	inspect: vjo.NEEDS_IMPL,
	
// TODO: MrP - Customizing util.inspect Colors/Styles...
	
	/**
	 * Returns true if the given "object" is an Array. false otherwise.
	 * <pre>
	 * util.isArray([])
	 *   // true
	 * </pre>
	 * <pre>
	 * util.isArray(new Array)
	 *   // true
	 * </pre>
	 * <pre>
	 * util.isArray({})
	 *   // false
	 * </pre>
	 */
	//> public boolean isArray(Object object)
	isArray: vjo.NEEDS_IMPL,		
	
	/**
	 * Returns true if the given "object" is a RegExp. false otherwise.
	 * <pre>
	 * var util = require('util');
	 * 
	 * util.isRegExp(/some regexp/)
	 * // true
	 * 
	 * util.isRegExp(new RegExp('another regexp'))
	 * // true
	 * 
	 * util.isRegExp({})
	 * // false
	 * </pre>
	 */
	//> public boolean isRegExp(Object object)
	isRegExp: vjo.NEEDS_IMPL,
	
	/**
	 * Returns true if the given "object" is a RegExp. false otherwise.
	 * <pre>
	 * util.isRegExp(/some regexp/)
	 *   // true
	 * util.isRegExp(new RegExp('another regexp'))
	 *   // true
	 * util.isRegExp({})
	 *   // false
	 * </pre>
	 */
	//> public boolean isRegExp(Object object)
	isDate: vjo.NEEDS_IMPL,
	
	/**
	 * Returns true if the given "object" is an Error. false otherwise.
	 * <pre>
	 * util.isError(new Error())
	 *   // true
	 * util.isError(new TypeError())
	 *   // true
	 * util.isError({ name: 'Error', message: 'an error occurred' })
	 *   // false
	 * </pre>
	 */
	//> public boolean isError(Object object)
	isError: vjo.NEEDS_IMPL,

	/**
	 * Stability: 0 - Deprecated: Use readableStream.pipe(writableStream)
	 * <p>
	 * Read the data from readableStream and send it to the writableStream. 
	 * When writableStream.write(data) returns false readableStream will be paused until 
	 * the drain event occurs on the writableStream. callback gets an error as its only 
	 * argument and is called when writableStream is closed or when an error occurs.
	 */
	//> public void pump(Readable rs, Writable ws, Function? callback)
	pump: vjo.NEEDS_IMPL,
	
	/**
	 * Inherit the prototype methods from one constructor into another. The prototype of 
	 * constructor will be set to a new object created from superConstructor.
	 * <p>
	 * As an additional convenience, superConstructor will be accessible through the 
	 * constructor.super_ property.
	 * <pre>
	 * function MyStream() {
	 *   events.EventEmitter.call(this);
	 * }
	 * 
	 * util.inherits(MyStream, events.EventEmitter);
	 * 
	 * MyStream.prototype.write = function(data) {
	 *   this.emit("data", data);
	 * }
	 * 
	 * var stream = new MyStream();
	 * console.log(stream instanceof events.EventEmitter); // true
	 * console.log(MyStream.super_ === events.EventEmitter); // true
	 * 
	 * stream.on("data", function(data) {
	 *   console.log('Received data: "' + data + '"');
	 * })
	 * stream.write("It works!"); // Received data: "It works!"
	 * </pre>
	 */
	//> public void inherits(Function constructor, Function superConstructor)
	inherits: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();