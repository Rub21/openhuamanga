/* wax - 4.0.0 - 1.0.4-423-g2fe4c52 */


/*!
  * Reqwest! A general purpose XHR connection manager
  * copyright Dustin Diaz 2011
  * https://github.com/ded/reqwest
  * license MIT
  */
!function(context,win){function serial(a){var b=a.name;if(a.disabled||!b)return"";b=enc(b);switch(a.tagName.toLowerCase()){case"input":switch(a.type){case"reset":case"button":case"image":case"file":return"";case"checkbox":case"radio":return a.checked?b+"="+(a.value?enc(a.value):!0)+"&":"";default:return b+"="+(a.value?enc(a.value):"")+"&"}break;case"textarea":return b+"="+enc(a.value)+"&";case"select":return b+"="+enc(a.options[a.selectedIndex].value)+"&"}return""}function enc(a){return encodeURIComponent(a)}function reqwest(a,b){return new Reqwest(a,b)}function init(o,fn){function error(a){o.error&&o.error(a),complete(a)}function success(resp){o.timeout&&clearTimeout(self.timeout)&&(self.timeout=null);var r=resp.responseText;if(r)switch(type){case"json":resp=win.JSON?win.JSON.parse(r):eval("("+r+")");break;case"js":resp=eval(r);break;case"html":resp=r}fn(resp),o.success&&o.success(resp),complete(resp)}function complete(a){o.complete&&o.complete(a)}this.url=typeof o=="string"?o:o.url,this.timeout=null;var type=o.type||setType(this.url),self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){self.abort(),error()},o.timeout)),this.request=getRequest(o,success,error)}function setType(a){if(/\.json$/.test(a))return"json";if(/\.jsonp$/.test(a))return"jsonp";if(/\.js$/.test(a))return"js";if(/\.html?$/.test(a))return"html";if(/\.xml$/.test(a))return"xml";return"js"}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments)}function getRequest(a,b,c){if(a.type!="jsonp"){var f=xhr();f.open(a.method||"GET",typeof a=="string"?a:a.url,!0),setHeaders(f,a),f.onreadystatechange=handleReadyState(f,b,c),a.before&&a.before(f),f.send(a.data||null);return f}var d=doc.createElement("script"),e=0;win[getCallbackName(a)]=generalCallback,d.type="text/javascript",d.src=a.url,d.async=!0,d.onload=d.onreadystatechange=function(){if(d[readyState]&&d[readyState]!=="complete"&&d[readyState]!=="loaded"||e)return!1;d.onload=d.onreadystatechange=null,a.success&&a.success(lastValue),lastValue=undefined,head.removeChild(d),e=1},head.appendChild(d)}function generalCallback(a){lastValue=a}function getCallbackName(a){var b=a.jsonpCallback||"callback";if(a.url.slice(-(b.length+2))==b+"=?"){var c="reqwest_"+uniqid++;a.url=a.url.substr(0,a.url.length-1)+c;return c}var d=new RegExp(b+"=([\\w]+)");return a.url.match(d)[1]}function setHeaders(a,b){var c=b.headers||{};c.Accept=c.Accept||"text/javascript, text/html, application/xml, text/xml, */*",b.crossOrigin||(c["X-Requested-With"]=c["X-Requested-With"]||"XMLHttpRequest"),c[contentType]=c[contentType]||"application/x-www-form-urlencoded";for(var d in c)c.hasOwnProperty(d)&&a.setRequestHeader(d,c[d],!1)}function handleReadyState(a,b,c){return function(){a&&a[readyState]==4&&(twoHundo.test(a.status)?b(a):c(a))}}var twoHundo=/^20\d$/,doc=document,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",head=doc[byTag]("head")[0],uniqid=0,lastValue,xhr="XMLHttpRequest"in win?function(){return new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")};Reqwest.prototype={abort:function(){this.request.abort()},retry:function(){init.call(this,this.o,this.fn)}},reqwest.serialize=function(a){var b=[a[byTag]("input"),a[byTag]("select"),a[byTag]("textarea")],c=[],d,e;for(d=0,l=b.length;d<l;++d)for(e=0,l2=b[d].length;e<l2;++e)c.push(serial(b[d][e]));return c.join("").replace(/&$/,"")},reqwest.serializeArray=function(a){for(var b=this.serialize(a).split("&"),c=0,d=b.length,e=[],f;c<d;c++)b[c]&&(f=b[c].split("="))&&e.push({name:f[0],value:f[1]});return e};var old=context.reqwest;reqwest.noConflict=function(){context.reqwest=old;return this},typeof module!="undefined"?module.exports=reqwest:context.reqwest=reqwest}(this,window);wax = wax || {};

