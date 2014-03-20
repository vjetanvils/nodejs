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
 * Stability: 4 - API Frozen
 * <p>
 * Many objects in Node emit events: a net.Server emits an event each time a peer connects 
 * to it, a fs.readStream emits an event when the file is opened. All objects which emit 
 * events are instances of events.EventEmitter. You can access this module by doing: 
 * require("events");
 * <p>
 * Typically, event names are represented by a camel-cased string, however, there aren't 
 * any strict restrictions on that, as any string will be accepted.
 * <p>
 * Functions can then be attached to objects, to be executed when an event is emitted. 
 * These functions are called listeners.
 */
vjo.ctype('org.nodejs.events') //< public 
.props({ })
.protos({
	EventEmitter: null  //< public type::org.nodejs.events.EventEmitter
})
.options({ metatype: true })
.endType();