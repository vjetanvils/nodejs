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
//
// Handle various inheritances...
// TODO: MrP - we need a better way to do this since it so easy to get out of sync
//
function apply(obj1, obj2 ) { // shallow copy but ok for what we're doing
    for (var prop in obj1 ) {
    	if (obj1.hasOwnProperty(prop)) {
    		// don't stomp
    		if (obj2.hasOwnProperty(prop)) {
    			var collides = prop ;
    		}
    		else {
    			obj2[prop] = obj1[prop];	
    		}	
    	}
    }
    return obj2;
}

var metatypes = { }; // Map<fqn_as_underbar, typeInfo> where typeInfo = {type: type, endEvents: events}

function registerType(type) {
	var initialEvents = { } ;
	apply(type.events, initialEvents) ; // get a copy of the initial events
	
	var typeInfo = {
	    type: type,
	    endEvents: initialEvents, 
	    seenSupertypes: [ ] 
	} ;
		
	var fqn = type.fqn ;
	var underbarFQN = dotsToUnderbar(fqn) ;
	metatypes[underbarFQN] = typeInfo ;
}

function dotsToUnderbar(name) {
	var transformedName = name.replace(/\./g, '_');
	return transformedName ;
}


// fs.ReadStream (EXAMPLE)
//'org.nodejs.fs.ReadStream:on' : 		   org_nodejs_fs_ReadStream,
//'org.nodejs.fs.ReadStream:once' : 	   org_nodejs_fs_ReadStream,
//'org.nodejs.fs.ReadStream:addListener' : org_nodejs_fs_ReadStream,
function appendFunctionArgMapping(mappings, typeInfo) {
	var root = typeInfo.type.fqn ;
	var eventMappings = typeInfo.endEvents ;
	
	mappings[root + ":on"] = eventMappings ;
	mappings[root + ":once"] = eventMappings ;
	mappings[root + ":addListener"] = eventMappings ;
}

/**
 * Each type says who its super type is.  We can lookup any type/supertype by its fully
 * qualified name (fqn).
 * 
 * We can do this computation after ALL the metatypes have been registered.
 * 
 * In the simplest of approaches we can just walk the inheritance chain "adding" any of the
 * supertypes events.  Since we never modify the registered metatypes event defs directly, and
 * do a copy upfront to the endEvent member, we just do copies up the chain.  
 * 
 * To deal with multiple (or circular dependencies) we "remember" each supertype we have
 * already chased and if we see it again, we exit that stack of recursion.  The seenSupertypes
 * object is used as a poor mans list - when we start processing a supertype we add its
 * fqn to the seenSupertypes member.
 */
function computeEventsFromInheritance() {
	for(var fqn_with_underbars in metatypes) {
		if (metatypes.hasOwnProperty(fqn_with_underbars)) {
			var typeInfoToPopulate = metatypes[fqn_with_underbars] ;
			var inherits = typeInfoToPopulate.type.inherits ;
			processTypeInfo(typeInfoToPopulate, inherits) ;
		}
	}
}

function arrayContains(array, element) {
	for(var i = 0; i < array.length; i++) {
		if (array[i] == element) return true ;
	}
	return false ;
}

// *** RECURSIVE ***
function processTypeInfo(typeInfoToPopulate, inherits) {
	if (! typeInfoToPopulate) {
		var foo = true ;
	}
	
	if (! inherits) { // check in case someone forgets to specify
		return ;
	}
	
	for(var i = 0; i < inherits.length; i++) {
		var superTypeFQN = inherits[i] ; // inherits is array of fqn's'
		var superTypeInfo = metatypes[dotsToUnderbar(superTypeFQN)] ; 
		var superType = superTypeInfo.type ;
		
		if (! superType) {
			var foo = true ;
		}
		
		
		// if we have already seem this supertype, bail...
		if (arrayContains(typeInfoToPopulate.seenSupertypes, superTypeFQN)) { // **** RECURSION CHECK ****
			return ;
		}
		
		// mark as seen this supertype and continue processing
		if (! typeInfoToPopulate.seenSupertypes) {
			var foo = true ;
		}
		
		typeInfoToPopulate.seenSupertypes.push(superTypeFQN) ;
		
		// add supertypes events 
		apply(superType.events, typeInfoToPopulate.endEvents) ;
				
		// **** RECURSION **** chase each of the supertypes inherits
		processTypeInfo(typeInfoToPopulate, superType.inherits)
	}		
}

