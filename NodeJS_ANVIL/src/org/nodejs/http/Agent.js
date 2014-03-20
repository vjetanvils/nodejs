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
 * In node 0.5.3+ there is a new implementation of the HTTP Agent which is used for pooling 
 * sockets used in HTTP client requests.
 * <p>
 * Previously, a single agent instance helped pool for a single host+port. The current 
 * implementation now holds sockets for any number of hosts.
 * <p>
 * The current HTTP Agent also defaults client requests to using Connection:keep-alive. If 
 * no pending HTTP requests are waiting on a socket to become free the socket is closed. 
 * This means that node's pool has the benefit of keep-alive when under load but still does 
 * not require developers to manually close the HTTP clients using keep-alive.
 * <p>
 * Sockets are removed from the agent's pool when the socket emits either a "close" event 
 * or a special "agentRemove" event. This means that if you intend to keep one HTTP request 
 * open for a long time and don't want it to stay in the pool you can do something along 
 * the lines of:
 * <pre>
 * http.get(options, function(res) {
 *   // Do stuff
 * }).on("socket", function (socket) {
 *   socket.emit("agentRemove");
 * });
 * </pre>
 * Alternatively, you could just opt out of pooling entirely using agent:false:
 * <pre>
 * http.get({hostname:'localhost', port:80, path:'/', agent:false}, function (res) {
 *   // Do stuff
 * })
 * </pre>
 */
vjo.ctype('org.nodejs.http.Agent') //< public
.props({ })
.protos({
	/**
	 * By default set to 5. Determines how many concurrent sockets the agent can have open
	 * per host.
	 */
	maxSockets: null, 		//< public int
	
	/**
	 * An object which contains arrays of sockets currently in use by the Agent. 
	 * <p>Do not modify.
	 */
	sockets: undefined,	 //< public final Agent[]
	
	/**
	 * An object which contains queues of requests that have not yet been assigned to sockets. 
	 * <p>Do not modify.
	 */
	requests: new Object 	//< public final Object
})
.options({ metatype: true })
.endType()