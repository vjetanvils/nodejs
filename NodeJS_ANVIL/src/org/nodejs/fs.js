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
 * File I/O is provided by simple wrappers around standard POSIX functions. To use this module 
 * do require('fs'). All the methods have asynchronous and synchronous forms.
 * <p>
 * The asynchronous form always take a completion callback as its last argument. The arguments 
 * passed to the completion callback depend on the method, but the first argument is always 
 * reserved for an exception. If the operation was completed successfully, then the first 
 * argument will be null or undefined.
 * <p>
 * When using the synchronous form any exceptions are immediately thrown. You can use try/catch 
 * to handle exceptions or allow them to bubble up.
 * <p>
 * Here is an example of the asynchronous version:
 * <pre>
 * var fs = require('fs');
 * 
 * fs.unlink('/tmp/hello', function (err) {
 *   if (err) throw err;
 *   console.log('successfully deleted /tmp/hello');
 * });
 * </pre>
 * Here is the synchronous version:
 * <pre>
 * var fs = require('fs');
 * 
 * fs.unlinkSync('/tmp/hello')
 * console.log('successfully deleted /tmp/hello');
 * </pre>
 * With the asynchronous methods there is no guaranteed ordering. So the following is prone 
 * to error:
 * <pre>
 * fs.rename('/tmp/hello', '/tmp/world', function (err) {
 *   if (err) throw err;
 *   console.log('renamed complete');
 * });
 * fs.stat('/tmp/world', function (err, stats) {
 *   if (err) throw err;
 *   console.log('stats: ' + JSON.stringify(stats));
 * });
 * </pre>
 * It could be that fs.stat is executed before fs.rename. The correct way to do this is to 
 * chain the callbacks.
 * <pre>
 * fs.rename('/tmp/hello', '/tmp/world', function (err) {
 *   if (err) throw err;
 *   fs.stat('/tmp/world', function (err, stats) {
 *     if (err) throw err;
 *     console.log('stats: ' + JSON.stringify(stats));
 *   });
 * });
 * </pre>
 * In busy processes, the programmer is strongly encouraged to use the asynchronous versions 
 * of these calls. The synchronous versions will block the entire process until they 
 * complete--halting all connections.
 * <p>
 * Relative path to filename can be used, remember however that this path will be relative 
 * to process.cwd().
 * <p>
 * Most fs functions let you omit the callback argument. If you do, a default callback is 
 * used that ignores errors, but prints a deprecation warning.
 * <p>
 * IMPORTANT: Omitting the callback is deprecated. v0.12 will throw the errors as exceptions.
 */