function produceFunctionArgMappings() {
	computeEventsFromInheritance() ;
	
	var mappings = { } ;
	for(var fqn in metatypes) {
		if (metatypes.hasOwnProperty(fqn)) {
			var typeInfo = metatypes[fqn] ;
			appendFunctionArgMapping(mappings, typeInfo) ;
		}
	}
	return mappings ;
}

/**
 * Node.js does some extensions to the native types.  We expose those formally so any
 * code or examples will be completely covered.
 */
var typeExtensions = {
	'Array':    'org.nodejs.ext.ArrayExt',
	'Date':     'org.nodejs.ext.DateExt',
	'Function': 'org.nodejs.ext.FunctionExt', 
	'Object':   'org.nodejs.ext.ObjectExt',
	'String':   'org.nodejs.ext.StringExt'
}

//------------------------
//   org.nodejs.events
//------------------------
var org_nodejs_events_EventEmitter = {
    fqn: 'org.nodejs.events.EventEmitter',
    events: {
		'newListener':  'org.nodejs.events.EventEmitter.event:newListener'
    },
    inherits: [ ]
};
registerType(org_nodejs_events_EventEmitter);

//------------------------
//org.nodejs.node (Globals)
//------------------------
var org_nodejs_node_Process = {
    fqn: 'org.nodejs.node.Process',
    events: {
		'exit':  			  'org.nodejs.node.Process.event:exit',
		'uncaughtException':  'org.nodejs.node.Process.event:uncaughtException'
    },
    inherits: ['org.nodejs.events.EventEmitter']
};
registerType(org_nodejs_node_Process);

//------------------------
//   org.nodejs.stream
//------------------------
var org_nodejs_stream = {
	fqn: 'org.nodejs.stream',
	events: { },
	inherits: ['org.nodejs.events.EventEmitter']
};
registerType(org_nodejs_stream) ;

var org_nodejs_stream_Readable = {
    fqn: 'org.nodejs.stream.Readable',
    events: {
		'readable': 'org.nodejs.stream.Readable.event:readable',
		'data':  	'org.nodejs.stream.Readable.event:data',
		'end':   	'org.nodejs.stream.Readable.event:end',
		'error': 	'org.nodejs.stream.Readable.event:error',
		'close': 	'org.nodejs.stream.Readable.event:close'
    },
    inherits: ['org.nodejs.stream']
};
registerType(org_nodejs_stream_Readable);

var org_nodejs_stream_Writable = {
    fqn: 'org.nodejs.stream.Writable',
    events: {
		'drain': 'org.nodejs.stream.Writable.event:drain',
		'close': 'org.nodejs.stream.Writable.event:close',
		'finish': 'org.nodejs.stream.Writable.event:finish',
		'pipe':  'org.nodejs.stream.Writable.event:pipe',
		'unpipe': 'org.nodejs.stream.Writable.event:unpipe'
    },
    inherits: ['org.nodejs.stream']
};
registerType(org_nodejs_stream_Writable);

var org_nodejs_stream_Duplex = {
	fqn: 'org.nodejs.stream.Duplex',
	events: { },
	inherits: ['org.nodejs.stream.Readable']
};
registerType(org_nodejs_stream_Duplex) ;

var org_nodejs_stream_Transform = {
	fqn: 'org.nodejs.stream.Transform',
	events: { },
	inherits: ['org.nodejs.stream.Duplex']
};
registerType(org_nodejs_stream_Transform) ;

var org_nodejs_stream_PassThrough = {
	fqn: 'org.nodejs.stream.PassThrough',
	events: { },
	inherits: ['org.nodejs.stream.Transform']
};
registerType(org_nodejs_stream_PassThrough) ;
	
//------------------------
//   org.nodejs.dgram
//------------------------
var org_nodejs_dgram_Socket = {
    fqn: 'org.nodejs.dgram.Socket',
    events: {
		'message'   : 'org.nodejs.dgram.Socket.event:message',
		'listening' : 'org.nodejs.dgram.Socket.event:listening',
		'close'     : 'org.nodejs.dgram.Socket.event:close',
		'error'     : 'org.nodejs.dgram.Socket.event:error'
    },
    inherits: ['org.nodejs.events.EventEmitter']
}
registerType(org_nodejs_dgram_Socket);
		
