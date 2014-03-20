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
 * Stability: 5 - Locked
 * <p>
 * This is a definition of the 'opaque' object returned/used by the Timers.  This code is
 * from manual inspection of the timers.js from the Node.js disto.
 */
vjo.ctype('org.nodejs.node.Timer') //< public
.props({

})
.protos({	
	/**
	 * 
	 */
	//> public void unenroll(Object item)
	unenroll: vjo.NEEDS_IMPL,
	
	/**
	 * Does not start the time, just sets up the members needed.
	 */
	//> public void enroll(Object item, int msecs)
	enroll: vjo.NEEDS_IMPL,
	
	/**
	 * Call this whenever the item is active (not idle) it will reset its timeout.
	 */
	//> public void active(Object item)
	active: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public void active(Object item)
	item: vjo.NEEDS_IMPL,
	
	/**
	 * setTimeout(callback, delay, [arg], [...])
	 * <p>To schedule execution of callback after delay milliseconds. Returns a 
	 * timeoutId for possible use with clearTimeout(). Optionally, you can also 
	 * pass arguments to the callback.
	 */
	//> public Timer setTimeout(Function callback, int delay, Object... arguments)
	setTimeout: vjo.NEEDS_IMPL,
	
	/**
	 * clearTimeout(timeoutId)
	 * <p>Prevents a timeout from triggering.
	 */
	//> public void clearTimeout(Timer timeoutId)
	clearTimeout: vjo.NEEDS_IMPL,
	
	/**
	 * setInterval(callback, delay, [arg], [...])
	 * <p>To schedule the repeated execution of callback every delay milliseconds. 
	 * Returns a intervalId for possible use with clearInterval(). Optionally, 
	 * you can also pass arguments to the callback.
	 */
	//> public Timer setInterval(Function callback, int delay, Object... arguments)
	setInterval: vjo.NEEDS_IMPL,
	
	/**
	 * clearInterval(intervalId)
	 * <p>Stops a interval from triggering.
	 */
	//> public void clearInterval(Timer intervalId)
	clearInterval: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType()