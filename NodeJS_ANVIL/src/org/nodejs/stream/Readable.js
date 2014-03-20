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
 */
 vjo.ctype('org.nodejs.stream.Readable') //< public
//< needs(org.nodejs.stream.Writable)
//< needs(org.nodejs.buffer.Buffer)
.inherits('org.nodejs.stream')
.props({
	//> public
	data: vjo.otype().defs({
		constructsOptions: {	//< public
			/**
			 * The maximum number of bytes to store in the internal buffer before ceasing 
			 * to read from the underlying resource. Default=16kb
			 */
			highWaterMark: null,//< public Number?
			
			/**
			 * If specified, then buffers will be decoded to strings using the specified 
			 * encoding. Default=null
			 */
			encoding: null,		//< public String?
			
			/**
			 * Whether this stream should behave as a stream of objects. Meaning that 
			 * stream.read(n) returns a single value instead of a Buffer of size n
			 */
			objectMode: null	//< public boolean
		},
		
		pipeOptions: {			//< public
			end: null,			//< public boolean?	
			chunkSize: null		//< public int? ; from inspecting _stream_readable.js
		}
	}).endType(),
	
	//> public
	event: vjo.otype().defs({
		/**
		 * When there is data ready to be consumed, this event will fire.
		 * <p>
		 * When this event emits, call the read() method to consume the data.
		 */
		//> public void readable()
		readable: vjo.NEEDS_IMPL,
							
		/**
		 * function () { }
		 * <p>
		 * Emitted when the stream has received an EOF (FIN in TCP terminology). Indicates 
		 * that no more 'data' events will happen. If the stream is also writable, it may 
		 * be possible to continue writing.
		 */
		//> public void end()
		end: vjo.NEEDS_IMPL,
		
		/**
		 * function (data) { }
		 * <p>
		 * The 'data' event emits either a Buffer (by default) or a string if setEncoding() 
		 * was used.
		 * <p>
		 * Note that the <b>data will be lost</b> if there is no listener when a Readable
		 *  Stream emits a 'data' event.
		 */
		//> public void data({String | Buffer} data)
		data: vjo.NEEDS_IMPL,
		
		/**
		 * function (exception) { }
		 * <p>
		 * Emitted if there was an error receiving data.
		 */
		//> public void error(Error? exception)
		error: vjo.NEEDS_IMPL,
		
		/**
		 * function () { }
		 * <p>
		 * Emitted when the underlying resource (for example, the backing file descriptor) 
		 * has been closed.  Not all streams will emit this.
		 */
		//> public void close()
		close: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	/**
	 * In classes that extend the Readable class, make sure to call the constructor so that 
	 * the buffering settings can be properly initialized.
	 */
	//> public constructs(Readable.data.constructsOptions? options)
	constructs : vjo.NEEDS_IMPL,
	
	/**
	 * Note: This function should NOT be called directly. It should be implemented by child 
	 * classes, and called by the internal Readable class methods only.
	 */
	//> public Object _read(Number size)
	_read: vjo.NEEDS_IMPL,
	
	/**
	 * Note: This function should be called by Readable implementors, NOT by consumers of 
	 * Readable subclasses. The _read() function will not be called again until at least 
	 * one push(chunk) call is made. If no data is available, then you MAY call push('') 
	 * (an empty string) to allow a future _read call, without adding any data to the queue.
	 * <p>
	 * The Readable class works by putting data into a read queue to be pulled out later 
	 * by calling the read() method when the 'readable' event fires.
	 * <p>
	 * The push() method will explicitly insert some data into the read queue. If it is 
	 * called with null then it will signal the end of the data.
	 * <p>
	 * In some cases, you may be wrapping a lower-level source which has some sort of 
	 * pause/resume mechanism, and a data callback. In those cases, you could wrap the 
	 * low-level source object by doing something like this:
	 * <pre>
	 * // source is an object with readStop() and readStart() methods,
	 * // and an `ondata` member that gets called when it has data, and
	 * // an `onend` member that gets called when the data is over.
	 * 
	 * var stream = new Readable();
	 * 
	 * source.ondata = function(chunk) {
	 *   // if push() returns false, then we need to stop reading from source
	 *   if (!stream.push(chunk))
	 *     source.readStop();
	 * };
	 * 
	 * source.onend = function() {
	 *   stream.push(null);
	 * };
	 * 
	 * // _read will be called when the stream wants to pull more data in
	 * // the advisory size argument is ignored in this case.
	 * stream._read = function(n) {
	 *   source.readStart();
	 * };
	 * </pre>
	 */
	//> public boolean push({String | Buffer} chunk)
	push: vjo.NEEDS_IMPL,
	
	/**
	 * This is the corollary of readable.push(chunk). Rather than putting the data at the 
	 * end of the read queue, it puts it at the front of the read queue.
	 * <p>
	 * This is useful in certain use-cases where a stream is being consumed by a parser, 
	 * which needs to "un-consume" some data that it has optimistically pulled out of the 
	 * source.
	 * <pre>
	 * // A parser for a simple data protocol.
	 * // The "header" is a JSON object, followed by 2 \n characters, and
	 * // then a message body.
	 * //
	 * // Note: This can be done more simply as a Transform stream.  See below.
	 * function SimpleProtocol(source, options) {
	 *   if (!(this instanceof SimpleProtocol))
	 *     return new SimpleProtocol(options);
	 *   Readable.call(this, options);
	 *   this._inBody = false;
	 *   this._sawFirstCr = false;
	 *   
	 *   // source is a readable stream, such as a socket or file
	 *   this._source = source;
	 *   
	 *   var self = this;
	 *   source.on('end', function() {
	 *     self.push(null);
	 *   });
	 *   
	 *   // give it a kick whenever the source is readable
	 *   // read(0) will not consume any bytes
	 *   source.on('readable', function() {
	 *     self.read(0);
	 *   });
	 *   
	 *   this._rawHeader = [];
	 *   this.header = null;
	 * }
	 * 
	 * SimpleProtocol.prototype = Object.create(
	 *   Readable.prototype, { constructor: { value: SimpleProtocol }}
	 * );
	 * 
	 * SimpleProtocol.prototype._read = function(n) {
	 *   if (!this._inBody) {
	 *     var chunk = this._source.read();
	 *     
	 *     // if the source doesn't have data, we don't have data yet.
	 *   if (chunk === null) return this.push('');
	 *   
	 *   // check if the chunk has a \n\n
	 *   var split = -1;
	 *   for (var i = 0; i < chunk.length; i++) {
	 *     if (chunk[i] === 10) { // '\n'
	 *       if (this._sawFirstCr) {
	 *         split = i;
	 *         break;
	 *       } else {
	 *         this._sawFirstCr = true;
	 *       }
	 *     } else {
	 *     this._sawFirstCr = false;
	 *   }
	 * }
	 * 
	 * if (split === -1) {
	 *   // still waiting for the \n\n
	 *   // stash the chunk, and try again.
	 *   this._rawHeader.push(chunk);
	 *   this.push('');
	 * } 
	 * else {
	 *   this._inBody = true;
	 *   var h = chunk.slice(0, split);
	 *   this._rawHeader.push(h);
	 *   var header = Buffer.concat(this._rawHeader).toString();
	 *   try {
	 *     this.header = JSON.parse(header);
	 *   } catch (er) {
	 *     this.emit('error', new Error('invalid simple protocol data'));
	 *     return;
	 *   }
	 *   
	 *   // now, because we got some extra data, unshift the rest
	 *   // back into the read queue so that our consumer will see it.
	 *   var b = chunk.slice(split);
	 *   this.unshift(b);
	 *   
	 *   // and let them know that we are done parsing the header.
	 *   this.emit('header', this.header);
	 * }
	 * } else {
	 *   // from there on, just provide the data to our consumer.
	 *   // careful not to push(null), since that would indicate EOF.
	 *   var chunk = this._source.read();
	 *   if (chunk) this.push(chunk);
	 * }
	 * };
	 * 
	 * // Usage:
	 * var parser = new SimpleProtocol(source);
	 * // Now parser is a readable stream that will emit 'header'
	 * // with the parsed header data.
	 * </pre>
	 */
	//> public boolean unshift({String | Buffer} chunk)
	unshift: vjo.NEEDS_IMPL,
	
	/**
	 * If you are using an older Node library that emits 'data' events and has a pause() 
	 * method that is advisory only, then you can use the wrap() method to create a Readable 
	 * stream that uses the old stream as its data source.
	 * <p>
	 * For example:
	 * <pre>
	 * var OldReader = require('./old-api-module.js').OldReader;
	 * var oreader = new OldReader;
	 * var Readable = require('stream').Readable;
	 * var myReader = new Readable().wrap(oreader);
	 * 
	 * myReader.on('readable', function() {
	 *   myReader.read(); // etc.
	 * });
	 * </pre>
	 */
	//> public Readable wrap(stream stream)
	wrap: vjo.NEEDS_IMPL,
	
	/**
	 * Makes the 'data' event emit a string instead of a Buffer. encoding can be 'utf8', 
	 * 'utf16le' ('ucs2'), 'ascii', or 'hex'. Defaults to 'utf8'.
	 */
	//> public void setEncoding(String? encoding)
	setEncoding: vjo.NEEDS_IMPL,  // TODO: MrP - make this a String enum?
	
	/**
	 * Note: This function SHOULD be called by Readable stream users.
	 * <p>
	 * Call this method to consume data once the 'readable' event is emitted.
	 * <p>
	 * The size argument will set a minimum number of bytes that you are interested in. If 
	 * not set, then the entire content of the internal buffer is returned.
	 * <p>
	 * If there is no data to consume, or if there are fewer bytes in the internal buffer 
	 * than the size argument, then null is returned, and a future 'readable' event will be 
	 * emitted when more is available.
	 * <p>
	 * Calling stream.read(0) will always return null, and will trigger a refresh of the 
	 * internal buffer, but otherwise be a no-op.
	 */
	//> public {String | Buffer} read(Number? size)
	read: vjo.NEEDS_IMPL,
	
	/**
	 * This is a Stream.prototype method available on all Streams.
	 * <p>
	 * Connects this read stream to destination WriteStream. Incoming data on this stream 
	 * gets written to destination. The destination and source streams are kept in sync by 
	 * pausing and resuming as necessary.
	 * <p>
	 * This function returns the destination stream.
	 * <p>
	 * Emulating the Unix cat command:
	 * <pre>
	 * process.stdin.resume(); process.stdin.pipe(process.stdout);
	 * </pre>
	 * By default end() is called on the destination when the source stream emits end, so 
	 * that destination is no longer writable. Pass { end: false } as options to keep the 
	 * destination stream open.
	 * <p>
	 * This keeps process.stdout open so that "Goodbye" can be written at the end.
	 * <pre>
	 * process.stdin.resume();
	 * 
	 * process.stdin.pipe(process.stdout, { end: false });
	 * 
	 * process.stdin.on("end", function() {
	 *   process.stdout.write("Goodbye\n"); 
	 * });
	 * </pre>
	 */
	//> public Writable pipe(Writable destination, stream.data.pipeOptions? options)
	pipe: vjo.NEEDS_IMPL,
	
	/**
	 * Undo a previously established pipe(). If no destination is provided, then all 
	 * previously established pipes are removed.
	 */
	//> public void unpipe(Writable? destination)
	unpipe: vjo.NEEDS_IMPL,
	
//	/**
//	 * A boolean that is true by default, but turns false after an 'error' occurred, the 
//	 * stream came to an 'end', or destroy() was called.
//	 */
//	//> public boolean
//	readable: null,
	
	/**
	 * Issues an advisory signal to the underlying communication layer, requesting that no 
	 * further data be sent until resume() is called.
	 * <p>
	 * Note that, due to the advisory nature, certain streams will not be paused immediately, 
	 * and so 'data' events may be emitted for some indeterminate period of time even after 
	 * pause() is called. You may wish to buffer such 'data' events.
	 */
	//> public void pause()
	pause: vjo.NEEDS_IMPL,
	
	/**
	 * Resumes the incoming 'data' events after a pause().
	 */
	//> public void resume()
	resume: vjo.NEEDS_IMPL,
	
//	/**
//	 * Closes the underlying file descriptor. Stream is no longer writable nor readable. 
//	 * The stream will not emit any more 'data', or 'end' events. Any queued write data 
//	 * will not be sent. The stream should emit 'close' event once its resources have been 
//	 * disposed of.
//	 */
//	//> public void destroy()
//	destroy: vjo.NEEDS_IMPL,
	
	//------------------------------------------------------------------------------------
	// EventEmitter overrides to return correct type so you can use chain-style functions.
	// *** NOTE *** Do not modify these separately as they are literally copied from the
	// org.nodejs.events.EventEmitter type.  Later when we have a way to return the target
	// type of a mixin will allow us to factor all this copying away...
	//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
		/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Readable ^addListener(String type, Function listener)
	addListener: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a listener to the end of the listeners array for the specified event.
	 * <pre>
	 * server.on('connection', function (stream) {
	 *   console.log('someone connected!');
	 * });
	 * </pre>
	 */
	//> public Readable ^on(String type, Function listener)
	on: vjo.NEEDS_IMPL,
	
	/**
	 * Adds a one time listener for the event. This listener is invoked only the 
	 * next time the event is fired, after which it is removed.
	 * <pre>
	 * server.once('connection', function (stream) {
	 *   console.log('Ah, we have our first user!');
	 * });
	 * </pre>
	 */
	//> public Readable ^once(String event, Function listener)
	once: vjo.NEEDS_IMPL,
	
	/**
	 * Remove a listener from the listener array for the specified event. 
	 * <p>
	 * Caution: changes array indices in the listener array behind the listener.
	 * <pre>
	 * var callback = function(stream) {
	 *   console.log('someone connected!');
	 * };
	 * server.on('connection', callback);
	 * // ...
	 * server.removeListener('connection', callback);
	 * </pre>
	 */
	//> public Readable removeListener(String type, Function listener)
	removeListener: vjo.NEEDS_IMPL,
	
	/**
	 * Removes all listeners, or those of the specified event.
	 * <p>
	 * Note that this will invalidate any arrays that have previously been returned 
	 * by emitter.listeners(event).
	 */
	//> public Readable removeAllListeners(String? event)
	removeAllListeners: vjo.NEEDS_IMPL
	//^^^^^^^^^^^^^^^^^^^^^ END COPY OF FUNCTIONS FROM EventEmitter ^^^^^^^^^^^^^^^^^^^^^^
})
.options({ metatype: true })
.endType()