//------------------------
//    org.nodejs.net
//------------------------
var org_nodejs_net_Socket = {
    fqn: 'org.nodejs.net.Socket',
    events: {
		'connect' : 'org.nodejs.net.Socket.event:connect',
		'data' : 	'org.nodejs.net.Socket.event:data',
		'end' : 	'org.nodejs.net.Socket.event:end',
		'timeout' : 'org.nodejs.net.Socket.event:timeout',
		'drain' : 	'org.nodejs.net.Socket.event:drain',
		'error' : 	'org.nodejs.net.Socket.event:error',
		'close' : 	'org.nodejs.net.Socket.event:close'
    },
    inherits: ['org.nodejs.stream.Duplex']
};
registerType(org_nodejs_net_Socket) ;

var org_nodejs_net_Server = {
    fqn: 'org.nodejs.net.Server',
    events: {
		'listening' :  'org.nodejs.net.Server.event:listening',
		'connection' : 'org.nodejs.net.Server.event:connection',
		'close' : 	   'org.nodejs.net.Server.event:close',
		'error' : 	   'org.nodejs.net.Server.event:error'
    },
    inherits: ['org.nodejs.net.Socket']
};
registerType(org_nodejs_net_Server) ;

//------------------------
//   org.nodejs.http
//------------------------
var org_nodejs_http_OutgoingMessage = {
	fqn: 'org.nodejs.http.OutgoingMessage',
	events: { },
	inherits: ['org.nodejs.stream']
};
registerType(org_nodejs_http_OutgoingMessage) ;

var org_nodejs_http_IncomingMessage = {
	fqn: 'org.nodejs.http.IncomingMessage',
	events: { },
	inherits: ['org.nodejs.stream.Readable']
};
registerType(org_nodejs_http_IncomingMessage) ;

var org_nodejs_http_Server = {
    fqn: 'org.nodejs.http.Server',
    events: {
		'request' :       'org.nodejs.http.Server.event:request',
		'connection' :    'org.nodejs.http.Server.event:connection',
		'close' :         'org.nodejs.http.Server.event:close',
		'checkContinue' : 'org.nodejs.http.Server.event:checkContinue',
		'connect' : 	  'org.nodejs.http.Server.event:connect',
		'upgrade' :       'org.nodejs.http.Server.event:upgrade',
		'clientError' :   'org.nodejs.http.Server.event:clientError'
    },
    inherits: ['org.nodejs.net.Server']
};
registerType(org_nodejs_http_Server) ;
	
var org_nodejs_http_ServerRequest = {
    fqn: 'org.nodejs.http.ServerRequest',
    events: {
		'data' :  'org.nodejs.http.ServerRequest.event:data',
		'end' :   'org.nodejs.http.ServerRequest.event:end',
		'close' : 'org.nodejs.http.ServerRequest.event:close'
    },
    inherits: ['org.nodejs.http.IncomingMessage']
};
registerType(org_nodejs_http_ServerRequest) ;

var org_nodejs_http_ServerResponse = {
    fqn: 'org.nodejs.http.ServerResponse',
    events: {
		'close' : 'org.nodejs.http.ServerResponse.event:close'
    },
    inherits: ['org.nodejs.http.OutgoingMessage']
};
registerType(org_nodejs_http_ServerResponse);

var org_nodejs_http_Agent = {
    fqn: 'org.nodejs.http.Agent',
    events: {
		'upgrade'     : 'org.nodejs.http.Agent.event:upgrade',
		'clientError' : 'org.nodejs.http.Agent.event:clientError'
    },
    inherits: [ ]
};
registerType(org_nodejs_http_Agent);
	
var org_nodejs_http_ClientRequest = {
    fqn: 'org.nodejs.http.ClientRequest',
    events: {
		'response' : 'org.nodejs.http.ClientRequest.event:response',
		'socket' :   'org.nodejs.http.ClientRequest.event:socket',
		'connect' :  'org.nodejs.http.ClientRequest.event:connect',
		'upgrade' :  'org.nodejs.http.ClientRequest.event:upgrade',
		'continue' : 'org.nodejs.http.ClientRequest.event:continue'	
    },
    inherits: ['org.nodejs.http.OutgoingMessage']
};
registerType(org_nodejs_http_ClientRequest) ;

