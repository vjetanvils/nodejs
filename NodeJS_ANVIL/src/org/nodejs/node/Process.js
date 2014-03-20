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
 * The process object is a global object and can be accessed from anywhere. It is an 
 * instance of EventEmitter.
 */
vjo.ctype('org.nodejs.node.Process') //< public
//< needs(org.nodejs.stream.Readable)
//< needs(org.nodejs.stream.Writable)
.inherits('org.nodejs.events.EventEmitter')
.props({
	data: vjo.otype().defs({ //< public
		/**
		 * 
		 */
		versions: { 		//< public
			node: null,		//< public String
			v8: null,		//< public String
			ares: null,		//< public String
			ev: null,		//< public String
			openssl: null	//< public String
		},
		
		/**
		 * Mixed bag from the various properties from environ(7) from diff OS's
		 */
		env: {  //< public
			/**
			 * The name of the logged-in user (used by some BSD-derived programs).
			 */
			USER: null, //< public String?

			/**
			 * The pathname of the user's login shell.
			 */
			SHELL: null, 	//< public String?
				 
			TMPDIR: null,	//< public String?
			DISPLAY: null,	//< public String?
			SHLVL: null,	//< public String?
			SECURITYSESSIONID: null, //< public String?
			PORT: null,		//< public int?
	
			/**
			 * The name of the logged-in user (used by some System-V derived programs).
			 */
			LOGNAME: null, //< public String?
			
			/**
			 * A user's login directory, set by login(1) from the password file passwd(5).
			 */
			HOME: null, 	//< public String?
			
			/**
			 * The name of a locale to use for locale categories when not overridden
			 * by LC_ALL or more specific environment variables like LC_COLLATE,
			 * LC_CTYPE, LC_MESSAGES, LC_MONETARY, LC_NUMERIC, LC_TIME, cf.
			 * locale(5).
			 */
			LANG: null, 	//< public String?

			/**
			 * The sequence of directory prefixes that sh(1) and many other programs
			 * apply in searching for a file known by an incomplete pathname.  The
			 * prefixes are separated by ':'.  (Similarly one has CDPATH used by some
			 * shells to find the target of a change directory command, MANPATH used
			 * by man(1) to find manual pages, etc.)
			 */
			PATH: null, 	//< public String?

			/**
			 * The current working directory.  Set by some shells.
			 */
			PWD: null,		//< public String?
			


			/**
			 * The terminal type for which output is to be prepared.
			 */
			TERM: null,		//< public String?
			
			/**
			 * The user's preferred utility to display text files.
			 */
			PAGER: null,	//< public String?
			
			/**
			 * The user's preferred utility to edit text files.
			 */
			EDITOR: null	//< public String?
		},
		
		/**
		 * 
		 */
		//> public
		memoryUsage: {		//< public
			/**
			 * 
			 */
			rss: null,		//< public Number		

			/**
			 * V8'2 memory usage
			 */
			heapTotal: null,	//< public Number	
			
			/**
			 * V8's memory usage
			 */
			heapUsed: null		//< public Number	
		}
	}).endType(),
	
	event: vjo.otype().defs({  //< public
		/**
		 * function () {}
		 * <p>Emitted when the process is about to exit. This is a good hook to 
		 * perform constant time checks of the module's state (like for unit 
		 * tests). The main event loop will no longer be run after the 'exit' 
		 * callback finishes, so timers may not be scheduled.
		 * <p>Example of listening for exit:
		 * <pre>
		 * process.on('exit', function () {
		 *   process.nextTick(function () {
		 *     console.log('This will not run');
		 *   });
		 *   console.log('About to exit.');
		 * });
		 * </pre>
		 */
		//> public void exit()
		exit: vjo.NEEDS_IMPL,
		
		/**
		 * function (err) { }
		 * <p>Emitted when an exception bubbles all the way back to the event 
		 * loop. If a listener is added for this exception, the default action 
		 * (which is to print a stack trace and exit) will not occur.
		 * <p>Example of listening for uncaughtException:
		 * <pre>
		 * process.on('uncaughtException', function (err) {
		 *   console.log('Caught exception: ' + err);
		 * });
		 * setTimeout(
		 *   function () { 
		 *     console.log('This will still run.'); 
		 *   }, 500
		 * );
		 * 
		 * // Intentionally cause an exception, but don't catch it.
		 * nonexistentFunc();
		 * console.log('This will not run.');
		 * </pre>
		 * Note that uncaughtException is a very crude mechanism for exception 
		 * handling. Using try / catch in your program will give you more control 
		 * over your program's flow. Especially for server programs that are 
		 * designed to stay running forever, uncaughtException can be a useful 
		 * safety mechanism.
		 */
		//> public void uncaughtException(Error? err)
		uncaughtException: vjo.NEEDS_IMPL,
	
// TODO: MrP - do we need to enumerate all the POSIX signals?  Perhaps, but there are 1.0/1.1
// flavors and platforms to worry about...  I don't think that there are different callback
// values so there's really not function() specific args that we need to bind to that signal name.
		/**
		 * function () {}
		 * <p>Emitted when the processes receives a signal. See sigaction(2) 
		 * for a list of standard POSIX signal names such as SIGINT, SIGUSR1, etc.
		 * <p>Example of listening for SIGINT:
		 * <pre>
		 * var stdin = process.openStdin();
		 * process.on('SIGINT', function () {
		 *   console.log('Got SIGINT.  Press Control-D to exit.');
		 * });
		 * </pre>
		 * An easy way to send the SIGINT signal is with Control-C in most 
		 * terminal programs.
		 * <pre>
		 *      SIGHUP          terminate process       terminal line hangup
		 *      SIGINT          terminate process       interrupt program
		 *      SIGQUIT         create core image       quit program
		 *      SIGILL          create core image       illegal instruction
		 *      SIGTRAP         create core image       trace trap
		 *      SIGABRT         create core image       abort(3) call (formerly SIGIOT)
		 *      SIGEMT          create core image       emulate instruction executed
		 *      SIGFPE          create core image       floating-point exception
		 *      SIGKILL         terminate process       kill program
		 *      SIGBUS          create core image       bus error
		 *      SIGSEGV         create core image       segmentation violation
		 *      SIGSYS          create core image       non-existent system call invoked
		 *      SIGPIPE         terminate process       write on a pipe with no reader
		 *      SIGALRM         terminate process       real-time timer expired
		 *      SIGTERM         terminate process       software termination signal
		 *      SIGURG          discard signal          urgent condition present on socket
		 *      SIGSTOP         stop process            stop (cannot be caught orignored)
		 *      SIGTSTP         stop process            stop signal generated from keyboard
		 *      SIGCONT         discard signal          continue after stop
		 *      SIGCHLD         discard signal          child status has changed
		 *      SIGTTIN         stop process            background read attempted from control terminal
		 *      SIGTTOU         stop process            background write attempted to control terminal
		 *      SIGIO           discard signal          I/O is possible on a descriptor (see fcntl(2))
		 *      SIGXCPU         terminate process       cpu time limit exceeded (see setrlimit(2))
		 *      SIGXFSZ         terminate process       file size limit exceeded (see setrlimit(2))
		 *      SIGVTALRM       terminate process       virtual time alarm (see setitimer(2))
		 *      SIGPROF         terminate process       profiling timer alarm (see setitimer(2))
		 *      SIGWINCH        discard signal          Window size change
		 *      SIGINFO         discard signal          status request from keyboard
		 *      SIGUSR1         terminate process       User defined signal 1
		 *      SIGUSR2         terminate process       User defined signal 2
		 * </pre>
		 */
		/** terminal line hangup */
		//> public void SIGHUP()
		SIGHUP: vjo.NEEDS_IMPL,
		
		/** interrupt program */
		//> public void SIGINT()
		SIGINT: vjo.NEEDS_IMPL,
		
		/** quit program */
		//> public void SIGQUIT()
		SIGQUIT: vjo.NEEDS_IMPL,
		
		/** illegal instruction */
		//> public void SIGILL()
		SIGILL: vjo.NEEDS_IMPL,
		
		/** trace trap */
		//> public void SIGTRAP()
		SIGTRAP: vjo.NEEDS_IMPL,
		
		/** abort(3) call (formerly SIGIOT) */
		//> public void SIGABRT()
		SIGABRT: vjo.NEEDS_IMPL,
		
		/** emulate instruction executed */
		//> public void SIGEMT()
		SIGEMT: vjo.NEEDS_IMPL,
		
		/** floating-point exception */
		//> public void SIGFPE()
		SIGFPE: vjo.NEEDS_IMPL,
		
		/** kill program */
		//> public void SIGKILL()
		SIGKILL: vjo.NEEDS_IMPL,
		
		/** bus error */
		//> public void SIGBUS()
		SIGBUS: vjo.NEEDS_IMPL,
		
		/** segmentation violation */
		//> public void SIGSEGV()
		SIGSEGV: vjo.NEEDS_IMPL,
		
		/** non-existent system call invoked */
		//> public void SIGSYS()
		SIGSYS: vjo.NEEDS_IMPL,
		
		/** write on a pipe with no reader */
		//> public void SIGPIPE()
		SIGPIPE: vjo.NEEDS_IMPL,
		
		/** real-time timer expired */
		//> public void SIGALRM()
		SIGALRM: vjo.NEEDS_IMPL,
		
		/** software termination signal */
		//> public void SIGTERM()
		SIGTERM: vjo.NEEDS_IMPL,
		
		/** urgent condition present on socket */
		//> public void SIGURG()
		SIGURG: vjo.NEEDS_IMPL,
		
		/** stop (cannot be caught or ignored) */
		//> public void SIGSTOP()
		SIGSTOP: vjo.NEEDS_IMPL,
		
		/** stop signal generated from keyboard */
		//> public void SIGTSTP()
		SIGTSTP: vjo.NEEDS_IMPL,
		
		/** continue after stop */
		//> public void SIGCONT()
		SIGCONT: vjo.NEEDS_IMPL,
		
		/** child status has changed */
		//> public void SIGCHLD()
		SIGCHLD: vjo.NEEDS_IMPL,
		
		/** background read attempted from control terminal */
		//> public void SIGTTIN()
		SIGTTIN: vjo.NEEDS_IMPL,
		
		/** background write attempted to control terminal */
		//> public void SIGTTOU()
		SIGTTOU: vjo.NEEDS_IMPL,
		
		/** I/O is possible on a descriptor (see fcntl(2)) */
		//> public void SIGIO()
		SIGIO: vjo.NEEDS_IMPL,
		
		/** cpu time limit exceeded (see setrlimit(2)) */
		//> public void SIGXCPU()
		SIGXCPU: vjo.NEEDS_IMPL,
		
		/** file size limit exceeded (see setrlimit(2)) */
		//> public void SIGXFSZ()
		SIGXFSZ: vjo.NEEDS_IMPL,
		
		/** virtual time alarm (see setitimer(2)) */
		//> public void SIGVTALRM()
		SIGVTALRM: vjo.NEEDS_IMPL,
		
		/** profiling timer alarm (see setitimer(2)) */

		//> public void SIGPROF()
		SIGPROF: vjo.NEEDS_IMPL,
		
		/** Window size change */
		//> public void SIGWINCH()
		SIGWINCH: vjo.NEEDS_IMPL,
		
		/** status request from keyboard */
		//> public void SIGINFO()
		SIGINFO: vjo.NEEDS_IMPL,
		
		/** User defined signal 1 */
		//> public void SIGUSR1()
		SIGUSR1: vjo.NEEDS_IMPL,
		
		/** User defined signal 2 */
		//> public void SIGUSR2()
		SIGUSR2: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	/**
	 * A Writable Stream to stdout.
	 * <p>
	 * Example: the definition of console.log
	 * <pre>
	 * console.log = function (d) {
	 *   process.stdout.write(d + '\n');
	 * };
	 * </pre>
	 * process.stderr and process.stdout are unlike other streams in Node in that 
	 * writes to them are usually blocking. They are blocking in the case that 
	 * they refer to regular files or TTY file descriptors. In the case they refer 
	 * to pipes, they are non-blocking like other streams.
	 */
	//> public Writable
	stdout: null,	
	
	/**
	 * A writable stream to stderr.
	 * <p>
	 * process.stderr and process.stdout are unlike other streams in Node in that 
	 * writes to them are usually blocking. They are blocking in the case that they 
	 * refer to regular files or TTY file descriptors. In the case they refer to 
	 * pipes, they are non-blocking like other streams.
	 */
	//> public Writable
	stderr: null,
	
	/**
	 * A Readable Stream for stdin. The stdin stream is paused by default, so one 
	 * must call process.stdin.resume() to read from it.
	 * <p>
	 * Example of opening standard input and listening for both events:
	 * <pre>
	 * process.stdin.resume();
	 * process.stdin.setEncoding('utf8');
	 * 
	 * process.stdin.on('data', function (chunk) {
	 *   process.stdout.write('data: ' + chunk);
	 * });
	 * 
	 * process.stdin.on('end', function () {
	 *   process.stdout.write('end');
	 * });
	 * </pre>
	 */
	//> public Readable
	stdin: null,	
		
	/**
	 * An array containing the command line arguments. The first element will be 'node', the 
	 * second element will be the name of the JavaScript file. The next elements will be any 
	 * additional command line arguments.
	 * <pre>
	 * // print process.argv
	 * process.argv.forEach(function (val, index, array) {
	 *   console.log(index + ': ' + val);
	 * });
	 * </pre>
	 * This will generate:
	 * <pre>
	 * $ node process-2.js one two=three four
	 * 0: node
	 * 1: /Users/mjr/work/node/process-2.js
	 * 2: one
	 * 3: two=three
	 * 4: four
	 * </pre>
	 */
	//> public String[]
	argv: null,	
	
			/**
	 * An array containing the command line arguments. The first element will be 'node', the 
	 * second element will be the name of the JavaScript file. The next elements will be any 
	 * additional command line arguments.
	 * <pre>
	 * // print process.argv
	 * process.argv.forEach(function (val, index, array) {
	 *   console.log(index + ': ' + val);
	 * });
	 * </pre>
	 * This will generate:
	 * <pre>
	 * $ node process-2.js one two=three four
	 * 0: node
	 * 1: /Users/mjr/work/node/process-2.js
	 * 2: one
	 * 3: two=three
	 * 4: four
	 * </pre>
	 */
	//> public String[]
	ARGV: null,	

	/**
	 * This is the absolute pathname of the executable that started the process.
	 * <p>
	 * Example:
	 * <pre>
	 * /usr/local/bin/node
	 * </pre>
	 */
	//> public String
	execPath: null,	

	/**
	 * This causes node to emit an abort. This will cause node to exit and generate a core 
	 * file.
	 */
	//> public int abort()
	abort: vjo.NEEDS_IMPL,	

	/**
	 * Changes the current working directory of the process or throws an exception if that 
	 * fails.
	 * <pre>
	 * console.log('Starting directory: ' + process.cwd());
	 * try {
	 *   process.chdir('/tmp');
	 *   console.log('New directory: ' + process.cwd());
	 * }
	 * catch (err) {
	 *   console.log('chdir: ' + err);
	 * }
	 * </pre>
	 */
	//> public void chdir(String directory)
	chdir: vjo.NEEDS_IMPL,
					
	/**
	 * Returns the current working directory of the process.
	 * <pre>
	 * console.log('Current directory: ' + process.cwd());
	 * </pre>
	 */
	//> public String cwd()
	cwd: vjo.NEEDS_IMPL,
		
	/**
	 * An object containing the user environment. See environ(7).
	 */
	//> public Process.data.env
	env: null,	
	
	/**
	 * Ends the process with the specified code. If omitted, exit uses the 'success' 
	 * code 0.
	 * <p>
	 * To exit with a 'failure' code:
	 * <pre>
	 * process.exit(1);
	 * </pre>
	 * The shell that executed node should see the exit code as 1.
	 */
	//> public void exit(int? code)
	exit: vjo.NEEDS_IMPL,
	
	/**
	 * Note: this function is only available on POSIX platforms (i.e. not Windows)
	 * <p>
	 * Gets the group identity of the process. (See getgid(2).) This is the numerical 
	 * group id, not the group name.
	 * <pre>
	 * if (process.getgid) {
	 *   console.log('Current gid: ' + process.getgid());
	 * }
	 * </pre>
	 */
	//> public int getgid()
	getgid: vjo.NEEDS_IMPL,
	
	/**
	 * Note: this function is only available on POSIX platforms (i.e. not Windows)
	 * <p>
	 * Sets the group identity of the process. (See setgid(2).) This accepts either 
	 * a numerical ID or a groupname string. If a groupname is specified, this method 
	 * blocks while resolving it to a numerical ID.
	 * <pre>
	 * if (process.getgid && process.setgid) {
	 *   console.log('Current gid: ' + process.getgid());
	 *   try {
	 *     process.setgid(501);
	 *     console.log('New gid: ' + process.getgid());
	 *   }
	 *   catch (err) {
	 *     console.log('Failed to set gid: ' + err);
	 *   }
	 * }
	 * </pre>
	 */
	//> public void setgid({int | String} id)
	setgid: vjo.NEEDS_IMPL,
	
	/**
	 * Note: this function is only available on POSIX platforms (i.e. not Windows)
	 * <p>
	 * Gets the user identity of the process. (See getuid(2).) This is the numerical 
	 * userid, not the username.
	 * <pre>
	 * if (process.getuid) {
	 *   console.log('Current uid: ' + process.getuid());
	 * }
	 * </pre>
	 */
	//> public int getuid()
	getuid: vjo.NEEDS_IMPL,
	
	/**
	 * Note: this function is only available on POSIX platforms (i.e. not Windows)
	 * <p>
	 * Sets the user identity of the process. (See setuid(2).) This accepts either 
	 * a numerical ID or a username string. If a username is specified, this method 
	 * blocks while resolving it to a numerical ID.
	 * <pre>
	 * if (process.getuid && process.setuid) {
	 *   console.log('Current uid: ' + process.getuid());
	 *   try {
	 *     process.setuid(501);
	 *     console.log('New uid: ' + process.getuid());
	 *   }
	 *   catch (err) {
	 *     console.log('Failed to set uid: ' + err);
	 *   }
	 * }
	 * </pre>
	 */
	//> public void setuid({int | String} id)
	setuid: vjo.NEEDS_IMPL,
	
	/**
	 * Note: this function is only available on POSIX platforms (i.e. not Windows)
	 * <p>
	 * Returns an array with the supplementary group IDs. POSIX leaves it unspecified if 
	 * the effective group ID is included but node.js ensures it always is.
	 */
	//> public Array getgroups()
	getgroups: vjo.NEEDS_IMPL,
	
	/**
	 * Note: this function is only available on POSIX platforms (i.e. not Windows)
	 * <p>
	 * Sets the supplementary group IDs. This is a privileged operation, meaning you need 
	 * to be root or have the CAP_SETGID capability.
	 * <p>
	 * The list can contain group IDs, group names or both.
	 */
	//> public void setgroups(Array array)
	setgroups: vjo.NEEDS_IMPL,
	
	/**
	 * Note: this function is only available on POSIX platforms (i.e. not Windows)
	 * <p>
	 * Reads /etc/group and initializes the group access list, using all groups of which 
	 * the user is a member. This is a privileged operation, meaning you need to be root 
	 * or have the CAP_SETGID capability.
	 * <p>
	 * user is a user name or user ID. extra_group is a group name or group ID.
	 * <p>
	 * Some care needs to be taken when dropping privileges. Example:
	 * <pre>
	 * console.log(process.getgroups());         // [ 0 ]
	 * process.initgroups('bnoordhuis', 1000);   // switch user
	 * console.log(process.getgroups());         // [ 27, 30, 46, 1000, 0 ]
	 * process.setgid(1000);                     // drop root gid
	 * console.log(process.getgroups());         // [ 27, 30, 46, 1000 ]
	 * </pre>
	 */
	//> public void initgroups(String user, int extra_group)
	initgroups: vjo.NEEDS_IMPL,
	
	/**
	 * A compiled-in property that exposes NODE_VERSION.
	 * <pre>
	 * console.log('Version: ' + process.version);
	 * </pre>
	 */
	//> public final String
	version: '',	
	
	/**
	 * A property exposing version strings of node and its dependencies.
	 * <pre>
	 * console.log(process.versions);
	 * </pre>
	 * Will output:
	 * <pre>
	 * { node: '0.4.12',
	 *   v8: '3.1.8.26',
	 *   ares: '1.7.4',
	 *   ev: '4.4',
	 *   openssl: '1.0.0e-fips' 
	 * }
	 * </pre>
	 */
	//> public Process.data.versions 
	versions: null,	
	
	/**
	 * An Object containing the JavaScript representation of the configure options 
	 * that were used to compile the current node executable. This is the same as 
	 * the "config.gypi" file that was produced when running the ./configure script.
	 * <p>
	 * An example of the possible output looks like:
	 * <pre>
	 * { target_defaults:
	 *   { cflags: [],
	 *   default_configuration: 'Release',
	 *   defines: [],
	 *   include_dirs: [],
	 *   libraries: [] },
	 * variables: {
	 *     host_arch: 'x64',
	 *     node_install_npm: 'true',
	 *     node_install_waf: 'true',
	 *     node_prefix: '',
	 *     node_shared_v8: 'false',
	 *     node_shared_zlib: 'false',
	 *     node_use_dtrace: 'false',
	 *     node_use_openssl: 'true',
	 *     node_shared_openssl: 'false',
	 *     strict_aliasing: 'true',
	 *     target_arch: 'x64',
	 *     v8_use_snapshot: 'true' 
	 *   } 
	 * }
	 * </pre>
	 */
	//> public Object ; // TODO: MrP - describe this?
	config: null,
	
	/**
	 * Send a signal to a process. pid is the process id and signal is the string 
	 * describing the signal to send. Signal names are strings like 'SIGINT' or 
	 * 'SIGUSR1'. If omitted, the signal will be 'SIGTERM'. See kill(2) for more 
	 * information.
	 * <p>
	 * Note that just because the name of this function is process.kill, it is really 
	 * just a signal sender, like the kill system call. The signal sent may do 
	 * something other than kill the target process.
	 * <p>
	 * Example of sending a signal to yourself:
	 * <pre>
	 * process.on('SIGHUP', function () {
	 *   console.log('Got SIGHUP signal.');
	 * });
	 * 
	 * setTimeout(function () {
	 *   console.log('Exiting.');
	 *   process.exit(0);
	 * }, 100);
	 * 
	 * process.kill(process.pid, 'SIGHUP');
	 * </pre>
	 */
	//> public void kill(String pid, String? signal)
	kill: vjo.NEEDS_IMPL,				

	/**
	 * The PID of the process.
	 * <p>
	 * console.log('This process is pid ' + process.pid);
	 */
	//> public String
	pid: null,	
	
	/**
	 * Getter/setter to set what is displayed in 'ps'.
	 */
	//> public String
	title: null,				

	/**
	 * What processor architecture you're running on: 'arm', 'ia32', or 'x64'.
	 * <pre>
	 * console.log('This processor architecture is ' + process.arch);
	 * </pre>
	 */
	//> public String
	arch: null,

	/**
	 * What platform you're running on: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
	 * <pre>
	 * console.log('This platform is ' + process.platform);
	 * </pre>
	 */
	//> public String
	platform: null,	

	/**
	 * Returns an object describing the memory usage of the Node process measured 
	 * in bytes.
	 * <pre>
	 * var util = require('util');
	 * console.log(util.inspect(process.memoryUsage()));
	 * <pre>
	 * This will generate:
	 * <pre>
	 * { rss: 4935680,
	 *   heapTotal: 1826816,
	 *   heapUsed: 650472 }
	 * </pre>
	 * heapTotal and heapUsed refer to V8's memory usage.
	 */
	//> public node.Process.data.memoryUsage memoryUsage()
	memoryUsage: vjo.NEEDS_IMPL,
	
	/**
	 * On the next loop around the event loop call this callback. This is not a 
	 * simple alias to setTimeout(fn, 0), it's much more efficient.
	 * <pre>
	 * process.nextTick(function () {
	 *   console.log('nextTick callback');
	 * });
	 */
	//> public void nextTick(Function callback)
	nextTick: vjo.NEEDS_IMPL,
	
	/**
	 * Default = 1000
	 * <p>
	 * Callbacks passed to process.nextTick will usually be called at the end of the current 
	 * flow of execution, and are thus approximately as fast as calling a function synchronously. 
	 * Left unchecked, this would starve the event loop, preventing any I/O from occurring.
	 * <p>
	 * Consider this code:
	 * <pre>
	 * process.nextTick(function foo() {
	 *   process.nextTick(foo);
	 * });
	 * </pre>
	 * In order to avoid the situation where Node is blocked by an infinite loop of recursive 
	 * series of nextTick calls, it defers to allow some I/O to be done every so often.
	 * <p>
	 * The process.maxTickDepth value is the maximum depth of nextTick-calling nextTick-callbacks 
	 * that will be evaluated before allowing other forms of I/O to occur.
	 */
	maxTickDepth: null,
	
	/**
	 * Sets or reads the process's file mode creation mask. Child processes inherit 
	 * the mask from the parent process. Returns the old mask if mask argument is 
	 * given, otherwise returns the current mask.
	 * <pre>
	 * var oldmask, newmask = 0644;
	 * oldmask = process.umask(newmask);
	 * console.log('Changed umask from: ' + oldmask.toString(8) + to ' + newmask.toString(8));
	 * </pre>
	 */
	//> public int umask(int? mask)
	umask: vjo.NEEDS_IMPL,
	
	/**
	 * Number of seconds Node has been running.
	 */
	//> public Number uptime()
	uptime: vjo.NEEDS_IMPL, 
	
	/**
	 * Returns the current high-resolution real time in a [seconds, nanoseconds] tuple 
	 * Array. It is relative to an arbitrary time in the past. It is not related to the 
	 * time of day and therefore not subject to clock drift. The primary use is for measuring 
	 * performance between intervals.
	 * <p>
	 * You may pass in the result of a previous call to process.hrtime() to get a diff 
	 * reading, useful for benchmarks and measuring intervals:
	 * <pre>
	 * var time = process.hrtime();
	 * // [ 1800216, 25 ]
	 * 
	 * setTimeout(function () {
	 *   var diff = process.hrtime(time);
	 *   // [ 1, 552 ]
	 *   
	 *   console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
	 *   // benchmark took 1000000527 nanoseconds
	 * }, 1000);
	 * </pre>
	 */
	//> public long[ ] hrtime()
	hrtime: vjo.NEEDS_IMPL,
	
	//------------------------------------------------------------------------------------
	// EventEmitter overrides to return correct type so you can use chain-style functions.
	// *** NOTE *** Do not modify these separately as they are literally copied from the
	// org.nodejs.events.EventEmitter type.  Later when we have a way to return the target
	// type of a mixin will allow us to factor all this copying away...
	//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
		/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Process ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Process ^on(String type, Function listener)
	on: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a one time listener for the event. This listener is invoked only the 
	 * next time the event is fired, after which it is removed.
	 * <pre>
	 * server.once('connection', function (stream) {
	 *   console.log('Ah, we have our first user!');
	 * });
	 * </pre>
	 */
	//> public Process ^once(String event, Function listener)
	once: vjo.NEEDS_IMPL,
	
	/**
	 * Remove a listener from the listener array for the specified event. 
	 * <p>
	 * Caution: changes array indices in the listener array behind the listener.
	 * <pre>
	 * var callback = function(stream) {
	 *   console.log('someone connected!');
	 * };
	 * server.on('connection', callback);
	 * // ...
	 * server.removeListener('connection', callback);
	 * </pre>
	 */
	//> public Process removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Process removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()