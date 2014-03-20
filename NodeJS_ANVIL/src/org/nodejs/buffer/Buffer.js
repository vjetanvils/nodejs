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
 * Pure JavaScript is Unicode friendly but not nice to binary data. When dealing with TCP streams or the 
 * file system, it's necessary to handle octet streams. Node has several strategies for manipulating, 
 * creating, and consuming octet streams.
 * <p>
 * Raw data is stored in instances of the Buffer class. A Buffer is similar to an array of integers but 
 * corresponds to a raw memory allocation outside the V8 heap. A Buffer cannot be resized.
 * <p>
 * The Buffer class is a global, making it very rare that one would need to ever require('buffer').
 * <p>
 * Converting between Buffers and JavaScript string objects requires an explicit encoding method. Here 
 * are the different string encodings:
 * <ul>
 * <li>'ascii' - for 7 bit ASCII data only. This encoding method is very fast, and will strip the high bit if set. Note that this encoding converts a null character ('\0' or '\u0000') into 0x20 (character code of a space). If you want to convert a null character into 0x00, you should use 'utf8'.
 * <li>'utf8' - Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
 * <li>'utf16le' - 2 or 4 bytes, little endian encoded Unicode characters. Surrogate pairs (U+10000 to U+10FFFF) are supported.
 * <li>'ucs2' - Alias of 'utf16le'.
 * <li>'base64' - Base64 string encoding.
 * <li>'binary' - A way of encoding raw binary data into strings by using only the first 8 bits of each character. This encoding method is deprecated and should be avoided in favor of Buffer objects where possible. This encoding will be removed in future versions of Node.
 * <li>'hex' - Encode each byte as two hexadecimal characters.
 * </ul>
 * <p>
 * Buffer can also be used with Typed Array Views and DataViews.
 * <pre>
var buff = new Buffer(4);
var ui16 = new Uint16Array(buff);
var view = new DataView(buff);

ui16[0] = 1;
ui16[1] = 2;
console.log(buff);

view.setInt16(0, 1);       // set big-endian int16 at byte offset 0
view.setInt16(2, 2, true); // set little-endian int16 at byte offset 2
console.log(buff);

// <Buffer 01 00 02 00>
// <Buffer 00 01 02 00>
 * </pre>
 */