// Attribution
// -----------
wax.attribution = function() {
    var container,
        a = {};

    a.set = function(content) {
        if (typeof content === 'undefined') return;
        container.innerHTML = content;
        return this;
    };

    a.element = function() {
        return container;
    };

    a.init = function() {
        container = document.createElement('div');
        container.className = 'wax-attribution';
        return this;
    };

    return a.init();
};
wax = wax || {};

// Attribution
// -----------
wax.bwdetect = function(options, callback) {
    var detector = {},
        threshold = options.threshold || 400,
        // test image: 30.29KB
        testImage = 'http://a.tiles.mapbox.com/mapbox/1.0.0/blue-marble-topo-bathy-jul/0/0/0.png?preventcache=' + (+new Date()),
        // High-bandwidth assumed
        // 1: high bandwidth (.png, .jpg)
        // 0: low bandwidth (.png128, .jpg70)
        bw = 1,
        // Alternative versions
        auto = options.auto === undefined ? true : options.auto;

    function bwTest() {
        wax.bw = -1;
        var im = new Image();
        im.src = testImage;
        var first = true;
        var timeout = setTimeout(function() {
            if (first && wax.bw == -1) {
                detector.bw(0);
                first = false;
            }
        }, threshold);
        im.onload = function() {
            if (first && wax.bw == -1) {
                clearTimeout(timeout);
                detector.bw(1);
                first = false;
            }
        };
    }

    detector.bw = function(x) {
        if (!arguments.length) return bw;
        var oldBw = bw;
        if (wax.bwlisteners && wax.bwlisteners.length) (function () {
            listeners = wax.bwlisteners;
            wax.bwlisteners = [];
            for (i = 0; i < listeners; i++) {
                listeners[i](x);
            }
        })();
        wax.bw = x;

        if (bw != (bw = x)) callback(x);
    };

    detector.add = function() {
        if (auto) bwTest();
        return this;
    };

    if (wax.bw == -1) {
      wax.bwlisteners = wax.bwlisteners || [];
      wax.bwlisteners.push(detector.bw);
    } else if (wax.bw !== undefined) {
        detector.bw(wax.bw);
    } else {
        detector.add();
    }
    return detector;
};
// Formatter
// ---------
wax.formatter = function(x) {
    var formatter = {},
        f;

    // Prevent against just any input being used.
    if (x && typeof x === 'string') {
        try {
            // Ugly, dangerous use of eval.
            eval('f = ' + x);
        } catch (e) {
            if (console) console.log(e);
        }
    } else if (x && typeof x === 'function') {
        f = x;
    } else {
        f = function() {};
    }

    // Wrap the given formatter function in order to
    // catch exceptions that it may throw.
    formatter.format = function(options, data) {
        try {
            return f(options, data);
        } catch (e) {
            if (console) console.log(e);
        }
    };

    return formatter;
};
// GridInstance
// ------------
// GridInstances are queryable, fully-formed
// objects for acquiring features from events.
wax.GridInstance = function(grid_tile, formatter, options) {
    options = options || {};
    // resolution is the grid-elements-per-pixel ratio of gridded data.
    // The size of a tile element. For now we expect tiles to be squares.
    var instance = {},
        resolution = options.resolution || 4;
        tileSize = options.tileSize || 256;

    // Resolve the UTF-8 encoding stored in grids to simple
    // number values.
    // See the [utfgrid section of the mbtiles spec](https://github.com/mapbox/mbtiles-spec/blob/master/1.1/utfgrid.md)
    // for details.
    function resolveCode(key) {
        if (key >= 93) key--;
        if (key >= 35) key--;
        key -= 32;
        return key;
    }

    instance.grid_tile = function() {
        return grid_tile;
    };

    instance.getKey = function(x, y) {
        if (!(grid_tile && grid_tile.grid)) return;
        if ((y < 0) || (x < 0)) return;
        if ((Math.floor(y) >= tileSize) ||
            (Math.floor(x) >= tileSize)) return;
        // Find the key in the grid. The above calls should ensure that
        // the grid's array is large enough to make this work.
        return resolveCode(grid_tile.grid[
           Math.floor((y) / resolution)
        ].charCodeAt(
           Math.floor((x) / resolution)
        ));
    };

    // Lower-level than tileFeature - has nothing to do
    // with the DOM. Takes a px offset from 0, 0 of a grid.
    instance.gridFeature = function(x, y) {
        // Find the key in the grid. The above calls should ensure that
        // the grid's array is large enough to make this work.
        var key = this.getKey(x, y),
            keys = grid_tile.keys;

        if (keys &&
            keys[key] &&
            grid_tile.data[keys[key]]) {
            return grid_tile.data[keys[key]];
        }
    };

    // Get a feature:
    //
    // * `x` and `y`: the screen coordinates of an event
    // * `tile_element`: a DOM element of a tile, from which we can get an offset.
    // * `options` options to give to the formatter: minimally having a `format`
    //   member, being `full`, `teaser`, or something else.
    instance.tileFeature = function(x, y, tile_element, options) {
        if (!grid_tile) return;
        // IE problem here - though recoverable, for whatever reason
        var offset = wax.util.offset(tile_element);
            feature = this.gridFeature(x - offset.left, y - offset.top);

        if (feature) return formatter.format(options, feature);
    };

    return instance;
};
// GridManager
// -----------
// Generally one GridManager will be used per map.
//
// It takes one options object, which current accepts a single option:
// `resolution` determines the number of pixels per grid element in the grid.
// The default is 4.
wax.GridManager = function(options) {
    options = options || {};

    var resolution = options.resolution || 4,
        grid_tiles = {},
        manager = {},
        formatter;

    var formatterUrl = function(url) {
        return url.replace(/\d+\/\d+\/\d+\.\w+/, 'layer.json');
    };

    var gridUrl = function(url) {
        return url.replace(/(\.png|\.jpg|\.jpeg)(\d*)/, '.grid.json');
    };

    function getFormatter(url, callback) {
        if (typeof formatter !== 'undefined') {
            return callback(null, formatter);
        } else {
            wax.request.get(formatterUrl(url), function(err, data) {
                if (data && data.formatter) {
                    formatter = wax.formatter(data.formatter);
                } else {
                    formatter = false;
                }
                return callback(err, formatter);
            });
        }
    }

    function templatedGridUrl(template) {
        if (typeof template === 'string') template = [template];
        return function templatedGridFinder(url) {
            if (!url) return;
            var xyz = /(\d+)\/(\d+)\/(\d+)\.[\w\._]+/g.exec(url);
            if (!xyz) return;
            return template[parseInt(xyz[2], 10) % template.length]
                .replace('{z}', xyz[1])
                .replace('{x}', xyz[2])
                .replace('{y}', xyz[3]);
        };
    }

    manager.formatter = function(x) {
        if (!arguments.length) return formatter;
        formatter =  wax.formatter(x);
        return manager;
    };

    manager.formatterUrl = function(x) {
        if (!arguments.length) return formatterUrl;
        formatterUrl = typeof x === 'string' ?
            function() { return x; } : x;
        return manager;
    };

    manager.gridUrl = function(x) {
        if (!arguments.length) return gridUrl;
        gridUrl = typeof x === 'function' ?
            x : templatedGridUrl(x);
        return manager;
    };

     manager.getGrid = function(url, callback) {
        getFormatter(url, function(err, f) {
            var gurl = gridUrl(url);
            if (err || !f || !gurl) return callback(err, null);

            wax.request.get(gurl, function(err, t) {
                if (err) return callback(err, null);
                callback(null, wax.GridInstance(t, f, {
                    resolution: resolution || 4
                }));
            });
        });
        return manager;
    };

    if (options.formatter) manager.formatter(options.formatter);
    if (options.grids) manager.gridUrl(options.grids);

    return manager;
};
wax = wax || {};

