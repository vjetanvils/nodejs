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
vjo.ctype('org.nodejs.domain.DomainError') //< public
.inherits('js.Error')
.mixin('org.nodejs.domain.DomainErrorMixin')
.props({ })
.protos({ })
.options({ metatype: true })
.endType();