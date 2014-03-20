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
 * These objects are available in all modules. Some of these objects aren't actually in the 
 * global scope but in the module scope - this will be noted.
 */
vjo.ctype('org.nodejs.node') 	//< public
//< needs(org.nodejs.buffer.Buffer)
//< needs(org.nodejs.node.Timer)
.globals({ 
	/**
	 * The global namespace object.
	 * <p>In browsers, the top-level scope is the global scope. That means that in browsers 
	 * if you're in the global scope var something will define a global variable. In Node 
	 * this is different. The top-level scope is not the global scope; var something inside 
	 * a Node module will be local to that module.
	 * 
	 */
	global: null,	//< public Object
	
	/**
	 * The process object. See the process object section.
	 */
	process: null,	//< public node.Process	
	
	/**
	 * Used to print to stdout and stderr. See the stdio section.
	 */
	//> public org.nodejs.console
	console: null,	

	/**
	 * Used to handle binary data. See the buffer section
	 */
	//> public type::Buffer
	Buffer: null,	
	
	/**
	 * To require modules. See the Modules section. require isn't actually a global but 
	 * rather local to each module.
	 */
	require: null,	//< public type::node.require		
	
	/**
	 * The filename of the code being executed. This is the resolved absolute path of this 
	 * code file. For a main program this is not necessarily the same filename used in the 
	 * command line. The value inside a module is the path to that module file.
	 * <p>
	 * Example: running node example.js from /Users/mjr
	 * <pre>
	 * console.log(__filename);
	 *   // /Users/mjr/example.js
	 * </pre>
	 * __filename isn't actually a global but rather local to each module.
	 */
	__filename: null,	//< public String	
	
	/**
	 * The name of the directory that the currently executing script resides in.
	 * <p>
	 * Example: running node example.js from /Users/mjr
	 * <pre>
	 * console.log(__dirname);
	 *   // /Users/mjr
	 * </pre>
	 * __dirname isn't actually a global but rather local to each module.
	 */
	//> public String
	__dirname: null,	//< public String
	
	/**
	 * A reference to the current module. In particular module.exports is the same as the 
	 * exports object. module isn't actually a global but rather local to each module.
	 * <p>
	 * See the module system documentation for more information.
	 */
	module: null,	//< public node.Module		

	/**
	 * An object which is shared between all instances of the current module and made accessible 
	 * through require(). exports is the same as the module.exports object. exports isn't 
	 * actually a global but rather local to each module.
	 * <p>
	 * See the module system documentation for more information.
	 * <p>
	 * See the module section for more information.
	 */
	exports: null,	//< public Object
	 
	//
	// Timers
	//
	/**
	 * To schedule execution of a one-time callback after delay milliseconds. Returns a 
	 * timeoutId for possible use with clearTimeout(). Optionally you can also pass arguments 
	 * to the callback.
	 * <p>
	 * It is important to note that your callback will probably not be called in exactly 
	 * delay milliseconds - Node.js makes no guarantees about the exact timing of when the 
	 * callback will fire, nor of the ordering things will fire in. The callback will be 
	 * called as close as possible to the time specified.
	 */
	//> public Timer setTimeout(Function callback, int delay, Object... args)
	setTimeout: vjo.NEEDS_IMPL,
	
	/**
	 * To schedule the repeated execution of callback every delay milliseconds. Returns a 
	 * intervalId for possible use with clearInterval(). Optionally you can also pass arguments 
	 * to the callback.
	 */
	//> public Timer setInterval(Function callback, int delay, Object... args)
	setInterval: vjo.NEEDS_IMPL,
	
	/**
	 * Prevents a timeout from triggering.
	 */
	//> public void clearTimeout(Timer timer)
	clearTimeout: vjo.NEEDS_IMPL,
	
	/**
	 * Stops a interval from triggering.
	 */
	//> public void clearInterval(Timer timer)
	clearInterval: vjo.NEEDS_IMPL,
	
	/**
	 * To schedule the "immediate" execution of callback after I/O events callbacks and 
	 * before setTimeout and setInterval . Returns an immediateId for possible use with 
	 * clearImmediate(). Optionally you can also pass arguments to the callback.
	 * <p>
	 * Immediates are queued in the order created, and are popped off the queue once per 
	 * loop iteration. This is different from process.nextTick which will execute 
	 * process.maxTickDepth queued callbacks per iteration. setImmediate will yield to the 
	 * event loop after firing a queued callback to make sure I/O is not being starved. 
	 * <p>
	 * While order is preserved for execution, other I/O events may fire between any two 
	 * scheduled immediate callbacks.
	 */
	//> public Object setImmediate( (void f()) callback )
	setImmediate: vjo.NEEDS_IMPL,
	
	/**
	 * Stops an immediate from triggering.
	 */
	//> public void clearImmediate(Object immediate)
	clearImmediate: vjo.NEEDS_IMPL
})
.props({	
	/**
	 * 
	 */
	require: null //< public type::org.nodejs.node.require
})
.options({ metatype: true })
.endType();