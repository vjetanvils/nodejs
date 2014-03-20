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
 * You can access this module with:
 * <pre>
 * var zlib = require('zlib');
 * </pre>
 * This provides bindings to Gzip/Gunzip, Deflate/Inflate, and DeflateRaw/InflateRaw 
 * classes. Each class takes the same options, and is a readable/writable Stream.
 * <h3>Memory Usage Tuning</h3>
 * From zlib/zconf.h, modified to node's usage:
 * <p>
 * The memory requirements for deflate are (in bytes):
 * <pre>
 * (1 << (windowBits+2)) +  (1 << (memLevel+9))
 * </pre>
 * that is: 128K for windowBits=15 + 128K for memLevel = 8 (default values) plus a few 
 * kilobytes for small objects.
 * <p>
 * For example, if you want to reduce the default memory requirements from 256K to 128K, 
 * set the options to:
 * <pre>
 * { windowBits: 14, memLevel: 7 }
 * </pre>
 * Of course this will generally degrade compression (there's no free lunch).
 * <p>
 * The memory requirements for inflate are (in bytes)
 * <pre>
 * 1 << windowBits
 * </pre>
 * that is, 32K for windowBits=15 (default value) plus a few kilobytes for small objects.
 * <p>
 * This is in addition to a single internal output slab buffer of size chunkSize, which 
 * defaults to 16K.
 * <p>
 * The speed of zlib compression is affected most dramatically by the level setting. A 
 * higher level will result in better compression, but will take longer to complete. A 
 * lower level will result in less compression, but will be much faster.
 * <p>
 * In general, greater memory usage options will mean that node has to make fewer calls to 
 * zlib, since it'll be able to process more data in a single write operation. So, this is 
 * another factor that affects the speed, at the cost of memory usage.
 * <p>
 * <h3>Convenience Methods</h3>
 * All of these take a string or buffer as the first argument, and call the supplied 
 * callback with callback(error, result). The compression/decompression engine is created 
 * using the default settings in all convenience methods. To supply different options, use 
 * the zlib classes directly.
 */
vjo.ctype('org.nodejs.zlib') //< public
//< needs(org.nodejs.buffer.Buffer)
.props({
	data: vjo.otype().defs({	//< public
		/**
		 * Each class takes an options object. All options are optional. (The convenience 
		 * methods use the default settings for all options.)
		 * <p>
		 * Note that some options are only relevant when compressing, and are ignored by 
		 * the decompression classes.
		 * <ul>
		 * <li>chunkSize (default: 16*1024)
		 * <li>windowBits
		 * <li>level (compression only)
		 * <li>memLevel (compression only)
		 * <li>strategy (compression only)
		 * <li>dictionary (deflate/inflate only, empty dictionary by default)
		 * </ul>
		 * See the description of deflateInit2 and inflateInit2 at 
		 * http://zlib.net/manual.html#Advanced for more information on these.
		 */
		options: {				//< public
			flush: null,		//< public int?
			/**
			 * default: 16*1024
			 */
			chunkSize: null,	//< public int?
			
			/**
			 * 
			 */
			windowBits: null,	//< public int?
			
			/**
			 * compression only
			 */
			level: null,		//< public int?
			
			/**
			 * compression only
			 */
			memLevel: null,		//< public int?
			
			/**
			 * compression only
			 */
			strategy: null,		//< public int?
			
			/**
			 * deflate/inflate only, empty dictionary by default
			 */
			dictionary: null	//< public Object?
		}			
	}).endType(),
	
	func: vjo.otype().defs({
		/**
		 * All of the convenience methods take this callback signature.
		 */
		//> public void callback(Error? err)
		callback: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	Gzip: 		null,	//< type::org.nodejs.zlib.Gzip
	Gunzip: 	null,	//< type::org.nodejs.zlib.Gunzip
	Deflate: 	null,	//< type::org.nodejs.zlib.Deflate
	Inflate: 	null,	//< type::org.nodejs.zlib.Inflate
	DeflateRaw: null,	//< type::org.nodejs.zlib.DeflateRaw
	InflateRaw: null,	//< type::org.nodejs.zlib.InflateRaw
	Unzip: 		null,	//< type::org.nodejs.zlib.Unzip
	
	/**
	 * Returns a new Gzip object with an options.
	 */
	createGzip: vjo.NEEDS_IMPL,			//< public zlib.Gzip createGzip(zlib.data.options? options)
	
	/**
	 * Returns a new Gunzip object with an options.
	 */
	createGunzip: vjo.NEEDS_IMPL,		//< public zlib.Gunzip createGzip(zlib.data.options? options)
	
	/**
	 * Returns a new Deflate object with an options.
	 */
	createDeflate: vjo.NEEDS_IMPL,		//< public zlib.Deflate createGzip(zlib.data.options? options)
	
	/**
	 * Returns a new Inflate object with an options.
	 */
	createInflate: vjo.NEEDS_IMPL,		//< public zlib.Inflate createGzip(zlib.data.options? options)
	
	/**
	 * Returns a new DeflateRaw object with an options.
	 */
	createDeflateRaw: vjo.NEEDS_IMPL,	//< public zlib.DefalteRaw createGzip(zlib.data.options? options)
	
	/**
	 * Returns a new InflateRaw object with an options.
	 */
	createInflateRaw: vjo.NEEDS_IMPL,	//< public zlib.InflateRaw createGzip(zlib.data.options? options)
	
	/**
	 * Returns a new Unzip object with an options.
	 */
	createUnzip: vjo.NEEDS_IMPL,		//< public zlib.Unzip createGzip(zlib.data.options? options)
	
	/**
	 * Compress a String or Buffer with Deflate.
	 */
	//> public void deflate({String | Buffer} buf, zlib.func:callback? callback)
	deflate: vjo.NEEDS_IMPL,
	
	/**
	 * Compress a String or Buffer with DeflateRaw.
	 */
	//> public void deflateRaw({String | Buffer} buf, zlib.func:callback? callback)
	deflateRaw: vjo.NEEDS_IMPL,
	
	/**
	 * Compress a String or Buffer with Gzip.
	 */
	//> public void gzip({String | Buffer} buf, zlib.func:callback? callback)
	gzip: vjo.NEEDS_IMPL,
	
	/**
	 * Decompress a raw String or Buffer with Gunzip.
	 */
	//> public void gunzip({String | Buffer} buf, zlib.func:callback? callback)
	gunzip: vjo.NEEDS_IMPL,
	
	/**
	 * Decompress a raw String or Buffer with Inflate.
	 */
	//> public void inflate({String | Buffer} buf, zlib.func:callback? callback)
	inflate: vjo.NEEDS_IMPL,
	
	/**
	 * Decompress a raw String or Buffer with InflateRaw.
	 */
	//> public void inflateRaw({String | Buffer} buf, zlib.func:callback? callback)
	inflateRaw: vjo.NEEDS_IMPL,
	
	/**
	 * Decompress a raw String or Buffer with Unzip.
	 */
	//> public void unzip({String | Buffer} buf, zlib.func:callback? callback)
	unzip: vjo.NEEDS_IMPL,
	
	//
	// Constants
	//
	Z_NO_FLUSH: 0,		//< public final int
	Z_PARTIAL_FLUSH: 1,	//< public final int
	Z_SYNC_FLUSH: 2,	//< public final int
	Z_FULL_FLUSH: 3,	//< public final int
	Z_FINISH: 4,		//< public final int
	Z_BLOCK: 5,			//< public final int
	Z_TREES: 6,			//< public final int
	
	Z_OK: 0,			//< public final int
	Z_STREAM_END: 1,	//< public final int
	Z_NEED_DICT: 2,		//< public final int
	Z_ERRNO: -1,		//< public final int
	Z_STREAM_ERROR: -2,	//< public final int
	Z_DATA_ERROR: -3,	//< public final int
	Z_MEM_ERROR: -4,	//< public final int
	Z_BUF_ERROR: -5,	//< public final int
	Z_VERSION_ERROR: -6,//< public final int
	
	Z_NO_COMPRESSION: 0,		//< public final int
	Z_BEST_SPEED: 1,			//< public final int
	Z_BEST_COMPRESSION: 9,		//< public final int
	Z_DEFAULT_COMPRESSION: -1,	//< public final int
	
	Z_FILTERED: 1,			//< public final int
	Z_HUFFMAN_ONLY: 2,		//< public final int
	Z_RLE: 3,				//< public final int
	Z_FIXED: 4,				//< public final int
	Z_DEFAULT_STRATEGY: 0,	//< public final int
	
	Z_BINARY: 0,	//< public final int
	Z_TEXT: 1,		//< public final int
	Z_ASCII: 2,		//< public final int
	Z_UNKNOWN: 2,	//< public final int
	
	Z_DEFLATED: 8,	//< public final int
	
	Z_NULL: 0,		//< public final int
	
	// Other constants from zlib.js inspection
	Z_MIN_WINDOWBITS: 8,		//< public int
	Z_MAX_WINDOWBITS: 15,		//< public int
	Z_DEFAULT_WINDOWBITS: 15,	//< public int
	
	// fewer than 64 bytes per chunk is stupid.
	// technically it could work with as few as 8, but even 64 bytes
	// is absurdly low.  Usually a MB or more is best.
	Z_MIN_CHUNK: 64,			//< public int
	Z_MAX_CHUNK: Infinity,		//< public int
	Z_DEFAULT_CHUNK: (16 * 1024),//< public int
	
	Z_MIN_MEMLEVEL: 1,			//< public int
	Z_MAX_MEMLEVEL: 9,			//< public int
	Z_DEFAULT_MEMLEVEL: 8,		//< public int
	
	Z_MIN_LEVEL: 1,				//< public int
	Z_MAX_LEVEL: 9,				//< public int
	Z_DEFAULT_LEVEL: null		//< public int
	
})
.options({ metatype: true })
.endType();