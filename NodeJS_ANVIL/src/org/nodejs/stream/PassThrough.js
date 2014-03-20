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
 * This is a trivial implementation of a Transform stream that simply passes the input bytes 
 * across to the output. Its purpose is mainly for examples and testing, but there are 
 * occasionally use cases where it can come in handy.
 */
vjo.ctype('org.nodejs.stream.PassThrough') //< public
.inherits('org.nodejs.stream.Transform')
.props({ })
.protos({ })
.options({ metatype: true })
.endType();