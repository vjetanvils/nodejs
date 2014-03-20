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
 * The sys module was renamed to 'util'.
 * <p>
 * This shim remains to keep old programs working.
 */
vjo.ctype('org.nodejs.sys')  //< public
.inherits('org.nodejs.util') // poor mans way to get same type functionality from org.nodejs.util
.options({ metatype: true })
.endType();