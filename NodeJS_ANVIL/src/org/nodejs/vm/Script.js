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
 * A class for running scripts. Returned by vm.createScript.
 */
vjo.ctype('org.nodejs.vm.Script') //< public
.protos({
	/**
	 * Similar to vm.runInThisContext but a method of a precompiled Script object. 
	 * script.runInThisContext runs the code of script and returns the result. Running code 
	 * does not have access to local scope, but does have access to the global object 
	 * (v8: in actual context).
	 * <p>
	 * Example of using script.runInThisContext to compile code once and run it multiple 
	 * times:
	 * <pre>
	 * var vm = require('vm');
	 * 
	 * globalVar = 0;
	 * 
	 * var script = vm.createScript('globalVar += 1', 'myfile.vm');
	 * 
	 * for (var i = 0; i < 1000 ; i += 1) {
	 *   script.runInThisContext();
	 * }
	 * 
	 * console.log(globalVar);
	 * // 1000
	 * </pre>
	 */
	//> public Object runInThisContext()
	runInThisContext: vjo.NEEDS_IMPL,
	
	/**
	 * Similar to vm.runInNewContext a method of a precompiled Script object. 
	 * script.runInNewContext runs the code of script with sandbox as the global object and 
	 * returns the result. Running code does not have access to local scope. sandbox is 
	 * optional.
	 * <p>
	 * Example: compile code that increments a global variable and sets one, then execute 
	 * this code multiple times. These globals are contained in the sandbox.
	 * <pre>
	 * var util = require('util'),
	 * vm = require('vm'),
	 * sandbox = {
	 *   animal: 'cat', count: 2
	 * };
	 * 
	 * var script = vm.createScript('count += 1; name = "kitty"', 'myfile.vm');
	 * 
	 * for (var i = 0; i < 10 ; i += 1) {
	 *   script.runInNewContext(sandbox);
	 * }
	 * 
	 * console.log(util.inspect(sandbox));
	 * 
	 * // { animal: 'cat', count: 12, name: 'kitty' }
	 * </pre>
	 * Note that running untrusted code is a tricky business requiring great care. To 
	 * prevent accidental global variable leakage, script.runInNewContext is quite useful, 
	 * but safely running untrusted code requires a separate process.
	 */
	//> public Object runInNewContext(Object? sandbox)
	runInNewContext: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType()	