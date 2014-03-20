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
 * Stability: 2 - Unstable
 * <p>
 * Punycode.js is bundled with Node.js v0.6.2+. Use require('punycode') to access it. 
 * (To use it with other Node.js versions, use npm to install the punycode module first.)
 */
vjo.ctype('org.nodejs.punycode') //< public
.props({ })
.protos({
	/**
	 * Converts a Punycode string of ASCII code points to a string of Unicode code points.
	 * <pre>
	 * // decode domain name parts
	 * punycode.decode('maana-pta'); // 'ma�ana'
	 * punycode.decode('--dqo34k'); // snowman
	 * </pre>
	 */
	//> public String decode(String value)
	decode: vjo.NEEDS_IMPL,
	
	/**
	 * Converts a string of Unicode code points to a Punycode string of ASCII code points.
	 * <pre>
	 * // encode domain name parts
	 * punycode.encode('ma�ana'); // 'maana-pta'
	 * punycode.encode('snowman'); // '--dqo34k'
	 * <pre>
	 */
	//> public String encode(String value)
	encode: vjo.NEEDS_IMPL,
	
	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the Punycoded 
	 * parts of the domain name will be converted, i.e. it doesn't matter if you call it 
	 * on a string that has already been converted to Unicode.
	 * <pre>
	 * // decode domain names
	 * punycode.toUnicode('xn--maana-pta.com'); // 'ma�ana.com'
	 * punycode.toUnicode('xn----dqo34k.com'); // 'snowman.com'
	 * </pre>
	 */
	//> public String toUnicode(String domain)
	toUnicode: vjo.NEEDS_IMPL,
	
	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the non-ASCII 
	 * parts of the domain name will be converted, i.e. it doesn't matter if you call it 
	 * with a domain that's already in ASCII.
	 * <pre>
	 * // encode domain names
	 * punycode.toASCII('ma�ana.com'); // 'xn--maana-pta.com'
	 * punycode.toASCII('snowman.com'); // 'xn----dqo34k.com'
	 * </pre>
	 */
	//> public String toASCII(String domain)
	toASCII: vjo.NEEDS_IMPL,
	
	/**
	 * A string representing the current Punycode.js version number.
	 */
	//> public final String
	version: '',
	
	/**
	 * Codepoint encode/decode functions
	 */
	//> public final punycode.ucs2
	ucs2: undefined
})
.options({ metatype: true })
.endType();