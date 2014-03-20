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
 * Stability: 3 - Stable
 * <p>
 * Use require('dns') to access this module. All methods in the dns module use C-Ares except 
 * for dns.lookup which uses getaddrinfo(3) in a thread pool. C-Ares is much faster than 
 * getaddrinfo but the system resolver is more constant with how other programs operate. 
 * When a user does net.connect(80, 'google.com') or http.get({ host: 'google.com' }) the 
 * dns.lookup method is used. Users who need to do a large number of look ups quickly should 
 * use the methods that go through C-Ares.
 * <p>
 * Here is an example which resolves 'www.google.com' then reverse resolves the IP addresses 
 * which are returned.
 * <pre>
 * var dns = require('dns');
 * 
 * dns.resolve4('www.google.com', function (err, addresses) {
 *   if (err) throw err;
 *   console.log('addresses: ' + JSON.stringify(addresses));
 *   
 *   addresses.forEach(function (a) {
 *     dns.reverse(a, function (err, domains) {
 *       if (err) {
 *         throw err;
 *       }
 *       console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
 *     });
 *   });
 * });
 * </pre>
 * <h3>Error codes</h3>
 * Each DNS query can return one of the following error codes:
 * <ul>
 * <li>dns.NODATA: DNS server returned answer with no data.
 * <li>dns.FORMERR: DNS server claims query was misformatted.
 * <li>dns.SERVFAIL: DNS server returned general failure.
 * <li>dns.NOTFOUND: Domain name not found.
 * <li>dns.NOTIMP: DNS server does not implement requested operation.
 * <li>dns.REFUSED: DNS server refused query.
 * <li>dns.BADQUERY: Misformatted DNS query.
 * <li>dns.BADNAME: Misformatted domain name.
 * <li>dns.BADFAMILY: Unsupported address family.
 * <li>dns.BADRESP: Misformatted DNS reply.
 * <li>dns.CONNREFUSED: Could not contact DNS servers.
 * <li>dns.TIMEOUT: Timeout while contacting DNS servers.
 * <li>dns.EOF: End of file.
 * <li>dns.FILE: Error reading file.
 * <li>dns.NOMEM: Out of memory.
 * <li>dns.DESTRUCTION: Channel is being destroyed.
 * <li>dns.BADSTR: Misformatted string.
 * <li>dns.BADFLAGS: Illegal flags specified.
 * <li>dns.NONAME: Given hostname is not numeric.
 * <li>dns.BADHINTS: Illegal hints flags specified.
 * <li>dns.NOTINITIALIZED: c-ares library initialization not yet performed.
 * <li>dns.LOADIPHLPAPI: Error loading iphlpapi.dll.
 * <li>dns.ADDRGETNETWORKPARAMS: Could not find GetNetworkParams function.
 * <li>dns.CANCELLED: DNS query cancelled.
 * </ul>
 */