vjo.ctype('org.nodejs.buffer.Buffer') //< public
.props({				
	/**
	 * Tests if obj is a Buffer
	 */
	//> public boolean isBuffer(Object obj)
	isBuffer: vjo.NEEDS_IMPL,
	
	//> public boolean isEncoding(String encoding)
	isEncoding: vjo.NEEDS_IMPL,  	
	/**
	 * string String
	 * <p>encoding String, Optional, Default: 'utf8'
	 * <p>Return: Number
	 * <p>
	 * Gives the actual byte length of a string. encoding defaults to 'utf8'. This is not the same as 
	 * String.prototype.length since that returns the number of characters in a string.
	 * <p>
	 * Example:
	 * <pre>
	 * str = '\u00bd + \u00bc = \u00be';
	 * console.log(str + ": " + str.length + " characters, " + Buffer.byteLength(str, 'utf8') + " bytes");
	 * // 1/2 + 1/4 = 3/4: 9 characters, 12 bytes
	 * </pre>
	 */
	//> public int byteLength(String str, String? encoding)
	byteLength: vjo.NEEDS_IMPL,
	
	/**
	 * list Array List of Buffer objects to concat
	 * <p>
	 * totalLength Number Total length of the buffers when concatenated
	 * <p>Returns a buffer which is the result of concatenating all the buffers in the list together.
	 * <p>If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
	 * <p>If the list has exactly one item, then the first item of the list is returned.
	 * <p>If the list has more than one item, then a new Buffer is created.
	 * <p>If totalLength is not provided, it is read from the buffers in the list. However, this adds an 
	 * additional loop to the function, so it is faster to provide the length explicitly.
	 */
	//> public Buffer concat(Buffer[] list, int? totalLength)
	concat: vjo.NEEDS_IMPL
})
.protos({
	//> public
	data: vjo.otype().defs({
		toJSON: {
			type: null,	//< public String
			data: null	//< public Array
		}
	}).endType(),
	
	/**
	 * The size of the buffer in bytes. Note that this is not necessarily the size of the 
	 * contents. length refers to the amount of memory allocated for the buffer object. It 
	 * does not change when the contents of the buffer are changed.
	 * <pre>
	 * buf = new Buffer(1234);
	 * 
	 * console.log(buf.length);
	 * buf.write("some string", 0, "ascii");
	 * console.log(buf.length);
	 * 
	 * // 1234
	 * // 1234
	 */
	length: null,	//< public Number
	
	//
	// Legacy methods for backwards compatibility
	//
	/** Same as toString('utf8', start, end) */
	//> public String utf8Slice(int start, int? end)
	utf8Slice: vjo.NEEDS_IMPL,
	
	/** Same as toString('binary', start, end) */
	//> public String binarySlice(int start, int? end)
	binarySlice: vjo.NEEDS_IMPL,
	
	/** Same as toString('ascii', start, end) */
	//> public String asciiSlice(int start, int? end)
	asciiSlice: vjo.NEEDS_IMPL,
	
	/** Same as write(string, offset, 'utf8') */
	//> public int utf8Write(String string, int? offset)
	utf8Write: vjo.NEEDS_IMPL,
	
	/** Same as write(string, offset, 'binary') */
	//> public int binaryWrite(String string, int? offset)
	binaryWrite: vjo.NEEDS_IMPL,
	
	/** Same as write(string, offset, 'ascii') */
	//> public int asciiWrite(String string, int? offset)
	asciiWrite: vjo.NEEDS_IMPL,
	
	//
	// API
	//
	/**
	 * new Buffer(size)
	 * <p>Allocates a new buffer of size octets.
	 * <p>
	 * new Buffer(array)
	 * <p>Allocates a new buffer using an array of octets.
	 * <p>
	 * new Buffer(str, encoding='utf8')
	 * <p>Allocates a new buffer containing the given str.
	 */
	//> public  constructs(int size)
	//> public  constructs(int[] octets)
	//> public  constructs(String str, String? encoding)
	constructs: function() {},
	
			
	/**
		 * string String - data to be written to buffer
		 * <p>offset Number, Optional, Default: 0
		 * <p>length Number, Optional, Default: buffer.length - offset
		 * <p>encoding String, Optional, Default: 'utf8'
		 * <p>
		 * Writes string to the buffer at offset using the given encoding. offset defaults to 0, encoding 
		 * defaults to 'utf8'. length is the number of bytes to write. Returns number of octets written. 
		 * If buffer did not contain enough space to fit the entire string, it will write a partial amount 
		 * of the string. length defaults to buffer.length - offset. The method will not write partial characters.
		 * <pre>
		 * buf = new Buffer(256);
		 * len = buf.write('\u00bd + \u00bc = \u00be', 0);
		 * console.log(len + " bytes: " + buf.toString('utf8', 0, len));
		 * </pre>
		 * The number of characters written (which may be different than the number of bytes written) is set 
		 * in Buffer._charsWritten and will be overwritten the next time buf.write() is called.
// TODO: MrP - verify these signatures
		 */
	//> public int write(String string, String offset, String encoding) ; yes offset can be String
	//> public int write(String string, int? offset, String? encoding)
	//> public int write(String string, String encoding, int? offset) ; yes internally there is a swap
	write: vjo.NEEDS_IMPL,
	
				
	/**
	 * encoding String, Optional, Default: 'utf8'
	 * <p>start Number, Optional, Default: 0
	 * <p>end Number, Optional, Default: buffer.length
	 * <p>
	 * Decodes and returns a string from buffer data encoded with encoding (defaults to 'utf8') beginning 
	 * at start (defaults to 0) and ending at end (defaults to buffer.length).
	 */
	//> public String toString(String? encoding, int? start, int? end)
	toString: vjo.NEEDS_IMPL,
	
	/**
	 * Returns a JSON-representation of the Buffer instance, which is identical to the output 
	 * for JSON Arrays. JSON.stringify implicitly calls this function when stringifying a 
	 * Buffer instance.
	 * <p>
	 * Example:
	 * <pre>
	 * var buf = new Buffer('test');
	 * var json = JSON.stringify(buf);
	 * 
	 * console.log(json);
	 * // '[116,101,115,116]'
	 * 
	 * var copy = new Buffer(JSON.parse(json));
	 * console.log(copy);
	 * // <Buffer 74 65 73 74>
	 */
	//> public Buffer.data.toJSON toJSON()
	toJSON: vjo.NEEDS_IMPL,
	
	/**
	 * buffer.length
	 * <p>The size of the buffer in bytes. Note that this is not necessarily the 
	 * size of the contents. length refers to the amount of memory allocated for 
	 * the buffer object. It does not change when the contents of the buffer are 
	 * changed.
	 * <p>
	 * <pre>
	 * buf = new Buffer(1234);
	 * console.log(buf.length);
	 * buf.write("some string", "ascii", 0);
	 * console.log(buf.length);
	 * // 1234
	 * // 1234
	 * </pre>
	 * 
	 */
	//> public int
	length: 0,		
	
	/**
	 * buffer[index]
	 * <p>Get and set the octet at index. The values refer to individual bytes, 
	 * so the legal range is between 0x00 and 0xFF hex or 0 and 255.
	 * <p>Example: copy an ASCII string into a buffer, one byte at a time:
	 * <p>
	 * <pre>
	 * str = "node.js";
	 * buf = new Buffer(str.length);
	 * for (var i = 0; i < str.length ; i++) {
	 *   buf[i] = str.charCodeAt(i);
	 * }
	 * console.log(buf);
	 * // node.js
	 * </pre>
	 * </p>
	 */
		
	/**
	 * targetBuffer Buffer object - Buffer to copy into
	 * <p>targetStart Number, Optional, Default: 0
	 * <p>sourceStart Number, Optional, Default: 0
	 * <p>sourceEnd Number, Optional, Default: buffer.length
	 * <p>
	 * Does copy between buffers. The source and target regions can be overlapped. targetStart and 
	 * sourceStart default to 0. sourceEnd defaults to buffer.length.
	 * <p>
	 * Example: build two Buffers, then copy buf1 from byte 16 through byte 19 into buf2, starting at 
	 * the 8th byte in buf2.
	 * <pre>
	 * buf1 = new Buffer(26);
	 * buf2 = new Buffer(26);
	 * for (var i = 0 ; i < 26 ; i++) {
	 *   buf1[i] = i + 97; // 97 is ASCII a
	 *   buf2[i] = 33; // ASCII !
	 * }
	 * buf1.copy(buf2, 8, 16, 20);
	 * console.log(buf2.toString('ascii', 0, 25));
	 * 
	 * // !!!!!!!!qrst!!!!!!!!!!!!!
	 * </pre>
	 */
	//> public void copy(Buffer target, int? targetStart, int? sourceStart, int? sourceEnd)
	copy: vjo.NEEDS_IMPL,
	
	/**
	 * start Number, Optional, Default: 0
	 * <p>end Number, Optional, Default: buffer.length
	 * <p>
	 * Returns a new buffer which references the same memory as the old, but offset and cropped by the 
	 * start (defaults to 0) and end (defaults to buffer.length) indexes.
	 * <p>
	 * Modifying the new buffer slice will modify memory in the original buffer!
	 * <p>
	 * Example: build a Buffer with the ASCII alphabet, take a slice, then modify one byte from the original Buffer.
	 * <pre>
	 * var buf1 = new Buffer(26);
	 * for (var i = 0 ; i < 26 ; i++) {
	 *   buf1[i] = i + 97; // 97 is ASCII a
	 * }
	 * var buf2 = buf1.slice(0, 3);
	 * console.log(buf2.toString('ascii', 0, buf2.length));
	 * buf1[0] = 33;
	 * console.log(buf2.toString('ascii', 0, buf2.length));
	 * // abc
	 * // !bc
	 * </pre>
	 */
	//> public Buffer slice(int? start, int? end)
	slice: vjo.NEEDS_IMPL,
	
	/**
	 * offset Number
	 * <p>noAssert Boolean, Optional, Default: false
	 * <p>Return: Number
	 * <p>
	 * Reads an unsigned 8 bit integer from the buffer at the specified offset.
	 * <p>
	 * Set noAssert to true to skip validation of offset. This means that offset may be beyond the end 
	 * of the buffer. Defaults to false.
	 * <p>Example:
	 * <pre>
	 * var buf = new Buffer(4);
	 * buf[0] = 0x3;
	 * buf[1] = 0x4;
	 * buf[2] = 0x23;
	 * buf[3] = 0x42;
	 * for (ii = 0; ii < buf.length; ii++) {
	 *   console.log(buf.readUInt8(ii));
	 * }
	 * // 0x3
	 * // 0x4
	 * // 0x23
	 * // 0x42
	 * </pre>
	 */
	//> public Number readUInt8(int offset, boolean? noAssert)
	readUInt8: vjo.NEEDS_IMPL,
	
	 //> public int readUInt16LE(int offset, boolean? noAssert)
	readUInt16LE: vjo.NEEDS_IMPL,

	//> public int readUInt16LE(int offset, boolean? noAssert)
	readUInt16BE: vjo.NEEDS_IMPL,
	
	//> public int readUInt32LE(int offset, boolean? noAssert)
	readUInt32LE: vjo.NEEDS_IMPL,
	
	//> public int readUInt16LE(int offset, boolean? noAssert)
	readUInt32BE: vjo.NEEDS_IMPL,
	
	//> public int readInt8(int offset, boolean? noAssert)
	readInt8: vjo.NEEDS_IMPL,
	
	//> public int readInt16LE(int offset, boolean? noAssert)
	readInt16LE: vjo.NEEDS_IMPL,
	
	//> public int readInt16BE(int offset, boolean? noAssert)
	readInt16BE: vjo.NEEDS_IMPL,
	
	//> public int readInt32LE(int offset, boolean? noAssert)
	readInt32LE: vjo.NEEDS_IMPL,
	
	//> public int readInt32BE(int offset, boolean? noAssert)
	readInt32BE: vjo.NEEDS_IMPL,
	
	//> public int readFloatLE(int offset, boolean? noAssert)
	readFloatLE: vjo.NEEDS_IMPL,
	
	//> public int readFloatBE(int offset, boolean? noAssert)
	readFloatBE: vjo.NEEDS_IMPL,
	
	//> public int readDoubleLE(int offset, boolean? noAssert)
	readDoubleLE: vjo.NEEDS_IMPL,
	
	//> public int readDoubleBE(int offset, boolean? noAssert)
	readDoubleBE: vjo.NEEDS_IMPL,
	
	//> public void writeUInt8(Number value, int offset, boolean? noAssert)
	writeUInt8: vjo.NEEDS_IMPL,
	
	//> public void writeUInt16LE(Number value, int offset, boolean? noAssert)
	writeUInt16LE: vjo.NEEDS_IMPL,
	
	//> public void writeUInt16BE(Number value, int offset, boolean? noAssert)
	writeUInt16BE: vjo.NEEDS_IMPL,
	
	//> public void writeUInt32LE(Number value, int offset, boolean? noAssert)
	writeUInt32LE: vjo.NEEDS_IMPL,
	
	//> public void writeUInt32BE(Number value, int offset, boolean? noAssert)
	writeUInt32BE: vjo.NEEDS_IMPL,
	
	//> public void writeInt8(Number value, int offset, boolean? noAssert)
	writeInt8: vjo.NEEDS_IMPL,
	
	//> public void writeInt16LE(Number value, int offset, boolean? noAssert)
	writeInt16LE: vjo.NEEDS_IMPL,
	
	//> public void writeInt16BE(Number value, int offset, boolean? noAssert)
	writeInt16BE: vjo.NEEDS_IMPL,
	
	//> public void writeInt32LE(Number value, int offset, boolean? noAssert)
	writeInt32LE: vjo.NEEDS_IMPL,
	
	//> public void writeInt16BE(Number value, int offset, boolean? noAssert)
	writeInt32BE: vjo.NEEDS_IMPL,
	
	//> public void writeFloatLE(Number value, int offset, boolean? noAssert)
	writeFloatLE: vjo.NEEDS_IMPL,
	
	//> public void writeFloatBE(Number value, int offset, boolean? noAssert)
	writeFloatBE: vjo.NEEDS_IMPL,
	
	//> public void writeDoubleLE(Number value, int offset, boolean? noAssert)
	writeDoubleLE: vjo.NEEDS_IMPL,
	
	//> public void writeDoubleBE(Number value, int offset, boolean? noAssert)
	writeDoubleBE: vjo.NEEDS_IMPL,
	
	//> public void fill(Object value, int? offset, int? end)
	fill: vjo.NEEDS_IMPL,
	
	/**
	 * Number, Default: 50
	 * <p>
	 * How many bytes will be returned when buffer.inspect() is called. This can be 
	 * overridden by user modules.
	 * <p>
	 * Note that this is a property on the buffer module returned by require('buffer'), not 
	 * on the Buffer global, or a buffer instance.
	 */
	//> public int
	INSPECT_MAX_BYTES: 50
})
.options({ metatype: true })
.endType()