//> public
vjo.ctype('org.nodejs.fs') 
//< needs(org.nodejs.buffer.Buffer)
//< needs(org.nodejs.fs.Stats)
.props({	
	//> public
	data: vjo.otype().defs({	
		watchOptions: {			//< public
			persistent: null	//< public boolean
		},
		
		watchFileOptions: { 	//< public
			/**
			 * Indicates whether the process should continue to run as long as files are 
			 * being watched. 
			 */
			persistent: null,	//< public boolean
			
			/**
			 * Indicates how often the target should be polled, in milliseconds.
			 */
			interval: null		//< public Number ; in milliseconds		
		},
		
		/**
		 * options is an object with the following defaults:
		 * <pre>
		 * { flags: 'r',
		 *   encoding: null,
		 *   fd: null,
		 *   mode: 0666,
		 *   bufferSize: 64 * 1024
		 * }
		 * </pre>
		 * options can include start and end values to read a range of bytes from the file 
		 * instead of the entire file. Both start and end are inclusive and start at 0. 
		 * The encoding can be 'utf8', 'ascii', or 'base64'.
		 */
		readStreamOptions: { //< public
			/**
			 * Default is 'r'
			 */
			flags: null,	//< public String?	
			
			/**
			 * 'utf8', 'ascii', or 'base64'
			 */
			encoding: null,	//< public String?	
			
			fd: null,		//< public int?
			
			/**
			 * Default is 0666
			 */
			mode: null,		//< public int?	
			
			/**
			 * Default size = 64 * 1024
			 */
			bufferSize: null, //< public int?
			
			/**
			 * Default is true
			 */
			autoClose: null,  //< public boolean?
			
			/**
			 * 
			 */
			start: null,	//< public int?	
			
			/**
			 * 
			 */
			end: null		//< public int?			
		},
	
		/**
		 * options is an object with the following defaults:
		 * <pre>
		 * { flags: 'w',
		 *   encoding: null,
		 *   mode: 0666 
		 * }
		 * </pre>
		 * options may also include a start option to allow writing data at some position 
		 * past the beginning of the file. Modifying a file rather than replacing it may 
		 * require a flags mode of r+ rather than the default mode w.
		 */
		writeStreamOptions: {//< public
			/**
			 * Default is 'w'
			 */
			flags: null,	//< public String?
			
			/**
			 * Default is null
			 */
			encoding: null,	//< public String?
			
			/**
			 * Default is 0666
			 */
			mode: null,		//< public int?	
			
			start: null		//< public int?
		},
		
		appendFileOptions:{		//< public
			/** String | Null default = 'utf8' */
			encoding: null,		//< public String?
			
			/** Number default = 438 (aka 0666 in Octal) */
			mode: null,			//< public Number?
			
			/** String default = 'a' */
			flag: null			//< public String?
		}
	})
	.options({
		metatype: true
	})
	.endType(),
	
	func: vjo.otype() //< public 
		.defs({	
		/**
		 * 
		 */
		//> public void exists(Boolean? exists)
		exists: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void stat(Error? err, Stats? stats)
		stat: vjo.NEEDS_IMPL,
		
		/**
		 * Asynchronous fstat(2). The callback gets two arguments (err, stats) 
		 * where stats is a fs.Stats object.
		 */
		//> public void fstat(Error? err, Stats? stats)
		fstat: vjo.NEEDS_IMPL,
		
		/**
		 * Asynchronous lstat(2). The callback gets two arguments (err, stats) 
		 * where stats is a fs.Stats object. lstat() is identical to stat(), 
		 * except that if path is a symbolic link, then the link itself is 
		 * stat-ed, not the file that it refers to.
		 */
		//> public void lstat(Error? err, Stats? stats)
		lstat: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void linkPath(Error? err, String? resolvedPath)
		linkPath: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void readFile_String(Error? err, String? contents)
		readFile_String: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void readFile_Buffer(Error? err, Buffer? contents)
		readFile_Buffer: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void readdir(Error? err, String[]? fileNames)
		readdir: vjo.NEEDS_IMPL,
		
		/**
		 * Asynchronous readlink(2). 
		 * <p>
		 * The callback gets two arguments (err, resolvedPath). 
		 */
		//> public void readlink(Error? err, String? resolvedPath)
		readlink: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void realpath(Error? err, String? resolvedPath)
		realpath: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void open(Error? err, int? fd)
		open: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void read(Error? err, int? bytesRead)
		read: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void write(Error? err, int? bytesWritten, {String | Buffer}? buffer)
		write: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void error(Error? err)
		error: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void watchFile(Stats? current, Stats? previous)
		watchFile: vjo.NEEDS_IMPL,
		
		//> public void watch(String? event, String? fileName)
		watch: vjo.NEEDS_IMPL
	})
	.options({
		metatype: true
	})
	.endType()

})
.protos({	
	Stats: 		null, 	//< public type::org.nodejs.fs.Stats
	ReadStream: null,	//< public type::org.nodejs.fs.ReadStream
	WriteStream:null,	//< public type::org.nodejs.fs.WriteStream
	FSWatcher: 	null,	//< public type::org.nodejs.fs.FSWatcher
	
	/* Support legacy names */
	FileReadStream: null,	//< public type::org.nodejs.fs.ReadStream
	FileWriteStream:null,	//< public type::org.nodejs.fs.WriteStream

	/**
	 * Asynchronous rename(2). No arguments other than a possible exception are given to the 
	 * completion callback.
	 */
	//> public void rename(String oldPath, String newPath, org.nodejs.fs.func:error? callback)
	rename: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous rename(2).
	 */
	//> public int rename(String oldPath, String newPath)
	renameSync: vjo.NEEDS_IMPL,	
	
	/**
	 * Asynchronous truncate(2). No arguments other than a possible exception are given to 
	 * the completion callback.
	 */
	//> public void truncate(int fd, int len, org.nodejs.fs.func:error? callback)
	truncate: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous ftruncate(2). No arguments other than a possible exception are given to 
	 * the completion callback.
	 */
	//> public void ftruncate(int fd, int len, org.nodejs.fs.func:error? callback)
	ftruncate: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous ftruncate(2).
	 */
	//> public int truncateSync(int fd, int len)
	ftruncateSync: vjo.NEEDS_IMPL,	
			
	/**
	 * Asynchronous chown(2). No arguments other than a possible exception are given to the 
	 * completion callback.
	 */
	//> public void chown(String path, int uid, int gid, org.nodejs.fs.func:error? callback)
	chown: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous chown(2).
	 */
	//> public int chownSync(String path, int uid, int gid)
	chownSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous fchown(2). No arguments other than a possible exception are given to 
	 * the completion callback.
	 */
	//> public void fchown(int fd, int uid, int gid, org.nodejs.fs.func:error? callback)
	fchown: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous fchown(2).
	 */
	//> public int fchown(int fd, int uid, int gid, org.nodejs.fs.func:error? callback)
	fchownSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous lchown(2). No arguments other than a possible exception are given to 
	 * the completion callback.
	 */
	//> public void lchown(String path, int uid, int gid, org.nodejs.fs.func:error? callback)
	lchown: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous lchown(2).
	 */
	//> public int lchown(String path, int uid, int gid)
	lchownSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous chmod(2). No arguments other than a possible exception are given to the 
	 * completion callback.
	 * <p>
	 * Modes are specified by or'ing the following:
	 * <ul>
	 * <li>S_ISUID	04000 set user ID on execution
	 * <li>S_ISGID	02000 set group ID on execution
	 * <li>S_ISVTX	01000 sticky bit
	 * <li>S_IRUSR	00400 read by owner
	 * <li>S_IWUSR	00200 write by owner
	 * <li>S_IXUSR	00100 execute/search by owner
	 * <li>S_IRGRP	00040 read by group
	 * <li>S_IWGRP	00020 write by group
	 * <li>S_IXGRP	00010 execute/search by group
	 * <li>S_IROTH	00004 read by others
	 * <li>S_IWOTH	00002 write by others
	 * <li>S_IXOTH	00001 execute/search by others
	 * </ul>
	 */
	//> public void lchown(String path, int mode, org.nodejs.fs.func:error? callback)
	chmod: vjo.NEEDS_IMPL,
	
	/* Synchronous chmod(2).
	 * <p>
	 * Modes are specified by or'ing the following:
	 * <ul>
	 * <li>S_ISUID	04000 set user ID on execution
	 * <li>S_ISGID	02000 set group ID on execution
	 * <li>S_ISVTX	01000 sticky bit
	 * <li>S_IRUSR	00400 read by owner
	 * <li>S_IWUSR	00200 write by owner
	 * <li>S_IXUSR	00100 execute/search by owner
	 * <li>S_IRGRP	00040 read by group
	 * <li>S_IWGRP	00020 write by group
	 * <li>S_IXGRP	00010 execute/search by group
	 * <li>S_IROTH	00004 read by others
	 * <li>S_IWOTH	00002 write by others
	 * <li>S_IXOTH	00001 execute/search by others
	 * </ul>
	 */
	//> public int chmodSync(String path, int mode)
	chmodSync: vjo.NEEDS_IMPL,
	
	 /**
	  * Asynchronous fchmod(2). No arguments other than a possible exception are given to 
	  * the completion callback.
	  */
	//> public void fchmod(int fd, int mode, org.nodejs.fs.func:error? callback)
	fchmod: vjo.NEEDS_IMPL,
	
	/** Synchronous fchmod(2). */
	//> public int fchmodSync(int fd, int mode)
	fchmodSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous lchmod(2). No arguments other than a possible exception are given to 
	 * the completion callback.
	 * <p>
	 * Only available on Mac OS X.
	 */
	//> public void lchmod(String path, int mode, org.nodejs.fs.func:error? callback)
	lchmod: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous lchmod(2).
	 */
	//> public int lchown(String path, int mode)
	lchmodSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous stat(2). The callback gets two arguments (err, stats) where stats is a 
	 * fs.Stats object. See the fs.Stats section below for more information.
	 */
	//> public void stat(String path, org.nodejs.fs.func:stat? callback)
	// public void stat(String path, (void f(Error? err, Stats? stats))? callback)
	stat: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous lstat(2). The callback gets two arguments (err, stats) where stats is 
	 * a fs.Stats object. lstat() is identical to stat(), except that if path is a symbolic 
	 * link, then the link itself is stat-ed, not the file that it refers to.
	 */
	//> public void lstat(String path, org.nodejs.fs.func:fstat? callback)
	lstat: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous fstat(2). The callback gets two arguments (err, stats) where stats is 
	 * a fs.Stats object. fstat() is identical to stat(), except that the file to be stat-ed 
	 * is specified by the file descriptor fd.
	 */
	//> public void fstat(int fd, org.nodejs.fs.func:lstat? callback)
	fstat: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous stat(2). Returns an instance of fs.Stats. 
	 */
	//> public Stats statSync(String path) 
	statSync: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous lstat(2). Returns an instance of fs.Stats.
	 */
	//> public Stats lstatSync(String path)
	lstatSync: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous fstat(2). Returns an instance of fs.Stats.
	 */
	//> public Stats fstatSync(int fd)
	fstatSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous link(2). No arguments other than a possible exception are given to the 
	 * completion callback.
	 */
	//> public void link(String srcPath, String destPath, org.nodejs.fs.func:error? callback)
	link: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous link(2).
	 */
	//> public int linkSync(String srcPath, String destPath)
	linkSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous symlink(2). No arguments other than a possible exception are given to 
	 * the completion callback. type argument can be either 'dir', 'file', or 'junction' 
	 * (default is 'file'). It is only used on Windows (ignored on other platforms). Note 
	 * that Windows junction points require the destination path to be absolute. When 
	 * using 'junction', the destination argument will automatically be normalized to 
	 * absolute path.
	 */
	//> public void symlink(String srcPath, String destPath, String? type, org.nodejs.fs.func:error? callback)
	symlink: vjo.NEEDS_IMPL,
	
	/**
	 * type argument can be either 'dir', 'file', or 'junction' 
	 * (default is 'file')
	 */
	//> public int symlinkSync(String srcPath, String destPath, String? type)
	symlinkSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous readlink(2). The callback gets two arguments (err, linkString).
	 */
	//> public void readlink(String path, org.nodejs.fs.func:readlink? callback)
	readlink: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous readlink(2). Returns the symbolic link's string value.
	 */
	//> public String readlinkSync(String path)
	readlinkSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous realpath(2). The callback gets two arguments (err, resolvedPath). May 
	 * use process.cwd to resolve relative paths. cache is an object literal of mapped 
	 * paths that can be used to force a specific path resolution or avoid additional 
	 * fs.stat calls for known real paths.
	 * <p>
	 * Example:
	 * <pre>
	 * var cache = {'/etc':'/private/etc'};
	 * fs.realpath('/etc/passwd', cache, function (err, resolvedPath) {
	 *   if (err) throw err;
	 *   console.log(resolvedPath);
	 * });
	 * </pre>
	 */
	// public void realpath(String path, org.nodejs.fs.func:realpath? callback)
	// public void realpath(String path, Object cache, org.nodejs.fs.func:realpath? callback)
	//> public void realpath(String path, (void f(Error? err, String? resolvedPath))? callback)
	//> public void realpath(String path, Object cache, (void f(Error? err, String? resolvedPath))? callback)
	realpath: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous realpath(2). Returns the resolved path.
	 */
	//> public String realpathSync(String path, Object? cache)
	realpathSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous unlink(2). No arguments other than a possible exception are given to 
	 * the completion callback.
	 */
	//> public void unlink(String path, org.nodejs.fs.func:error? callback)
	unlink: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous unlink(2).
	 */
	//> public int unlink(String path)
	unlinkSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous rmdir(2). No arguments other than a possible exception are given to 
	 * the completion callback.
	 */
	//> public void rmdir(String path, org.nodejs.fs.func:error? callback)
	rmdir: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous rmdir(2).
	 */
	//> public int rmdirSync(String path)
	rmdirSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous mkdir(2). No arguments other than a possible exception are given to 
	 * the completion callback. mode defaults to 0777.
	 */
	//> public void mkdir(String path, int? mode, org.nodejs.fs.func:error? callback)
	mkdir: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous mkdir(2).
	 */
	//> public int mkdirSync(String path, int? mode)
	mkdirSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous readdir(3). Reads the contents of a directory. The callback gets two 
	 * arguments (err, files) where files is an array of the names of the files in the 
	 * directory excluding '.' and '..'.
	 */
	//> public void readdir(String path, org.nodejs.fs.func:readdir? callback)
	readdir: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous readdir(3). Returns an array of filenames excluding '.' and '..'.
	 */
	//> public int readdirSync(String path)
	readdirSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous close(2). No arguments other than a possible exception are given to 
	 * the completion callback.
	 */
	//> public void close(int fd, org.nodejs.fs.func:error? callback)
	close: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous close(2).
	 */
	//> public int close(int fd)
	closeSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous file open. See open(2). flags can be:
	 * <ul>
	 * <li>'r' - Open file for reading. An exception occurs if the file does not exist.
	 * <li>'r+' - Open file for reading and writing. An exception occurs if the file does not exist.
	 * <li>'rs' - Open file for reading in synchronous mode. Instructs the operating system to bypass the local file system cache.
	 * </ul>
	 * This is primarily useful for opening files on NFS mounts as it allows you to skip 
	 * the potentially stale local cache. It has a very real impact on I/O performance so 
	 * don't use this mode unless you need it.
	 * <p>
	 * Note that this doesn't turn fs.open() into a synchronous blocking call. If that's 
	 * what you want then you should be using fs.openSync()
	 * <ul>
	 * <li>'rs+' - Open file for reading and writing, telling the OS to open it synchronously. See notes for 'rs' about using this with caution.
	 * <li>'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
	 * <li>'wx' - Like 'w' but opens the file in exclusive mode.
	 * <li>'w+' - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
	 * <li>'wx+' - Like 'w+' but opens the file in exclusive mode.
	 * <li>'a' - Open file for appending. The file is created if it does not exist.
	 * <li>'ax' - Like 'a' but opens the file in exclusive mode.
	 * <li>'a+' - Open file for reading and appending. The file is created if it does not exist.
	 * <li>'ax+' - Like 'a+' but opens the file in exclusive mode.
	 * </ul>
	 * mode defaults to 0666. The callback gets two arguments (err, fd).
	 * <p>
	 * Exclusive mode (O_EXCL) ensures that path is newly created. fs.open() fails if a 
	 * file by that name already exists. On POSIX systems, symlinks are not followed. 
	 * Exclusive mode may or may not work with network file systems.
	 */
	//> public void open(String path, String flags)
	//> public void open(String path, String flags, Number mode)
	//> public void open(String path, String flags, org.nodejs.fs.func:open callback)
	//> public void open(String path, String flags, Number mode, org.nodejs.fs.func:open callback)
	open: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous open(2).
	 */
	//> public int openSync(String path, String flags, Number? mode)
	openSync: vjo.NEEDS_IMPL,
	
	/**
	 * Change file timestamps of the file referenced by the supplied path.
	 */
	//> public void utimes(String path, Number atime, Number mtime, org.nodejs.fs.func:error? callback)
	utimes: vjo.NEEDS_IMPL,
	
	/**
	 * Change file timestamps of the file referenced by the supplied path by synchronous call
	 */
	//> public void utimes(String path, Number atime, Number mtime)
	utimesSync: vjo.NEEDS_IMPL,
	
	/**
	 * Change the file timestamps of a file referenced by the supplied file descriptor.
	 */
	//> public void futimes(int fd, Number atime, Number mtime, org.nodejs.fs.func:error? callback)
	futimes: vjo.NEEDS_IMPL,
	
	/**
	 * Change the file timestamps of a file referenced by the supplied file descriptor.
	 */
	//> public void futimes(int fd, Number atime, Number mtime)
	futimesSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous fsync(2). No arguments other than a possible exception are given to 
	 * the completion callback.
	 */
	//> public int fsync(int fd, org.nodejs.fs.func:error? callback)
	fsync: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous fsync(2).
	 */
	//> public int fsyncSync(int fd)
	fsyncSync: vjo.NEEDS_IMPL,
	
	//> public void fdatasync(int fd, Function cb)
	fdatasync: vjo.NEEDS_IMPL,
	
	//> public int fdatasyncSync(int fd)
	fdatasyncSync: vjo.NEEDS_IMPL,
	
	/**
	 * Write buffer to the file specified by fd.
	 * <p>
	 * offset and length determine the part of the buffer to be written.
	 * <p>position refers to the offset from the beginning of the file where this data 
	 * should be written. If position is null, the data will be written at the current 
	 * position. See pwrite(2).
	 * <p>The callback will be given three arguments (err, written, buffer) where written 
	 * specifies how many bytes were written from buffer.
	 * <p>
	 * Note that it is unsafe to use fs.write multiple times on the same file without 
	 * waiting for the callback. For this scenario, fs.createWriteStream is strongly 
	 * recommended.
	 */
	//> public void write(int fd, {String | Buffer} buffer, int offset, int length, int position, org.nodejs.fs.func:write? callback)
	write: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous version of fs.write(). Returns the number of bytes written.
	 */
	//> public int write(int fd, {String | Buffer} buffer, int offset, int length, int position)
	writeSync: vjo.NEEDS_IMPL,
	
	/**
	 * Read data from the file specified by fd.
	 * <p>buffer is the buffer that the data will be written to.
	 * <p>offset is offset within the buffer where reading will start.
	 * <p>length is an integer specifying the number of bytes to read.
	 * <p>position is an integer specifying where to begin reading from in the file. If position is null, data will be read from the current file position.
	 * <p>The callback is given the three arguments, (err, bytesRead, buffer).
	 */
	//> public void read(int fd, {String | Buffer} buffer, int offset, int length, int position, org.nodejs.fs.func:read? callback)
	read: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous version of fs.read. Returns the number of bytesRead.
	 */
	//> public {int | Array} read(int fd, {String | Buffer} buffer, int offset, int length, int position)
	readSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronously reads the entire contents of a file. Example:
	 * <pre>
	 * fs.readFile('/etc/passwd', function (err, data) {
	 *   if (err) throw err;
	 *   console.log(data);
	 * });
	 * </pre>
	 * The callback is passed two arguments (err, data), where data is the contents of the 
	 * file.
	 * <p>
	 * If no encoding is specified, then the raw buffer is returned.
	 */
	//> public Buffer readFile(String fileName, org.nodejs.fs.func:readFile_Buffer? callback)
	//> public String readFile(String fileName, String encoding, org.nodejs.fs.func:readFile_String? callback)
	readFile: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous version of fs.readFile. Returns the contents of the filename.
	 * <p>
	 * If encoding is specified then this function returns a string. Otherwise it returns 
	 * a buffer.
	 */
	//> public Buffer readFileSync(String fileName)
	//> public String readFileSync(String fileName, String encoding)
	readFileSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronously writes data to a file, replacing the file if it already exists. data 
	 * can be a string or a buffer. The encoding argument is ignored if data is a buffer. 
	 * It defaults to 'utf8'.
	 * <p>
	 * Example:
	 * <pre>
	 * fs.writeFile('message.txt', 'Hello Node', function (err) {
	 *   if (err) throw err;
	 *   console.log('It\'s saved!');
	 * });
	 * </pre>
	 */
	//> public void writeFile(String fileName, {String | Buffer} data)
	//> public void writeFile(String fileName, {String | Buffer} data, org.nodejs.fs.func:error callback)
	//> public void writeFile(String fileName, {String | Buffer} data, String encoding, org.nodejs.fs.func:error callback)
	writeFile: vjo.NEEDS_IMPL,
	
	/**
	 * The synchronous version of fs.writeFile.
	 */
	//> public void writeFile(String fileName, {String | Buffer} data, String? encoding)
	writeFileSync: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronously append data to a file, creating the file if it not yet exists. data 
	 * can be a string or a buffer. The encoding argument is ignored if data is a buffer.
	 * <p>
	 * Example:
	 * <pre>
	 * fs.appendFile('message.txt', 'data to append', function (err) {
	 *   if (err) throw err;
	 *   console.log('The "data to append" was appended to file!');
	 * });
	 * </pre>
	 */
	//> public void appendFile(String fileName, {String | Buffer} data, fs.data.appendFileOptions options, org.nodejs.fs.func:error? callback)
	//> public void appendFile(String fileName, {String | Buffer} data, org.nodejs.fs.func:error? callback)
	appendFile: vjo.NEEDS_IMPL,
	
	/**
	 * The synchronous version of fs.appendFile.
	 */
	//> public void appendFileSync(String fileName, {String | Buffer} data, fs.data.appendFileOptions? options)
	appendFileSync: vjo.NEEDS_IMPL,
	
	/**
	 * Stability: 2 - Unstable.  Use fs.watch instead, if possible.
	 * <p>
	 * Watch for changes on filename. The callback listener will be called each time the file 
	 * is accessed.
	 * <p>
	 * The second argument is optional. The options if provided should be an object containing 
	 * two members a boolean, persistent, and interval. persistent indicates whether the process 
	 * should continue to run as long as files are being watched. interval indicates how often 
	 * the target should be polled, in milliseconds. The default is 
	 * { persistent: true, interval: 5007 }.
	 * <p>
	 * The listener gets two arguments the current stat object and the previous stat object:
	 * <pre>
	 * fs.watchFile('message.text', function (curr, prev) {
	 *   console.log('the current mtime is: ' + curr.mtime);
	 *   console.log('the previous mtime was: ' + prev.mtime);
	 * });
	 * </pre>
	 * These stat objects are instances of fs.Stat.
	 * <p>
	 * If you want to be notified when the file was modified, not just accessed you need to 
	 * compare curr.mtime and prev.mtime.
	 */
	//> public Stats watchFile(String fileName, org.nodejs.fs.func:watchFile? listener)
	//> public Stats watchFile(String fileName, data.watchFileOptions options, org.nodejs.fs.func:watchFile? listener)
	watchFile: vjo.NEEDS_IMPL,
	
	/**
	 * ability: 2 - Unstable.  Use fs.watch instead, if available.
	 * <p>
	 * Stop watching for changes on filename. If listener is specified, only that particular 
	 * listener is removed. Otherwise, all listeners are removed and you have effectively 
	 * stopped watching filename.
	 * <p>
	 * Calling fs.unwatchFile() with a filename that is not being watched is a no-op, not 
	 * an error.
	 */
	//> public void unwatchFile(String fileName, Function? listener)
	unwatchFile: vjo.NEEDS_IMPL,
	
	/**
	 * Test whether or not the given path exists by checking with the file system. Then 
	 * call the callback argument with either true or false. Example:
	 * <pre>
	 * fs.exists('/etc/passwd', function (exists) {
	 *   util.debug(exists ? "it's there" : "no passwd!");
	 * });
	 * </pre>
	 */
	//> public void exists(String path, org.nodejs.fs.func:exists? callback)
	exists: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous version of fs.exists.
	 */
	//> public boolean exists(String path)
	existsSync: vjo.NEEDS_IMPL,
	
// TODO: MrP - This function collides with the JavaScript watch() method that is being
// transparently inherited from.  We may need to look at this notion of windows environment
// vs. pure JS language constructs - this is especially true for something like Node.js
// which is inherently a server-side context.
//	//> public void watch(String fileName, fs.data.watchOptions? options, fs.func:watch)
//	watch: vjo.NEEDS_IMPL,
	
	/**
	 * Returns a new ReadStream object (See Readable Stream).
	 * <p>
	 * options is an object with the following defaults:
	 * <pre>
	 * { flags: 'r',
	 *   encoding: null,
	 *   fd: null,
	 *   mode: 0666,
	 *   bufferSize: 64 * 1024
	 * }
	 * </pre>
	 * <p>
	 * options can include start and end values to read a range of bytes from the file instead 
	 * of the entire file. Both start and end are inclusive and start at 0. The encoding can 
	 * be 'utf8', 'ascii', or 'base64'.
	 * <p>
	 * An example to read the last 10 bytes of a file which is 100 bytes long:
	 * <pre>
	 * fs.createReadStream('sample.txt', {start: 90, end: 99});
	 * </pre>
	 */
	//> public fs.ReadStream createReadStream(String path, fs.data.readStreamOptions? options)
	createReadStream: vjo.NEEDS_IMPL,
	
	/**
	 * fs.createWriteStream(path, [options])
	 * Returns a new WriteStream object (See Writable Stream).
	 * <p>options is an object with the following defaults:
	 * <pre>
	 * { 'flags': 'w'
	 *     , 'encoding': null
	 *     , 'mode': 0666
	 *     , 'bufferSize: 4096
	 * }
	 * </pre>
	 */
	//> public fs.WriteStream createWriteStream(String path, fs.data.writeStreamOptions? options)
	createWriteStream: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();