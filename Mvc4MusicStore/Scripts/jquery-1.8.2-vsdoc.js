
﻿/* NUGET: BEGIN LICENSE TEXT
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
 * NUGET: END LICENSE TEXT */
/*
* This file has been generated to support Visual Studio IntelliSense.
* You should not use this file at runtime inside the browser--it is only
* intended to be used only for design-time IntelliSense.  Please use the
* standard jQuery library for all production use.
*
* Comment version: 1.8.2
*/

/*!
* jQuery JavaScript Library v1.8.2
* http://jquery.com/
*
* Distributed in whole under the terms of the MIT
*
* Copyright 2010, John Resig
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
* Includes Sizzle.js
* http://sizzlejs.com/
* Copyright 2010, The Dojo Foundation
* Released under the MIT and BSD Licenses.
*/

(function (window, undefined) {
    var jQuery = function (selector, context) {
        /// <summary>
        ///     1: Accepts a string containing a CSS selector which is then used to match a set of elements.
        ///     &#10;    1.1 - $(selector, context) 
        ///     &#10;    1.2 - $(element) 
        ///     &#10;    1.3 - $(object) 
        ///     &#10;    1.4 - $(elementArray) 
        ///     &#10;    1.5 - $(jQuery object) 
        ///     &#10;    1.6 - $()
        ///     &#10;2: Creates DOM elements on the fly from the provided string of raw HTML.
        ///     &#10;    2.1 - $(html, ownerDocument) 
        ///     &#10;    2.2 - $(html, props)
        ///     &#10;3: Binds a function to be executed when the DOM has finished loading.
        ///     &#10;    3.1 - $(callback)
        /// </summary>
        /// <param name="selector" type="String">
        ///     A string containing a selector expression
        /// </param>
        /// <param name="context" type="jQuery">
        ///     A DOM Element, Document, or jQuery to use as context
        /// </param>
        /// <returns type="jQuery" />

        // The jQuery object is actually just the init constructor 'enhanced'
        return new jQuery.fn.init(selector, context, rootjQuery);
    };
    jQuery.Animation = function Animation(elem, properties, options) {

        var result,
            index = 0,
            tweenerIndex = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function () {
                // don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function () {
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    percent = 1 - (remaining / animation.duration || 0),
                    index = 0,
                    length = animation.tweens.length;

                for (; index < length ; index++) {
                    animation.tweens[index].run(percent);
                }

                deferred.notifyWith(elem, [animation, percent, remaining]);

                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, { specialEasing: {} }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function (prop, end, easing) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end,
                            animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function (gotoEnd) {
                    var index = 0,
                        // if we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;

                    for (; index < length ; index++) {
                        animation.tweens[index].run(1);
                    }

                    // resolve when we played the last frame
                    // otherwise, reject
                    if (gotoEnd) {
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter(props, animation.opts.specialEasing);

        for (; index < length ; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result;
            }
        }

        createTweens(animation, props);

        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }

        jQuery.fx.timer(
            jQuery.extend(tick, {
                anim: animation,
                queue: animation.opts.queue,
                elem: elem
            })
        );

        // attach callbacks from options
        return animation.progress(animation.opts.progress)
            .done(animation.opts.done, animation.opts.complete)
            .fail(animation.opts.fail)
            .always(animation.opts.always);
    };
    jQuery.Callbacks = function (options) {
        /// <summary>
        ///     A multi-purpose callbacks list object that provides a powerful way to manage callback lists.
        /// </summary>
        /// <param name="options" type="String">
        ///     An optional list of space-separated flags that change how the callback list behaves.
        /// </param>


        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            (optionsCache[options] || createOptions(options)) :
            jQuery.extend({}, options);

        var // Last fire value (for non-forgettable lists)
            memory,
            // Flag to know if list was already fired
            fired,
            // Flag to know if list is currently firing
            firing,
            // First callback to fire (used internally by add and fireWith)
            firingStart,
            // End of the loop when firing
            firingLength,
            // Index of currently firing callback (modified by remove if needed)
            firingIndex,
            // Actual callback list
            list = [],
            // Stack of fire calls for repeatable lists
            stack = !options.once && [],
            // Fire callbacks
            fire = function (data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false; // To prevent further calls using add
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift());
                        }
                    } else if (memory) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
            // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list) {
                        // First, we save the current length
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function (_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function" && (!options.unique || !self.has(arg))) {
                                    list.push(arg);
                                } else if (arg && arg.length && type !== "string") {
                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);
                        // Do we need to add the callbacks to the
                        // current firing batch?
                        if (firing) {
                            firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away
                        } else if (memory) {
                            firingStart = start;
                            fire(memory);
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function () {
                    if (list) {
                        jQuery.each(arguments, function (_, arg) {
                            var index;
                            while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1);
                                // Handle firing indexes
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--;
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                // Control if a given callback is in the list
                has: function (fn) {
                    return jQuery.inArray(fn, list) > -1;
                },
                // Remove all callbacks from the list
                empty: function () {
                    list = [];
                    return this;
                },
                // Have the list do nothing anymore
                disable: function () {
                    list = stack = memory = undefined;
                    return this;
                },
                // Is it disabled?
                disabled: function () {
                    return !list;
                },
                // Lock the list in its current state
                lock: function () {
                    stack = undefined;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                // Is it locked?
                locked: function () {
                    return !stack;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function (context, args) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    if (list && (!fired || stack)) {
                        if (firing) {
                            stack.push(args);
                        } else {
                            fire(args);
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function () {
                    self.fireWith(this, arguments);
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired;
                }
            };

        return self;
    };
    jQuery.Deferred = function (func) {

        var tuples = [
				// action, add listener, listener list, final state
				["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
				["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
				["notify", "progress", jQuery.Callbacks("memory")]
        ],
			state = "pending",
			promise = {
			    state: function () {
			        return state;
			    },
			    always: function () {
			        deferred.done(arguments).fail(arguments);
			        return this;
			    },
			    then: function ( /* fnDone, fnFail, fnProgress */) {
			        var fns = arguments;
			        return jQuery.Deferred(function (newDefer) {
			            jQuery.each(tuples, function (i, tuple) {
			                var action = tuple[0],
								fn = fns[i];
			                // deferred[ done | fail | progress ] for forwarding actions to newDefer
			                deferred[tuple[1]](jQuery.isFunction(fn) ?
								function () {
								    var returned = fn.apply(this, arguments);
								    if (returned && jQuery.isFunction(returned.promise)) {
								        returned.promise()
											.done(newDefer.resolve)
											.fail(newDefer.reject)
											.progress(newDefer.notify);
								    } else {
								        newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
								    }
								} :
								newDefer[action]
							);
			            });
			            fns = null;
			        }).promise();
			    },
			    // Get a promise for this deferred
			    // If obj is provided, the promise aspect is added to the object
			    promise: function (obj) {
			        return obj != null ? jQuery.extend(obj, promise) : promise;
			    }
			},
			deferred = {};

        // Keep pipe for back-compat
        promise.pipe = promise.then;

        // Add list-specific methods
        jQuery.each(tuples, function (i, tuple) {
            var list = tuple[2],
				stateString = tuple[3];

            // promise[ done | fail | progress ] = list.add
            promise[tuple[1]] = list.add;

            // Handle state
            if (stateString) {
                list.add(function () {
                    // state = [ resolved | rejected ]
                    state = stateString;

                    // [ reject_list | resolve_list ].disable; progress_list.lock
                }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
            }

            // deferred[ resolve | reject | notify ] = list.fire
            deferred[tuple[0]] = list.fire;
            deferred[tuple[0] + "With"] = list.fireWith;
        });

        // Make the deferred a promise
        promise.promise(deferred);

        // Call given func if any
        if (func) {
            func.call(deferred, deferred);
        }

        // All done!
        return deferred;
    };
    jQuery.Event = function (src, props) {

        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
                src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };
    jQuery.Tween = function Tween(elem, options, prop, end, easing) {

        return new Tween.prototype.init(elem, options, prop, end, easing);
    };
    jQuery._data = function (elem, name, data) {

        return jQuery.data(elem, name, data, true);
    };
    jQuery._queueHooks = function (elem, type) {

        var key = type + "queueHooks";
        return jQuery._data(elem, key) || jQuery._data(elem, key, {
            empty: jQuery.Callbacks("once memory").add(function () {
                jQuery.removeData(elem, type + "queue", true);
                jQuery.removeData(elem, key, true);
            })
        });
    };
    jQuery.acceptData = function (elem) {

        var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];

        // nodes accept data unless otherwise specified; rejection can be conditional
        return !noData || noData !== true && elem.getAttribute("classid") === noData;
    };
    jQuery.access = function (elems, fn, key, value, chainable, emptyGet, pass) {

        var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

        // Sets many values
        if (key && typeof key === "object") {
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
            }
            chainable = 1;

            // Sets one value
        } else if (value !== undefined) {
            // Optionally, function values get executed if exec is true
            exec = pass === undefined && jQuery.isFunction(value);

            if (bulk) {
                // Bulk operations only iterate when executing function values
                if (exec) {
                    exec = fn;
                    fn = function (elem, key, value) {
                        return exec.call(jQuery(elem), value);
                    };

                    // Otherwise they run against the entire set
                } else {
                    fn.call(elems, value);
                    fn = null;
                }
            }

            if (fn) {
                for (; i < length; i++) {
                    fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                }
            }

            chainable = 1;
        }

        return chainable ?
            elems :

			// Gets
			bulk ?
				fn.call(elems) :
				length ? fn(elems[0], key) : emptyGet;
    };
    jQuery.active = 0;
    jQuery.ajax = function (url, options) {
        /// <summary>
        ///     Perform an asynchronous HTTP (Ajax) request.
        ///     &#10;1 - jQuery.ajax(url, settings) 
        ///     &#10;2 - jQuery.ajax(settings)
        /// </summary>
        /// <param name="url" type="String">
        ///     A string containing the URL to which the request is sent.
        /// </param>
        /// <param name="options" type="Object">
        ///     A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup(). See jQuery.ajax( settings ) below for a complete list of all settings.
        /// </param>


        // If url is an object, simulate pre-1.5 signature
        if (typeof url === "object") {
            options = url;
            url = undefined;
        }

        // Force options to be an object
        options = options || {};

        var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup({}, options),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				(callbackContext.nodeType || callbackContext instanceof jQuery) ?
						jQuery(callbackContext) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

			    readyState: 0,

			    // Caches the header
			    setRequestHeader: function (name, value) {
			        if (!state) {
			            var lname = name.toLowerCase();
			            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
			            requestHeaders[name] = value;
			        }
			        return this;
			    },

			    // Raw string
			    getAllResponseHeaders: function () {
			        return state === 2 ? responseHeadersString : null;
			    },

			    // Builds headers hashtable if needed
			    getResponseHeader: function (key) {
			        var match;
			        if (state === 2) {
			            if (!responseHeaders) {
			                responseHeaders = {};
			                while ((match = rheaders.exec(responseHeadersString))) {
			                    responseHeaders[match[1].toLowerCase()] = match[2];
			                }
			            }
			            match = responseHeaders[key.toLowerCase()];
			        }
			        return match === undefined ? null : match;
			    },

			    // Overrides response content-type header
			    overrideMimeType: function (type) {
			        if (!state) {
			            s.mimeType = type;
			        }
			        return this;
			    },

			    // Cancel the request
			    abort: function (statusText) {
			        statusText = statusText || strAbort;
			        if (transport) {
			            transport.abort(statusText);
			        }
			        done(0, statusText);
			        return this;
			    }
			};

        // Callback for when everything is done
        // It is defined here because jslint complains if it is declared
        // at the end of the function (which would be more logical and readable)
        function done(status, nativeStatusText, responses, headers) {
            var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

            // Called once
            if (state === 2) {
                return;
            }

            // State is "done" now
            state = 2;

            // Clear timeout if it exists
            if (timeoutTimer) {
                clearTimeout(timeoutTimer);
            }

            // Dereference transport for early garbage collection
            // (no matter how long the jqXHR object will be used)
            transport = undefined;

            // Cache response headers
            responseHeadersString = headers || "";

            // Set readyState
            jqXHR.readyState = status > 0 ? 4 : 0;

            // Get response data
            if (responses) {
                response = ajaxHandleResponses(s, jqXHR, responses);
            }

            // If successful, handle type chaining
            if (status >= 200 && status < 300 || status === 304) {

                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                if (s.ifModified) {

                    modified = jqXHR.getResponseHeader("Last-Modified");
                    if (modified) {
                        jQuery.lastModified[ifModifiedKey] = modified;
                    }
                    modified = jqXHR.getResponseHeader("Etag");
                    if (modified) {
                        jQuery.etag[ifModifiedKey] = modified;
                    }
                }

                // If not modified
                if (status === 304) {

                    statusText = "notmodified";
                    isSuccess = true;

                    // If we have data
                } else {

                    isSuccess = ajaxConvert(s, response);
                    statusText = isSuccess.state;
                    success = isSuccess.data;
                    error = isSuccess.error;
                    isSuccess = !error;
                }
            } else {
                // We extract error from statusText
                // then normalize statusText and status for non-aborts
                error = statusText;
                if (!statusText || status) {
                    statusText = "error";
                    if (status < 0) {
                        status = 0;
                    }
                }
            }

            // Set data for the fake xhr object
            jqXHR.status = status;
            jqXHR.statusText = (nativeStatusText || statusText) + "";

            // Success/Error
            if (isSuccess) {
                deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
            } else {
                deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
            }

            // Status-dependent callbacks
            jqXHR.statusCode(statusCode);
            statusCode = undefined;

            if (fireGlobals) {
                globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"),
						[jqXHR, s, isSuccess ? success : error]);
            }

            // Complete
            completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

            if (fireGlobals) {
                globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                // Handle the global AJAX counter
                if (!(--jQuery.active)) {
                    jQuery.event.trigger("ajaxStop");
                }
            }
        }

        // Attach deferreds
        deferred.promise(jqXHR);
        jqXHR.success = jqXHR.done;
        jqXHR.error = jqXHR.fail;
        jqXHR.complete = completeDeferred.add;

        // Status-dependent callbacks
        jqXHR.statusCode = function (map) {
            if (map) {
                var tmp;
                if (state < 2) {
                    for (tmp in map) {
                        statusCode[tmp] = [statusCode[tmp], map[tmp]];
                    }
                } else {
                    tmp = map[jqXHR.status];
                    jqXHR.always(tmp);
                }
            }
            return this;
        };

        // Remove hash character (#7531: and string promotion)
        // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
        // We also use the url parameter if available
        s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");

        // Extract dataTypes list
        s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace);

        // A cross-domain request is in order when we have a protocol:host:port mismatch
        if (s.crossDomain == null) {
            parts = rurl.exec(s.url.toLowerCase()) || false;
            s.crossDomain = parts && (parts.join(":") + (parts[3] ? "" : parts[1] === "http:" ? 80 : 443)) !==
				(ajaxLocParts.join(":") + (ajaxLocParts[3] ? "" : ajaxLocParts[1] === "http:" ? 80 : 443));
        }

        // Convert data if not already a string
        if (s.data && s.processData && typeof s.data !== "string") {
            s.data = jQuery.param(s.data, s.traditional);
        }

        // Apply prefilters
        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

        // If request was aborted inside a prefilter, stop there
        if (state === 2) {
            return jqXHR;
        }

        // We can fire global events as of now if asked to
        fireGlobals = s.global;

        // Uppercase the type
        s.type = s.type.toUpperCase();

        // Determine if request has content
        s.hasContent = !rnoContent.test(s.type);

        // Watch for a new set of requests
        if (fireGlobals && jQuery.active++ === 0) {
            jQuery.event.trigger("ajaxStart");
        }

        // More options handling for requests with no content
        if (!s.hasContent) {

            // If data is available, append data to url
            if (s.data) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
                // #9682: remove data so that it's not used in an eventual retry
                delete s.data;
            }

            // Get ifModifiedKey before adding the anti-cache parameter
            ifModifiedKey = s.url;

            // Add anti-cache in url if needed
            if (s.cache === false) {

                var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace(rts, "$1_=" + ts);

                // if nothing was replaced, add timestamp to the end
                s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
            }
        }

        // Set the correct header, if data is being sent
        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
            jqXHR.setRequestHeader("Content-Type", s.contentType);
        }

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if (s.ifModified) {
            ifModifiedKey = ifModifiedKey || s.url;
            if (jQuery.lastModified[ifModifiedKey]) {
                jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]);
            }
            if (jQuery.etag[ifModifiedKey]) {
                jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey]);
            }
        }

        // Set the Accepts header for the server, depending on the dataType
        jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
				s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
				s.accepts["*"]
		);

        // Check for headers option
        for (i in s.headers) {
            jqXHR.setRequestHeader(i, s.headers[i]);
        }

        // Allow custom headers/mimetypes and early abort
        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
            // Abort if not done already and return
            return jqXHR.abort();

        }

        // aborting is no longer a cancellation
        strAbort = "abort";

        // Install callbacks on deferreds
        for (i in { success: 1, error: 1, complete: 1 }) {
            jqXHR[i](s[i]);
        }

        // Get transport
        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

        // If no transport, we auto-abort
        if (!transport) {
            done(-1, "No Transport");
        } else {
            jqXHR.readyState = 1;
            // Send global event
            if (fireGlobals) {
                globalEventContext.trigger("ajaxSend", [jqXHR, s]);
            }
            // Timeout
            if (s.async && s.timeout > 0) {
                timeoutTimer = setTimeout(function () {
                    jqXHR.abort("timeout");
                }, s.timeout);
            }

            try {
                state = 1;
                transport.send(requestHeaders, done);
            } catch (e) {
                // Propagate exception as error if not done
                if (state < 2) {
                    done(-1, e);
                    // Simply rethrow otherwise
                } else {
                    throw e;
                }
            }
        }

        return jqXHR;
    };
    jQuery.ajaxPrefilter = function (dataTypeExpression, func) {
        /// <summary>
        ///     Handle custom Ajax options or modify existing options before each request is sent and before they are processed by $.ajax().
        /// </summary>
        /// <param name="dataTypeExpression" type="String">
        ///     An optional string containing one or more space-separated dataTypes
        /// </param>
        /// <param name="func" type="Function">
        ///     A handler to set default values for future Ajax requests.
        /// </param>
        /// <returns type="undefined" />


        if (typeof dataTypeExpression !== "string") {
            func = dataTypeExpression;
            dataTypeExpression = "*";
        }

        var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split(core_rspace),
			i = 0,
			length = dataTypes.length;

        if (jQuery.isFunction(func)) {
            // For each dataType in the dataTypeExpression
            for (; i < length; i++) {
                dataType = dataTypes[i];
                // We control if we're asked to add before
                // any existing element
                placeBefore = /^\+/.test(dataType);
                if (placeBefore) {
                    dataType = dataType.substr(1) || "*";
                }
                list = structure[dataType] = structure[dataType] || [];
                // then we add to the structure accordingly
                list[placeBefore ? "unshift" : "push"](func);
            }
        }
    };
    jQuery.ajaxSettings = {
        "url": 'http://localhost:25812/',
        "isLocal": false,
        "global": true,
        "type": 'GET',
        "contentType": 'application/x-www-form-urlencoded; charset=UTF-8',
        "processData": true,
        "async": true,
        "accepts": {},
        "contents": {},
        "responseFields": {},
        "converters": {},
        "flatOptions": {},
        "jsonp": 'callback'
    };
    jQuery.ajaxSetup = function (target, settings) {
        /// <summary>
        ///     Set default values for future Ajax requests.
        /// </summary>
        /// <param name="target" type="Object">
        ///     A set of key/value pairs that configure the default Ajax request. All options are optional.
        /// </param>

        if (settings) {
            // Building a settings object
            ajaxExtend(target, jQuery.ajaxSettings);
        } else {
            // Extending ajaxSettings
            settings = target;
            target = jQuery.ajaxSettings;
        }
        ajaxExtend(target, settings);
        return target;
    };
    jQuery.ajaxTransport = function (dataTypeExpression, func) {


        if (typeof dataTypeExpression !== "string") {
            func = dataTypeExpression;
            dataTypeExpression = "*";
        }

        var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split(core_rspace),
			i = 0,
			length = dataTypes.length;

        if (jQuery.isFunction(func)) {
            // For each dataType in the dataTypeExpression
            for (; i < length; i++) {
                dataType = dataTypes[i];
                // We control if we're asked to add before
                // any existing element
                placeBefore = /^\+/.test(dataType);
                if (placeBefore) {
                    dataType = dataType.substr(1) || "*";
                }
                list = structure[dataType] = structure[dataType] || [];
                // then we add to the structure accordingly
                list[placeBefore ? "unshift" : "push"](func);
            }
        }
    };
    jQuery.attr = function (elem, name, value, pass) {

        var ret, hooks, notxml,
			nType = elem.nodeType;

        // don't get/set attributes on text, comment and attribute nodes
        if (!elem || nType === 3 || nType === 8 || nType === 2) {
            return;
        }

        if (pass && jQuery.isFunction(jQuery.fn[name])) {
            return jQuery(elem)[name](value);
        }

        // Fallback to prop when attributes are not supported
        if (typeof elem.getAttribute === "undefined") {
            return jQuery.prop(elem, name, value);
        }

        notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

        // All attributes are lowercase
        // Grab necessary hook if one is defined
        if (notxml) {
            name = name.toLowerCase();
            hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
        }

        if (value !== undefined) {

            if (value === null) {
                jQuery.removeAttr(elem, name);
                return;

            } else if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                return ret;

            } else {
                elem.setAttribute(name, value + "");
                return value;
            }

        } else if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
            return ret;

        } else {

            ret = elem.getAttribute(name);

            // Non-existent attributes return null, we normalize to undefined
            return ret === null ?
                undefined :
				ret;
        }
    };
    jQuery.attrFn = {};
    jQuery.attrHooks = {
        "type": {},
        "value": {}
    };
    jQuery.browser = {
        "chrome": true,
        "version": '21.0.1180.89',
        "webkit": true
    };
    jQuery.buildFragment = function (args, context, scripts) {

        var fragment, cacheable, cachehit,
            first = args[0];

        // Set context from what may come in as undefined or a jQuery collection or a node
        // Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
        // also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
        context = context || document;
        context = !context.nodeType && context[0] || context;
        context = context.ownerDocument || context;

        // Only cache "small" (1/2 KB) HTML strings that are associated with the main document
        // Cloning options loses the selected state, so don't cache them
        // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
        // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
        // Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
        if (args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
            first.charAt(0) === "<" && !rnocache.test(first) &&
            (jQuery.support.checkClone || !rchecked.test(first)) &&
            (jQuery.support.html5Clone || !rnoshimcache.test(first))) {

            // Mark cacheable and look for a hit
            cacheable = true;
            fragment = jQuery.fragments[first];
            cachehit = fragment !== undefined;
        }

        if (!fragment) {
            fragment = context.createDocumentFragment();
            jQuery.clean(args, context, fragment, scripts);

            // Update the cache, but only store false
            // unless this is a second parsing of the same content
            if (cacheable) {
                jQuery.fragments[first] = cachehit && fragment;
            }
        }

        return { fragment: fragment, cacheable: cacheable };
    };
    jQuery.cache = {};