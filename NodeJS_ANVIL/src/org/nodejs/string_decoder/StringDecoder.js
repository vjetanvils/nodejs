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
 * Construct with an encoding and call write(...) to decode the buffers value.
 */
vjo.ctype('org.nodejs.string_decoder.StringDecoder') //< public
//< needs(org.nodejs.buffer.Buffer)
.protos({
	/**
	 * Accepts a single argument, encoding which defaults to utf8.
	 */
	//> public constructs(String? encoding)
	constructs: vjo.NEEDS_IMPL,
	
	/**
	 * Returns a decoded string.
	 */
	//> public String write(Buffer buffer)
	write: vjo.NEEDS_IMPL,
	
	/**
	 * Returns any trailing bytes that were left in the buffer.
	 */
	//> public String end()
	end: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();