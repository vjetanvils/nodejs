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
 * This module provides utilities for dealing with query strings.
 */
vjo.ctype('org.nodejs.querystring') //< public
//< needs(org.nodejs.buffer.Buffer)
.props({
	data: vjo.otype().defs({//< public
		options: {			//< public
			/**
			 * equal to 1000 by default), it'll be used to limit processed keys. Set it to 
			 * 0 to remove key count limitation.
			 */
			maxKeys: null	//< public int?
		}
	}).endType()
})
// TODO: MrP - These should be static functions/properties.  Currently the bootstraps factoryFunctionMappings
// does not allow us to map to a type via type::MyType - it only support mapping to an instance of a type.
.protos({
	/**
	 * Serialize an object to a query string. Optionally override the default separator 
	 * ('&') and assignment ('=') characters.
	 * <p>
	 * Example:
	 * <pre>
	 * querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })
	 * // returns
	 * 'foo=bar&baz=qux&baz=quux&corge='
	 * 
	 * querystring.stringify({foo: 'bar', baz: 'qux'}, ';', ':')
	 * // returns
	 * 'foo:bar;baz:qux'
	 * </pre>
	 */
	//> public String stringify(Object obj, String? sep, String? eq)
	stringify: vjo.NEEDS_IMPL,
	
	/**
	 * Deserialize a query string to an object. Optionally override the default separator 
	 * ('&') and assignment ('=') characters.
	 * <p>
	 * Options object may contain maxKeys property (equal to 1000 by default), it'll be 
	 * used to limit processed keys. Set it to 0 to remove key count limitation.
	 * <p>
	 * Example:
	 * <pre>
	 * querystring.parse('foo=bar&baz=qux&baz=quux&corge')
	 * // returns
	 * { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
	 * </pre>
	 */
	//> public Object parse(String str, String? sep, String? eq, querystring.data.options? options)
	parse: vjo.NEEDS_IMPL,	
	
	//> public Object decode(String str, String? sep, String? eq, querystring.data.options? options)
	decode: vjo.NEEDS_IMPL,	
	
	/**
	 * The escape function used by querystring.stringify, provided so that it could be 
	 * overridden if necessary.
	 */
	//> public Function
	escape: null,
	
	/**
	 * The unescape function used by querystring.parse, provided so that it could be 
	 * overridden if necessary.
	 */
	//> public Function
	unescape: null,
	
	//> public Buffer unescapeBuffer(Buffer buffer, boolean decodeSpaces)
	unescapeBuffer: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();