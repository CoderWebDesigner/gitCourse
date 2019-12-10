/*!
FullCalendar Interaction Plugin v4.2.0
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("@fullcalendar/core")) : "function" == typeof define && define.amd ? define(["exports", "@fullcalendar/core"], t) : (e = e || self, t(e.FullCalendarInteraction = {}, e.FullCalendar))
}(this, function (e, t) {
    "use strict";

    function n(e, t) {
        function n() {
            this.constructor = e
        }
        m(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    }

    function r(e) {
        return 0 === e.button && !e.ctrlKey
    }

    function i() {
        y++, setTimeout(function () {
            y--
        }, t.config.touchMouseIgnoreWait)
    }

    function o() {
        D++ || window.addEventListener("touchmove", l, {
            passive: !1
        })
    }

    function a() {
        --D || window.removeEventListener("touchmove", l, {
            passive: !1
        })
    }

    function l(e) {
        w && e.preventDefault()
    }

    function s(e) {
        var t = e.tagName;
        return "HTML" === t || "BODY" === t
    }

    function c(e, n) {
        return !e && !n || Boolean(e) === Boolean(n) && t.isDateSpansEqual(e.dateSpan, n.dateSpan)
    }

    function d(e) {
        var t = e.opt("selectLongPressDelay");
        return null == t && (t = e.opt("longPressDelay")), t
    }

    function u(e, n, r) {
        var i = e.dateSpan,
            o = n.dateSpan,
            a = [i.range.start, i.range.end, o.range.start, o.range.end];
        a.sort(t.compareNumbers);
        for (var l = {}, s = 0, c = r; s < c.length; s++) {
            var d = c[s],
                u = d(e, n);
            if (!1 === u) return null;
            u && S(l, u)
        }
        return l.range = {
            start: a[0],
            end: a[3]
        }, l.allDay = i.allDay, l
    }

    function g(e, n, r) {
        var i = e.dateSpan,
            o = n.dateSpan,
            a = i.range.start,
            l = o.range.start,
            s = {};
        i.allDay !== o.allDay && (s.allDay = o.allDay, s.hasEnd = n.component.opt("allDayMaintainDuration"), o.allDay && (a = t.startOfDay(a)));
        var c = t.diffDates(a, l, e.component.dateEnv, e.component === n.component ? e.component.largeUnit : null);
        c.milliseconds && (s.allDay = !1);
        for (var d = {
                startDelta: c,
                endDelta: c,
                standardProps: s
            }, u = 0, g = r; u < g.length; u++) {
            (0, g[u])(d, e, n)
        }
        return d
    }

    function h(e) {
        var t = e.opt("eventLongPressDelay");
        return null == t && (t = e.opt("longPressDelay")), t
    }

    function p(e, n, r, i, o) {
        for (var a = e.component.dateEnv, l = e.dateSpan.range.start, s = n.dateSpan.range.start, c = t.diffDates(l, s, a, e.component.largeUnit), d = {}, u = 0, g = o; u < g.length; u++) {
            var h = g[u],
                p = h(e, n);
            if (!1 === p) return null;
            p && S(d, p)
        }
        if (r) {
            if (a.add(i.start, c) < i.end) return d.startDelta = c, d
        } else if (a.add(i.end, c) > i.start) return d.endDelta = c, d;
        return null
    }

    function v(e, n, r) {
        for (var i = S({}, n.leftoverProps), o = 0, a = r.pluginSystem.hooks.externalDefTransforms; o < a.length; o++) {
            var l = a[o];
            S(i, l(e, n))
        }
        var s = t.parseEventDef(i, n.sourceId, e.allDay, r.opt("forceEventDuration") || Boolean(n.duration), r),
            c = e.range.start;
        e.allDay && n.startTime && (c = r.dateEnv.add(c, n.startTime));
        var d = n.duration ? r.dateEnv.add(c, n.duration) : r.getDefaultEventEnd(e.allDay, c);
        return {
            def: s,
            instance: t.createEventInstance(s.defId, {
                start: c,
                end: d
            })
        }
    }

    function f(e) {
        var n = E(e, "event"),
            r = n ? JSON.parse(n) : {
                create: !1
            };
        return t.parseDragMeta(r)
    }

    function E(e, n) {
        var r = t.config.dataAttrPrefix,
            i = (r ? r + "-" : "") + n;
        return e.getAttribute("data-" + i) || ""
    }
    /*! *****************************************************************************
        Copyright (c) Microsoft Corporation. All rights reserved.
        Licensed under the Apache License, Version 2.0 (the "License"); you may not use
        this file except in compliance with the License. You may obtain a copy of the
        License at http://www.apache.org/licenses/LICENSE-2.0

        THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
        WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
        MERCHANTABLITY OR NON-INFRINGEMENT.

        See the Apache Version 2.0 License for specific language governing permissions
        and limitations under the License.
        ***************************************************************************** */
    var m = function (e, t) {
            return (m = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
        },
        S = function () {
            return S = Object.assign || function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) {
                    t = arguments[n];
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                }
                return e
            }, S.apply(this, arguments)
        };
    t.config.touchMouseIgnoreWait = 500;
    var y = 0,
        D = 0,
        w = !1,
        T = function () {
            function e(e) {
                var n = this;
                this.subjectEl = null, this.downEl = null, this.selector = "", this.handleSelector = "", this.shouldIgnoreMove = !1, this.shouldWatchScroll = !0, this.isDragging = !1, this.isTouchDragging = !1, this.wasTouchScroll = !1, this.handleMouseDown = function (e) {
                    if (!n.shouldIgnoreMouse() && r(e) && n.tryStart(e)) {
                        var t = n.createEventFromMouse(e, !0);
                        n.emitter.trigger("pointerdown", t), n.initScrollWatch(t), n.shouldIgnoreMove || document.addEventListener("mousemove", n.handleMouseMove), document.addEventListener("mouseup", n.handleMouseUp)
                    }
                }, this.handleMouseMove = function (e) {
                    var t = n.createEventFromMouse(e);
                    n.recordCoords(t), n.emitter.trigger("pointermove", t)
                }, this.handleMouseUp = function (e) {
                    document.removeEventListener("mousemove", n.handleMouseMove), document.removeEventListener("mouseup", n.handleMouseUp), n.emitter.trigger("pointerup", n.createEventFromMouse(e)), n.cleanup()
                }, this.handleTouchStart = function (e) {
                    if (n.tryStart(e)) {
                        n.isTouchDragging = !0;
                        var t = n.createEventFromTouch(e, !0);
                        n.emitter.trigger("pointerdown", t), n.initScrollWatch(t);
                        var r = e.target;
                        n.shouldIgnoreMove || r.addEventListener("touchmove", n.handleTouchMove), r.addEventListener("touchend", n.handleTouchEnd), r.addEventListener("touchcancel", n.handleTouchEnd), window.addEventListener("scroll", n.handleTouchScroll, !0)
                    }
                }, this.handleTouchMove = function (e) {
                    var t = n.createEventFromTouch(e);
                    n.recordCoords(t), n.emitter.trigger("pointermove", t)
                }, this.handleTouchEnd = function (e) {
                    if (n.isDragging) {
                        var t = e.target;
                        t.removeEventListener("touchmove", n.handleTouchMove), t.removeEventListener("touchend", n.handleTouchEnd), t.removeEventListener("touchcancel", n.handleTouchEnd), window.removeEventListener("scroll", n.handleTouchScroll, !0), n.emitter.trigger("pointerup", n.createEventFromTouch(e)), n.cleanup(), n.isTouchDragging = !1, i()
                    }
                }, this.handleTouchScroll = function () {
                    n.wasTouchScroll = !0
                }, this.handleScroll = function (e) {
                    if (!n.shouldIgnoreMove) {
                        var t = window.pageXOffset - n.prevScrollX + n.prevPageX,
                            r = window.pageYOffset - n.prevScrollY + n.prevPageY;
                        n.emitter.trigger("pointermove", {
                            origEvent: e,
                            isTouch: n.isTouchDragging,
                            subjectEl: n.subjectEl,
                            pageX: t,
                            pageY: r,
                            deltaX: t - n.origPageX,
                            deltaY: r - n.origPageY
                        })
                    }
                }, this.containerEl = e, this.emitter = new t.EmitterMixin, e.addEventListener("mousedown", this.handleMouseDown), e.addEventListener("touchstart", this.handleTouchStart, {
                    passive: !0
                }), o()
            }
            return e.prototype.destroy = function () {
                this.containerEl.removeEventListener("mousedown", this.handleMouseDown), this.containerEl.removeEventListener("touchstart", this.handleTouchStart, {
                    passive: !0
                }), a()
            }, e.prototype.tryStart = function (e) {
                var n = this.querySubjectEl(e),
                    r = e.target;
                return !(!n || this.handleSelector && !t.elementClosest(r, this.handleSelector)) && (this.subjectEl = n, this.downEl = r, this.isDragging = !0, this.wasTouchScroll = !1, !0)
            }, e.prototype.cleanup = function () {
                w = !1, this.isDragging = !1, this.subjectEl = null, this.downEl = null, this.destroyScrollWatch()
            }, e.prototype.querySubjectEl = function (e) {
                return this.selector ? t.elementClosest(e.target, this.selector) : this.containerEl
            }, e.prototype.shouldIgnoreMouse = function () {
                return y || this.isTouchDragging
            }, e.prototype.cancelTouchScroll = function () {
                this.isDragging && (w = !0)
            }, e.prototype.initScrollWatch = function (e) {
                this.shouldWatchScroll && (this.recordCoords(e), window.addEventListener("scroll", this.handleScroll, !0))
            }, e.prototype.recordCoords = function (e) {
                this.shouldWatchScroll && (this.prevPageX = e.pageX, this.prevPageY = e.pageY, this.prevScrollX = window.pageXOffset, this.prevScrollY = window.pageYOffset)
            }, e.prototype.destroyScrollWatch = function () {
                this.shouldWatchScroll && window.removeEventListener("scroll", this.handleScroll, !0)
            }, e.prototype.createEventFromMouse = function (e, t) {
                var n = 0,
                    r = 0;
                return t ? (this.origPageX = e.pageX, this.origPageY = e.pageY) : (n = e.pageX - this.origPageX, r = e.pageY - this.origPageY), {
                    origEvent: e,
                    isTouch: !1,
                    subjectEl: this.subjectEl,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    deltaX: n,
                    deltaY: r
                }
            }, e.prototype.createEventFromTouch = function (e, t) {
                var n, r, i = e.touches,
                    o = 0,
                    a = 0;
                return i && i.length ? (n = i[0].pageX, r = i[0].pageY) : (n = e.pageX, r = e.pageY), t ? (this.origPageX = n, this.origPageY = r) : (o = n - this.origPageX, a = r - this.origPageY), {
                    origEvent: e,
                    isTouch: !0,
                    subjectEl: this.subjectEl,
                    pageX: n,
                    pageY: r,
                    deltaX: o,
                    deltaY: a
                }
            }, e
        }(),
        M = function () {
            function e() {
                this.isVisible = !1, this.sourceEl = null, this.mirrorEl = null, this.sourceElRect = null, this.parentNode = document.body, this.zIndex = 9999, this.revertDuration = 0
            }
            return e.prototype.start = function (e, t, n) {
                this.sourceEl = e, this.sourceElRect = this.sourceEl.getBoundingClientRect(), this.origScreenX = t - window.pageXOffset, this.origScreenY = n - window.pageYOffset, this.deltaX = 0, this.deltaY = 0, this.updateElPosition()
            }, e.prototype.handleMove = function (e, t) {
                this.deltaX = e - window.pageXOffset - this.origScreenX, this.deltaY = t - window.pageYOffset - this.origScreenY, this.updateElPosition()
            }, e.prototype.setIsVisible = function (e) {
                e ? this.isVisible || (this.mirrorEl && (this.mirrorEl.style.display = ""), this.isVisible = e, this.updateElPosition()) : this.isVisible && (this.mirrorEl && (this.mirrorEl.style.display = "none"), this.isVisible = e)
            }, e.prototype.stop = function (e, t) {
                var n = this,
                    r = function () {
                        n.cleanup(), t()
                    };
                e && this.mirrorEl && this.isVisible && this.revertDuration && (this.deltaX || this.deltaY) ? this.doRevertAnimation(r, this.revertDuration) : setTimeout(r, 0)
            }, e.prototype.doRevertAnimation = function (e, n) {
                var r = this.mirrorEl,
                    i = this.sourceEl.getBoundingClientRect();
                r.style.transition = "top " + n + "ms,left " + n + "ms", t.applyStyle(r, {
                    left: i.left,
                    top: i.top
                }), t.whenTransitionDone(r, function () {
                    r.style.transition = "", e()
                })
            }, e.prototype.cleanup = function () {
                this.mirrorEl && (t.removeElement(this.mirrorEl), this.mirrorEl = null), this.sourceEl = null
            }, e.prototype.updateElPosition = function () {
                this.sourceEl && this.isVisible && t.applyStyle(this.getMirrorEl(), {
                    left: this.sourceElRect.left + this.deltaX,
                    top: this.sourceElRect.top + this.deltaY
                })
            }, e.prototype.getMirrorEl = function () {
                var e = this.sourceElRect,
                    n = this.mirrorEl;
                return n || (n = this.mirrorEl = this.sourceEl.cloneNode(!0), n.classList.add("fc-unselectable"), n.classList.add("fc-dragging"), t.applyStyle(n, {
                    position: "fixed",
                    zIndex: this.zIndex,
                    visibility: "",
                    boxSizing: "border-box",
                    width: e.right - e.left,
                    height: e.bottom - e.top,
                    right: "auto",
                    bottom: "auto",
                    margin: 0
                }), this.parentNode.appendChild(n)), n
            }, e
        }(),
        b = function (e) {
            function t(t, n) {
                var r = e.call(this) || this;
                return r.handleScroll = function () {
                    r.scrollTop = r.scrollController.getScrollTop(), r.scrollLeft = r.scrollController.getScrollLeft(), r.handleScrollChange()
                }, r.scrollController = t, r.doesListening = n, r.scrollTop = r.origScrollTop = t.getScrollTop(), r.scrollLeft = r.origScrollLeft = t.getScrollLeft(), r.scrollWidth = t.getScrollWidth(), r.scrollHeight = t.getScrollHeight(), r.clientWidth = t.getClientWidth(), r.clientHeight = t.getClientHeight(), r.clientRect = r.computeClientRect(), r.doesListening && r.getEventTarget().addEventListener("scroll", r.handleScroll), r
            }
            return n(t, e), t.prototype.destroy = function () {
                this.doesListening && this.getEventTarget().removeEventListener("scroll", this.handleScroll)
            }, t.prototype.getScrollTop = function () {
                return this.scrollTop
            }, t.prototype.getScrollLeft = function () {
                return this.scrollLeft
            }, t.prototype.setScrollTop = function (e) {
                this.scrollController.setScrollTop(e), this.doesListening || (this.scrollTop = Math.max(Math.min(e, this.getMaxScrollTop()), 0), this.handleScrollChange())
            }, t.prototype.setScrollLeft = function (e) {
                this.scrollController.setScrollLeft(e), this.doesListening || (this.scrollLeft = Math.max(Math.min(e, this.getMaxScrollLeft()), 0), this.handleScrollChange())
            }, t.prototype.getClientWidth = function () {
                return this.clientWidth
            }, t.prototype.getClientHeight = function () {
                return this.clientHeight
            }, t.prototype.getScrollWidth = function () {
                return this.scrollWidth
            }, t.prototype.getScrollHeight = function () {
                return this.scrollHeight
            }, t.prototype.handleScrollChange = function () {}, t
        }(t.ScrollController),
        C = function (e) {
            function r(n, r) {
                return e.call(this, new t.ElementScrollController(n), r) || this
            }
            return n(r, e), r.prototype.getEventTarget = function () {
                return this.scrollController.el
            }, r.prototype.computeClientRect = function () {
                return t.computeInnerRect(this.scrollController.el)
            }, r
        }(b),
        R = function (e) {
            function r(n) {
                return e.call(this, new t.WindowScrollController, n) || this
            }
            return n(r, e), r.prototype.getEventTarget = function () {
                return window
            }, r.prototype.computeClientRect = function () {
                return {
                    left: this.scrollLeft,
                    right: this.scrollLeft + this.clientWidth,
                    top: this.scrollTop,
                    bottom: this.scrollTop + this.clientHeight
                }
            }, r.prototype.handleScrollChange = function () {
                this.clientRect = this.computeClientRect()
            }, r
        }(b),
        I = "function" == typeof performance ? performance.now : Date.now,
        P = function () {
            function e() {
                var e = this;
                this.isEnabled = !0, this.scrollQuery = [window, ".fc-scroller"], this.edgeThreshold = 50, this.maxVelocity = 300, this.pointerScreenX = null, this.pointerScreenY = null, this.isAnimating = !1, this.scrollCaches = null, this.everMovedUp = !1, this.everMovedDown = !1, this.everMovedLeft = !1, this.everMovedRight = !1, this.animate = function () {
                    if (e.isAnimating) {
                        var t = e.computeBestEdge(e.pointerScreenX + window.pageXOffset, e.pointerScreenY + window.pageYOffset);
                        if (t) {
                            var n = I();
                            e.handleSide(t, (n - e.msSinceRequest) / 1e3), e.requestAnimation(n)
                        } else e.isAnimating = !1
                    }
                }
            }
            return e.prototype.start = function (e, t) {
                this.isEnabled && (this.scrollCaches = this.buildCaches(), this.pointerScreenX = null, this.pointerScreenY = null, this.everMovedUp = !1, this.everMovedDown = !1, this.everMovedLeft = !1, this.everMovedRight = !1, this.handleMove(e, t))
            }, e.prototype.handleMove = function (e, t) {
                if (this.isEnabled) {
                    var n = e - window.pageXOffset,
                        r = t - window.pageYOffset,
                        i = null === this.pointerScreenY ? 0 : r - this.pointerScreenY,
                        o = null === this.pointerScreenX ? 0 : n - this.pointerScreenX;
                    i < 0 ? this.everMovedUp = !0 : i > 0 && (this.everMovedDown = !0), o < 0 ? this.everMovedLeft = !0 : o > 0 && (this.everMovedRight = !0), this.pointerScreenX = n, this.pointerScreenY = r, this.isAnimating || (this.isAnimating = !0, this.requestAnimation(I()))
                }
            }, e.prototype.stop = function () {
                if (this.isEnabled) {
                    this.isAnimating = !1;
                    for (var e = 0, t = this.scrollCaches; e < t.length; e++) {
                        t[e].destroy()
                    }
                    this.scrollCaches = null
                }
            }, e.prototype.requestAnimation = function (e) {
                this.msSinceRequest = e, requestAnimationFrame(this.animate)
            }, e.prototype.handleSide = function (e, t) {
                var n = e.scrollCache,
                    r = this.edgeThreshold,
                    i = r - e.distance,
                    o = i * i / (r * r) * this.maxVelocity * t,
                    a = 1;
                switch (e.name) {
                    case "left":
                        a = -1;
                    case "right":
                        n.setScrollLeft(n.getScrollLeft() + o * a);
                        break;
                    case "top":
                        a = -1;
                    case "bottom":
                        n.setScrollTop(n.getScrollTop() + o * a)
                }
            }, e.prototype.computeBestEdge = function (e, t) {
                for (var n = this.edgeThreshold, r = null, i = 0, o = this.scrollCaches; i < o.length; i++) {
                    var a = o[i],
                        l = a.clientRect,
                        s = e - l.left,
                        c = l.right - e,
                        d = t - l.top,
                        u = l.bottom - t;
                    s >= 0 && c >= 0 && d >= 0 && u >= 0 && (d <= n && this.everMovedUp && a.canScrollUp() && (!r || r.distance > d) && (r = {
                        scrollCache: a,
                        name: "top",
                        distance: d
                    }), u <= n && this.everMovedDown && a.canScrollDown() && (!r || r.distance > u) && (r = {
                        scrollCache: a,
                        name: "bottom",
                        distance: u
                    }), s <= n && this.everMovedLeft && a.canScrollLeft() && (!r || r.distance > s) && (r = {
                        scrollCache: a,
                        name: "left",
                        distance: s
                    }), c <= n && this.everMovedRight && a.canScrollRight() && (!r || r.distance > c) && (r = {
                        scrollCache: a,
                        name: "right",
                        distance: c
                    }))
                }
                return r
            }, e.prototype.buildCaches = function () {
                return this.queryScrollEls().map(function (e) {
                    return e === window ? new R(!1) : new C(e, !1)
                })
            }, e.prototype.queryScrollEls = function () {
                for (var e = [], t = 0, n = this.scrollQuery; t < n.length; t++) {
                    var r = n[t];
                    "object" == typeof r ? e.push(r) : e.push.apply(e, Array.prototype.slice.call(document.querySelectorAll(r)))
                }
                return e
            }, e
        }(),
        L = function (e) {
            function r(n) {
                var r = e.call(this, n) || this;
                r.delay = null, r.minDistance = 0, r.touchScrollAllowed = !0, r.mirrorNeedsRevert = !1, r.isInteracting = !1, r.isDragging = !1, r.isDelayEnded = !1, r.isDistanceSurpassed = !1, r.delayTimeoutId = null, r.onPointerDown = function (e) {
                    r.isDragging || (r.isInteracting = !0, r.isDelayEnded = !1, r.isDistanceSurpassed = !1, t.preventSelection(document.body), t.preventContextMenu(document.body), e.isTouch || e.origEvent.preventDefault(), r.emitter.trigger("pointerdown", e), r.pointer.shouldIgnoreMove || (r.mirror.setIsVisible(!1), r.mirror.start(e.subjectEl, e.pageX, e.pageY), r.startDelay(e), r.minDistance || r.handleDistanceSurpassed(e)))
                }, r.onPointerMove = function (e) {
                    if (r.isInteracting) {
                        if (r.emitter.trigger("pointermove", e), !r.isDistanceSurpassed) {
                            var t = r.minDistance,
                                n = void 0,
                                i = e.deltaX,
                                o = e.deltaY;
                            n = i * i + o * o, n >= t * t && r.handleDistanceSurpassed(e)
                        }
                        r.isDragging && ("scroll" !== e.origEvent.type && (r.mirror.handleMove(e.pageX, e.pageY), r.autoScroller.handleMove(e.pageX, e.pageY)), r.emitter.trigger("dragmove", e))
                    }
                }, r.onPointerUp = function (e) {
                    r.isInteracting && (r.isInteracting = !1, t.allowSelection(document.body), t.allowContextMenu(document.body), r.emitter.trigger("pointerup", e), r.isDragging && (r.autoScroller.stop(), r.tryStopDrag(e)), r.delayTimeoutId && (clearTimeout(r.delayTimeoutId), r.delayTimeoutId = null))
                };
                var i = r.pointer = new T(n);
                return i.emitter.on("pointerdown", r.onPointerDown), i.emitter.on("pointermove", r.onPointerMove), i.emitter.on("pointerup", r.onPointerUp), r.mirror = new M, r.autoScroller = new P, r
            }
            return n(r, e), r.prototype.destroy = function () {
                this.pointer.destroy()
            }, r.prototype.startDelay = function (e) {
                var t = this;
                "number" == typeof this.delay ? this.delayTimeoutId = setTimeout(function () {
                    t.delayTimeoutId = null, t.handleDelayEnd(e)
                }, this.delay) : this.handleDelayEnd(e)
            }, r.prototype.handleDelayEnd = function (e) {
                this.isDelayEnded = !0, this.tryStartDrag(e)
            }, r.prototype.handleDistanceSurpassed = function (e) {
                this.isDistanceSurpassed = !0, this.tryStartDrag(e)
            }, r.prototype.tryStartDrag = function (e) {
                this.isDelayEnded && this.isDistanceSurpassed && (this.pointer.wasTouchScroll && !this.touchScrollAllowed || (this.isDragging = !0, this.mirrorNeedsRevert = !1, this.autoScroller.start(e.pageX, e.pageY), this.emitter.trigger("dragstart", e), !1 === this.touchScrollAllowed && this.pointer.cancelTouchScroll()))
            }, r.prototype.tryStopDrag = function (e) {
                this.mirror.stop(this.mirrorNeedsRevert, this.stopDrag.bind(this, e))
            }, r.prototype.stopDrag = function (e) {
                this.isDragging = !1, this.emitter.trigger("dragend", e)
            }, r.prototype.setIgnoreMove = function (e) {
                this.pointer.shouldIgnoreMove = e
            }, r.prototype.setMirrorIsVisible = function (e) {
                this.mirror.setIsVisible(e)
            }, r.prototype.setMirrorNeedsRevert = function (e) {
                this.mirrorNeedsRevert = e
            }, r.prototype.setAutoScrollEnabled = function (e) {
                this.autoScroller.isEnabled = e
            }, r
        }(t.ElementDragging),
        j = function () {
            function e(e) {
                this.origRect = t.computeRect(e), this.scrollCaches = t.getClippingParents(e).map(function (e) {
                    return new C(e, !0)
                })
            }
            return e.prototype.destroy = function () {
                for (var e = 0, t = this.scrollCaches; e < t.length; e++) {
                    t[e].destroy()
                }
            }, e.prototype.computeLeft = function () {
                for (var e = this.origRect.left, t = 0, n = this.scrollCaches; t < n.length; t++) {
                    var r = n[t];
                    e += r.origScrollLeft - r.getScrollLeft()
                }
                return e
            }, e.prototype.computeTop = function () {
                for (var e = this.origRect.top, t = 0, n = this.scrollCaches; t < n.length; t++) {
                    var r = n[t];
                    e += r.origScrollTop - r.getScrollTop()
                }
                return e
            }, e.prototype.isWithinClipping = function (e, n) {
                for (var r = {
                        left: e,
                        top: n
                    }, i = 0, o = this.scrollCaches; i < o.length; i++) {
                    var a = o[i];
                    if (!s(a.getEventTarget()) && !t.pointInsideRect(r, a.clientRect)) return !1
                }
                return !0
            }, e
        }(),
        A = function () {
            function e(e, n) {
                var r = this;
                this.useSubjectCenter = !1, this.requireInitial = !0, this.initialHit = null, this.movingHit = null, this.finalHit = null, this.handlePointerDown = function (e) {
                    var t = r.dragging;
                    r.initialHit = null, r.movingHit = null, r.finalHit = null, r.prepareHits(), r.processFirstCoord(e), r.initialHit || !r.requireInitial ? (t.setIgnoreMove(!1), r.emitter.trigger("pointerdown", e)) : t.setIgnoreMove(!0)
                }, this.handleDragStart = function (e) {
                    r.emitter.trigger("dragstart", e), r.handleMove(e, !0)
                }, this.handleDragMove = function (e) {
                    r.emitter.trigger("dragmove", e), r.handleMove(e)
                }, this.handlePointerUp = function (e) {
                    r.releaseHits(), r.emitter.trigger("pointerup", e)
                }, this.handleDragEnd = function (e) {
                    r.movingHit && r.emitter.trigger("hitupdate", null, !0, e), r.finalHit = r.movingHit, r.movingHit = null, r.emitter.trigger("dragend", e)
                }, this.droppableStore = n, e.emitter.on("pointerdown", this.handlePointerDown), e.emitter.on("dragstart", this.handleDragStart), e.emitter.on("dragmove", this.handleDragMove), e.emitter.on("pointerup", this.handlePointerUp), e.emitter.on("dragend", this.handleDragEnd), this.dragging = e, this.emitter = new t.EmitterMixin
            }
            return e.prototype.processFirstCoord = function (e) {
                var n, r = {
                        left: e.pageX,
                        top: e.pageY
                    },
                    i = r,
                    o = e.subjectEl;
                o !== document && (n = t.computeRect(o), i = t.constrainPoint(i, n));
                var a = this.initialHit = this.queryHitForOffset(i.left, i.top);
                if (a) {
                    if (this.useSubjectCenter && n) {
                        var l = t.intersectRects(n, a.rect);
                        l && (i = t.getRectCenter(l))
                    }
                    this.coordAdjust = t.diffPoints(i, r)
                } else this.coordAdjust = {
                    left: 0,
                    top: 0
                }
            }, e.prototype.handleMove = function (e, t) {
                var n = this.queryHitForOffset(e.pageX + this.coordAdjust.left, e.pageY + this.coordAdjust.top);
                !t && c(this.movingHit, n) || (this.movingHit = n, this.emitter.trigger("hitupdate", n, !1, e))
            }, e.prototype.prepareHits = function () {
                this.offsetTrackers = t.mapHash(this.droppableStore, function (e) {
                    return e.component.buildPositionCaches(), new j(e.el)
                })
            }, e.prototype.releaseHits = function () {
                var e = this.offsetTrackers;
                for (var t in e) e[t].destroy();
                this.offsetTrackers = {}
            }, e.prototype.queryHitForOffset = function (e, n) {
                var r = this,
                    i = r.droppableStore,
                    o = r.offsetTrackers,
                    a = null;
                for (var l in i) {
                    var s = i[l].component,
                        c = o[l];
                    if (c.isWithinClipping(e, n)) {
                        var d = c.computeLeft(),
                            u = c.computeTop(),
                            g = e - d,
                            h = n - u,
                            p = c.origRect,
                            v = p.right - p.left,
                            f = p.bottom - p.top;
                        if (g >= 0 && g < v && h >= 0 && h < f) {
                            var E = s.queryHit(g, h, v, f);
                            !E || s.props.dateProfile && !t.rangeContainsRange(s.props.dateProfile.activeRange, E.dateSpan.range) || a && !(E.layer > a.layer) || (E.rect.left += d, E.rect.right += d, E.rect.top += u, E.rect.bottom += u, a = E)
                        }
                    }
                }
                return a
            }, e
        }(),
        H = function (e) {
            function r(n) {
                var r = e.call(this, n) || this;
                r.handlePointerDown = function (e) {
                    var t = r.dragging;
                    t.setIgnoreMove(!r.component.isValidDateDownEl(t.pointer.downEl))
                }, r.handleDragEnd = function (e) {
                    var t = r.component;
                    if (!r.dragging.pointer.wasTouchScroll) {
                        var n = r.hitDragging,
                            i = n.initialHit,
                            o = n.finalHit;
                        i && o && c(i, o) && t.calendar.triggerDateClick(i.dateSpan, i.dayEl, t.view, e.origEvent)
                    }
                };
                var i = n.component;
                r.dragging = new L(i.el), r.dragging.autoScroller.isEnabled = !1;
                var o = r.hitDragging = new A(r.dragging, t.interactionSettingsToStore(n));
                return o.emitter.on("pointerdown", r.handlePointerDown), o.emitter.on("dragend", r.handleDragEnd), r
            }
            return n(r, e), r.prototype.destroy = function () {
                this.dragging.destroy()
            }, r
        }(t.Interaction),
        N = function (e) {
            function r(n) {
                var r = e.call(this, n) || this;
                r.dragSelection = null, r.handlePointerDown = function (e) {
                    var t = r,
                        n = t.component,
                        i = t.dragging,
                        o = n.opt("selectable") && n.isValidDateDownEl(e.origEvent.target);
                    i.setIgnoreMove(!o), i.delay = e.isTouch ? d(n) : null
                }, r.handleDragStart = function (e) {
                    r.component.calendar.unselect(e)
                }, r.handleHitUpdate = function (e, n) {
                    var i = r.component.calendar,
                        o = null,
                        a = !1;
                    e && ((o = u(r.hitDragging.initialHit, e, i.pluginSystem.hooks.dateSelectionTransformers)) && r.component.isDateSelectionValid(o) || (a = !0, o = null)), o ? i.dispatch({
                        type: "SELECT_DATES",
                        selection: o
                    }) : n || i.dispatch({
                        type: "UNSELECT_DATES"
                    }), a ? t.disableCursor() : t.enableCursor(), n || (r.dragSelection = o)
                }, r.handlePointerUp = function (e) {
                    r.dragSelection && (r.component.calendar.triggerDateSelect(r.dragSelection, e), r.dragSelection = null)
                };
                var i = n.component,
                    o = r.dragging = new L(i.el);
                o.touchScrollAllowed = !1, o.minDistance = i.opt("selectMinDistance") || 0, o.autoScroller.isEnabled = i.opt("dragScroll");
                var a = r.hitDragging = new A(r.dragging, t.interactionSettingsToStore(n));
                return a.emitter.on("pointerdown", r.handlePointerDown), a.emitter.on("dragstart", r.handleDragStart), a.emitter.on("hitupdate", r.handleHitUpdate), a.emitter.on("pointerup", r.handlePointerUp), r
            }
            return n(r, e), r.prototype.destroy = function () {
                this.dragging.destroy()
            }, r
        }(t.Interaction),
        V = function (e) {
            function r(n) {
                var i = e.call(this, n) || this;
                i.subjectSeg = null, i.isDragging = !1, i.eventRange = null, i.relevantEvents = null, i.receivingCalendar = null, i.validMutation = null, i.mutatedRelevantEvents = null, i.handlePointerDown = function (e) {
                    var n = e.origEvent.target,
                        r = i,
                        o = r.component,
                        a = r.dragging,
                        l = a.mirror,
                        s = o.calendar,
                        c = i.subjectSeg = t.getElSeg(e.subjectEl),
                        d = i.eventRange = c.eventRange,
                        u = d.instance.instanceId;
                    i.relevantEvents = t.getRelevantEvents(s.state.eventStore, u), a.minDistance = e.isTouch ? 0 : o.opt("eventDragMinDistance"), a.delay = e.isTouch && u !== o.props.eventSelection ? h(o) : null, l.parentNode = s.el, l.revertDuration = o.opt("dragRevertDuration");
                    var g = o.isValidSegDownEl(n) && !t.elementClosest(n, ".fc-resizer");
                    a.setIgnoreMove(!g), i.isDragging = g && e.subjectEl.classList.contains("fc-draggable")
                }, i.handleDragStart = function (e) {
                    var n = i.component.calendar,
                        r = i.eventRange,
                        o = r.instance.instanceId;
                    e.isTouch ? o !== i.component.props.eventSelection && n.dispatch({
                        type: "SELECT_EVENT",
                        eventInstanceId: o
                    }) : n.dispatch({
                        type: "UNSELECT_EVENT"
                    }), i.isDragging && (n.unselect(e), n.publiclyTrigger("eventDragStart", [{
                        el: i.subjectSeg.el,
                        event: new t.EventApi(n, r.def, r.instance),
                        jsEvent: e.origEvent,
                        view: i.component.view
                    }]))
                }, i.handleHitUpdate = function (e, n) {
                    if (i.isDragging) {
                        var r = i.relevantEvents,
                            o = i.hitDragging.initialHit,
                            a = i.component.calendar,
                            l = null,
                            s = null,
                            d = null,
                            u = !1,
                            h = {
                                affectedEvents: r,
                                mutatedEvents: t.createEmptyEventStore(),
                                isEvent: !0,
                                origSeg: i.subjectSeg
                            };
                        if (e) {
                            var p = e.component;
                            l = p.calendar, a === l || p.opt("editable") && p.opt("droppable") ? (s = g(o, e, l.pluginSystem.hooks.eventDragMutationMassagers)) && (d = t.applyMutationToEventStore(r, l.eventUiBases, s, l), h.mutatedEvents = d, p.isInteractionValid(h) || (u = !0, s = null, d = null, h.mutatedEvents = t.createEmptyEventStore())) : l = null
                        }
                        i.displayDrag(l, h), u ? t.disableCursor() : t.enableCursor(), n || (a === l && c(o, e) && (s = null), i.dragging.setMirrorNeedsRevert(!s), i.dragging.setMirrorIsVisible(!e || !document.querySelector(".fc-mirror")), i.receivingCalendar = l, i.validMutation = s, i.mutatedRelevantEvents = d)
                    }
                }, i.handlePointerUp = function () {
                    i.isDragging || i.cleanup()
                }, i.handleDragEnd = function (e) {
                    if (i.isDragging) {
                        var n = i.component.calendar,
                            r = i.component.view,
                            o = i.receivingCalendar,
                            a = i.eventRange.def,
                            l = i.eventRange.instance,
                            s = new t.EventApi(n, a, l),
                            c = i.relevantEvents,
                            d = i.mutatedRelevantEvents,
                            u = i.hitDragging.finalHit;
                        if (i.clearDrag(), n.publiclyTrigger("eventDragStop", [{
                                el: i.subjectSeg.el,
                                event: s,
                                jsEvent: e.origEvent,
                                view: r
                            }]), i.validMutation) {
                            if (o === n) {
                                n.dispatch({
                                    type: "MERGE_EVENTS",
                                    eventStore: d
                                });
                                for (var g = {}, h = 0, p = n.pluginSystem.hooks.eventDropTransformers; h < p.length; h++) {
                                    var v = p[h];
                                    S(g, v(i.validMutation, n))
                                }
                                var f = S({}, g, {
                                    el: e.subjectEl,
                                    delta: i.validMutation.startDelta,
                                    oldEvent: s,
                                    event: new t.EventApi(n, d.defs[a.defId], l ? d.instances[l.instanceId] : null),
                                    revert: function () {
                                        n.dispatch({
                                            type: "MERGE_EVENTS",
                                            eventStore: c
                                        })
                                    },
                                    jsEvent: e.origEvent,
                                    view: r
                                });
                                n.publiclyTrigger("eventDrop", [f])
                            } else if (o) {
                                n.publiclyTrigger("eventLeave", [{
                                    draggedEl: e.subjectEl,
                                    event: s,
                                    view: r
                                }]), n.dispatch({
                                    type: "REMOVE_EVENT_INSTANCES",
                                    instances: i.mutatedRelevantEvents.instances
                                }), o.dispatch({
                                    type: "MERGE_EVENTS",
                                    eventStore: i.mutatedRelevantEvents
                                }), e.isTouch && o.dispatch({
                                    type: "SELECT_EVENT",
                                    eventInstanceId: l.instanceId
                                });
                                var E = S({}, o.buildDatePointApi(u.dateSpan), {
                                    draggedEl: e.subjectEl,
                                    jsEvent: e.origEvent,
                                    view: u.component
                                });
                                o.publiclyTrigger("drop", [E]), o.publiclyTrigger("eventReceive", [{
                                    draggedEl: e.subjectEl,
                                    event: new t.EventApi(o, d.defs[a.defId], d.instances[l.instanceId]),
                                    view: u.component
                                }])
                            }
                        } else n.publiclyTrigger("_noEventDrop")
                    }
                    i.cleanup()
                };
                var o = i.component,
                    a = i.dragging = new L(o.el);
                a.pointer.selector = r.SELECTOR, a.touchScrollAllowed = !1, a.autoScroller.isEnabled = o.opt("dragScroll");
                var l = i.hitDragging = new A(i.dragging, t.interactionSettingsStore);
                return l.useSubjectCenter = n.useEventCenter, l.emitter.on("pointerdown", i.handlePointerDown), l.emitter.on("dragstart", i.handleDragStart), l.emitter.on("hitupdate", i.handleHitUpdate), l.emitter.on("pointerup", i.handlePointerUp), l.emitter.on("dragend", i.handleDragEnd), i
            }
            return n(r, e), r.prototype.destroy = function () {
                this.dragging.destroy()
            }, r.prototype.displayDrag = function (e, n) {
                var r = this.component.calendar,
                    i = this.receivingCalendar;
                i && i !== e && (i === r ? i.dispatch({
                    type: "SET_EVENT_DRAG",
                    state: {
                        affectedEvents: n.affectedEvents,
                        mutatedEvents: t.createEmptyEventStore(),
                        isEvent: !0,
                        origSeg: n.origSeg
                    }
                }) : i.dispatch({
                    type: "UNSET_EVENT_DRAG"
                })), e && e.dispatch({
                    type: "SET_EVENT_DRAG",
                    state: n
                })
            }, r.prototype.clearDrag = function () {
                var e = this.component.calendar,
                    t = this.receivingCalendar;
                t && t.dispatch({
                    type: "UNSET_EVENT_DRAG"
                }), e !== t && e.dispatch({
                    type: "UNSET_EVENT_DRAG"
                })
            }, r.prototype.cleanup = function () {
                this.subjectSeg = null, this.isDragging = !1, this.eventRange = null, this.relevantEvents = null, this.receivingCalendar = null, this.validMutation = null, this.mutatedRelevantEvents = null
            }, r.SELECTOR = ".fc-draggable, .fc-resizable", r
        }(t.Interaction),
        Y = function (e) {
            function r(n) {
                var r = e.call(this, n) || this;
                r.draggingSeg = null, r.eventRange = null, r.relevantEvents = null, r.validMutation = null, r.mutatedRelevantEvents = null, r.handlePointerDown = function (e) {
                    var t = r.component,
                        n = r.querySeg(e),
                        i = r.eventRange = n.eventRange;
                    r.dragging.minDistance = t.opt("eventDragMinDistance"), r.dragging.setIgnoreMove(!r.component.isValidSegDownEl(e.origEvent.target) || e.isTouch && r.component.props.eventSelection !== i.instance.instanceId)
                }, r.handleDragStart = function (e) {
                    var n = r.component.calendar,
                        i = r.eventRange;
                    r.relevantEvents = t.getRelevantEvents(n.state.eventStore, r.eventRange.instance.instanceId), r.draggingSeg = r.querySeg(e), n.unselect(), n.publiclyTrigger("eventResizeStart", [{
                        el: r.draggingSeg.el,
                        event: new t.EventApi(n, i.def, i.instance),
                        jsEvent: e.origEvent,
                        view: r.component.view
                    }])
                }, r.handleHitUpdate = function (e, n, i) {
                    var o = r.component.calendar,
                        a = r.relevantEvents,
                        l = r.hitDragging.initialHit,
                        s = r.eventRange.instance,
                        d = null,
                        u = null,
                        g = !1,
                        h = {
                            affectedEvents: a,
                            mutatedEvents: t.createEmptyEventStore(),
                            isEvent: !0,
                            origSeg: r.draggingSeg
                        };
                    e && (d = p(l, e, i.subjectEl.classList.contains("fc-start-resizer"), s.range, o.pluginSystem.hooks.eventResizeJoinTransforms)), d && (u = t.applyMutationToEventStore(a, o.eventUiBases, d, o), h.mutatedEvents = u, r.component.isInteractionValid(h) || (g = !0, d = null, u = null, h.mutatedEvents = null)), u ? o.dispatch({
                        type: "SET_EVENT_RESIZE",
                        state: h
                    }) : o.dispatch({
                        type: "UNSET_EVENT_RESIZE"
                    }), g ? t.disableCursor() : t.enableCursor(), n || (d && c(l, e) && (d = null), r.validMutation = d, r.mutatedRelevantEvents = u)
                }, r.handleDragEnd = function (e) {
                    var n = r.component.calendar,
                        i = r.component.view,
                        o = r.eventRange.def,
                        a = r.eventRange.instance,
                        l = new t.EventApi(n, o, a),
                        s = r.relevantEvents,
                        c = r.mutatedRelevantEvents;
                    n.publiclyTrigger("eventResizeStop", [{
                        el: r.draggingSeg.el,
                        event: l,
                        jsEvent: e.origEvent,
                        view: i
                    }]), r.validMutation ? (n.dispatch({
                        type: "MERGE_EVENTS",
                        eventStore: c
                    }), n.publiclyTrigger("eventResize", [{
                        el: r.draggingSeg.el,
                        startDelta: r.validMutation.startDelta || t.createDuration(0),
                        endDelta: r.validMutation.endDelta || t.createDuration(0),
                        prevEvent: l,
                        event: new t.EventApi(n, c.defs[o.defId], a ? c.instances[a.instanceId] : null),
                        revert: function () {
                            n.dispatch({
                                type: "MERGE_EVENTS",
                                eventStore: s
                            })
                        },
                        jsEvent: e.origEvent,
                        view: i
                    }])) : n.publiclyTrigger("_noEventResize"), r.draggingSeg = null, r.relevantEvents = null, r.validMutation = null
                };
                var i = n.component,
                    o = r.dragging = new L(i.el);
                o.pointer.selector = ".fc-resizer", o.touchScrollAllowed = !1, o.autoScroller.isEnabled = i.opt("dragScroll");
                var a = r.hitDragging = new A(r.dragging, t.interactionSettingsToStore(n));
                return a.emitter.on("pointerdown", r.handlePointerDown), a.emitter.on("dragstart", r.handleDragStart), a.emitter.on("hitupdate", r.handleHitUpdate), a.emitter.on("dragend", r.handleDragEnd), r
            }
            return n(r, e), r.prototype.destroy = function () {
                this.dragging.destroy()
            }, r.prototype.querySeg = function (e) {
                return t.getElSeg(t.elementClosest(e.subjectEl, this.component.fgSegSelector))
            }, r
        }(t.Interaction),
        _ = function () {
            function e(e) {
                var n = this;
                this.isRecentPointerDateSelect = !1, this.onSelect = function (e) {
                    e.jsEvent && (n.isRecentPointerDateSelect = !0)
                }, this.onDocumentPointerUp = function (e) {
                    var r = n,
                        i = r.calendar,
                        o = r.documentPointer,
                        a = i.state;
                    if (!o.wasTouchScroll) {
                        if (a.dateSelection && !n.isRecentPointerDateSelect) {
                            var l = i.viewOpt("unselectAuto"),
                                s = i.viewOpt("unselectCancel");
                            !l || l && t.elementClosest(o.downEl, s) || i.unselect(e)
                        }
                        a.eventSelection && !t.elementClosest(o.downEl, V.SELECTOR) && i.dispatch({
                            type: "UNSELECT_EVENT"
                        })
                    }
                    n.isRecentPointerDateSelect = !1
                }, this.calendar = e;
                var r = this.documentPointer = new T(document);
                r.shouldIgnoreMove = !0, r.shouldWatchScroll = !1, r.emitter.on("pointerup", this.onDocumentPointerUp), e.on("select", this.onSelect)
            }
            return e.prototype.destroy = function () {
                this.calendar.off("select", this.onSelect), this.documentPointer.destroy()
            }, e
        }(),
        X = function () {
            function e(e, n) {
                var r = this;
                this.receivingCalendar = null, this.droppableEvent = null, this.suppliedDragMeta = null, this.dragMeta = null, this.handleDragStart = function (e) {
                    r.dragMeta = r.buildDragMeta(e.subjectEl)
                }, this.handleHitUpdate = function (e, n, i) {
                    var o = r.hitDragging.dragging,
                        a = null,
                        l = null,
                        s = !1,
                        c = {
                            affectedEvents: t.createEmptyEventStore(),
                            mutatedEvents: t.createEmptyEventStore(),
                            isEvent: r.dragMeta.create,
                            origSeg: null
                        };
                    e && (a = e.component.calendar, r.canDropElOnCalendar(i.subjectEl, a) && (l = v(e.dateSpan, r.dragMeta, a), c.mutatedEvents = t.eventTupleToStore(l), (s = !t.isInteractionValid(c, a)) && (c.mutatedEvents = t.createEmptyEventStore(), l = null))), r.displayDrag(a, c), o.setMirrorIsVisible(n || !l || !document.querySelector(".fc-mirror")), s ? t.disableCursor() : t.enableCursor(), n || (o.setMirrorNeedsRevert(!l), r.receivingCalendar = a, r.droppableEvent = l)
                }, this.handleDragEnd = function (e) {
                    var n = r,
                        i = n.receivingCalendar,
                        o = n.droppableEvent;
                    if (r.clearDrag(), i && o) {
                        var a = r.hitDragging.finalHit,
                            l = a.component.view,
                            s = r.dragMeta,
                            c = S({}, i.buildDatePointApi(a.dateSpan), {
                                draggedEl: e.subjectEl,
                                jsEvent: e.origEvent,
                                view: l
                            });
                        i.publiclyTrigger("drop", [c]), s.create && (i.dispatch({
                            type: "MERGE_EVENTS",
                            eventStore: t.eventTupleToStore(o)
                        }), e.isTouch && i.dispatch({
                            type: "SELECT_EVENT",
                            eventInstanceId: o.instance.instanceId
                        }), i.publiclyTrigger("eventReceive", [{
                            draggedEl: e.subjectEl,
                            event: new t.EventApi(i, o.def, o.instance),
                            view: l
                        }]))
                    }
                    r.receivingCalendar = null, r.droppableEvent = null
                };
                var i = this.hitDragging = new A(e, t.interactionSettingsStore);
                i.requireInitial = !1, i.emitter.on("dragstart", this.handleDragStart), i.emitter.on("hitupdate", this.handleHitUpdate), i.emitter.on("dragend", this.handleDragEnd), this.suppliedDragMeta = n
            }
            return e.prototype.buildDragMeta = function (e) {
                return "object" == typeof this.suppliedDragMeta ? t.parseDragMeta(this.suppliedDragMeta) : "function" == typeof this.suppliedDragMeta ? t.parseDragMeta(this.suppliedDragMeta(e)) : f(e)
            }, e.prototype.displayDrag = function (e, t) {
                var n = this.receivingCalendar;
                n && n !== e && n.dispatch({
                    type: "UNSET_EVENT_DRAG"
                }), e && e.dispatch({
                    type: "SET_EVENT_DRAG",
                    state: t
                })
            }, e.prototype.clearDrag = function () {
                this.receivingCalendar && this.receivingCalendar.dispatch({
                    type: "UNSET_EVENT_DRAG"
                })
            }, e.prototype.canDropElOnCalendar = function (e, n) {
                var r = n.opt("dropAccept");
                return "function" == typeof r ? r(e) : "string" != typeof r || !r || Boolean(t.elementMatches(e, r))
            }, e
        }();
    t.config.dataAttrPrefix = "";
    var U = function () {
            function e(e, n) {
                var r = this;
                void 0 === n && (n = {}), this.handlePointerDown = function (e) {
                    var n = r.dragging,
                        i = r.settings,
                        o = i.minDistance,
                        a = i.longPressDelay;
                    n.minDistance = null != o ? o : e.isTouch ? 0 : t.globalDefaults.eventDragMinDistance, n.delay = e.isTouch ? null != a ? a : t.globalDefaults.longPressDelay : 0
                }, this.handleDragStart = function (e) {
                    e.isTouch && r.dragging.delay && e.subjectEl.classList.contains("fc-event") && r.dragging.mirror.getMirrorEl().classList.add("fc-selected")
                }, this.settings = n;
                var i = this.dragging = new L(e);
                i.touchScrollAllowed = !1, null != n.itemSelector && (i.pointer.selector = n.itemSelector), null != n.appendTo && (i.mirror.parentNode = n.appendTo), i.emitter.on("pointerdown", this.handlePointerDown), i.emitter.on("dragstart", this.handleDragStart), new X(i, n.eventData)
            }
            return e.prototype.destroy = function () {
                this.dragging.destroy()
            }, e
        }(),
        O = function (e) {
            function t(t) {
                var n = e.call(this, t) || this;
                n.shouldIgnoreMove = !1, n.mirrorSelector = "", n.currentMirrorEl = null, n.handlePointerDown = function (e) {
                    n.emitter.trigger("pointerdown", e), n.shouldIgnoreMove || n.emitter.trigger("dragstart", e)
                }, n.handlePointerMove = function (e) {
                    n.shouldIgnoreMove || n.emitter.trigger("dragmove", e)
                }, n.handlePointerUp = function (e) {
                    n.emitter.trigger("pointerup", e), n.shouldIgnoreMove || n.emitter.trigger("dragend", e)
                };
                var r = n.pointer = new T(t);
                return r.emitter.on("pointerdown", n.handlePointerDown), r.emitter.on("pointermove", n.handlePointerMove), r.emitter.on("pointerup", n.handlePointerUp), n
            }
            return n(t, e), t.prototype.destroy = function () {
                this.pointer.destroy()
            }, t.prototype.setIgnoreMove = function (e) {
                this.shouldIgnoreMove = e
            }, t.prototype.setMirrorIsVisible = function (e) {
                if (e) this.currentMirrorEl && (this.currentMirrorEl.style.visibility = "", this.currentMirrorEl = null);
                else {
                    var t = this.mirrorSelector ? document.querySelector(this.mirrorSelector) : null;
                    t && (this.currentMirrorEl = t, t.style.visibility = "hidden")
                }
            }, t
        }(t.ElementDragging),
        q = function () {
            function e(e, t) {
                var n = document;
                e === document || e instanceof Element ? (n = e, t = t || {}) : t = e || {};
                var r = this.dragging = new O(n);
                "string" == typeof t.itemSelector ? r.pointer.selector = t.itemSelector : n === document && (r.pointer.selector = "[data-event]"), "string" == typeof t.mirrorSelector && (r.mirrorSelector = t.mirrorSelector), new X(r, t.eventData)
            }
            return e.prototype.destroy = function () {
                this.dragging.destroy()
            }, e
        }(),
        W = t.createPlugin({
            componentInteractions: [H, N, V, Y],
            calendarInteractions: [_],
            elementDraggingImpl: L
        });
    e.Draggable = U, e.FeaturefulElementDragging = L, e.PointerDragging = T, e.ThirdPartyDraggable = q, e.default = W, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});