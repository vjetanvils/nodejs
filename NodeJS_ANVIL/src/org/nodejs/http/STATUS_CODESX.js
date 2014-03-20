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
 * Named description of HTTP status codes to the int code value.
 */
vjo.ctype('org.nodejs.http.STATUS_CODESX') //< public
.props({
	Continue: 100,				//< public final int
	Switching_Protocols: 101,	//< public final int
	/** // RFC 2518, obsoleted by RFC 4918 */
	Processing: 102,			//< public final int
	OK: 200,					//< public final int
	Created: 201,				//< public final int
	Accepted: 202,				//< public final int
	Non_Authoritative_Information: 203, //< public final int
	No_Content: 204,			//< public final int
	Reset_Content: 205,			//< public final int
	Partial_Content: 206,		//< public final int
	/** RFC 4918 */
	Multi_Status: 207,			//< public final int
	Multiple_Choices: 300,		//< public final int
	Moved_Permanently: 301,		//< public final int
	Moved_Temporarily: 302,		//< public final int
	See_Other: 303,				//< public final int
	Not_Modified: 304,			//< public final int
	Use_Proxy: 305,				//< public final int
	Temporary_Redirect: 307,	//< public final int
	Bad_Request: 400,			//< public final int
	Unauthorized: 401, 			//< public final int
	Payment_Required: 402,		//< public final int
	Forbidden: 403,				//< public final int
	Not_Found: 404,				//< public final int
	Method_Not_Allowed: 405,	//< public final int
	Not_Acceptable: 406,		//< public final int
	Proxy_Authentication_Required: 407, //< public final int
	Request_Time_out: 408,		//< public final int
	Conflict: 409,				//< public final int
	Gone: 410,					//< public final int
	Length_Required: 411,		//< public final int
	Precondition_Failed: 412,	//< public final int
	Request_Entity_Too_Large: 413, //< public final int
	Request_URI_Too_Large: 414,	//< public final int
	Unsupported_Media_Type: 415,//< public final int
	Request_Range_Not_Satisfiable: 416, //< public final int
	Expectation_Failed: 417,	//< public final int
	
	/** RFC 2324 */
	I_am_a_teapot: 418,			//< public final int

	/** RFC 4918 */
	Unprocessable_Entity: 422,	//< public final int
	
	/** RFC 4918 */
	Locked: 423,				//< public final int

	/** RFC 4918 */
	Failed_Dependency: 424,		//< public final int
	
	/** RFC 4918 */
	Unordered_Collection: 425,	//< public final int
	
	/** RFC 2817 */
	Upgrade_Required: 426,		//< public final int
	
	/** RFC 6585 */
	Precondition_Required: 428,	//< public final int
	
	/** RFC 6585 */
	Too_Many_Requests: 429,		//< public final int

	/** RFC 6585 */
	Request_Header_Fields_Too_Large: 431, //< public final int
	
	Internal_Server_Error: 500,	//< public final int
	Not_Implemented: 501,		//< public final int
	Bad_Gateway: 502,			//< public final int
	Service_Unavailable: 503,	//< public final int
	Gateway_Time_out: 504,		//< public final int
	HTTP_Version_not_supported: 505, //< public final int
	
	/** RFC 2295 */
	Variant_Also_Negotiates: 506, //< public final int

	/** RFC 4918 */
	Insufficient_Storage: 507,	//< public final int
 
	Bandwidth_Limit_Exceeded: 509, //< public final int
	
	/** RFC 2774 */
	Not_Extended: 510,			//< public final int
	
	/** RFC 6585 */
	Network_Authentication_Required: 511		
})
.options({ metatype: true })
.endType()