var org_nodejs_http_ClientResponse = {
    fqn: 'org.nodejs.http.ClientResponse',
    events: {
		'data' :  'org.nodejs.http.ClientResponse.event:data',
		'end' :   'org.nodejs.http.ClientResponse.event:end',
		'close' : 'org.nodejs.http.ClientResponse.event:close'
    },
    inherits: ['org.nodejs.http.IncomingMessage']
};
registerType(org_nodejs_http_ClientResponse) ;
	
var org_nodejs_http_Client = {
    fqn: 'org.nodejs.http.Client',
    events: {
		'upgrade' : 'org.nodejs.http.Client.event:upgrade'
    },
    inherits: [ ]
};
registerType(org_nodejs_http_Client) ;

//------------------------
//   org.nodejs.https
//------------------------
var org_nodejs_https_Server = {
    fqn: 'org.nodejs.https.Server',
    events: {

    },
    inherits: ['org.nodejs.tls.Server']
};
registerType(org_nodejs_https_Server) ;

var org_nodejs_https_Agent = {
    fqn: 'org.nodejs.https.Agent',
    events: {

    },
    inherits: ['org.nodejs.http.Agent']
};
registerType(org_nodejs_https_Agent);

//------------------------
//     org.nodejs.fs
//------------------------
var org_nodejs_fs_ReadStream = {
    fqn: 'org.nodejs.fs.ReadStream',
    events: {
		'open' : 'org.nodejs.fs.ReadStream.event:open'
    },
    inherits: ['org.nodejs.stream.Readable']
};
registerType(org_nodejs_fs_ReadStream) ;

var org_nodejs_fs_WriteStream = {
    fqn: 'org.nodejs.fs.WriteStream',
    events: {
		'open' : 'org.nodejs.fs.WriteStream.event:open'
    },
    inherits: ['org.nodejs.stream.Writable']
};
registerType(org_nodejs_fs_WriteStream) ;
	
var org_nodejs_fs_FSWatcher = {
    fqn: 'org.nodejs.fs.FSWatcher',
    events: {
		'change' : 'org.nodejs.fs.FSWatcher.event:change',
		'error' :  'org.nodejs.fs.FSWatcher.event:error'
    },
    inherits: ['org.nodejs.events.EventEmitter']
};
registerType(org_nodejs_fs_FSWatcher);

//------------------------
//     org.nodejs.tls
//------------------------
var org_nodejs_tls_Server = {
    fqn: 'org.nodejs.tls.Server',
    events: {
		'secureConnection' : 'org.nodejs.tls.Server.event:secureConnection',
		'clientError' : 	 'org.nodejs.tls.Server.event:clientError'
    },
    inherits: ['org.nodejs.net.Server']
};
registerType(org_nodejs_tls_Server) ;

var org_nodejs_tls_CryptoStream = {
    fqn: 'org.nodejs.tls.CryptoStream',
    events: {
	
	},
	inherits: ['org.nodejs.stream.Duplex']
};
registerType(org_nodejs_tls_CryptoStream) ;

var org_nodejs_tls_CleartextStream = {
    fqn: 'org.nodejs.tls.CleartextStream',
    events: {
		'secureConnect' : 'org.nodejs.tls.CleartextStream.event:secureConnect'
    },
    inherits: ['org.nodejs.tls.CryptoStream']
};
registerType(org_nodejs_tls_CleartextStream) ;

var org_nodejs_tls_EncryptedStream = {
    fqn: 'org.nodejs.tls.EncryptedStream',
    events: {
		
    },
    inherits: ['org.nodejs.tls.CryptoStream']
};
registerType(org_nodejs_tls_EncryptedStream) ;

var org_nodejs_tls_SecurePair = {
	fqn: 'org.nodejs.tls.SecurePair', 
	events: {
		'secure' : 'org.nodejs.tls.SecurePair.event:secure'
	},
	inherits: ['org.nodejs.events.EventEmitter']
};
registerType(org_nodejs_tls_SecurePair) ;

//------------------------
//     org.nodejs.repl
//------------------------
var org_nodejs_repl = {
    fqn: 'org.nodejs.repl',
    events: {
		'exit' : 'org.nodejs.repl.event:exit'
    },
    inherits: [ ]
};
registerType(org_nodejs_repl) ;

//------------------------
//  org.nodejs.child_process.ChildProcess
//------------------------
var org_nodejs_child_process_ChildProcess = {
    fqn: 'org.nodejs.child_process.ChildProcess',
    events: {
		'error': 		'org.nodejs.child_process.ChildProcess.event:error',
		'exit' : 		'org.nodejs.child_process.ChildProcess.event:exit',
		'close' : 		'org.nodejs.child_process.ChildProcess.event:close',
		'disconnect' : 	'org.nodejs.child_process.ChildProcess.event:disconnect',
		'message' : 	'org.nodejs.child_process.ChildProcess.event:message'
    },
    inherits: ['org.nodejs.events.EventEmitter']
};
registerType(org_nodejs_child_process_ChildProcess) ;

//------------------------
//org.nodejs.domain.Domain
//------------------------
var org_nodejs_domain_Domain = {
    fqn: 'org.nodejs.domain.Domain',
    events: {
		'error' : 	'org.nodejs.domain.Domain.event:error',
		'dispose' : 'org.nodejs.domain.Domain.event:dispose'
    },
    inherits: ['org.nodejs.events.EventEmitter']
};
registerType(org_nodejs_domain_Domain) ;

//------------------------
//  org.nodejs.cluster
//------------------------
var org_nodejs_cluster = {
    fqn: 'org.nodejs.cluster',
    events: {
		'fork' : 		'org.nodejs.cluster.event:fork',
		'online' : 		'org.nodejs.cluster.event:online',
		'listening' : 	'org.nodejs.cluster.event:listening',
		'disconnect' : 	'org.nodejs.cluster.event:disconnect',
		'exit' : 		'org.nodejs.cluster.event:exit',
		'setup' : 		'org.nodejs.cluster.event:setup'
    },
    inherits: [ ]
};
registerType(org_nodejs_cluster) ;

var org_nodejs_cluster_Worker = {
    fqn: 'org.nodejs.cluster.Worker',
    events: {
		'message' : 	'org.nodejs.cluster.Worker.event:message',
		'online' : 		'org.nodejs.cluster.Worker.event:online',
		'listening' : 	'org.nodejs.cluster.Worker.event:listening',
		'disconnect' : 	'org.nodejs.cluster.Worker.event:disconnect',
		'exit' : 		'org.nodejs.cluster.Worker.event:exit'
    },
    inherits: ['org.nodejs.events.EventEmitter']
};
registerType(org_nodejs_cluster_Worker) ;

//------------------------
//  org.nodejs.readline
//------------------------
var org_nodejs_readline_Interface = {
    fqn: 'org.nodejs.readline.Interface',
    events: {
		'line' : 	'org.nodejs.readline.Interface.event:line',
	    'pause' : 	'org.nodejs.readline.Interface.event:pause',
	    'resume' : 	'org.nodejs.readline.Interface.event:resume',
	    'close' : 	'org.nodejs.readline.Interface.event:close',
	    'SIGINT' : 	'org.nodejs.readline.Interface.event:SIGINT',
	    'SIGTSTP' : 'org.nodejs.readline.Interface.event:SIGTSTP',
	    'SIGCONT' : 'org.nodejs.readline.Interface.event:SIGCONT'
    },
    inherits: [ ]
};
registerType(org_nodejs_readline_Interface) ;

//------------------------
//    org.nodejs.tty
//------------------------
var org_nodejs_tty_ReadStream = {
    fqn: 'org.nodejs.tty.ReadStream',
    events: {

    },
    inherits: ['org.nodejs.net.Socket']
};
registerType(org_nodejs_tty_ReadStream) ;

var org_nodejs_tty_WriteStream = {
    fqn: 'org.nodejs.tty.WriteStream',
    events: {
		'resize' : 	'org.nodejs.tty.WriteStream.event:resize'
    },
    inherits: ['org.nodejs.net.Socket']
};
registerType(org_nodejs_tty_WriteStream);


//------------------------
//   org.nodejs.crypto
//------------------------
var org_nodejs_crypto_Hash = {
    fqn: 'org.nodejs.crypto.Hash',
    events: {

    },
    inherits: ['org.nodejs.stream.Transform']
};
registerType(org_nodejs_crypto_Hash) ;

var org_nodejs_crypto_Hmac = {
    fqn: 'org.nodejs.crypto.Hmac',
    events: {

    },
    inherits: ['org.nodejs.stream.Transform']
};
registerType(org_nodejs_crypto_Hmac) ;

var org_nodejs_crypto_Cipher = {
    fqn: 'org.nodejs.crypto.Cipher',
    events: {

    },
    inherits: ['org.nodejs.stream.Transform']
};
registerType(org_nodejs_crypto_Cipher) ;

var org_nodejs_crypto_Decipher = {
    fqn: 'org.nodejs.crypto.Deciper',
    events: {

    },
    inherits: ['org.nodejs.stream.Transform']
};
registerType(org_nodejs_crypto_Decipher) ;

var org_nodejs_crypto_Verify = {
    fqn: 'org.nodejs.crypto.Verify',
    events: {

    },
    inherits: ['org.nodejs.stream.Writable']
};
registerType(org_nodejs_crypto_Verify) ;

var org_nodejs_crypto_Sign = {
    fqn: 'org.nodejs.crypto.Sign',
    events: {

    },
    inherits: ['org.nodejs.stream.Writable']
};
registerType(org_nodejs_crypto_Sign) ;

//
// Overall Function Mappings
//

// It appears the functionArgMappings() is called MANY times, so precompute our mappings structure
// and assign so we only do its calculation once.
var endMappings = produceFunctionArgMappings() ;
var functionArgMappings = endMappings ;

//var functionArgMappings_orig = {
//    //------------------------
//	//  org.nodejs.XXX[.YYY]
//	//------------------------
//		
//	//------------------------
//	//     org.nodejs.fs
//	//------------------------
//	// fs.ReadStream
//	'org.nodejs.fs.ReadStream:on' : 		 org_nodejs_fs_ReadStream,
//	'org.nodejs.fs.ReadStream:once' : 		 org_nodejs_fs_ReadStream,
//	'org.nodejs.fs.ReadStream:addListener' : org_nodejs_fs_ReadStream,
//		
//	// fs.WriteStream
//	'org.nodejs.fs.WriteStream:on' : 		  org_nodejs_fs_WriteStream,
//	'org.nodejs.fs.WriteStream:once' : 		  org_nodejs_fs_WriteStream,	
//	'org.nodejs.fs.WriteStream:addListener' : org_nodejs_fs_WriteStream,
//	
//	// fs.FSWatcher
//	'org.nodejs.fs.FSWatcher:on' : 		  org_nodejs_fs_FSWatcher,
//	'org.nodejs.fs.FSWatcher:once' : 		  org_nodejs_fs_FSWatcher,
//	'org.nodejs.fs.FSWatcher:addListener' : org_nodejs_fs_FSWatcher,
//	
//	//------------------------
//	//   org.nodejs.stream
//	//------------------------
//	// stream.ReadableStream
//	'org.nodejs.stream.Readable:on' : 		 	org_nodejs_stream_Readable,
//	'org.nodejs.stream.Readable:once' : 		org_nodejs_stream_Readable,
//	'org.nodejs.stream.Readable:addListener' : 	org_nodejs_stream_Readable,
//	
//	// stream.WritableStream
//	'org.nodejs.stream.Writable:on' : 		  org_nodejs_stream_Writable,
//	'org.nodejs.stream.Writable:once' : 		  org_nodejs_stream_Writable,
//	'org.nodejs.stream.Writable:addListener' : org_nodejs_stream_Writable,
//	
//	//------------------------
//	//    org.nodejs.tls
//	//------------------------
//	// tls.Server
//	'org.nodejs.tls.Server:on' : 		  org_nodejs_tls_Server,
//	'org.nodejs.tls.Server:once' : 		  org_nodejs_tls_Server,
//	'org.nodejs.tls.Server:addListener' : org_nodejs_tls_Server,
//	
//	// tls.CleartextStream
//	'org.nodejs.tls.CleartextStream:on' : 		  org_nodejs_tls_CleartextStream,
//	'org.nodejs.tls.CleartextStream:once' : 	  org_nodejs_tls_CleartextStream,
//	'org.nodejs.tls.CleartextStream:addListener': org_nodejs_tls_CleartextStream,
//	
//	// tls.SecurePair
//	'org.nodejs.tls.SecurePair:on' : 		 org_nodejs_tls_SecurePair,
//	'org.nodejs.tls.SecurePair:once' : 	  	 org_nodejs_tls_SecurePair,
//	'org.nodejs.tls.SecurePair:addListener': org_nodejs_tls_SecurePair,
//	
//	//------------------------
//	//    org.nodejs.net
//	//------------------------
//	// net.Server
//	'org.nodejs.net.Server:on' : 		org_nodejs_net_Server,	
//	'org.nodejs.net.Server:once' : 		org_nodejs_net_Server,		
//	'org.nodejs.net.Server:addListener':org_nodejs_net_Server,		
//	
//	// net.Socket
//	'org.nodejs.net.Socket:on' : 		  org_nodejs_net_Socket,
//	'org.nodejs.net.Socket:once' : 		  org_nodejs_net_Socket,
//	'org.nodejs.net.Socket:addListener' : org_nodejs_net_Socket,
//	
//	//------------------------
//	//    org.nodejs.dgram
//	//------------------------
//	// dgram.Socket
//	'org.nodejs.dgram.Socket:on' : 			org_nodejs_dgram_Socket,
//	'org.nodejs.dgram.Socket:once' : 		org_nodejs_dgram_Socket,
//	'org.nodejs.dgram.Socket:addListener' : org_nodejs_dgram_Socket,
//
//	//------------------------
//	//    org.nodejs.http
//	//------------------------
//	// http.Server
//	'org.nodejs.http.Server:on' : 			org_nodejs_http_Server,
//	'org.nodejs.http.Server:once' : 		org_nodejs_http_Server,
//	'org.nodejs.http.Server:addListener' : 	org_nodejs_http_Server,
//	
//	// http.ServerRequest
//	'org.nodejs.http.ServerRequest:on' : 		  org_nodejs_http_ServerRequest,
//	'org.nodejs.http.ServerRequest:once' : 		  org_nodejs_http_ServerRequest,
//	'org.nodejs.http.ServerRequest:addListener' : org_nodejs_http_ServerRequest,
//	
//	// http.ServerResponse
//	'org.nodejs.http.ServerResponse:on' : 		  org_nodejs_http_ServerResponse,
//	'org.nodejs.http.ServerResponse:once' : 		  org_nodejs_http_ServerResponse,
//	'org.nodejs.http.ServerResponse:addListener' : org_nodejs_http_ServerResponse,
//
//	// http.Agent
//	'org.nodejs.http.Agent:on' : 		  org_nodejs_http_Agent,
//	'org.nodejs.http.Agent:once' : 		  org_nodejs_http_Agent,
//	'org.nodejs.http.Agent:addListener' : org_nodejs_http_Agent,
//	
//	// http:ClientRequest
//	'org.nodejs.http.ClientRequest:on' : 		  org_nodejs_http_ClientRequest,
//	'org.nodejs.http.ClientRequest:once' : 		  org_nodejs_http_ClientRequest,
//	'org.nodejs.http.ClientRequest:addListener' : org_nodejs_http_ClientRequest,
//
//	// http:ClientResponse
//	'org.nodejs.http.ClientResponse:on' : 		   org_nodejs_http_ClientResponse,
//	'org.nodejs.http.ClientResponse:once' : 	   org_nodejs_http_ClientResponse,
//	'org.nodejs.http.ClientResponse:addListener' : org_nodejs_http_ClientResponse,
//	
//	// http:Client
//	'org.nodejs.http.Client:on' : 		   org_nodejs_http_Client,
//	'org.nodejs.http.Client:once' : 	   org_nodejs_http_Client,
//	'org.nodejs.http.Client:addListener' : org_nodejs_http_Client,
//	
//	//------------------------
//	//    org.nodejs.repl
//	//------------------------
//	'org.nodejs.repl:on' : 			org_nodejs_repl,
//	'org.nodejs.repl:once' : 		org_nodejs_repl,
//	'org.nodejs.repl:addListener' : org_nodejs_repl,
//	
//	// child_process.ChildProcess
//	'org.nodejs.child_process.ChildProcess:on' : 			org_nodejs_child_process_ChildProcess,
//	'org.nodejs.child_process.ChildProcess:once' : 			org_nodejs_child_process_ChildProcess,
//	'org.nodejs.child_process.ChildProcess:addListener' : 	org_nodejs_child_process_ChildProcess,
//	
//	//------------------------
//	//   org.nodejs.domain
//	//------------------------
//	'org.nodejs.domain.Domain:on' : 			org_nodejs_domain_Domain,
//	'org.nodejs.domain.Domain:once' : 			org_nodejs_domain_Domain,
//	'org.nodejs.domain.Domain:addListener' : 	org_nodejs_domain_Domain,
//	
//	//------------------------
//	//   org.nodejs.cluster
//	//------------------------
//	'org.nodejs.cluster:on' : 			org_nodejs_cluster,
//	'org.nodejs.cluster:once' : 		org_nodejs_cluster,
//	'org.nodejs.cluster:addListener' : 	org_nodejs_cluster,
//	
//	'org.nodejs.cluster.Worker:on' : 			org_nodejs_cluster_Worker,
//	'org.nodejs.cluster.Worker:once' : 			org_nodejs_cluster_Worker,
//	'org.nodejs.cluster.Worker:addListener' : 	org_nodejs_cluster_Worker
//}

//
// var net = require('net') ; // Should resolve to org.nodejs.net
//


var factoryFunctionMappings = {
	'org.nodejs.node.require::_invoke_' : {
		'_debugger' :'org.nodejs._debugger',
		'_linklist' :'org.nodejs._linklist',
		'assert' :   'org.nodejs.assert',	
		'buffer' :   'org.nodejs.buffer',
		'child_process' : 'org.nodejs.child_process',
		'cluster' :  'org.nodejs.cluster',
		'console' :  'org.nodejs.console',
		'crypto' :   'org.nodejs.crypto',
		'dgram' :    'org.nodejs.dgram',
		'dns' :      'org.nodejs.dns',
		'domain' :   'org.nodejs.domain',
		'events' :   'org.nodejs.events',
		'freelist' : 'org.nodejs.freelist',
		'fs' :       'org.nodejs.fs',
		'http' :     'org.nodejs.http',
		'https' :    'org.nodejs.https',
		'net' :      'org.nodejs.net',
		'node' :     'org.nodejs.node',
		'os' :       'org.nodejs.os',
		'path' :     'org.nodejs.path',
		'punycode' : 'org.nodejs.punycode',
		'querystring' :    'org.nodejs.querystring',
		'readline' :       'org.nodejs.readline',
		'repl' :           'org.nodejs.repl',
		'string_decoder' : 'org.nodejs.string_decoder',
		'sys' :       'org.nodejs.sys',
		'tls' :       'org.nodejs.tls',
		'tty' :       'org.nodejs.tty',
		'url' :       'org.nodejs.url',
		'util' :      'org.nodejs.util',
		'vm' :        'org.nodejs.vm',
		'zlib' :	  'org.nodejs.zlib'
// TODO: MrP -- Move this out when we can support multiple project mappings...		
//'mongodb' :	  'org.nodejs.mongoDB.mongodb'
    }
}

//
// These are hardwired mappings for type assignment.  This approach is used to help
// support complex typing issues such as multiple inheritance and possibly other cases
// with synthetic and/or contextual inheritance.  This is done as an escape valve so
// such cases are not "forced" into and/or overly complicate the existing type model.
//
// The mappings do NOT infer inheritance at this point - this means if B is assignable
// to A via a mapping, then if C extends/implements B, it requires its own mapping to A
//
var ima = {
	'org.nodejs.stream.Duplex': 	'org.nodejs.stream.Writable',
    'org.nodejs.stream.Transform': 	'org.nodejs.stream.Writable',
    'org.nodejs.stream.PassThrough':'org.nodejs.stream.Writable',
    
    'org.nodejs.crypto.Hash': 		'org.nodejs.stream.Writable',
    'org.nodejs.crypto.Hmac': 		'org.nodejs.stream.Writable',
    'org.nodejs.crypto.Cipher': 	'org.nodejs.stream.Writable',
    'org.nodejs.crypto.Decipher': 	'org.nodejs.stream.Writable',
    
    'org.nodejs.net.Socket': 		'org.nodejs.stream.Writable',
    'org.nodejs.net.Server': 		'org.nodejs.stream.Writable',
    
    'org.nodejs.tty.ReadStream': 	'org.nodejs.stream.Writable',
    'org.nodejs.tty.WriteStream': 	'org.nodejs.stream.Writable',
    
    'org.nodejs.tls.Server': 		'org.nodejs.stream.Writable',
    
    'org.nodejs.http.Server': 		'org.nodejs.stream.Writable',
    
    'org.nodejs.https.Server': 		'org.nodejs.stream.Writable'
}

