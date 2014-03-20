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
 */
vjo.ctype('org.nodejs.node.Timeout') //< public
.props({ })
.protos({
	//> public constructs(int after)
	constructs : vjo.NEEDS_IMPL,
	
	//> public void unref()
	unref: vjo.NEEDS_IMPL,
	
	//> public void ref()
	ref: vjo.NEEDS_IMPL,
	
	//> public void close()
	close: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();