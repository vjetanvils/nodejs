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
 * Stability: 4 - API Frozen
 * <p>
 * Provides a few basic operating-system related utility functions.
 * <p>
 * Use require('os') to access this module.
 */
vjo.ctype('org.nodejs.os') //< public
.props({
	//> public
	data: vjo.otype().defs({
		networkXfaceEntry:{	//< public			
			address: null, 	//< public String
			
			family: null,	//< public String

			interval: null	//< public boolean
		},	
		
		networkXfaceEntries: null, //< public networkXfaceEntry[]
	
		cpuTime: { 		//< public
			user: null,	//< public Number
			
			nice: null,	//< public Number
			
			sys: null,	//< public Number
			
			idle: null, //< public Number
			
			irq: null 	//< public Number	
		},

		cpu: {			//< public		
			model: null,//< public String	

			speed: null,//< public Number
			
			times: null	//< public cpuTime
		}
	}).endType()
})
.protos({ 
	/**
	 * Returns the operating system's default directory for temp files.
	 */
	//> public String tmpDir()
	tmpDir: vjo.NEEDS_IMPL,
	
	/** Returns the endianness of the CPU. Possible values are "BE" or "LE". */
	//> public String endianness()
	endianness: vjo.NEEDS_IMPL,
	
	/**
	 * Return the hostname of the operating system.
	 */
	//> public String hostname()
	hostname: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the operating system name.
	 */
	//> public String type()
	type: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the operating system platform.
	 */
	//> public String platform()
	platform: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the operating system CPU architecture.
	 */
	//> public String arch()
	arch: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the operating system release.
	 */
	//> public String release()
	release: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the system uptime in seconds.
	 */
	//> public Number uptime()
	uptime: vjo.NEEDS_IMPL,
	
	/**
	 * Returns an Array containing the 1, 5 and 15 minute load averages.
	 */
	//> public Number[] loadavg()
	loadavg: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the total amount of system memory in bytes.
	 */
	//> public Number totalmem()
	totalmem: vjo.NEEDS_IMPL,
	
	/**
	 * Returns the amount of free system member in bytes.
	 */
	//> public Number freemem()
	freemem: vjo.NEEDS_IMPL,
	
	/**
	 * Returns an array of objects containing information about each CPU/core installed: 
	 * model, speed (in MHz), and times (an object containing the number of CPU ticks spent 
	 * in: user, nice, sys, idle, and irq).
	 * <p> Example inspection of os.cpus:
	 * <pre>
	 * [ { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
	 *     speed: 2926,
	 *     times: { user: 252020, nice: 0, sys: 30340, idle: 1070356870, irq: 0 } 
	 *   },
	 *   { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
	 *     speed: 2926, times: { user: 306960, nice: 0, sys: 26980, idle: 1071569080, irq: 0 } 
	 *   },
	 *   { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
	 *     speed: 2926,
	 *     times: { user: 248450, nice: 0, sys: 21750, idle: 1070919370, irq: 0 } 
	 *   },
	 *   { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
	 *     speed: 2926,
	 *     times: { user: 256880, nice: 0, sys: 19430, idle: 1070905480, irq: 20 } 
	 *   },
	 *   { model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
	 *     speed: 2926,
	 *     times: { user: 511580, nice: 20, sys: 40900, idle: 1070842510, irq: 0 } 
	 *   }
	 * ]
    </pre>
	 */
	//> public org.nodejs.os.data.cpu[] cpus()
	cpus: vjo.NEEDS_IMPL,
	
	/**
	 * Get a list of network interfaces:
	 * <pre>
	 * { lo0: 
	 *   [ { address: '::1', family: 'IPv6', internal: true },
	 *     { address: 'fe80::1', family: 'IPv6', internal: true },
	 *     { address: '127.0.0.1', family: 'IPv4', internal: true } ],
	 *   en1: 
	 *   [ { address: 'fe80::cabc:c8ff:feef:f996', family: 'IPv6', internal: false },
	 *     { address: '10.0.1.123', family: 'IPv4', internal: false } ],
	 *   vmnet1: [ { address: '10.99.99.254', family: 'IPv4', internal: false } ],
	 *   vmnet8: [ { address: '10.88.88.1', family: 'IPv4', internal: false } ],
	 *   ppp0: [ { address: '10.2.0.231', family: 'IPv4', internal: false } ] 
	 * }
	 * </pre>
	 */
	//> public Object networkInterfaces() 
	networkInterfaces: vjo.NEEDS_IMPL,
	
	/**
	 * A constant defining the appropriate End-Of-Line marker for the operating system.
	 */
	//> public final String
	EOL: '' // TODO: MrP - should not have to give value for final member in a metatype
})
.options({ metatype: true })
.endType();