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
 * The tty module houses the tty.ReadStream and tty.WriteStream classes. In most cases, you 
 * will not need to use this module directly.
 * <p>
 * When node detects that it is being run inside a TTY context, then process.stdin will be 
 * a tty.ReadStream instance and process.stdout will be a tty.WriteStream instance. The 
 * preferred way to check if node is being run in a TTY context is to 
 * check process.stdout.isTTY:
 * <pre>
 * $ node -p -e "Boolean(process.stdout.isTTY)"
 * true
 * $ node -p -e "Boolean(process.stdout.isTTY)" | cat
 * false
 * </pre>
 */
vjo.ctype('org.nodejs.tty')  //< public
.props({ })
.protos({
	ReadStream:  null,		//< public type::org.nodejs.tty.ReadStream
	WriteStream: null,		//< public type::org.nodejs.tty.WriteStream
	
	/**
	 * Returns true or false depending on if the fd is associated with a terminal.
	 */
	//> public boolean isatty(int fd)
	issatty: vjo.NEEDS_IMPL,
	
	/**
	 * Deprecated. Use tty.ReadStream#setRawMode() (i.e. process.stdin.setRawMode()) instead.
	 */
	//> public void setRawMode(boolean flag)
	setRawMode: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();