// Hash
// ----
wax.hash = function(options) {
    options = options || {};

    function getState() {
        return location.hash.substring(1);
    }

    function pushState(state) {
        location.hash = '#' + state;
    }

    var s0, // old hash
        hash = {},
        lat = 90 - 1e-8;  // allowable latitude range

    function parseHash(s) {
        var args = s.split('/');
        for (var i = 0; i < args.length; i++) {
            args[i] = Number(args[i]);
            if (isNaN(args[i])) return true;
        }
        if (args.length < 3) {
            // replace bogus hash
            return true;
        } else if (args.length == 3) {
            options.setCenterZoom(args);
        }
    }

    function move() {
        var s1 = options.getCenterZoom();
        if (s0 !== s1) {
            s0 = s1;
            // don't recenter the map!
            pushState(s0);
        }
    }

    function stateChange(state) {
        // ignore spurious hashchange events
        if (state === s0) return;
        if (parseHash(s0 = state)) {
            // replace bogus hash
            move();
        }
    }

    var _move = wax.util.throttle(move, 500);

    hash.add = function() {
        stateChange(getState());
        options.bindChange(_move);
        return this;
    };

    hash.remove = function() {
        options.unbindChange(_move);
        return this;
    };

    return hash.add();
};
// Wax Legend
// ----------

