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
 * Stability: 2 - Unstable; API changes are being discussed for future versions.  Breaking 
 * changes will be minimized.
 * <p>
 * Use require('crypto') to access this module.
 * <p>
 * The crypto module offers a way of encapsulating secure credentials to be used as part 
 * of a secure HTTPS net or http connection.
 * <p>
 * It also offers a set of wrappers for OpenSSL's hash, hmac, cipher, decipher, sign and 
 * verify methods.
 */
//> public
vjo.ctype('org.nodejs.crypto')
//< needs(org.nodejs.assert.AssertionError)
//< needs(org.nodejs.crypto.Hash)
//< needs(org.nodejs.buffer.Buffer)
.props({
	/**
	 * 
	 */
	data: vjo.otype().defs({ 	//< public
		/**
		 * If no 'ca' details are given, then node.js will use the default publicly trusted 
		 * list of CAs as given in
		 * http://mxr.mozilla.org/mozilla/source/security/nss/lib/ckfw/builtins/certdata.txt.
		 */
		createCredentialsDetails: {	//< public
			/**
			 * A string or buffer holding the PFX or PKCS12 encoded private key, certificate 
			 * and CA certificates
			 */
			pfx: null,	//< public {String | Buffer}?	
			
			/** A string holding the PEM encoded private key */
			key: null,			//< public String?	
			
			/** A string of passphrase for the private key or pfx */
			passphrase: null,	//< public String?
			/**
			 * A string holding the PEM encoded certificate
			 */
			cert: null,			//< public String?	
			
			
			/**
			 * Either a string or list of strings of PEM encoded CA certificates to trust.
			 */
			ca: null,			//< public {String | String[ ]}?
			
			/**
			 * Either a string or list of strings of PEM encoded CRLs (Certificate Revocation List)
			 */
			crl: null,			//< public {String | String[ ]}?
			
			 /**
			  * A string describing the ciphers to use or exclude. Consult 
			  * http://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT for details 
			  * on the format.
			  */
			ciphers: null		//< public String?
		}
	}).endType(),
	
	//> public
	func: vjo.otype().defs({
		/**
		 * 
		 */
		//> public void anyRandomBytesCb(Buffer bytes)
		anyRandomBytesCb: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void pbkdf2Cb(Error? err, Buffer? derivedKey)
		pbkdf2Cb: vjo.NEEDS_IMPL
	}).endType()
})
.protos({
	Hash: null,			//< public type::org.nodejs.crypto.Hash
	Hmac: null,			//< public type::org.nodejs.crypto.Hmac
	Cipher: null,		//< public type::org.nodejs.crypto.Cipher
	Decipher: null,		//< public type::org.nodejs.crypto.Decipher
	Signer: null,		//< public type::org.nodejs.crypto.Signer
	Verify: null,		//< public type::org.nodejs.crypto.Verify
	
	Credentials: null,	//< public type::org.nodejs.crypto.Credentials
	DiffieHellman: null,//< public type::org.nodejs.crypto.DiffieHellman	
	
	/**
	 * Returns an array with the names of the supported ciphers.
	 * <p>
	 * Example:
	 * <pre>
	 * var ciphers = crypto.getCiphers();
	 * console.log(ciphers); // ['AES-128-CBC', 'AES-128-CBC-HMAC-SHA1', ...]
	 * </pre>
	 */
	//> public String[ ] getCiphers()
	getCiphers: vjo.NEEDS_IMPL,
	
	/**
	 * Returns an array with the names of the supported hash algorithms.
	 * <p>
	 * Example:
	 * <pre>
	 * var hashes = crypto.getHashes();
	 * console.log(hashes); // ['sha', 'sha1', 'sha1WithRSAEncryption', ...]
	 * </pre>
	 */
	//> public String[ ] getHashes()
	getHashes: vjo.NEEDS_IMPL,
	
	/**
	 * 
	 */
	//> public crypto.Credentials createCredentials(crypto.data.createCredentialsDetails details)
	createCredentials: vjo.NEEDS_IMPL,
	
	/**
	 * Creates and returns a hash object, a cryptographic hash with the given 
	 * algorithm which can be used to generate hash digests.
	 * <p>algorithm is dependent on the available algorithms supported by the 
	 * version of OpenSSL on the platform. Examples are 'sha1', 'md5', 'sha256', 
	 * 'sha512', etc. On recent releases, openssl list-message-digest-algorithms 
	 * will display the available digest algorithms.
	 */
	//> public Hash createHash(String algorithm)
	createHash: vjo.NEEDS_IMPL,
	
	/**
	 * Creates and returns a hmac object, a cryptographic hmac with the given 
	 * algorithm and key.
	 * <p>algorithm is dependent on the available algorithms supported by OpenSSL 
	 * - see createHash. key is the hmac key to be used.
	 */
	//> public crypto.Hmac createHmac(String algorithm, String key)
	createHmac: vjo.NEEDS_IMPL,
	
	/**
	 * Creates and returns a cipher object, with the given algorithm and key.
	 * algorithm is dependent on OpenSSL, examples are 'aes192', etc. On recent 
	 * releases, openssl list-cipher-algorithms will display the available cipher 
	 * algorithms
	 */
	//> public crypto.Cipher createCipher(String algorithm, String password)
	createCipher: vjo.NEEDS_IMPL,
	
	//> public crypto.Cipher createCipheriv(Object cipher, String key, Object iv)
	createCipheriv: vjo.NEEDS_IMPL,
	
	/**
	 * Creates and returns a decipher object, with the given algorithm and key. 
	 * This is the mirror of the cipher object above.
	 */
	//> public crypt.Decipher createDecipher(String algorithm, String password)
	createDecipher: vjo.NEEDS_IMPL,
	
	/**
	 * Creates and returns a cipher object, with the given algorithm, key and iv.
	 * <p>
	 * algorithm is the same as the argument to createCipher(). key is the raw key used by 
	 * the algorithm. iv is an initialization vector.
	 * <p>
	 * key and iv must be 'binary' encoded strings or buffers.
	 */
	//> public crypt.Decipher createDecipheriv(String algorithm, {String | Buffer} key, {String | Buffer} iv)
	createDecipheriv: vjo.NEEDS_IMPL,
	
	/**
	 * Creates and returns a signing object, with the given algorithm. On recent 
	 * OpenSSL releases, openssl list-public-key-algorithms will display the 
	 * available signing algorithms. Examples are 'RSA-SHA256'.
	 */
	//> public crypto.Signer createSign(String algorithm)
	createSign: vjo.NEEDS_IMPL,
	
	/**
	 * Creates and returns a verification object, with the given algorithm. This 
	 * is the mirror of the signing object above.
	 */
	//> public crypto.Verifier createVerify(String algorithm)
	createVerify: vjo.NEEDS_IMPL,
	
	/**
	 * Creates a Diffie-Hellman key exchange object and generates a prime of the given bit 
	 * length. The generator used is 2.
	 */
	//> public crypto.DiffieHellman createDiffieHellman(int prime_length)
	/**
	 * Creates a Diffie-Hellman key exchange object using the supplied prime. The generator 
	 * used is 2. Encoding can be 'binary', 'hex', or 'base64'. If no encoding is specified,
	 * then a buffer is expected.
	 */
	//> public crypto.DiffieHellman createDiffieHellman(String prime, String? encoding)
	createDiffieHellman: vjo.NEEDS_IMPL,
	
	/**
	 * Creates a predefined Diffie-Hellman key exchange object. The supported groups are: 
	 * 'modp1', 'modp2', 'modp5' (defined in RFC 2412) and 'modp14', 'modp15', 'modp16', 
	 * 'modp17', 'modp18' (defined in RFC 3526). The returned object mimics the interface 
	 * of objects created by crypto.createDiffieHellman() above, but will not allow to 
	 * change the keys (with diffieHellman.setPublicKey() for example). The advantage of 
	 * using this routine is that the parties don't have to generate nor exchange group 
	 * modulus beforehand, saving both processor and communication time.
	 * <p>
	 * Example (obtaining a shared secret):
	 * <pre>
	 * var crypto = require('crypto');
	 * var alice = crypto.getDiffieHellman('modp5');
	 * var bob = crypto.getDiffieHellman('modp5');
	 * 
	 * alice.generateKeys();
	 * bob.generateKeys();
	 * 
	 * var alice_secret = alice.computeSecret(bob.getPublicKey(), null, 'hex');
	 * var bob_secret = bob.computeSecret(alice.getPublicKey(), null, 'hex');
	 * // alice_secret and bob_secret should be the same 
	 * console.log(alice_secret == bob_secret);
	 */
	//> public crypto.DiffieHellman getDiffieHellman(String group_name) 
	getDiffieHellman: vjo.NEEDS_IMPL,
	
	/**
	 * Asynchronous PBKDF2 applies pseudorandom function HMAC-SHA1 to derive a key of given 
	 * length from the given password, salt and iterations. The callback gets two arguments 
	 * (err, derivedKey).
	 */
	//> public Buffer pbkdf2Sync(String password, String salt, int iterations, int keylen, crypto.func:pbkdf2Cb)
	pbkdf2: vjo.NEEDS_IMPL,
	
	/**
	 * Synchronous PBKDF2 function. Returns derivedKey or throws error.
	 */
	//> public Buffer pbkdf2Sync(String password, String salt, int iterations, int keylen)
	pbkdf2Sync: vjo.NEEDS_IMPL,
	
	/**
	 * Generates cryptographically strong pseudo-random data. Usage:
	 * <pre>
	 * // async
	 * crypto.randomBytes(256, function(ex, buf) {
	 *   if (ex) throw ex;
	 *     console.log('Have %d bytes of random data: %s', buf.length, buf);
	 *   }
	 * );
	 * 
	 * // sync
	 * try {
	 *   var buf = crypto.randomBytes(256);
	 *   console.log('Have %d bytes of random data: %s', buf.length, buf);
	 * } catch (ex) {
	 *   // handle error
	 * }
	 * </pre>
	 */
	//> public Buffer randomBytes(int size, crypto.func:anyRandomBytesCb? callback)
	randomBytes: vjo.NEEDS_IMPL,
	
	/**
	 * Generates non-cryptographically strong pseudo-random data. The data returned will 
	 * be unique if it is sufficiently long, but is not necessarily unpredictable. For this 
	 * reason, the output of this function should never be used where unpredictability is 
	 * important, such as in the generation of encryption keys.
	 * <p>
	 * Usage is otherwise identical to crypto.randomBytes.
	 */
	//> public void pseudoRandomBytes(int size, crypto.func:anyRandomBytesCb? callback)
	pseudoRandomBytes: vjo.NEEDS_IMPL,
	
	/**
	 * The default encoding to use for functions that can take either strings or buffers. 
	 * The default value is 'buffer', which makes it default to using Buffer objects. This 
	 * is here to make the crypto module more easily compatible with legacy programs that 
	 * expected 'binary' to be the default encoding.
	 * <p>
	 * Note that new programs will probably expect buffers, so only use this as a temporary 
	 * measure.
	 */
	DEFAULT_ENCODING: null,		//< public String
	
	/**
	 * 
	 */
	//> public final String[] ; should be able to use null value (MrP)
	RootCaCerts: [ ]
})
.options({ metatype: true })
.endType();