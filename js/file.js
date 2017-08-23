//优化alert弹窗
function alert(e) {
	$("body").append("<div id='msg'><span>" + e + "</span></div>");
	clearmsg();
}

function clearmsg() {
	var t = setTimeout(function() {
		$("#msg").remove();
	}, 2000)
};

//让Ie支持H5标准
(function(e, t) {
	function n(e, t) {
		var n = e.createElement("p"),
			i = e.getElementsByTagName("head")[0] || e.documentElement;
		return n.innerHTML = "x<style>" + t + "</style>", i.insertBefore(n.lastChild, i.firstChild)
	}

	function i() {
		var e = m.elements;
		return "string" == typeof e ? e.split(" ") : e
	}

	function r(e) {
		var t = {},
			n = e.createElement,
			r = e.createDocumentFragment,
			o = r();
		e.createElement = function(e) {
			m.shivMethods || n(e);
			var i;
			return i = t[e] ? t[e].cloneNode() : g.test(e) ? (t[e] = n(e)).cloneNode() : n(e), i.canHaveChildren && !f.test(e) ? o.appendChild(i) : i
		}, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + i().join().replace(/\w+/g, function(e) {
			return t[e] = n(e), o.createElement(e), 'c("' + e + '")'
		}) + ");return n}")(m, o)
	}

	function o(e) {
		var t;
		return e.documentShived ? e : (m.shivCSS && !d && (t = !!n(e, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")), h || (t = !r(e)), t && (e.documentShived = t), e)
	}

	function a(e) {
		for(var t, n = e.getElementsByTagName("*"), r = n.length, o = RegExp("^(?:" + i().join("|") + ")$", "i"), a = []; r--;) t = n[r], o.test(t.nodeName) && a.push(t.applyElement(s(t)));
		return a
	}

	function s(e) {
		for(var t, n = e.attributes, i = n.length, r = e.ownerDocument.createElement(b + ":" + e.nodeName); i--;) t = n[i], t.specified && r.setAttribute(t.nodeName, t.nodeValue);
		return r.style.cssText = e.style.cssText, r
	}

	function l(e) {
		for(var t, n = e.split("{"), r = n.length, o = RegExp("(^|[\\s,>+~])(" + i().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), a = "$1" + b + "\\:$2"; r--;) t = n[r] = n[r].split("}"), t[t.length - 1] = t[t.length - 1].replace(o, a), n[r] = t.join("}");
		return n.join("{")
	}

	function c(e) {
		for(var t = e.length; t--;) e[t].removeNode()
	}

	function u(e) {
		var t, i, r = e.namespaces,
			o = e.parentWindow;
		return !y || e.printShived ? e : (r[b] === void 0 && r.add(b), o.attachEvent("onbeforeprint", function() {
			for(var r, o, s, c = e.styleSheets, u = [], d = c.length, h = Array(d); d--;) h[d] = c[d];
			for(; s = h.pop();)
				if(!s.disabled && v.test(s.media)) {
					for(r = s.imports, d = 0, o = r.length; o > d; d++) h.push(r[d]);
					try {
						u.push(s.cssText)
					} catch(p) {}
				}
			u = l(u.reverse().join("")), i = a(e), t = n(e, u)
		}), o.attachEvent("onafterprint", function() {
			c(i), t.removeNode(!0)
		}), e.printShived = !0, e)
	}
	var d, h, p = e.html5 || {},
		f = /^<|^(?:button|form|map|select|textarea|object|iframe)$/i,
		g = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i;
	(function() {
		var n = t.createElement("a");
		n.innerHTML = "<xyz></xyz>", d = "hidden" in n, d && "function" == typeof injectElementWithStyles && injectElementWithStyles("#modernizr{}", function(t) {
			t.hidden = !0, d = "none" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).display
		}), h = 1 == n.childNodes.length || function() {
			try {
				t.createElement("a")
			} catch(e) {
				return !0
			}
			var n = t.createDocumentFragment();
			return n.cloneNode === void 0 || n.createDocumentFragment === void 0 || n.createElement === void 0
		}()
	})();
	var m = {
		elements: p.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
		shivCSS: p.shivCSS !== !1,
		shivMethods: p.shivMethods !== !1,
		type: "default",
		shivDocument: o
	};
	e.html5 = m, o(t);
	var v = /^$|\b(?:all|print)\b/,
		b = "html5shiv",
		y = !h && function() {
			var n = t.documentElement;
			return t.namespaces !== void 0 && t.parentWindow !== void 0 && n.applyElement !== void 0 && n.removeNode !== void 0 && e.attachEvent !== void 0
		}();
	m.type += " print", m.shivPrint = u, u(t)
})(this, document);

//图片上传预览    IE是用了滤镜。
function previewImage(file) {
	var MAXWIDTH = 260;
	var MAXHEIGHT = 180;
	var div = document.getElementById('preview');
	if(file.files && file.files[0]) {
		div.innerHTML = '<img id=imghead>';
		var img = document.getElementById('imghead');
		img.onload = function() {
			var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
			img.width = rect.width;
			img.height = rect.height;
			//                 img.style.marginLeft = rect.left+'px';
			img.style.marginTop = rect.top + 'px';
		}
		var reader = new FileReader();
		reader.onload = function(evt) {
			img.src = evt.target.result;
		}
		reader.readAsDataURL(file.files[0]);
	} else //兼容IE
	{
		var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
		file.select();
		var src = document.selection.createRange().text;
		div.innerHTML = '<img id=imghead>';
		var img = document.getElementById('imghead');
		img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
		var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
		status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
		div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
	}
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
	var param = {
		top: 0,
		left: 0,
		width: width,
		height: height
	};
	if(width > maxWidth || height > maxHeight) {
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;

		if(rateWidth > rateHeight) {
			param.width = maxWidth;
			param.height = Math.round(height / rateWidth);
		} else {
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}

	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}