// Wax header
var wax = wax || {};

wax.legend = function() {
    var element,
        legend = {},
        container;

    legend.element = function() {
        return container;
    };

    legend.content = function(content) {
        if (!arguments.length) return element.innerHTML;
        if (content) {
            element.innerHTML = content;
            element.style.display = 'block';
        } else {
            element.innerHTML = '';
            element.style.display = 'none';
        }
        return this;
    };

    legend.add = function() {
        container = document.createElement('div');
        container.className = 'wax-legends';

        element = document.createElement('div');
        element.className = 'wax-legend';
        element.style.display = 'none';

        container.appendChild(element);
        return this;
    };

    return legend.add();
};
// Like underscore's bind, except it runs a function
// with no arguments off of an object.
//
//     var map = ...;
//     w(map).melt(myFunction);
//
// is equivalent to
//
//     var map = ...;
//     myFunction(map);
//
var w = function(self) {
    self.melt = function(func, obj) {
        return func.apply(obj, [self, obj]);
    };
    return self;
};
// Wax GridUtil
// ------------

// Wax header
var wax = wax || {};

// Request
// -------
// Request data cache. `callback(data)` where `data` is the response data.
wax.request = {
    cache: {},
    locks: {},
    promises: {},
    get: function(url, callback) {
        // Cache hit.
        if (this.cache[url]) {
            return callback(this.cache[url][0], this.cache[url][1]);
        // Cache miss.
        } else {
            this.promises[url] = this.promises[url] || [];
            this.promises[url].push(callback);
            // Lock hit.
            if (this.locks[url]) return;
            // Request.
            var that = this;
            this.locks[url] = true;
            reqwest({
                url: url + (~url.indexOf('?') ? '&' : '?') + 'callback=grid',
                type: 'jsonp',
                jsonpCallback: 'callback',
                success: function(data) {
                    that.locks[url] = false;
                    that.cache[url] = [null, data];
                    for (var i = 0; i < that.promises[url].length; i++) {
                        that.promises[url][i](that.cache[url][0], that.cache[url][1]);
                    }
                },
                error: function(err) {
                    that.locks[url] = false;
                    that.cache[url] = [err, null];
                    for (var i = 0; i < that.promises[url].length; i++) {
                        that.promises[url][i](that.cache[url][0], that.cache[url][1]);
                    }
                }
            });
        }
    }
};
if (!wax) var wax = {};

