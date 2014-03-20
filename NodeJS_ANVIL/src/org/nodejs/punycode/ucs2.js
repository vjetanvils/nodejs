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
vjo.ctype('org.nodejs.punycode.ucs2') //< public
.props({ })
.protos({
	/**
	 * Creates an array containing the decimal code points of each Unicode character in the 
	 * string. While JavaScript uses UCS-2 internally, this function will convert a pair of 
	 * surrogate halves (each of which UCS-2 exposes as separate characters) into a single 
	 * code point, matching UTF-16.
	 * <pre>
	 * punycode.ucs2.decode('abc'); // [97, 98, 99]
	 * // surrogate pair for U+1D306 tetragram for centre:
	 * punycode.ucs2.decode('\uD834\uDF06'); // [0x1D306]
	 * </pre>
	 */
	//> public int[ ] decode(String value)
	decode: vjo.NEEDS_IMPL,
	
	/**
	 * Creates a string based on an array of decimal code points.
	 * <pre>
	 * punycode.ucs2.encode([97, 98, 99]); // 'abc'
	 * punycode.ucs2.encode([0x1D306]); // '\uD834\uDF06'
	 * </pre>
	 */
	//> public String encode(Number[ ] codePoints)
	encode: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();