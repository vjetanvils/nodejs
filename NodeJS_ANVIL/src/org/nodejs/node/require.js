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
 * 
 */
vjo.ftype('org.nodejs.node.require') //< public
.props({
	/**
	 * The "require" function accepts a module identifier.
	 * "require" returns the exported API of the foreign module.
	 * If there is a dependency cycle, the foreign module may not have finished 
	 * executing at the time it is required by one of its transitive dependencies;
	 * in this case, the object returned by "require" must contain at least the exports
	 * that the foreign module has prepared before the call to require that led to the 
	 * current module's execution.
	 * <p>
	 * If the requested module cannot be returned, "require" must throw an error. 
	 */
	//> public ^Object _invoke_(String moduleIdentifier)
	_invoke_: vjo.NEEDS_IMPL,
	
	/**
	 * "paths" attribute is a prioritized Array of path Strings, from high to low, of 
	 * paths to top-level module directories.
	 * <p>
	 * <ol>
	 * <li>The "paths" property must not exist in "sandbox" (a secured module system).
	 * <li>The "paths" attribute must be referentially identical in all modules.
	 * <li>Replacing the "paths" object with an alternate object may have no effect.
	 * <li>If the "paths" attribute exists, in-place modification of the contents of "paths" 
	 *   must be reflected by corresponding module search behavior.
	 * <li>If the "paths" attribute exists, it may not be an exhaustive list of search paths,
	 *   as the loader may internally look in other locations before or after the mentioned paths.
	 * <li>If the "paths" attribute exists, it is the loader's prorogative to resolve, normalize, 
	 *   or canonicalize the paths provided. 
	 * </ol>
	 */
	//> public String[]
	paths: null,	
	
	/**
	 * Modules are cached in this object when they are required. By deleting a key value from 
	 * this object, the next require will reload the module.
	 */
	//> public Object
	cache: null,
	
	/**
	 * Instruct require on how to handle certain file extensions.
	 * <p>
	 * Process files with the extension .sjs as .js:
	 * <pre>
	 * require.extensions['.sjs'] = require.extensions['.js'];
	 * </pre>
	 */
	//> public Array
	extensions: null,
	
	/**
	 * Answer the path that contains the passed in Module Indentifier or return null.
	 */
	//> public String resolve(String moduleIdentifier)
	resolve: vjo.NEEDS_IMPL ,
	
	/**
	 * 
	 */
	//> public void async(String url, Function callback)
	async: vjo.NEEDS_IMPL,
	
	/**
	 *    { id: '.'
	 *    , exports: {}
	 *    , parent: undefined
	 *    , moduleCache: { '/home/mrp/Desktop/vjo/src/vjob.js': [Object] }
	 *    , filename: '/home/mrp/Desktop/vjo/src/ex/hello.js'
	 *    , loaded: false
	 *    , exited: false
	 *    , children: []
	 *    }
	 */
	//> public Object
	main: null,	
	
	/**
	 * This function allows the user to register file extensions to custom
	 * Javascript 'compilers'.  It accepts 2 arguments, where ext is a file
	 * extension as a string. E.g. '.coffee' for coffee-script files.  compiler
	 * is the second argument, which is a function that gets called when the
	 * specified file extension is found. The compiler is passed a single
	 * argument, which is, the file contents, which need to be compiled.
	 * <p>
	 * The function needs to return the compiled source, or an non-string
	 * variable that will get attached directly to the module exports. Example:
	 * <pre>
	 * require.registerExtension('.coffee', function(content) {
	 *   return doCompileMagic(content);
	 * });
	 * </pre>
	 */
	//> public void registerExtension(String name, Function compiler) ; throws Error
	registerExtension: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType()