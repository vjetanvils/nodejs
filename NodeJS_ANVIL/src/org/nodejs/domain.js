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
 * Domains provide a way to handle multiple different IO operations as a single group. If 
 * any of the event emitters or callbacks registered to a domain emit an error event, or 
 * throw an error, then the domain object will be notified, rather than losing the context 
 * of the error in the process.on('uncaughtException') handler, or causing the program to 
 * exit with an error code.
 * <p>
 * This feature is new in Node version 0.8. It is a first pass, and is expected to change 
 * significantly in future versions. Please use it and provide feedback.
 * <p>
 * Due to their experimental nature, the Domains features are disabled unless the domain 
 * module is loaded at least once. No domains are created or registered by default. This 
 * is by design, to prevent adverse effects on current programs. It is expected to be enabled 
 * by default in future Node.js versions.
 * 
 * <h3>Additions to Error objects</h3>
 * Any time an Error object is routed through a domain, a few extra fields are added to it.
 * <ul>
 * <li>error.domain The domain that first handled the error.
 * <li>error.domain_emitter The event emitter that emitted an 'error' event with the error object.
 * <li>error.domain_bound The callback function which was bound to the domain, and passed an error as its first argument.
 * <li>error.domain_thrown A boolean indicating whether the error was thrown, emitted, or passed to a bound callback function.\
 * </ul>
 * 
 * <h3>Implicit Binding</h3>
 * If domains are in use, then all new EventEmitter objects (including Stream objects, 
 * requests, responses, etc.) will be implicitly bound to the active domain at the time of 
 * their creation.
 * <p>
 * Additionally, callbacks passed to lowlevel event loop requests (such as to fs.open, or 
 * other callback-taking methods) will automatically be bound to the active domain. If they 
 * throw, then the domain will catch the error.
 * <p>
 * In order to prevent excessive memory usage, Domain objects themselves are not implicitly 
 * added as children of the active domain. If they were, then it would be too easy to prevent 
 * request and response objects from being properly garbage collected.
 * <p>
 * If you want to nest Domain objects as children of a parent Domain, then you must explicitly 
 * add them, and then dispose of them later.
 * <p>
 * Implicit binding routes thrown errors and 'error' events to the Domain's error event, but 
 * does not register the EventEmitter on the Domain, so domain.dispose() will not shut down 
 * the EventEmitter. Implicit binding only takes care of thrown errors and 'error' events.
 * 
 * <h3>Explicit Binding</h3>
 * Sometimes, the domain in use is not the one that ought to be used for a specific event 
 * emitter. Or, the event emitter could have been created in the context of one domain, but 
 * ought to instead be bound to some other domain.
 * <p>
 * For example, there could be one domain in use for an HTTP server, but perhaps we would 
 * like to have a separate domain to use for each request.
 * <p>
 * That is possible via explicit binding.
 * <p>
 * For example:
 * <pre>
 * // create a top-level domain for the server
 * var serverDomain = domain.create();
 * serverDomain.run(function() {
 *   // server is created in the scope of serverDomain
 *   http.createServer(function(req, res) {
 *     // req and res are also created in the scope of serverDomain
 *     // however, we'd prefer to have a separate domain for each request.
 *     // create it first thing, and add req and res to it.
 *     var reqd = domain.create();
 *     reqd.add(req);
 *     reqd.add(res);
 *     reqd.on('error', function(er) {
 *       console.error('Error', er, req.url);
 *       try {
 *         res.writeHead(500);
 *         res.end('Error occurred, sorry.');
 *         res.on('close', function() {
 *           // forcibly shut down any other things added to this domain
 *           reqd.dispose();
 *         });
 *       } catch (er) {
 *         console.error('Error sending 500', er, req.url);
 *         // tried our best.  clean up anything remaining.
 *         reqd.dispose();
 *       }
 *     });
 *   }).listen(1337);
 * });
 * </pre>
 */
vjo.ctype('org.nodejs.domain') //< public
.protos({
	Domain: null,	//< public type::org.nodejs.domain.Domain
	
	/**
	 * Returns the new Domain object.
	 */
	//> public org.nodejs.domain.Domain create()
	create: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();