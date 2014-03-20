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
 * To use this module, do require('string_decoder'). StringDecoder decodes a buffer to a 
 * string. It is a simple interface to buffer.toString() but provides additional support 
 * for utf8.
 * <pre>
 * var StringDecoder = require('string_decoder').StringDecoder;
 * var decoder = new StringDecoder('utf8');
 * 
 * var cent = new Buffer([0xC2, 0xA2]);
 * console.log(decoder.write(cent));
 * 
 * var euro = new Buffer([0xE2, 0x82, 0xAC]);
 * console.log(decoder.write(euro));
 * <pre>
 */ 
vjo.ctype('org.nodejs.string_decoder')  //< public
.props({ })
.protos({
	StringDecoder: null //< public type::org.nodejs.string_decoder.StringDecoder
})
.options({ metatype: true })
.endType();