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
 * Any time an Error object is routed through a domain, a few extra fields are added to it.
 */
vjo.mtype('org.nodejs.domain.DomainErrorMixin') //< public
//< needs(org.nodejs.domain.Domain)
//< needs(org.nodejs.events.EventEmitter)
.props({
	
})
.protos({
	domain: null,				//< public Domain
	
	domainEmitter: null,		//< public EventEmitter
	
	domainBound: vjo.NEEDS_IMPL,//< public Function
	
	domainThrown: null			//< public boolean
})
.endType();