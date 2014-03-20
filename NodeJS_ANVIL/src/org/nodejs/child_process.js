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
 * Node provides a tri-directional popen(3) facility through the child_process module.
 * <p>
 * It is possible to stream data through a child's stdin, stdout, and stderr in a fully 
 * non-blocking way.
 * <p>
 * To create a child process use require('child_process').spawn() or 
 * require('child_process').fork().
 * <p>
 * The semantics of each are slightly different, and explained below..
 * <p>
 */
vjo.ctype('org.nodejs.child_process') //< public
//< needs(org.nodejs.buffer.Buffer)
.props({
	data: vjo.otype().defs({	//< public
		/**
		 * Options definition for the spawn(...) function.
		 */
		spawnOptions: {			//< public
			/** Current working directory of the child process. */
			cwd: null,			//< public String?
			
			/** Array|String Child's stdio configuration. (See below) */
			stdio: null,		//< public {String | Array}?
			
			/** Array - Deprecated -  File descriptors for the child to use for stdio. (See below) */
			customFds: null,	//< public int[ ]?
			
			/** Environment key-value pairs. */
			env: null,			//< public Object?
			
			/** The child will be a process group leader. (See below) */
			detached: null,		//< public boolean?
			
			/** Sets the user identity of the process. (See setuid(2).) */
			uid: null,			//< public Number?
			
			/** Sets the group identity of the process. (See setgid(2).) */
			gid: null			//< public Number?
		},
		
		/**
		 * Options definition for the exec(...) function.
		 */
		execOptions: {			//< public
			/** Current working directory of the child process. */
			cwd: null,			//< public String?
			
			/** Array|String Child's stdio configuration. (See above). */
			stdio: null,		//< public {String | Array}?
			
			/**
			 * Array - Deprecated - File descriptors for the child to use for stdio. (See above)
			 */
			customFds: null,	//< public int[ ]?
			
			/** Object Environment key-value pairs. */
			env: null,			//< public Object?
			
			/** Default: 'utf8' */
			encoding: null,		//< public String?
			
			/** Default: 0 */
			timeout: null,		//< public int?
			
			/** Default: 200*1024 */
			maxBuffer: null,	//< public int?
			
			/** Default: 'SIGTERM' */
			killSignal: null	//< public String?
		},
		
		/**
		 * Options definition for the fork(...) function.
		 */
		forkOptions: {		//< public
			/** Current working directory of the child process. */
			cwd: null,		//< public String?
			
			/** Environment key-value pairs. */
			env: null,		//< public Object?
			
			/** Default: 'utf8' */
			encoding: null,	//< public String?
			
			/** Executable used to create the child process */
			execPath: null	//< public String?
		}	
	}).endType(),
	
	/**
	 * These are callbacks used by child_process
	 */
	//> public
	func: vjo.otype().defs({
		
		/** Function called with the output when process terminates. */
		//> public void exec(Error? error, Buffer? stdout, Buffer? stderr)
		execCallback: vjo.NEEDS_IMPL
	}).endType()
})
.protos({	
	ChildProcess: null,  //< public type::org.nodejs.child_process.ChildProcess
	
	/**
	 * <ul>
	 * <li>command String The command to run
	 * <li>args Array List of string arguments
	 * <li>options Object
	 *   <ul>
	 *   <li>cwd String Current working directory of the child process
	 *   <li>stdio Array|String Child's stdio configuration. (See below)
	 *   <li>customFds Array Deprecated File descriptors for the child to use for stdio. (See below)
	 *   <li>env Object Environment key-value pairs
	 *   <li>detached Boolean The child will be a process group leader. (See below)
	 *   <li>uid Number Sets the user identity of the process. (See setuid(2).)
	 *   <li>gid Number Sets the group identity of the process. (See setgid(2).)
	 *   </ul>
	 * </ul>
	 * return: ChildProcess object
	 * <p>
	 * Launches a new process with the given command, with command line arguments in args. 
	 * If omitted, args defaults to an empty Array.
	 * <p>
	 * The third argument is used to specify additional options, which defaults to:
	 * <pre>
	 * { cwd: undefined,
	 *   env: process.env
	 * }
	 * </pre>
	 * cwd allows you to specify the working directory from which the process is spawned. 
	 * Use env to specify environment variables that will be visible to the new process.
	 * <p>
	 * Example of running ls -lh /usr, capturing stdout, stderr, and the exit code:
	 * <pre>
	 * var spawn = require('child_process').spawn,
	 *     ls    = spawn('ls', ['-lh', '/usr']);
	 *     
	 * ls.stdout.on('data', function (data) {
	 *   console.log('stdout: ' + data);
	 * });
	 * 
	 * ls.stderr.on('data', function (data) {
	 *   console.log('stderr: ' + data);
	 * });
	 * 
	 * ls.on('exit', function (code) {
	 *   console.log('child process exited with code ' + code);
	 * });
	 * </pre>
	 * Example: A very elaborate way to run 'ps ax | grep ssh'
	 * <pre>
	 * var spawn = require('child_process').spawn,
	 *     ps    = spawn('ps', ['ax']),
	 *     grep  = spawn('grep', ['ssh']);
	 *     
	 * ps.stdout.on('data', function (data) {
	 *   grep.stdin.write(data);
	 * });
	 * 
	 * ps.stderr.on('data', function (data) {
	 *   console.log('ps stderr: ' + data);
	 * });
	 * 
	 * ps.on('exit', function (code) {
	 *   if (code !== 0) {
	 *     console.log('ps process exited with code ' + code);
	 *   }
	 *   grep.stdin.end();
	 * });
	 * 
	 * grep.stdout.on('data', function (data) {
	 *   console.log('' + data);
	 * });
	 * 
	 * grep.stderr.on('data', function (data) {
	 *   console.log('grep stderr: ' + data);
	 * });
	 * 
	 * grep.on('exit', function (code) {
	 *   if (code !== 0) {
	 *     console.log('grep process exited with code ' + code);
	 *   }
	 * });
	 * </pre>
	 * Example of checking for failed exec:
	 * <pre>
	 * var spawn = require('child_process').spawn,
	 *     child = spawn('bad_command');
	 * child.stderr.setEncoding('utf8');
	 * child.stderr.on('data', function (data) {
	 *   if (/^execvp\(\)/.test(data)) {
	 *     console.log('Failed to start child process.');
	 *   }
	 * });
	 * </pre>
	 * Note that if spawn receives an empty options object, it will result in spawning the 
	 * process with an empty environment rather than using process.env. This due to backwards 
	 * compatibility issues with a deprecated API.
	 * <p>
	 * The 'stdio' option to child_process.spawn() is an array where each index corresponds 
	 * to a fd in the child. The value is one of the following:
	 * <ol>
	 * <li>'pipe' - Create a pipe between the child process and the parent process. The parent 
	 * end of the pipe is exposed to the parent as a property on the child_process object as 
	 * ChildProcess.stdio[fd]. Pipes created for fds 0 - 2 are also available as ChildProcess.stdin, 
	 * ChildProcess.stdout and ChildProcess.stderr, respectively.
	 * <li>'ipc' - Create an IPC channel for passing messages/file descriptors between parent 
	 * and child. A ChildProcess may have at most one IPC stdio file descriptor. Setting this 
	 * option enables the ChildProcess.send() method. If the child writes JSON messages to 
	 * this file descriptor, then this will trigger ChildProcess.on('message'). If the child 
	 * is a Node.js program, then the presence of an IPC channel will enable process.send() 
	 * and process.on('message').
	 * <li>'ignore' - Do not set this file descriptor in the child. Note that Node will always 
	 * open fd 0 - 2 for the processes it spawns. When any of these is ignored node will 
	 * open /dev/null and attach it to the child's fd.
	 * <li>Stream object - Share a readable or writable stream that refers to a tty, file, 
	 * socket, or a pipe with the child process. The stream's underlying file descriptor 
	 * is duplicated in the child process to the fd that corresponds to the index in the 
	 * stdio array.
	 * <li>Positive integer - The integer value is interpreted as a file descriptor that is
	 * currently open in the parent process. It is shared with the child process, similar 
	 * to how Stream objects can be shared.
	 * <li>null, undefined - Use default value. For stdio fds 0, 1 and 2 (in other words, 
	 * stdin, stdout, and stderr) a pipe is created. For fd 3 and up, the default is 'ignore'.
	 * </ol>
	 * As a shorthand, the stdio argument may also be one of the following strings, rather 
	 * than an array:
	 * <ul>
	 * <li>ignore - ['ignore', 'ignore', 'ignore']
	 * <li>pipe - ['pipe', 'pipe', 'pipe']
	 * <li>inherit - [process.stdin, process.stdout, process.stderr] or [0,1,2]
	 * </ul>
	 * Example:
	 * <pre>
	 * var spawn = require('child_process').spawn;
	 * 
	 * // Child will use parent's stdios
	 * spawn('prg', [], { stdio: 'inherit' });
	 * 
	 * // Spawn child sharing only stderr
	 * spawn('prg', [], { stdio: ['pipe', 'pipe', process.stderr] });
	 * 
	 * // Open an extra fd=4, to interact with programs present a
	 * // startd-style interface.
	 * spawn('prg', [], { stdio: ['pipe', null, null, null, 'pipe'] });
	 * </pre>
	 * If the detached option is set, the child process will be made the leader of a new 
	 * process group. This makes it possible for the child to continue running after the 
	 * parent exits.
	 * </pre>
	 * By default, the parent will wait for the detached child to exit. To prevent the 
	 * parent from waiting for a given child, use the child.unref() method, and the parent's 
	 * event loop will not include the child in its reference count.
	 * <p>
	 * Example of detaching a long-running process and redirecting its output to a file:
	 * <pre>
	 * var fs = require('fs'),
	 *     spawn = require('child_process').spawn,
	 *     out = fs.openSync('./out.log', 'a'),
	 *     err = fs.openSync('./out.log', 'a');
	 * var child = spawn('prg', [], {
	 *   detached: true,
	 *   stdio: [ 'ignore', out, err ]
	 * });
	 * 
	 * child.unref();
	 * </pre>
	 * When using the detached option to start a long-running process, the process will 
	 * not stay running in the background unless it is provided with a stdio configuration 
	 * that is not connected to the parent. If the parent's stdio is inherited, the child 
	 * will remain attached to the controlling terminal.
	 * <p>
	 * There is a deprecated option called customFds which allows one to specify specific 
	 * file descriptors for the stdio of the child process. This API was not portable to 
	 * all platforms and therefore removed. With customFds it was possible to hook up the 
	 * new process' [stdin, stdout, stderr] to existing streams; -1 meant that a new stream 
	 * should be created. Use at your own risk.
	 * <p>
	 * There are several internal options. In particular stdinStream, stdoutStream, 
	 * stderrStream. They are for INTERNAL USE ONLY. As with all undocumented APIs in Node, 
	 * they should not be used.
	 * <p>
	 * See also: child_process.exec() and child_process.fork()
	 */
	//> public child_process.ChildProcess spawn(String command, String[]? args, child_process.data.spawnOptions? options)
	spawn: vjo.NEEDS_IMPL,
	
	/**
	 * <ul>
	 * <li>command String The command to run, with space-separated arguments
	 * <li>options Object
	 *   <ul>
	 *   <li>cwd String Current working directory of the child process
	 *   <li>stdio Array|String Child's stdio configuration. (See above)
	 *   <li>customFds Array Deprecated File descriptors for the child to use for stdio. (See above)
	 *   <li>env Object Environment key-value pairs
	 *   <li>encoding String (Default: 'utf8')
	 *   <li>timeout Number (Default: 0)
	 *   <li>maxBuffer Number (Default: 200*1024)
	 *   <li>killSignal String (Default: 'SIGTERM')
	 *   </ul>
	 * <li>callback Function called with the output when process terminates
	 *   <ul>
	 *   <li>error Error
	 *   <li>stdout Buffer
	 *   <li>stderr Buffer
	 *   </ul>
	 * <li>Return: ChildProcess object
	 * </ul>
	 * <p>
	 * Runs a command in a shell and buffers the output.
	 * <pre>
	 * var exec = require('child_process').exec, child;
	 * child = exec('cat *.js bad_file | wc -l',
	 *   function (error, stdout, stderr) {
	 *     console.log('stdout: ' + stdout);
	 *     console.log('stderr: ' + stderr);
	 *     if (error !== null) {
	 *       console.log('exec error: ' + error);
	 *     }
	 *   }
	 * );
	 * </pre>
	 * The callback gets the arguments (error, stdout, stderr). On success, error will be 
	 * null. On error, error will be an instance of Error and err.code will be the exit 
	 * code of the child process, and err.signal will be set to the signal that terminated 
	 * the process.
	 * <p>
	 * There is a second optional argument to specify several options. The default options are
	 * <pre>
	 * { encoding: 'utf8',
	 *   timeout: 0,
	 *   maxBuffer: 200*1024,
	 *   killSignal: 'SIGTERM',
	 *   cwd: null,
	 *   env: null }
	 * </pre>
	 * If timeout is greater than 0, then it will kill the child process if it runs longer 
	 * than timeout milliseconds. The child process is killed with killSignal 
	 * (default: 'SIGTERM'). maxBuffer specifies the largest amount of data allowed on 
	 * stdout or stderr - if this value is exceeded then the child process is killed.
	 */
	//> public child_process.ChildProcess exec(String command, child_process.func:execCallback callback)
	//> public child_process.ChildProcess exec(String command, child_process.data.execOptions? options, child_process.func:execCallback? callback)
	exec: vjo.NEEDS_IMPL,
	
	/**
	 * <ul>
	 * <li>file String The filename of the program to run
	 * <li>args Array List of string arguments
	 * <li>options Object
	 *   <ul>
	 *   <li>cwd String Current working directory of the child process
	 *   <li>stdio Array|String Child's stdio configuration. (See above)
	 *   <li>customFds Array Deprecated File descriptors for the child to use for stdio. (See above)
	 *   <li>env Object Environment key-value pairs
	 *   <li>encoding String (Default: 'utf8')
	 *   <li>timeout Number (Default: 0)
	 *   <li>maxBuffer Number (Default: 200*1024)
	 *   <li>killSignal String (Default: 'SIGTERM')
	 *   </ul>
	 * <li>callback Function called with the output when process terminates
	 *   <ul>
	 *   <li>error Error
	 *   <li>stdout Buffer
	 *   <li>stderr Buffer
	 *   </ul>
	 * <li>Return: ChildProcess object
	 * </ul>
	 * This is similar to child_process.exec() except it does not execute a subshell but 
	 * rather the specified file directly. This makes it slightly leaner than 
	 * child_process.exec. It has the same options.
	 */
	//> public void execFile(String file, String[]? args, child_process.data.execOptions? options, child_process.func:execCallback? callback)
	execFile: vjo.NEEDS_IMPL,
	
	/**
	 * <ul>
	 * <li>modulePath String The module to run in the child
	 * <li>args Array List of string arguments
	 * <li>options Object
	 *   <ul>
	 *   <li>cwd String Current working directory of the child process
	 *   <li>env Object Environment key-value pairs
	 *   <li>encoding String (Default: 'utf8')
	 *   </ul>
	 * <li>Return: ChildProcess object
	 * </ul>
	 * This is a special case of the spawn() functionality for spawning Node processes. In 
	 * addition to having all the methods in a normal ChildProcess instance, the returned 
	 * object has a communication channel built-in. See child.send(message, [sendHandle]) 
	 * for details.
	 * <p>
	 * By default the spawned Node process will have the stdout, stderr associated with the 
	 * parent's. To change this behavior set the silent property in the options object to 
	 * true.
	 * <p>
	 * The child process does not automatically exit once it's done, you need to call 
	 * process.exit() explicitly. This limitation may be lifted in the future.
	 * <p>
	 * These child Nodes are still whole new instances of V8. Assume at least 30ms startup 
	 * and 10mb memory for each new Node. That is, you cannot create many thousands of them.
	 */
	//> public child_process.ChildProcess fork(String modulePath, String[]? args, child_process.data.forkOptions? options)
	fork: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();