//> public
vjo.ctype('org.nodejs.dns') 
.props({ 
	/**
	 * 
	 */
	//> public
	callback: vjo.otype().defs({
		/**
		 * 
		 */
		//> public void lookup(Error? err, String? address, int? family)
		lookup: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void resolve(Error? err, String[ ]? addresses)
		//> public void resolve(Error? err, dns.data.resolveMxAddress[ ]? addresses)
		//> public void resolve(Error? err, dns.data.resolveSrvAddress[ ]? addresses)
		resolve: vjo.NEEDS_IMPL,
		
		/**
		 * Addresses of format: ['74.125.79.104', '74.125.79.105']
		 */
		//> public void resolve4(Error? err, String[ ]? addresses)
		resolve4: vjo.NEEDS_IMPL, 
		
		/**
		 * Addresses of format: ['74.125.79.104.01.02', '74.125.79.105.01.02']
		 */
		//> public void resolve6(Error? err, String[ ]? addresses)
		resolve6: vjo.NEEDS_IMPL,
		
		/**
		 * Addresses of format: [{'priority': 10, 'exchange': 'mx.example.com'},...]
		 */
		//> public void resolveMx(Error? err, dns.data.resolveMxAddress[ ]? addresses)
		resolveMx: vjo.NEEDS_IMPL,
		
		/**
		 * ex: ['v=spf1 ip4:0.0.0.0 ~all']
		 */
		//> public void resolveTxt(Error? err, String[ ]? addresses)
		resolveTxt: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void resolveSrv(Error? err, dns.data.resolveSrvAddress[ ]? addresses)
		resolveSrv: vjo.NEEDS_IMPL,		
		
		/**
		 * 
		 */
		//> public void resolveCname(Error? err, String[ ]? addresses)
		resolveCname: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void resolveNs(Error? err, String[ ]? addressess)
		resolveNs: vjo.NEEDS_IMPL,
		
		/**
		 * 
		 */
		//> public void reverse(Error? err, String[ ]? domainNames)
		reverse: vjo.NEEDS_IMPL
	}).endType(),
	
	/**
	 * 
	 */
	//> public
	data: vjo.otype().defs({ 	//< public
		/**
		 * 
		 */
		resolveMxAddress: {	 	//< public
			/**
			 * 
			 */
			priority: null,		//< public int
			
			/**
			 * 
			 */
			exchange: null		//< public String
		},
	
		/**
		 * [{'priority': 10, 'weight': 5, 'port': 21223, 'name': 'service.example.com'}, ...]
		 */
		resolveSrvAddress: {	//< public
			
			/**
			 * 
			 */
			priority: null,		//< public int	
			
			/**
			 * 
			 */
			weight: null,		//< public int	
			
			/**
			 * 
			 */
			port: null,			//< public int	
			
			/**
			 * 
			 */
			name: null			//< public String		
		}
	}).endType()
})
.protos({
	/**
	 * Resolves a domain (e.g. 'google.com') into the first found A (IPv4) or AAAA (IPv6) 
	 * record. The family can be the integer 4 or 6. Defaults to null that indicates both 
	 * Ip v4 and v6 address family.
	 * <p>
	 * The callback has arguments (err, address, family). The address argument is a string
	 * representation of a IP v4 or v6 address. The family argument is either the integer 
	 * 4 or 6 and denotes the family of address (not necessarily the value initially passed 
	 * to lookup).
	 * <p>
	 * On error, err is an Error object, where err.code is the error code. Keep in mind 
	 * that err.code will be set to 'ENOENT' not only when the domain does not exist but 
	 * also when the lookup fails in other ways such as no available file descriptors.
	 */
	//> public Object lookup(String domain, org.nodejs.dns.callback:lookup callback)
	//> public Object lookup(String domain, int family, org.nodejs.dns.callback:lookup callback)
	lookup: vjo.NEEDS_IMPL,
	
	/**
	 * Resolves a domain (e.g. 'google.com') into an array of the record types specified by 
	 * rrtype. Valid rrtypes are 'A' (IPV4 addresses, default), 'AAAA' (IPV6 addresses), 
	 * 'MX' (mail exchange records), 'TXT' (text records), 'SRV' (SRV records), 'PTR' 
	 * (used for reverse IP lookups), 'NS' (name server records) and 'CNAME' (canonical 
	 * name records).
	 * <p>
	 * The callback has arguments (err, addresses). The type of each item in addresses is 
	 * determined by the record type, and described in the documentation for the corresponding 
	 * lookup methods below.
	 * <p>
	 * On error, err is an Error object, where err.code is one of the error codes listed below.
	 */
	//> public Object resolve(String domain, org.nodejs.dns.callback:resolve callback)
	//> public Object resolve(String domain, String rrtype, org.nodejs.dns.callback:resolve callback) 
	resolve: vjo.NEEDS_IMPL,
	
	/**
	 * The same as dns.resolve(), but only for IPv4 queries (A records). addresses is an 
	 * array of IPv4 addresses (e.g. ['74.125.79.104', '74.125.79.105', '74.125.79.106']).
	 */
	//> public Object resolve4(String domain, org.nodejs.dns.callback:resolve4 callback)
	resolve4: vjo.NEEDS_IMPL,
	
	/**
	 * The same as dns.resolve4() except for IPv6 queries (an AAAA query).
	 */
	//> public Object resolve6(String domain, org.nodejs.dns.callback:resolve6 callback)
	resolve6: vjo.NEEDS_IMPL,
	
	/**
	 * The same as dns.resolve(), but only for mail exchange queries (MX records).
	 * <p>
	 * addresses is an array of MX records, each with a priority and an exchange attribute 
	 * (e.g. [{'priority': 10, 'exchange': 'mx.example.com'},...]).
	 */
	//> public Object resolveMx(String domain, org.nodejs.dns.callback:resolveMx callback)
	resolveMx: vjo.NEEDS_IMPL,
	
	/**
	 * The same as dns.resolve(), but only for text queries (TXT records). addresses is an 
	 * array of the text records available for domain (e.g., ['v=spf1 ip4:0.0.0.0 ~all']).
	 */
	//> public Object resolveTxt(String domain, org.nodejs.dns.callback:resolveTxt callback)
	resolveTxt: vjo.NEEDS_IMPL,
	
	/**
	 * The same as dns.resolve(), but only for service records (SRV records). addresses is 
	 * an array of the SRV records available for domain. Properties of SRV records are 
	 * priority, weight, port, and name 
	 * (e.g., [{'priority': 10, {'weight': 5, 'port': 21223, 'name': 'service.example.com'}, ...]).
	 */
	//> public Object resolveSrv(String domain, org.nodejs.dns.callback:resolveSrv callback)
	resolveSrv: vjo.NEEDS_IMPL,
	
	/**
	 * The same as dns.resolve(), but only for name server records (NS records). addresses 
	 * is an array of the name server records available for domain 
	 * (e.g., ['ns1.example.com', 'ns2.example.com']).
	 */
	//> public Object resolveNs(String domain, org.nodejs.dns.callback:resolveNs callback)
	resolveNs: vjo.NEEDS_IMPL,
	
	/**
	 * The same as dns.resolve(), but only for canonical name records (CNAME records). 
	 * addresses is an array of the canonical name records available for domain 
	 * (e.g., ['bar.example.com']).
	 */
	//> public Object resolveCname(String domain, org.nodejs.dns.callback:resolveCname callback)
	resolveCname: vjo.NEEDS_IMPL,
	
	/**
	 * Reverse resolves an ip address to an array of domain names.
	 * <p>
	 * The callback has arguments (err, domains).
	 * <p>
	 * On error, err is an Error object, where err.code is one of the error codes listed 
	 * below.
	 */
	//> public Object reverse(String ip, org.nodejs.dns.callback:reverse callback)
	reverse: vjo.NEEDS_IMPL,
	
	/**
	 * Error codes
	 * <p>Each DNS query can return one of the following error codes:
	 */

	/** DNS server returned answer with no data. */
	//> public final int
	NODATA: -1,
	
	/** DNS server claims query was misformatted. */
	//> public final int
	FORMERR: -1,
	
	/** DNS server returned general failure. */
	//> public final int
	SERVFAIL: -1,
	
	/** Domain name not found. */
	//> public final int
	NOTFOUND: -1,
	
	/** DNS server does not implement requested operation. */
	//> public final int
	NOTIMP: -1,
	
	/** DNS server refused query. */
	//> public final int
	REFUSED: -1,
	
	/** Misformatted DNS query. */
	//> public final int
	BADQUERY: -1,
	
	/** Misformatted domain name. */
	//> public final int
	BADNAME: -1,
	
	/** Unsupported address family. */
	//> public final int
	BADFAMILY: -1,
	
	/** Misformatted DNS reply. */
	//> public final int
	BADRESP: -1,
	
	/** Could not contact DNS servers. */
	//> public final int
	CONNREFUSED: -1,
	
	/** Timeout while contacting DNS servers. */
	//> public final int
	TIMEOUT: -1,
	
	/** End of file. */
	//> public final int
	EOF: -1,
	
	/** Error reading file. */
	//> public final int
	FILE: -1,
	
	/** Out of memory. */
	//> public final int
	NOMEM: -1,
	
	/** Channel is being destroyed. */
	//> public final int
	DESTRUCTION: -1,
	
	/** Misformatted string. */
	//> public final int
	BADSTR: -1,
	
	/** Illegal flags specified. */
	//> public final int
	BADFLAGS: -1,
	
	/** Given hostname is not numeric. */
	//> public final int
	NONAME: -1,
	
	/** Illegal hints flags specified. */
	//> public final int
	BADHINTS: -1,
	
	/** c-ares library initialization not yet performed. */
	//> public final int
	NOTINITIALIZED: -1,
	
	/** Error loading iphlpapi.dll. */
	//> public final int
	LOADIPHLPAPI: -1,
	
	/** Could not find GetNetworkParams function. */
	//> public final int
	ADDRGETNETWORKPARAMS: -1,
	
	/** DNS query cancelled. */
	//> public final int
	CANCELLED: -1
})
.options({ metatype: true })
.endType();