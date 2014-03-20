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
 * This module has utilities for URL resolution and parsing. Call require('url') to use it.
 * <p>
 * Parsed URL objects have some or all of the following fields, depending on whether or not 
 * they exist in the URL string. Any parts that are not in the URL string will not be in the 
 * parsed object. Examples are shown for the URL:
 * <pre>
 * 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
 * </pre>
 * <ul>
 * <li>href: The full URL that was originally parsed. Both the protocol and host are lowercased.
 * Example: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
 * <li>protocol: The request protocol, lowercased.
 * Example: 'http:'
 * <li>host: The full lowercased host portion of the URL, including port information.
 * Example: 'host.com:8080'
 * <li>auth: The authentication information portion of a URL.
 * Example: 'user:pass'
 * <li>hostname: Just the lowercased hostname portion of the host.
 * Example: 'host.com'
 * <li>port: The port number portion of the host.
 * Example: '8080'
 * <li>pathname: The path section of the URL, that comes after the host and before the query, 
 * including the initial slash if present.  Example: '/p/a/t/h'
 * <li>search: The 'query string' portion of the URL, including the leading question mark.
 * Example: '?query=string'
 * <li>path: Concatenation of pathname and search.  
 * Example: '/p/a/t/h?query=string'
 * <li>query: Either the 'params' portion of the query string, or a querystring-parsed object. 
 * Example: 'query=string' or {'query':'string'}
 * <li>hash: The 'fragment' portion of the URL including the pound-sign.  Example: '#hash'
 * </ul>
 */
vjo.ctype('org.nodejs.url') 	//< public
.props({
	data: vjo.otype().defs({	//< public		
		/**
		 * Parsed URL objects have some or all of the following fields, depending on whether 
		 * or not they exist in the URL string. Any parts that are not in the URL string 
		 * will not be in the parsed object. Examples are shown for the URL:
		 * <pre>
		 * 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
		 * </pre>
		 */
		parsedURL: {			//< public	 
			/**
			 * The full URL that was originally parsed. Both the protocol and host are 
			 * lowercased.
			 * <p>Example: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
			 */
			href: null,			//< public String	
			
			/**
			 * The request protocol, lowercased.
			 * <p>Example: 'http'
			 */
			protocol: null,		//< public String?
			
			/**
			 * The authentication information portion of a URL.
			 * <p>Example: 'user:pass'
			 */
			auth: null,			//< public String?		
			
			/**
			 * Just the lowercased hostname portion of the host.
			 * <p>Example: 'host.com'
			 */
			hostname: null,		//< public String?
			
			/**
			 * The port number portion of the host.
			 * <p>Example: '8080'
			 */
			port: null,			//< public Number?				
				 			
			/**
			 * The full lowercased host portion of the URL, including port information.
			 * <p>Example: 'host.com:8080'
			 */
			host: null,			//< public String?	
			
			/**
			 * The path section of the URL, that comes after the host and before the query, 
			 * including the initial slash if present.
			 * <p>Example: '/p/a/t/h'
			 */
			pathname: null,		//< public String?	
			
//			/**
//			 * Concatenation of pathname and search.
//			 * <p>Example: '/p/a/t/h?query=string'
//			 */
//			path: null,			//< public String?
			
			/**
			 * Either the 'params' portion of the query string, or a querystring-parsed object.
			 * <p>Example: 'query=string' or {'query':'string'}
			 */
			query: null,		//< public String?	
							 			
			/**
			 * The 'query string' portion of the URL, including the leading question mark.
			 * <p>Example: '?query=string'
			 */
			search: null,		//< public String?
			
			/**
			 * The 'fragment' portion of the URL including the pound-sign.
			 * <p>Example: '#hash'
			 */
			hash: null			//< public String?
		}
	}).endType()
})
.protos({
	/**
	 * Take a URL string, and return an object.
	 * <p>
	 * Pass true as the second argument to also parse the query string using the querystring 
	 * module. Defaults to false.
	 * <p>
	 * Pass true as the third argument to treat //foo/bar as { host: 'foo', pathname: '/bar' } 
	 * rather than { pathname: '//foo/bar' }. Defaults to false.
	 */
	//> public url.data.parsedURL parse(String urlStr, boolean? parseQueryString, boolean? slashesDenoteHost)
	parse: vjo.NEEDS_IMPL,
	
	/**
	 * Take a parsed URL object, and return a formatted URL string.
	 * <ul>
	 * <li>href will be ignored.
	 * <li>protocol is treated the same with or without the trailing : (colon).
	 *   <ul>
	 *   <li>The protocols http, https, ftp, gopher, file will be postfixed 
	 *       with :// (colon-slash-slash).
	 *   <li>All other protocols mailto, xmpp, aim, sftp, foo, etc will be postfixed with 
	 *       : (colon)
	 *   </ul>
	 * </li>
	 * <li>auth will be used if present.
	 * <li>hostname will only be used if host is absent.
	 * <li>port will only be used if host is absent.
	 * <li>host will be used in place of hostname and port.
	 * <li>pathname is treated the same with or without the leading / (slash)
	 * <li>search will be used in place of query.
	 * <li>query (object; see querystring) will only be used if search is absent.
	 * <li>search is treated the same with or without the leading ? (question mark)
	 * <li>hash is treated the same with or without the leading # (pound sign, anchor)
	 * </ul>
	 */
	//> public String format(url.data.parsedURL parsedURL)
	format: vjo.NEEDS_IMPL,
	
	/**
	 * Take a base URL, and a href URL, and resolve them as a browser would for an anchor 
	 * tag.
	 */
	//> public String resolve(String from, String to)
	//> public String resolve(url.data.parsedURL from, url.data.parsedURL to)
	resolve: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();