// A wrapper for reqwest jsonp to easily load TileJSON from a URL.
wax.tilejson = function(url, callback) {
    reqwest({
        url: url + (~url.indexOf('?') ? '&' : '?') + 'callback=grid',
        type: 'jsonp',
        jsonpCallback: 'callback',
        success: callback,
        error: callback
    });
};
var wax = wax || {};
wax.tooltip = {};

wax.tooltip = function(options) {
    this._currentTooltip = undefined;
    options = options || {};
    if (options.animationOut) this.animationOut = options.animationOut;
    if (options.animationIn) this.animationIn = options.animationIn;
};

// Helper function to determine whether a given element is a wax popup.
wax.tooltip.prototype.isPopup = function(el) {
    return el && el.className.indexOf('wax-popup') !== -1;
};

// Get the active tooltip for a layer or create a new one if no tooltip exists.
// Hide any tooltips on layers underneath this one.
wax.tooltip.prototype.getTooltip = function(feature, context) {
    var tooltip = document.createElement('div');
    tooltip.className = 'wax-tooltip wax-tooltip-0';
    tooltip.innerHTML = feature;
    context.appendChild(tooltip);
    return tooltip;
};

// Hide a given tooltip.
wax.tooltip.prototype.hideTooltip = function(el) {
    if (!el) return;
    var event,
        remove = function() {
        if (this.parentNode) this.parentNode.removeChild(this);
    };

    if (el.style['-webkit-transition'] !== undefined && this.animationOut) {
        event = 'webkitTransitionEnd';
    } else if (el.style.MozTransition !== undefined && this.animationOut) {
        event = 'transitionend';
    }

    if (event) {
        // This code assumes that transform-supporting browsers
        // also support proper events. IE9 does both.
        el.addEventListener(event, remove, false);
        el.addEventListener('transitionend', remove, false);
        el.className += ' ' + this.animationOut;
    } else {
        if (el.parentNode) el.parentNode.removeChild(el);
    }
};

// Expand a tooltip to be a "popup". Suspends all other tooltips from being
// shown until this popup is closed or another popup is opened.
wax.tooltip.prototype.click = function(feature, context) {
    // Hide any current tooltips.
    if (this._currentTooltip) {
        this.hideTooltip(this._currentTooltip);
        this._currentTooltip = undefined;
    }

    var tooltip = this.getTooltip(feature, context);
    tooltip.className += ' wax-popup';
    tooltip.innerHTML = feature;

    var close = document.createElement('a');
    close.href = '#close';
    close.className = 'close';
    close.innerHTML = 'Close';
    tooltip.appendChild(close);

    var closeClick = wax.util.bind(function(ev) {
        this.hideTooltip(tooltip);
        this._currentTooltip = undefined;
        ev.returnValue = false; // Prevents hash change.
        if (ev.stopPropagation) ev.stopPropagation();
        if (ev.preventDefault) ev.preventDefault();
        return false;
    }, this);

    // IE compatibility.
    if (close.addEventListener) {
        close.addEventListener('click', closeClick, false);
    } else if (close.attachEvent) {
        close.attachEvent('onclick', closeClick);
    }

    this._currentTooltip = tooltip;
};

// Show a tooltip.
wax.tooltip.prototype.over = function(feature, context) {
    if (!feature) return;
    context.style.cursor = 'pointer';

    if (this.isPopup(this._currentTooltip)) {
        return;
    } else {
        this._currentTooltip = this.getTooltip(feature, context);
    }
};


// Hide all tooltips on this layer and show the first hidden tooltip on the
// highest layer underneath if found.
wax.tooltip.prototype.out = function(context) {
    context.style.cursor = 'default';

    if (this.isPopup(this._currentTooltip)) {
        return;
    } else if (this._currentTooltip) {
        this.hideTooltip(this._currentTooltip);
        this._currentTooltip = undefined;
    }
};
var wax = wax || {};
wax.util = wax.util || {};

