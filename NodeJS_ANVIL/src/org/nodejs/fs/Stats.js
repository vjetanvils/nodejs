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
 * Objects returned from fs.stat(), fs.lstat() and fs.fstat() and their synchronous counterparts 
 * are of this type.
 * <p>
 * For a regular file util.inspect(stats) would return a string very similar to this:
 * <pre>
{ dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT }
  * </pre>
  * <p>
  * Please note that atime, mtime and ctime are instances of Date object and to compare the 
  * values of these objects you should use appropriate methods. For most general uses getTime() 
  * will return the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC and this 
  * integer should be sufficient for any comparison, however there additional methods which 
  * can be used for displaying fuzzy information. More details can be found in the MDN 
  * JavaScript Reference page.
 */
 vjo.ctype('org.nodejs.fs.Stats') //< public
.protos({
	/**
	 *
	 */
	 dev: 0,		//< public int	
	
	/**
	 *
	 */
	ino: 0,		//< public int	
	
	/**
	 *
	 */
	mode: 0,	//< public int
	
	/**
	 *
	 */
	nlink: 0,	//< public int
	
	/**
	 *
	 */
	uid: 0,		//< public int
	
	/**
	 *
	 */
	gid: 0,		//< public int
	
	/**
	 *
	 */
	rdev: 0,	//< public int
	
	/**
	 *
	 */
	size: 0,	//< public int
	
	/**
	 *
	 */
	blksize: 0,	//< public int
	
	/**
	 *
	 */
	blocks: 0,	//< public int
	
	/**
	 *
	 */
	atime: null, //< public Date
	
	/**
	 *
	 */
	mtime: null, //< public Date
	
	/**
	 *
	 */
	ctime: null, //< public Date
	
	/**
	 * Answer true if this stat result is for a directory else answer false.
	 */
	//> public boolean isDirectory()
	isDirectory: vjo.NEEDS_IMPL,		
	
	/**
	 * Answer true if this stat result is for a file else answer false.
	 */
	//> public boolean isFile()
	isFile: vjo.NEEDS_IMPL,	
	
	/**
	 * Answer true if this stat result is for a block-device else answer false.
	 */
	//> public boolean isBlockDevice()
	isBlockDevice: vjo.NEEDS_IMPL,
	
	/**
	 * Answer true if this stat result is for a character-device else answer false.
	 */
	//> public boolean isCharacterDevice()
	isCharacterDevice: vjo.NEEDS_IMPL,
	
	/**
	 * Answer true if this stat result is for a symlink else answer false.
	 */
	//> public boolean isSymbolicLink()
	isSymbolicLink: vjo.NEEDS_IMPL,
	
	/**
	 * Answer true if this stat result is for a FIFO queue else answer false.
	 */
	//> public boolean isFIFO()
	isFIFO: vjo.NEEDS_IMPL,	
	
	/**
	 * Answer true if this stat result is for a socket else answer false.
	 */
	//> public boolean isSocket()
	isSocket: vjo.NEEDS_IMPL			
})
.options({ metatype: true })
.endType()