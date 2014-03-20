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
 * Stability: 5 - Locked
 * <p>
 * This module is used for writing unit tests for your applications, you can access it 
 * with require('assert').
 * <p>
 * 
 */
vjo.ctype('org.nodejs.assert')  //< public
.props({ })
.protos({		
	//>  public type::assert.AssertionError
	AssertionError: null, 
	
	//
	// Constructor
	//
	/**
	 * Tests if value is truthy, it is equivalent to assert.equal(true, !!value, message);
	 */
	//>public constructs(Object value, String? message)
	constructs : vjo.NEEDS_IMPL, 
	
	//
	// API
	//
	
	/**
	 * Throws an exception that displays the values for actual and expected separated by 
	 * the provided operator.
	 */
	//> public void fail(Object actual, Object expected, String? message, Object? operator) ; throws AssertionError
	fail: vjo.NEEDS_IMPL,
	
	/**
	 * Tests if value is truthy, it is equivalent to assert.equal(true, !!value, message);
	 */
	//> public void ok(Object value, String? message)
	ok: vjo.NEEDS_IMPL,
	
	/**
	 * Tests shallow, coercive equality with the equal comparison operator ( == ).
	 */
	//> public void equal(Object actual, Object expected, String? message)
	equal: vjo.NEEDS_IMPL,
	
	/**
	 * Tests shallow, coercive non-equality with the not equal comparison operator ( != ).
	 */
	//> public void notEqual(Object actual, Object expected, String? message)
	notEqual: vjo.NEEDS_IMPL,
	
	/**
	 * Tests for deep equality.
	 */
	//> public void deepEqual(Object actual, Object expected, String? message)
	deepEqual: vjo.NEEDS_IMPL,
	
	/**
	 * Tests for any deep inequality.
	 */
	//> public void inequality(Object actual, Object expected, String? message)
	notDeepEqual: vjo.NEEDS_IMPL,
		
	/**
	 * Tests strict equality, as determined by the strict equality operator ( === ) 
	 */
	//> public void strictEqual(Object actual, Object expected, String? message)
	strictEqual: vjo.NEEDS_IMPL,
	
	/**
	 * Tests strict non-equality, as determined by the strict not equal operator ( !== ) 
	 */
	//> public void notStrictEqual(Object actual, Object expected, String? message)
	notStrictEqual: vjo.NEEDS_IMPL,
	
	/**
	 * Expects block to throw an error. error can be constructor, regexp or validation function.
	 * <p>
	 * Validate instanceof using constructor:
	 * <pre>
	 * assert.throws(
	 *   function() {
	 *     throw new Error("Wrong value");
	 *   },
	 *   Error
	 * );
	 * 
	 *  // Validate error message using RegExp:
	 *assert.throws(
	 *  function() {
	 *    throw new Error("Wrong value");
	 *  },
	 *  /value/
	 * );
	 * 
	 *  // Custom error validation:
	 * assert.throws(
	 *   function() {
	 *     throw new Error("Wrong value");
	 *   },
	 *   function(err) {
	 *     if ( (err instanceof Error) && /value/.test(err) ) {
	 *       return true;
	 *     }
	 *   },
	 *   "unexpected error"
	 * );
	 */
// TODO: MrP - This should be allowed. Interestingly it works as expected from the Anvil
// perspective even though it gives an error here.
	//> public void throws(Function block, {Error | Function | RegExp}? error, String? message)
	throws: vjo.NEEDS_IMPL,
	
	/**
	 * Expects block not to throw an error, see assert.throws for details.
	 */
	//> public void doesNotThrow(Function block, String? message) ; throws AssertionError
	doesNotThrow: vjo.NEEDS_IMPL,
	
	/**
	 * Tests if value is not a false value, throws if it is a true value. Useful when 
	 * testing the first argument, error in callbacks.
	 */
	//> public void ifError(Object? value) ; throws AssertionError
	ifError: vjo.NEEDS_IMPL
})
.options({ metatype: true })
.endType();