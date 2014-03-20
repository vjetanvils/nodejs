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
 * This is a free list to avoid creating so many of the same object.
 * <p>
 * This is not formally exported by Node.js.  This code comes from manual inspection
 * of the freelist.js from the Node.js distro.
 */
vjo.ctype('org.nodejs.freelist') //< public
.props({
	FreeList: vjo.ctype()		 //< public
		.protos({
			//> public FreeList constructs(String name, int max, Function constructor)
			constructs: function() {},
			
			name: null,	//< public String		
			
			max: 0,		//< public int			

			list: null,	//< public Array	
			
			/**
			 * 
			 */
			//> public {Array | Object} alloc()
			alloc: vjo.NEEDS_IMPL,
			
			/**
			 * Strange name for functionality that does a push(obj) to the internal array.
			 */
			//> public void free(Object obj)
			free: vjo.NEEDS_IMPL
		})
	.endType()
})
.protos({
	FreeList: null  //< public type::org.nodejs.freelist.FreeList	
})
.options({ metatype: true })
.endType();