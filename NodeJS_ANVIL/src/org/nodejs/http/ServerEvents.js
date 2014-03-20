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
vjo.otype('org.nodejs.http.ServerEvents') //< public
.defs({
	/**
	 * function (request, response) { }
	 * <p>
	 * Emitted each time there is a request. Note that there may be multiple requests per connection 
	 * (in the case of keep-alive connections). request is an instance of http.ServerRequest and response 
	 * is an instance of http.ServerResponse
	 */
	//> public void request(http.ServerRequest? request, http.ServerResponse? response)
	request: vjo.NEEDS_IMPL,
	
	/**
	 * function (socket) { }
	 * <p>
	 * When a new TCP stream is established. socket is an object of type net.Socket. Usually users will not 
	 * want to access this event. The socket can also be accessed at request.connection.
	 */
	//> public void connection(Stream? stream)
	connection: vjo.NEEDS_IMPL,
		
	/**
	 * function () { }
	 * <p>
	 * Emitted when the server closes.
	 */
	//> public void close() ; int? errorNo)
	close: vjo.NEEDS_IMPL,
	
	/**
	 * function (request, response) { }
	 * <p>
	 * Emitted each time a request with an http Expect: 100-continue is received. If this event isn't 
	 * listened for, the server will automatically respond with a 100 Continue as appropriate.
	 * <p>
	 * Handling this event involves calling response.writeContinue if the client should continue to send 
	 * the request body, or generating an appropriate HTTP response (e.g., 400 Bad Request) if the client 
	 * should not continue to send the request body.
	 * <p>
	 * Note that when this event is emitted and handled, the request event will not be emitted.
	 */
	//> public void checkContinue(ServerRequest? req, ServerResponse? resp)
	checkContinue: vjo.NEEDS_IMPL,

	/**
	 * function (request, socket, head) { }
	 * <p>
	 * Emitted each time a client requests a http CONNECT method. If this event isn't listened for, 
	 * then clients requesting a CONNECT method will have their connections closed.
	 * <p>
	 * request is the arguments for the http request, as it is in the request event.
	 * <p>
	 * socket is the network socket between the server and client.
	 * <p>
	 * head is an instance of Buffer, the first packet of the tunneling stream, this may be empty.
	 * <p>
	 * After this event is emitted, the request's socket will not have a data event listener, meaning 
	 * you will need to bind to it in order to handle data sent to the server on that socket.
	 */
	//> public void connect(ServerRequest? req, net.Socket? socket, Buffer? head)
	connect: vjo.NEEDS_IMPL,


	/**
	 * function (request, socket, head) { }
	 * <p>
	 * Emitted each time a client requests a http upgrade. If this event isn't listened for, then 
	 * clients requesting an upgrade will have their connections closed.
	 * <p>
	 * request is the arguments for the http request, as it is in the request event.
	 * <p>
	 * socket is the network socket between the server and client.
	 * <p>
	 * head is an instance of Buffer, the first packet of the upgraded stream, this may be empty.
	 * <p>
	 * After this event is emitted, the request's socket will not have a data event listener, meaning 
	 * you will need to bind to it in order to handle data sent to the server on that socket.
	 */
	//> public void upgrade(ServerRequest? req, net.Socket? socket, Buffer? head)
	upgrade: vjo.NEEDS_IMPL,
	 
	/**
	 * If a client connection emits an 'error' event - it will forwarded here
	 */
	//> public void clientError(Object exception)
	clientError: vjo.NEEDS_IMPL		
})
.options({ metatype: true })
.endType();