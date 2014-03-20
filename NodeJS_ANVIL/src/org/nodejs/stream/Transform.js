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
 */
vjo.ctype('org.nodejs.stream.Transform') //< public
.inherits('org.nodejs.stream.Duplex')
//< needs(org.nodejs.buffer.Buffer)
.props({ })
.protos({ 
	//> public constructs(Object? options)
	constructs : vjo.NEEDS_IMPL,
	
	/**
	 * Note: This function MUST NOT be called directly. It should be implemented by child 
	 * classes, and called by the internal Transform class methods only.
	 * <p>
	 * All Transform stream implementations must provide a _transform method to accept input 
	 * and produce output.
	 * <p>
	 * _transform should do whatever has to be done in this specific Transform class, to 
	 * handle the bytes being written, and pass them off to the readable portion of the 
	 * interface. Do asynchronous I/O, process things, and so on.
	 * <p>
	 * Call transform.push(outputChunk) 0 or more times to generate output from this input 
	 * chunk, depending on how much data you want to output as a result of this chunk.
	 * <p>
	 * Call the callback function only when the current chunk is completely consumed. Note 
	 * that there may or may not be output as a result of any particular input chunk.
	 * <p>
	 * This method is prefixed with an underscore because it is internal to the class that 
	 * defines it, and should not be called directly by user programs. However, you are 
	 * expected to override this method in your own extension classes.
	 */
	//> public void _transform({String | Buffer} chunk, String encoding, (void f(Error? error)) callback )
	_transform: vjo.NEEDS_IMPL,
	
	/**
	 * Note: This function MUST NOT be called directly. It MAY be implemented by child 
	 * classes, and if so, will be called by the internal Transform class methods only.
	 * <p>
	 * In some cases, your transform operation may need to emit a bit more data at the end 
	 * of the stream. For example, a Zlib compression stream will store up some internal 
	 * state so that it can optimally compress the output. At the end, however, it needs 
	 * to do the best it can with what is left, so that the data will be complete.
	 * <p>
	 * In those cases, you can implement a _flush method, which will be called at the very 
	 * end, after all the written data is consumed, but before emitting end to signal the 
	 * end of the readable side. Just like with _transform, call transform.push(chunk) zero 
	 * or more times, as appropriate, and call callback when the flush operation is complete.
	 * <p>
	 * This method is prefixed with an underscore because it is internal to the class that 
	 * defines it, and should not be called directly by user programs. However, you are 
	 * expected to override this method in your own extension classes.
	 */
	//> public void _flush( (void f(Error? error))? callback )
	_flush: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();