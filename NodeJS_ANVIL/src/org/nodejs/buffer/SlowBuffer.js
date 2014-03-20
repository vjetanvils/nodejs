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
vjo.ctype('org.nodejs.buffer.SlowBuffer') //< public
.props({ })
.protos({
	/**
	 * 
	 */
	//> public String inspect()
	inspect: vjo.NEEDS_IMPL,

	/**
	 * buffer.toString(encoding, start=0, end=buffer.length)
	 * <p>Decodes and returns a string from buffer data encoded with encoding 
	 * beginning at start and ending at end.
	 * <p>See buffer.write() example, above.
	 * The encoding is something toString() should work on</p>
	 */
	//> public String toString({String | Object}? encoding, int? start, int? end)
	toString: vjo.NEEDS_IMPL,
	
	/**
	 * buffer.write(string, offset=0, encoding='utf8')
	 * <p>Writes string to the buffer at offset using the given encoding. 
	 * Returns number of octets written. If buffer did not contain enough space 
	 * to fit the entire string it will write a partial amount of the string. In 
	 * the case of 'utf8' encoding, the method will not write partial characters.
	 * <p>Example: write a utf8 string into a buffer, then print it</p>
	 * <p>
	 * <pre>
	 * buf = new Buffer(256);
	 * len = buf.write('\u00bd + \u00bc = \u00be', 0);
	 * console.log(len + " bytes: " + buf.toString('utf8', 0, len));
	 * // 12 bytes: � + � = �
	 * </pre>
	 * <p>
	 * Supports both (string, offset, encoding) and the legacy (string, encoding, offset)</p>
	 */
	//> public int write(String string, String offset, String encoding) ; yes offset can be String
	//> public int write(String string, int? offset, String? encoding)
	//> public int write(String string, String encoding, int? offset) ; yes internally there is a swap
	write: vjo.NEEDS_IMPL,
	
	/**
	 * *** NOTE: This returns Buffer NOT SlowBuffer ***
	 */
	//> public buffer.Buffer slice(int start, int? end)
	slice: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();