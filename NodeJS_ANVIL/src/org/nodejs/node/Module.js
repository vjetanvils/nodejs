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
 * Node has a simple module loading system. In Node, files and modules are in one-to-one 
 * correspondence. As an example, foo.js loads the module circle.js in the same directory.
 * <p>
 * The contents of foo.js:
 * <pre>
 * var circle = require('./circle.js');
 * console.log( 'The area of a circle of radius 4 is ' + circle.area(4));
 * </pre>
 * The contents of circle.js:
 * <pre>
 * var PI = Math.PI;
 * exports.area = function (r) {
 *   return PI * r * r;
 * };
 * exports.circumference = function (r) {
 *   return 2 * PI * r;
 * };
 * <pre>
 * The module circle.js has exported the functions area() and circumference(). To export 
 * an object, add to the special exports object.
 * <p>
 * Variables local to the module will be private. In this example the variable PI is private 
 * to circle.js.
 * <p>
 * The module system is implemented in the require("module") module.
 */
vjo.ctype('org.nodejs.node.Module') //< public
.props({ })
.protos({
	/**
	 * The exports object is created by the Module system. Sometimes this is not acceptable, 
	 * many want their module to be an instance of some class. To do this assign the desired 
	 * export object to module.exports. For example suppose we were making a module called 
	 * a.js
	 * <pre>
	 * var EventEmitter = require('events').EventEmitter;
	 * module.exports = new EventEmitter();
	 * // Do some work, and after some time emit
	 * // the 'ready' event from the module itself.
	 * setTimeout(function() {
	 *   module.exports.emit('ready');
	 * }, 1000);
	 * </pre>
	 * Then in another file we could do:
	 * <pre>
	 * var a = require('./a');
	 * a.on('ready', function() {
	 *   console.log('module a is ready');
	 * });
	 * </pre>
	 * Note that assignment to module.exports must be done immediately. It cannot be done 
	 * in any callbacks. This does not work:
	 * <p>
	 * x.js:
	 * <pre>
	 * setTimeout(function() {
	 *   module.exports = { a: "hello" };
	 * }, 0);
	 * </pre>
	 * y.js:
	 * <pre>
	 * var x = require('./x');
	 * console.log(x.a);
	 * </pre>
	 */
	exports: null,	//< public Object			

	/**
	 * id String
	 * <p>Return: Object exports from the resolved module
	 * <p>
	 * The module.require method provides a way to load a module as if require() was called 
	 * from the original module.
	 * <p>
	 * Note that in order to do this, you must get a reference to the module object. Since 
	 * require() returns the exports, and the module is typically only available within a 
	 * specific module's code, it must be explicitly exported in order to be used.
	 */
	require: vjo.NEEDS_IMPL, //< public Object require(String id)
	
	/**
	 * The identifier for the module. Typically this is the fully resolved filename.
	 */
	id: null,  //< public String				
	
	/**
	 * The fully resolved filename to the module.
	 */
	filename: null,	//< public String	 
	
	/**
	 * Whether or not the module is done loading, or is in the process of loading.
	 */
	loaded: false,	//< public boolean	
	
	/**
	 * The module that required this one.
	 */
	parent: null,	//< public Module	
	
	/**
	 * The module objects required by this one.
	 */
	children: null //< public Module[ ]
})
.options({ metatype: true })
.endType()