// Utils are extracted from other libraries or
// written from scratch to plug holes in browser compatibility.
wax.util = {
    // From Bonzo
    offset: function(el) {
        // TODO: window margins
        //
        // Okay, so fall back to styles if offsetWidth and height are botched
        // by Firefox.
        var width = el.offsetWidth || parseInt(el.style.width, 10),
            height = el.offsetHeight || parseInt(el.style.height, 10),
            doc_body = document.body,
            top = 0,
            left = 0;

        var calculateOffset = function(el) {
            if (el === doc_body || el === document.documentElement) return;
            top += el.offsetTop;
            left += el.offsetLeft;

            var style = el.style.transform ||
                el.style.WebkitTransform ||
                el.style.OTransform ||
                el.style.MozTransform ||
                el.style.msTransform;

            if (style) {
                if (match = style.match(/translate\((.+)px, (.+)px\)/)) {
                    top += parseInt(match[2], 10);
                    left += parseInt(match[1], 10);
                } else if (match = style.match(/translate3d\((.+)px, (.+)px, (.+)px\)/)) {
                    top += parseInt(match[2], 10);
                    left += parseInt(match[1], 10);
                } else if (match = style.match(/matrix3d\(([\-\d,\s]+)\)/)) {
                    var pts = match[1].split(',');
                    top += parseInt(pts[13], 10);
                    left += parseInt(pts[12], 10);
                } else if (match = style.match(/matrix\(.+, .+, .+, .+, (.+), (.+)\)/)) {
                    top += parseInt(match[2], 10);
                    left += parseInt(match[1], 10);
                }
            }
        };

        calculateOffset(el);

        try {
            while (el = el.offsetParent) calculateOffset(el);
        } catch(e) {
            // Hello, internet explorer.
        }

        // Offsets from the body
        top += doc_body.offsetTop;
        left += doc_body.offsetLeft;
        // Offsets from the HTML element
        top += doc_body.parentNode.offsetTop;
        left += doc_body.parentNode.offsetLeft;

        // Firefox and other weirdos. Similar technique to jQuery's
        // `doesNotIncludeMarginInBodyOffset`.
        var htmlComputed = document.defaultView ?
            window.getComputedStyle(doc_body.parentNode, null) :
            doc_body.parentNode.currentStyle;
        if (doc_body.parentNode.offsetTop !==
            parseInt(htmlComputed.marginTop, 10) &&
            !isNaN(parseInt(htmlComputed.marginTop, 10))) {
            top += parseInt(htmlComputed.marginTop, 10);
            left += parseInt(htmlComputed.marginLeft, 10);
        }

        return {
            top: top,
            left: left,
            height: height,
            width: width
        };
    },

    '$': function(x) {
        return (typeof x === 'string') ?
            document.getElementById(x) :
            x;
    },

    // From underscore, minus funcbind for now.
    // Returns a version of a function that always has the second parameter,
    // `obj`, as `this`.
    bind: function(func, obj) {
        var args = Array.prototype.slice.call(arguments, 2);
        return function() {
            return func.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
        };
    },
    // From underscore
    isString: function(obj) {
        return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
    },
    // IE doesn't have indexOf
    indexOf: function(array, item) {
        var nativeIndexOf = Array.prototype.indexOf;
        if (array === null) return -1;
        var i, l;
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
        for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
        return -1;
    },
    // is this object an array?
    isArray: Array.isArray || function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    // From underscore: reimplement the ECMA5 `Object.keys()` method
    keys: Object.keys || function(obj) {
        var ho = Object.prototype.hasOwnProperty;
        if (obj !== Object(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj) if (ho.call(obj, key)) keys[keys.length] = key;
        return keys;
    },
    // From quirksmode: normalize the offset of an event from the top-left
    // of the page.
    eventoffset: function(e) {
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
            // Good browsers
            return {
                x: e.pageX,
                y: e.pageY
            };
        } else if (e.clientX || e.clientY) {
            // Internet Explorer
            var doc = document.documentElement, body = document.body;
            var htmlComputed = document.body.parentNode.currentStyle;
            var topMargin = parseInt(htmlComputed.marginTop, 10) || 0;
            var leftMargin = parseInt(htmlComputed.marginLeft, 10) || 0;
            return {
                x: e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                    (doc && doc.clientLeft || body && body.clientLeft || 0) + leftMargin,
                y: e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                    (doc && doc.clientTop  || body && body.clientTop  || 0) + topMargin
            };
        } else if (e.touches && e.touches.length === 1) {
            // Touch browsers
            return {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            };
        }
    },

    // Ripped from underscore.js
    // Internal function used to implement `_.throttle` and `_.debounce`.
    limit: function(func, wait, debounce) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var throttler = function() {
                timeout = null;
                func.apply(context, args);
            };
            if (debounce) clearTimeout(timeout);
            if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    },

    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time.
    throttle: function(func, wait) {
        return this.limit(func, wait, false);
    }
};
wax = wax || {};
wax.leaf = wax.leaf || {};

