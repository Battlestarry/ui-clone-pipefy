/* NUGET: BEGIN LICENSE TEXT
 *
 * Microsoft grants you the right to use these script files for the sole
 * purpose of either: (i) interacting through your browser with the Microsoft
 * website or online service, subject to the applicable licensing or use
 * terms; or (ii) using the files as included with a Microsoft product subject
 * to that product's license terms. Microsoft reserves all other rights to the
 * files not expressly granted by Microsoft, whether by implication, estoppel
 * or otherwise. Insofar as a script file is dual licensed under GPL,
 * Microsoft neither took the code under GPL nor distributes it thereunder but
 * under the terms set out in this paragraph. All notices and licenses
 * below are for informational purposes only.
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton; http://www.modernizr.com/license/
 *
 * Includes matchMedia polyfill; Copyright (c) 2010 Filament Group, Inc; http://opensource.org/licenses/MIT
 *
 * Includes material adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js; Copyright 2009-2012 by contributors; http://opensource.org/licenses/MIT
 *
 * Includes material from css-support; Copyright (c) 2005-2012 Diego Perini; https://github.com/dperini/css-support/blob/master/LICENSE
 *
 * NUGET: END LICENSE TEXT */

/*!
 * Modernizr v2.6.2
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over 