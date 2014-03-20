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
 * Pure Javascript is Unicode friendly but not nice to binary data. When dealing 
 * with TCP streams or the file system, it's necessary to handle octet streams. 
 * Node has several strategies for manipulating, creating, and consuming octet 
 * streams.
 * <p>Raw data is stored in instances of the Buffer class. A Buffer is similar 
 * to an array of integers but corresponds to a raw memory allocation outside 
 * the V8 heap. A Buffer cannot be resized.
 * <p>The Buffer object is global.
 * <p>Converting between Buffers and JavaScript string objects requires an 
 * explicit encoding method. Here are the different string encodings;
 * <ul>
 * <li>'ascii' - for 7 bit ASCII data only. This encoding method is very fast, 
 * and will strip the high bit if set.</li>
 * <li>'utf8' - Unicode characters. Many web pages and other document formats use UTF-8</li>
 * <li>'base64' - Base64 string encoding.</li>
 * <li>'binary' - A way of encoding raw binary data into strings by using only 
 * the first 8 bits of each character. This encoding method is depreciated and 
 * should be avoided in favor of Buffer objects where possible. This encoding 
 * will be removed in future versions of Node.</li>
 * <ul>
 */
//> public
vjo.ctype('org.nodejs.buffer') 
.props({ })
.protos({
	Buffer:     null,	//< public type::org.nodejs.buffer.Buffer	
	SlowBuffer: null 	//< public type::org.nodejs.buffer.SlowBuffer
})
.options({ metatype: true })
.endType();