//   If not given, the `wax.tooltip` library will be expected.
// * `clickAction` (optional): **full** or **location**: default is
//   **full**.
wax.leaf.interaction = function(map, tilejson, options) {
    tilejson = tilejson || {};
    options = options || {};

    var waxGM = wax.GridManager(tilejson),
        callbacks = options.callbacks || new wax.tooltip(options),
        clickAction = options.clickAction || ['full', 'location'],
        addListener = L.DomEvent.addListener,
        removeListener = L.DomEvent.removeListener,
        clickHandler = options.clickHandler || function(url) {
            window.location = url;
        },
        interaction = {},
        _downLock = false,
        _clickTimeout = false,
        _container = map._container,
        touchable = ('ontouchstart' in document.documentElement),
        // Active feature
        _af,
        // Down event
        _d,
        // Touch tolerance
        tol = 4,
        tileGrid;

    // Search through `.tiles` and determine the position,
    // from the top-left of the **document**, and cache that data
    // so that `mousemove` events don't always recalculate.
    function getTileGrid() {
        // TODO: don't build for tiles outside of viewport
        // Touch interaction leads to intermediate
        //var zoomLayer = map.createOrGetLayer(Math.round(map.getZoom())); //?what is this doing?
        // Calculate a tile grid and cache it, by using the `.tiles`
        // element on this map.
        return tileGrid || (tileGrid = (function(layers) {
            var o = [];
            for (var layerId in layers) {
                // This only supports tiled layers
                if (layers[layerId]._tiles) {
                    for (var tile in layers[layerId]._tiles) {
                        var offset = wax.util.offset(layers[layerId]._tiles[tile]);
                        o.push([offset.top, offset.left, layers[layerId]._tiles[tile]]);
                    }
                }
            }
            return o;
        })(map._layers));
    }

    // When the map moves, the tile grid is no longer valid.
    function clearTileGrid(map, e) {
        tileGrid = null;
    }

    function getTile(e) {
        for (var i = 0, grid = getTileGrid(); i < grid.length; i++) {
            if ((grid[i][0] < e.y) &&
                ((grid[i][0] + 256) > e.y) &&
                (grid[i][1] < e.x) &&
                ((grid[i][1] + 256) > e.x)) return grid[i][2];
        }
        return false;
    }

    // Clear the double-click timeout to prevent double-clicks from
    // triggering popups.
    function killTimeout() {
        if (_clickTimeout) {
            window.clearTimeout(_clickTimeout);
            _clickTimeout = null;
            return true;
        } else {
            return false;
        }
    }

    function onMove(e) {
        // If the user is actually dragging the map, exit early
        // to avoid performance hits.
        if (_downLock) return;

        var pos = wax.util.eventoffset(e),
        tile = getTile(pos),
        feature;

        if (tile) waxGM.getGrid(tile.src, function(err, g) {
            if (err || !g) return;
            feature = g.tileFeature(pos.x, pos.y, tile, {
                format: 'teaser'
            });
            if (feature) {
                if (feature && _af !== feature) {
                    _af = feature;
                    callbacks.out(_container);
                    callbacks.over(feature, _container);
                } else if (!feature) {
                    _af = null;
                    callbacks.out(_container);
                }
            } else {
                _af = null;
                callbacks.out(_container);
            }
        });
    }

    // A handler for 'down' events - which means `mousedown` and `touchstart`
    function onDown(e) {
        // Ignore double-clicks by ignoring clicks within 300ms of
        // each other.
        if (killTimeout()) { return; }

        // Prevent interaction offset calculations happening while
        // the user is dragging the map.
        //
        // Store this event so that we can compare it to the
        // up event
        _downLock = true;
        _d = wax.util.eventoffset(e);
        if (e.type === 'mousedown') {
            addListener(_container, 'mouseup', onUp, this);

            // Only track single-touches. Double-touches will not affect this
            // control
        } else if (e.type === 'touchstart' && e.touches.length === 1) {

            // turn this into touch-mode. Fallback to teaser and full.
            clickAction = ['full', 'teaser'];

            // Don't make the user click close if they hit another tooltip
            if (callbacks._currentTooltip) {
                callbacks.hideTooltip(callbacks._currentTooltip);
            }

            // Touch moves invalidate touches
            addListener(_container, 'touchend', onUp, this);
            addListener(_container, 'touchmove', touchCancel, this);
        }
    }

    function touchCancel() {
        removeListener(_container, 'touchend', onUp);
        removeListener(_container, 'touchmove', onUp);
        _downLock = false;
    }

    function onUp(e) {
        var pos = wax.util.eventoffset(e);
        _downLock = false;

        removeListener(_container, 'mouseup', onUp);

        if (_container.ontouchend) {
            removeListener(_container, 'touchend', onUp);
            removeListener(_container, 'touchmove', _touchCancel);
        }

        if (e.type === 'touchend') {
            // If this was a touch and it survived, there's no need to avoid a double-tap
            click(e, _d);
        } else if (Math.round(pos.y / tol) === Math.round(_d.y / tol) &&
            Math.round(pos.x / tol) === Math.round(_d.x / tol)) {
            // Contain the event data in a closure.
            _clickTimeout = window.setTimeout(
                function() {
                _clickTimeout = null;
                click(e, pos);
            }, 300);
        }
        return onUp;
    }

    // Handle a click event. Takes a second
    function click(e, pos) {
        var tile = getTile(pos),
        feature;

        if (tile) waxGM.getGrid(tile.src, function(err, g) {
            for (var i = 0; g && (i < clickAction.length); i++) {
                feature = g.tileFeature(pos.x, pos.y, tile, {
                    format: clickAction[i]
                });
                if (feature) {
                    switch (clickAction[i]) {
                        case 'full':
                        case 'teaser':
                            // clickAction can be teaser in touch interaction
                            return callbacks.click(feature, _container, 0, e);
                        case 'location':
                            return clickHandler(feature);
                    }
                }
            }
        });
    }

    // Attach listeners to the map
    interaction.add = function() {
        var l = ['moveend', 'layerswitched'];
        for (var i = 0; i < l.length; i++) {
            map.on(l[i], clearTileGrid);
        }
        addListener(_container, 'mousemove', onMove);
        addListener(_container, 'mousedown', onDown);
        if (touchable) {
            addListener(_container, 'touchstart', onDown);
        }
        return this;
    };

    // Remove this control from the map.
    interaction.remove = function() {
        var l = ['moveend', 'layerswitched'];
        for (var i = 0; i < l.length; i++) {
            map.off(l[i], clearTileGrid);
        }
        removeListener(_container, 'mousemove', onMove);
        removeListener(_container, 'mousedown', onDown);
        if (touchable) {
            removeListener(_container, 'touchstart', onDown);
        }
        if (callbacks._currentTooltip) {
            callbacks.hideTooltip(callbacks._currentTooltip);
        }
        return this;
    };

    // Ensure chainability
    return interaction.add(map);
};
wax = wax || {};
wax.leaf = wax.leaf || {};

wax.leaf.connector = L.TileLayer.extend({
    initialize: function(options) {
        options = options || {};
        options.minZoom = options.minzoom || 0;
        options.maxZoom = options.maxzoom || 22;
        L.TileLayer.prototype.initialize.call(this, options.tiles[0], options);
    }
});
