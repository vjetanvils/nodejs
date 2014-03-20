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
 * Extends Error with assert related details
 */
vjo.ctype('org.nodejs.assert.AssertionError') //< public
.inherits('js.Error')
.protos({	
// Already in super
//	name:     null,		//< public String
	
// Already in super
//	message:  null, 	//< public String
	
	/**
	 * 
	 */
	actual:   null,		//< public Object
	
	/**
	 * 
	 */
	expected: null,		//< public Object
	
	/**
	 * 
	 */
	operator: null 		//< public Object
})
.options({ metatype: true })
.endType();