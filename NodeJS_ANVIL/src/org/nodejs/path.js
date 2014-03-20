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
 * Stability: 3 - Stable
 * <p>
 * This module contains utilities for handling and transforming file paths. Almost all 
 * these methods perform only string transformations. The file system is not consulted 
 * to check whether paths are valid.
 * <p>
 * Use require('path') to use this module.
 */
//> public ;// all exports...
vjo.ctype('org.nodejs.path') 
.props({
	/**
	 * 
	 */
	//> public
	callback: vjo.otype().defs({
		/**
		 * Callback for the path.exists(...) function
		 */
		//> public void exists(boolean? exists)
		exists: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	
	/**
	 * Normalize a string path, taking care of '..' and '.' parts.
	 * <p>
	 * When multiple slashes are found, they're replaced by a single one; when 
	 * the path contains a trailing slash, it is preserved. On windows backslashes 
	 * are used.
	 * <p>
	 * Example:
	 * <pre>
	 * path.normalize('/foo/bar//baz/asdf/quux/..')
	 *   // returns
	 * '/foo/bar/baz/asdf'
	 */
	//> public String normalize(String path) 
	normalize: vjo.NEEDS_IMPL,
	
	/**
	 * Join all arguments together and normalize the resulting path. Non-string arguments are ignored.
	 * <p>
	 * Example:
	 * <pre>
	 * path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
	 * // returns
	 * '/foo/bar/baz/asdf'
	 * 
	 * path.join('foo', {}, 'bar')
	 * // returns
	 * 'foo/bar'
	 */
	//> public String join(String... paths)
	join: vjo.NEEDS_IMPL,
	
	/**
	 * Resolves to to an absolute path.
	 * <p>If to isn't already absolute from arguments are prepended in right to 
	 * left order, until an absolute path is found. If after using all from paths 
	 * still no absolute path is found, the current working directory is used as 
	 * well. The resulting path is normalized, and trailing slashes are removed 
	 * unless the path gets resolved to the root directory.
	 * <p>
	 * Another way to think of it is as a sequence of cd commands in a shell.
	 * path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
	 * Is similar to:
	 * <pre>
	 * cd foo/bar
	 * cd /tmp/file/
	 * cd ..
	 * cd a/../subfile
	 * pwd
	 * </pre>
	 * The difference is that the different paths don't need to exist and 
	 * may also be files.
	 * <p>Examples:
	 * <pre>
	 * path.resolve('/foo/bar', './baz')
	 * // returns 
	 * '/foo/bar/baz'
	 * 
	 * path.resolve('/foo/bar', '/tmp/file/')
	 * // returns
	 * '/tmp/file'
	 * path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
	 * // if currently in /home/myself/node, it returns
	 * '/home/myself/node/wwwroot/static_files/gif/image.gif'
	 * </pre>
	 */
	//> public String resolve(String part1, String... parts)
	resolve: vjo.NEEDS_IMPL,

	/**
	 * Solve the relative path from from to to.
	 * <p>
	 * At times we have two absolute paths, and we need to derive the relative 
	 * path from one to the other. This is actually the reverse transform of 
	 * path.resolve, which means we see that:
	 * path.resolve(from, path.relative(from, to)) == path.resolve(to)
	 *<p>
	 *Examples:
	 *<pre>
	 *path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb')
	 * // returns
	 * '..\\..\\impl\\bbb'
	 * 
	 * path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb')
	 * // returns
	 * '../../impl/bbb'
	 */
	//> public String relative(String from, String to)
	relative: vjo.NEEDS_IMPL,
	
	/**
	 * Return the directory name of a path. Similar to the Unix dirname command.
	 * <p>
	 * Example:
	 * <pre>
	 * path.dirname('/foo/bar/baz/asdf/quux')
	 * // returns
	 * '/foo/bar/baz/asdf'
	 * </pre>
	 */
	//> public String dirname(String path)
	dirname: vjo.NEEDS_IMPL,
	
	/**
	 * Return the last portion of a path. Similar to the Unix basename command.
	 * <p>
	 * Example:
	 * <pre>
	 * path.basename('/foo/bar/baz/asdf/quux.html')
	 * // returns
	 * 'quux.html'
	 * 
	 * path.basename('/foo/bar/baz/asdf/quux.html', '.html')
	 * // returns
	 * 'quux'
	 */
	//> public String basename(String path, String? ext)
	basename: vjo.NEEDS_IMPL,
	
	/**
	 * Return the extension of the path, from the last '.' to end of string in the 
	 * last portion of the path. If there is no '.' in the last portion of the path 
	 * or the first character of it is '.', then it returns an empty string. 
	 * <p>
	 * Examples:
	 * <pre>
	 * path.extname('index.html')
	 *   // returns
	 * '.html'
	 * 
	 * path.extname('index.')
	 *   // returns
	 * '.'
	 * 
	 * path.extname('index')
	 *   // returns
	 * ''
	 */
	//> public String extname(String path)
	extname: vjo.NEEDS_IMPL,
	
	/**
	 * The platform-specific file separator. '\\' or '/'.
	 * <p>
	 * An example on linux:
	 * <pre>
	 * 'foo/bar/baz'.split(path.sep)
	 *   // returns
	 * ['foo', 'bar', 'baz']
	 * </pre>
	 * An example on windows:
	 * <pre>
	 * 'foo\\bar\\baz'.split(path.sep
	 *   // returns
	 * ['foo', 'bar', 'baz']
	 * </pre>
	 */
	//> public final String
	sep: '',
	
	/**
	 * The platform-specific path delimiter, ; or ':'.
	 * <p>
	 * An example on *nix:
	 * <pre>
	 * console.log(process.env.PATH)
	 * // '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin'
	 * 
	 * process.env.PATH.split(path.delimiter)
	 * // returns
	 * ['/usr/bin', '/bin', '/usr/sbin', '/sbin', '/usr/local/bin']
	 * </pre>
	 * <p>
	 * An example on Windows:
	 * <pre>
	 * console.log(process.env.PATH)
	 * // 'C:\Windows\system32;C:\Windows;C:\Program Files\nodejs\'
	 * 
	 * process.env.PATH.split(path.delimiter)
	 * // returns
	 * ['C:\Windows\system32', 'C:\Windows', 'C:\Program Files\nodejs\']
	 * </pre>
	 */
	//> public final String
	delimiter: ''
})
.options({ metatype: true })
.endType();