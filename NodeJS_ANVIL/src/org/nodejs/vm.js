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
 * Stability: 2 - Unstable. See Caveats, below.
 * <p>
 * You can access this module with:
 * <pre>
 * var vm = require('vm');
 * </pre>
 * JavaScript code can be compiled and run immediately or compiled, saved, and run later.
 * 
 * <h3>Caveats</h3>
 * The vm module has many known issues and edge cases. If you run into issues or unexpected 
 * behavior, please consult the open issues on GitHub. Some of the biggest problems are 
 * described below.
 * 
 * <h3>Sandboxes</h3>
 * The sandbox argument to vm.runInNewContext and vm.createContext, along with the 
 * initSandbox argument to vm.createContext, do not behave as one might normally expect and 
 * their behavior varies between different versions of Node.
 * <p>
 * The key issue to be aware of is that V8 provides no way to directly control the global 
 * object used within a context. As a result, while properties of your sandbox object will 
 * be available in the context, any properties from the prototypes of the sandbox may not 
 * be available. Furthermore, the this expression within the global scope of the context 
 * evaluates to the empty object ({}) instead of to your sandbox.
 * <p>
 * Your sandbox's properties are also not shared directly with the script. Instead, the 
 * properties of the sandbox are copied into the context at the beginning of execution, 
 * and then after execution, the properties are copied back out in an attempt to propagate 
 * any changes.
 * 
 * <h3>Globals</h3>
 * Properties of the global object, like Array and String, have different values inside of 
 * a context. This means that common expressions like [] instanceof Array or 
 * Object.getPrototypeOf([]) === Array.prototype may not produce expected results when used 
 * inside of scripts evaluated via the vm module.
 * <p>
 * Some of these problems have known workarounds listed in the issues for vm on GitHub. 
 * for example, Array.isArray works around the example problem with Array.
 */
vjo.ctype('org.nodejs.vm')  //< public
.protos({
	Script: null,	//< public type::org.nodejs.vm.Script
	
	/**
	 * vm.runInThisContext() compiles code, runs it and returns the result. Running code 
	 * does not have access to local scope. filename is optional, it's used only in stack 
	 * traces.
	 * <p>
	 * Example of using vm.runInThisContext and eval to run the same code:
	 * <pre>
	 * var localVar = 123,
	 * usingscript, evaled,
	 * vm = require('vm');
	 * 
	 * usingscript = vm.runInThisContext('localVar = 1;', 'myfile.vm');
	 * 
	 * console.log('localVar: ' + localVar + ', usingscript: ' + usingscript);
	 * 
	 * evaled = eval('localVar = 1;');
	 * console.log('localVar: ' + localVar + ', evaled: ' + evaled);
	 * 
	 * // localVar: 123, usingscript: 1
	 * // localVar: 1, evaled: 1
	 * </pre>
	 * vm.runInThisContext does not have access to the local scope, so localVar is 
	 * unchanged. eval does have access to the local scope, so localVar is changed.
	 * <p>
	 * In case of syntax error in code, vm.runInThisContext emits the syntax error to 
	 * stderr and throws an exception.
	 */
	//> public Object runInThisContext(String code, String? filename)
	runInThisContext: vjo.NEEDS_IMPL,
	
	/**
	 * vm.runInNewContext compiles code, then runs it in sandbox and returns the result. 
	 * Running code does not have access to local scope. The object sandbox will be used as 
	 * the global object for code. sandbox and filename are optional, filename is only used 
	 * in stack traces.
	 * <p>
	 * Example: compile and execute code that increments a global variable and sets a new 
	 * one. These globals are contained in the sandbox.
	 * <pre>
	 * var util = require('util'),
	 *   vm = require('vm'),
	 *   sandbox = {
	 *     animal: 'cat',
	 *     count: 2
	 *   };
	 *   
	 * vm.runInNewContext('count += 1; name = "kitty"', sandbox, 'myfile.vm');
	 * console.log(util.inspect(sandbox));
	 * 
	 * // { animal: 'cat', count: 3, name: 'kitty' }
	 * </pre>
	 * Note that running untrusted code is a tricky business requiring great care. To 
	 * prevent accidental global variable leakage, vm.runInNewContext is quite useful, but 
	 * safely running untrusted code requires a separate process.
	 * <p>
	 * In case of syntax error in code, vm.runInNewContext emits the syntax error to stderr 
	 * and throws an exception.
	 */
	//> public Object runInNewContext(String code, Object? sandbox, String? filename)
	runInNewContext: vjo.NEEDS_IMPL,
	
	/**
	 * vm.runInContext compiles code, then runs it in context and returns the result. A 
	 * (V8) context comprises a global object, together with a set of built-in objects and 
	 * functions. Running code does not have access to local scope and the global object 
	 * held within context will be used as the global object for code. filename is optional, 
	 * it's used only in stack traces.
	 * <p>
	 * Example: compile and execute code in a existing context.
	 * <pre>
	 * var util = require('util'),
	 *   vm = require('vm'),
	 *   initSandbox = {
	 *     animal: 'cat',
	 *     count: 2
	 *   },
	 *   context = vm.createContext(initSandbox);
	 * 
	 * vm.runInContext('count += 1; name = "CATT"', context, 'myfile.vm');
	 * console.log(util.inspect(context));
	 * 
	 * // { animal: 'cat', count: 3, name: 'CATT' }
	 * </pre>
	 * Note that createContext will perform a shallow clone of the supplied sandbox object 
	 * in order to initialize the global object of the freshly constructed context.
	 * <p>
	 * Note that running untrusted code is a tricky business requiring great care. To prevent 
	 * accidental global variable leakage, vm.runInContext is quite useful, but safely 
	 * running untrusted code requires a separate process.
	 * <p>
	 * In case of syntax error in code, vm.runInContext emits the syntax error to stderr 
	 * and throws an exception.
	 */
	//> public Object runInContext(String code, Object context, String? filename)
	runInContext: vjo.NEEDS_IMPL,
	
	/**
	 * vm.createContext creates a new context which is suitable for use as the 2nd argument 
	 * of a subsequent call to vm.runInContext. A (V8) context comprises a global object 
	 * together with a set of build-in objects and functions. The optional argument 
	 * initSandbox will be shallow-copied to seed the initial contents of the global object 
	 * used by the context.
	 */
	//> public Object createContext(Object? initSandbox)
	createContext: vjo.NEEDS_IMPL,
	
	/**
	 * createScript compiles code but does not run it. Instead, it returns a vm.Script 
	 * object representing this compiled code. This script can be run later many times 
	 * using methods below. The returned script is not bound to any global object. It is 
	 * bound before each run, just for that run. filename is optional, it's only used in 
	 * stack traces.
	 * <p>
	 * In case of syntax error in code, createScript prints the syntax error to stderr and 
	 * throws an exception.
	 */
	//> public vm.Script createScript(String code, String? filename)
	createScript: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();