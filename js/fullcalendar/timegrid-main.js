/*!
FullCalendar Time Grid Plugin v4.2.0
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("@fullcalendar/core"), require("@fullcalendar/daygrid")) : "function" == typeof define && define.amd ? define(["exports", "@fullcalendar/core", "@fullcalendar/daygrid"], t) : (e = e || self, t(e.FullCalendarTimeGrid = {}, e.FullCalendar, e.FullCalendarDayGrid))
}(this, function (e, t, r) {
    "use strict";

    function i(e, t) {
        function r() {
            this.constructor = e
        }
        u(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    }

    function n(e) {
        var t, r, i, n = [];
        for (t = 0; t < e.length; t++) {
            for (r = e[t], i = 0; i < n.length && a(r, n[i]).length; i++);
            r.level = i, (n[i] || (n[i] = [])).push(r)
        }
        return n
    }

    function o(e) {
        var t, r, i, n, o;
        for (t = 0; t < e.length; t++)
            for (r = e[t], i = 0; i < r.length; i++)
                for (n = r[i], n.forwardSegs = [], o = t + 1; o < e.length; o++) a(n, e[o], n.forwardSegs)
    }

    function s(e) {
        var t, r, i = e.forwardSegs,
            n = 0;
        if (void 0 === e.forwardPressure) {
            for (t = 0; t < i.length; t++) r = i[t], s(r), n = Math.max(n, 1 + r.forwardPressure);
            e.forwardPressure = n
        }
    }

    function a(e, t, r) {
        void 0 === r && (r = []);
        for (var i = 0; i < t.length; i++) l(e, t[i]) && r.push(t[i]);
        return r
    }

    function l(e, t) {
        return e.bottom > t.top && e.top < t.bottom
    }

    function d(e) {
        var r = t.buildSegCompareObj(e);
        return r.forwardPressure = e.forwardPressure, r.backwardCoord = e.backwardCoord, r
    }

    function c(e, t, r) {
        for (var i = [], n = 0, o = e.headerDates; n < o.length; n++) {
            var s = o[n];
            i.push({
                start: r.add(s, t.minTime),
                end: r.add(s, t.maxTime)
            })
        }
        return i
    }

    function h(e, r) {
        var i = new t.DaySeries(e.renderRange, r);
        return new t.DayTable(i, !1)
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
    var u = function (e, t) {
            return (u = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
                })(e, t)
        },
        p = function () {
            return p = Object.assign || function (e) {
                for (var t, r = 1, i = arguments.length; r < i; r++) {
                    t = arguments[r];
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                }
                return e
            }, p.apply(this, arguments)
        },
        f = function (e) {
            function r(r) {
                var i = e.call(this, r.context) || this;
                return i.timeGrid = r, i.fullTimeFormat = t.createFormatter({
                    hour: "numeric",
                    minute: "2-digit",
                    separator: i.context.options.defaultRangeSeparator
                }), i
            }
            return i(r, e), r.prototype.attachSegs = function (e, t) {
                for (var r = this.timeGrid.groupSegsByCol(e), i = 0; i < r.length; i++) r[i] = this.sortEventSegs(r[i]);
                this.segsByCol = r, this.timeGrid.attachSegsByCol(r, this.timeGrid.fgContainerEls)
            }, r.prototype.detachSegs = function (e) {
                e.forEach(function (e) {
                    t.removeElement(e.el)
                }), this.segsByCol = null
            }, r.prototype.computeSegSizes = function (e) {
                var t = this,
                    r = t.timeGrid,
                    i = t.segsByCol,
                    n = r.colCnt;
                if (r.computeSegVerticals(e), i)
                    for (var o = 0; o < n; o++) this.computeSegHorizontals(i[o])
            }, r.prototype.assignSegSizes = function (e) {
                var t = this,
                    r = t.timeGrid,
                    i = t.segsByCol,
                    n = r.colCnt;
                if (r.assignSegVerticals(e), i)
                    for (var o = 0; o < n; o++) this.assignSegCss(i[o])
            }, r.prototype.computeEventTimeFormat = function () {
                return {
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: !1
                }
            }, r.prototype.computeDisplayEventEnd = function () {
                return !0
            }, r.prototype.renderSegHtml = function (e, r) {
                var i, n, o, s = e.eventRange,
                    a = s.def,
                    l = s.ui,
                    d = a.allDay,
                    c = l.startEditable,
                    h = e.isStart && l.durationEditable && this.context.options.eventResizableFromStart,
                    u = e.isEnd && l.durationEditable,
                    p = this.getSegClasses(e, c, h || u, r),
                    f = t.cssToStr(this.getSkinCss(l));
                if (p.unshift("fc-time-grid-event"), t.isMultiDayRange(s.range)) {
                    if (e.isStart || e.isEnd) {
                        var g = e.start,
                            m = e.end;
                        i = this._getTimeText(g, m, d), n = this._getTimeText(g, m, d, this.fullTimeFormat), o = this._getTimeText(g, m, d, null, !1)
                    }
                } else i = this.getTimeText(s), n = this.getTimeText(s, this.fullTimeFormat), o = this.getTimeText(s, null, !1);
                return '<a class="' + p.join(" ") + '"' + (a.url ? ' href="' + t.htmlEscape(a.url) + '"' : "") + (f ? ' style="' + f + '"' : "") + '><div class="fc-content">' + (i ? '<div class="fc-time" data-start="' + t.htmlEscape(o) + '" data-full="' + t.htmlEscape(n) + '"><span>' + t.htmlEscape(i) + "</span></div>" : "") + (a.title ? '<div class="fc-title">' + t.htmlEscape(a.title) + "</div>" : "") + "</div>" + (u ? '<div class="fc-resizer fc-end-resizer"></div>' : "") + "</a>"
            }, r.prototype.computeSegHorizontals = function (e) {
                var t, r, i;
                if (t = n(e), o(t), r = t[0]) {
                    for (i = 0; i < r.length; i++) s(r[i]);
                    for (i = 0; i < r.length; i++) this.computeSegForwardBack(r[i], 0, 0)
                }
            }, r.prototype.computeSegForwardBack = function (e, t, r) {
                var i, n = e.forwardSegs;
                if (void 0 === e.forwardCoord)
                    for (n.length ? (this.sortForwardSegs(n), this.computeSegForwardBack(n[0], t + 1, r), e.forwardCoord = n[0].backwardCoord) : e.forwardCoord = 1, e.backwardCoord = e.forwardCoord - (e.forwardCoord - r) / (t + 1), i = 0; i < n.length; i++) this.computeSegForwardBack(n[i], 0, e.forwardCoord)
            }, r.prototype.sortForwardSegs = function (e) {
                var r = e.map(d),
                    i = [{
                        field: "forwardPressure",
                        order: -1
                    }, {
                        field: "backwardCoord",
                        order: 1
                    }].concat(this.context.view.eventOrderSpecs);
                return r.sort(function (e, r) {
                    return t.compareByFieldSpecs(e, r, i)
                }), r.map(function (e) {
                    return e._seg
                })
            }, r.prototype.assignSegCss = function (e) {
                for (var r = 0, i = e; r < i.length; r++) {
                    var n = i[r];
                    t.applyStyle(n.el, this.generateSegCss(n)), n.level > 0 && n.el.classList.add("fc-time-grid-event-inset"), n.eventRange.def.title && n.bottom - n.top < 30 && n.el.classList.add("fc-short")
                }
            }, r.prototype.generateSegCss = function (e) {
                var t, r, i = this.context.options.slotEventOverlap,
                    n = e.backwardCoord,
                    o = e.forwardCoord,
                    s = this.timeGrid.generateSegVerticalCss(e),
                    a = this.timeGrid.isRtl;
                return i && (o = Math.min(1, n + 2 * (o - n))), a ? (t = 1 - o, r = n) : (t = n, r = 1 - o), s.zIndex = e.level + 1, s.left = 100 * t + "%", s.right = 100 * r + "%", i && e.forwardPressure && (s[a ? "marginLeft" : "marginRight"] = 20), s
            }, r
        }(t.FgEventRenderer),
        g = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return i(t, e), t.prototype.attachSegs = function (e, t) {
                this.segsByCol = this.timeGrid.groupSegsByCol(e), this.timeGrid.attachSegsByCol(this.segsByCol, this.timeGrid.mirrorContainerEls), this.sourceSeg = t.sourceSeg
            }, t.prototype.generateSegCss = function (t) {
                var r = e.prototype.generateSegCss.call(this, t),
                    i = this.sourceSeg;
                if (i && i.col === t.col) {
                    var n = e.prototype.generateSegCss.call(this, i);
                    r.left = n.left, r.right = n.right, r.marginLeft = n.marginLeft, r.marginRight = n.marginRight
                }
                return r
            }, t
        }(f),
        m = function (e) {
            function t(t) {
                var r = e.call(this, t.context) || this;
                return r.timeGrid = t, r
            }
            return i(t, e), t.prototype.attachSegs = function (e, t) {
                var r, i = this.timeGrid;
                return "bgEvent" === e ? r = i.bgContainerEls : "businessHours" === e ? r = i.businessContainerEls : "highlight" === e && (r = i.highlightContainerEls), i.attachSegsByCol(i.groupSegsByCol(t), r), t.map(function (e) {
                    return e.el
                })
            }, t.prototype.computeSegSizes = function (e) {
                this.timeGrid.computeSegVerticals(e)
            }, t.prototype.assignSegSizes = function (e) {
                this.timeGrid.assignSegVerticals(e)
            }, t
        }(t.FillRenderer),
        y = [{
            hours: 1
        }, {
            minutes: 30
        }, {
            minutes: 15
        }, {
            seconds: 30
        }, {
            seconds: 15
        }],
        v = function (e) {
            function n(r, i, n) {
                var o = e.call(this, r, i) || this;
                o.isSlatSizesDirty = !1, o.isColSizesDirty = !1, o.renderSlats = t.memoizeRendering(o._renderSlats);
                var s = o.eventRenderer = new f(o),
                    a = o.fillRenderer = new m(o);
                o.mirrorRenderer = new g(o);
                var l = o.renderColumns = t.memoizeRendering(o._renderColumns, o._unrenderColumns);
                return o.renderBusinessHours = t.memoizeRendering(a.renderSegs.bind(a, "businessHours"), a.unrender.bind(a, "businessHours"), [l]), o.renderDateSelection = t.memoizeRendering(o._renderDateSelection, o._unrenderDateSelection, [l]), o.renderFgEvents = t.memoizeRendering(s.renderSegs.bind(s), s.unrender.bind(s), [l]), o.renderBgEvents = t.memoizeRendering(a.renderSegs.bind(a, "bgEvent"), a.unrender.bind(a, "bgEvent"), [l]), o.renderEventSelection = t.memoizeRendering(s.selectByInstanceId.bind(s), s.unselectByInstanceId.bind(s), [o.renderFgEvents]), o.renderEventDrag = t.memoizeRendering(o._renderEventDrag, o._unrenderEventDrag, [l]), o.renderEventResize = t.memoizeRendering(o._renderEventResize, o._unrenderEventResize, [l]), o.processOptions(), i.innerHTML = '<div class="fc-bg"></div><div class="fc-slats"></div><hr class="fc-divider ' + o.theme.getClass("widgetHeader") + '" style="display:none" />', o.rootBgContainerEl = i.querySelector(".fc-bg"), o.slatContainerEl = i.querySelector(".fc-slats"), o.bottomRuleEl = i.querySelector(".fc-divider"), o.renderProps = n, o
            }
            return i(n, e), n.prototype.processOptions = function () {
                var e, r, i = this.opt("slotDuration"),
                    n = this.opt("snapDuration");
                i = t.createDuration(i), n = n ? t.createDuration(n) : i, e = t.wholeDivideDurations(i, n), null === e && (n = i, e = 1), this.slotDuration = i, this.snapDuration = n, this.snapsPerSlot = e, r = this.opt("slotLabelFormat"), Array.isArray(r) && (r = r[r.length - 1]), this.labelFormat = t.createFormatter(r || {
                    hour: "numeric",
                    minute: "2-digit",
                    omitZeroMinute: !0,
                    meridiem: "short"
                }), r = this.opt("slotLabelInterval"), this.labelInterval = r ? t.createDuration(r) : this.computeLabelInterval(i)
            }, n.prototype.computeLabelInterval = function (e) {
                var r, i, n;
                for (r = y.length - 1; r >= 0; r--)
                    if (i = t.createDuration(y[r]), null !== (n = t.wholeDivideDurations(i, e)) && n > 1) return i;
                return e
            }, n.prototype.render = function (e) {
                var t = e.cells;
                this.colCnt = t.length, this.renderSlats(e.dateProfile), this.renderColumns(e.cells, e.dateProfile), this.renderBusinessHours(e.businessHourSegs), this.renderDateSelection(e.dateSelectionSegs), this.renderFgEvents(e.fgEventSegs), this.renderBgEvents(e.bgEventSegs), this.renderEventSelection(e.eventSelection), this.renderEventDrag(e.eventDrag), this.renderEventResize(e.eventResize)
            }, n.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.renderSlats.unrender(), this.renderColumns.unrender()
            }, n.prototype.updateSize = function (e) {
                var t = this,
                    r = t.fillRenderer,
                    i = t.eventRenderer,
                    n = t.mirrorRenderer;
                (e || this.isSlatSizesDirty) && (this.buildSlatPositions(), this.isSlatSizesDirty = !1), (e || this.isColSizesDirty) && (this.buildColPositions(), this.isColSizesDirty = !1), r.computeSizes(e), i.computeSizes(e), n.computeSizes(e), r.assignSizes(e), i.assignSizes(e), n.assignSizes(e)
            }, n.prototype._renderSlats = function (e) {
                var r = this.theme;
                this.slatContainerEl.innerHTML = '<table class="' + r.getClass("tableGrid") + '">' + this.renderSlatRowHtml(e) + "</table>", this.slatEls = t.findElements(this.slatContainerEl, "tr"), this.slatPositions = new t.PositionCache(this.el, this.slatEls, !1, !0), this.isSlatSizesDirty = !0
            }, n.prototype.renderSlatRowHtml = function (e) {
                for (var r, i, n, o = this, s = o.dateEnv, a = o.theme, l = o.isRtl, d = "", c = t.startOfDay(e.renderRange.start), h = e.minTime, u = t.createDuration(0); t.asRoughMs(h) < t.asRoughMs(e.maxTime);) r = s.add(c, h), i = null !== t.wholeDivideDurations(u, this.labelInterval), n = '<td class="fc-axis fc-time ' + a.getClass("widgetContent") + '">' + (i ? "<span>" + t.htmlEscape(s.format(r, this.labelFormat)) + "</span>" : "") + "</td>", d += '<tr data-time="' + t.formatIsoTimeString(r) + '"' + (i ? "" : ' class="fc-minor"') + ">" + (l ? "" : n) + '<td class="' + a.getClass("widgetContent") + '"></td>' + (l ? n : "") + "</tr>", h = t.addDurations(h, this.slotDuration), u = t.addDurations(u, this.slotDuration);
                return d
            }, n.prototype._renderColumns = function (e, i) {
                var n = this,
                    o = n.theme,
                    s = n.dateEnv,
                    a = n.view,
                    l = new r.DayBgRow(this.context);
                this.rootBgContainerEl.innerHTML = '<table class="' + o.getClass("tableGrid") + '">' + l.renderHtml({
                    cells: e,
                    dateProfile: i,
                    renderIntroHtml: this.renderProps.renderBgIntroHtml
                }) + "</table>", this.colEls = t.findElements(this.el, ".fc-day, .fc-disabled-day");
                for (var d = 0; d < this.colCnt; d++) this.publiclyTrigger("dayRender", [{
                    date: s.toDate(e[d].date),
                    el: this.colEls[d],
                    view: a
                }]);
                this.isRtl && this.colEls.reverse(), this.colPositions = new t.PositionCache(this.el, this.colEls, !0, !1), this.renderContentSkeleton(), this.isColSizesDirty = !0
            }, n.prototype._unrenderColumns = function () {
                this.unrenderContentSkeleton()
            }, n.prototype.renderContentSkeleton = function () {
                var e, r = [];
                r.push(this.renderProps.renderIntroHtml());
                for (var i = 0; i < this.colCnt; i++) r.push('<td><div class="fc-content-col"><div class="fc-event-container fc-mirror-container"></div><div class="fc-event-container"></div><div class="fc-highlight-container"></div><div class="fc-bgevent-container"></div><div class="fc-business-container"></div></div></td>');
                this.isRtl && r.reverse(), e = this.contentSkeletonEl = t.htmlToElement('<div class="fc-content-skeleton"><table><tr>' + r.join("") + "</tr></table></div>"), this.colContainerEls = t.findElements(e, ".fc-content-col"), this.mirrorContainerEls = t.findElements(e, ".fc-mirror-container"), this.fgContainerEls = t.findElements(e, ".fc-event-container:not(.fc-mirror-container)"), this.bgContainerEls = t.findElements(e, ".fc-bgevent-container"), this.highlightContainerEls = t.findElements(e, ".fc-highlight-container"), this.businessContainerEls = t.findElements(e, ".fc-business-container"), this.isRtl && (this.colContainerEls.reverse(), this.mirrorContainerEls.reverse(), this.fgContainerEls.reverse(), this.bgContainerEls.reverse(), this.highlightContainerEls.reverse(), this.businessContainerEls.reverse()), this.el.appendChild(e)
            }, n.prototype.unrenderContentSkeleton = function () {
                t.removeElement(this.contentSkeletonEl)
            }, n.prototype.groupSegsByCol = function (e) {
                var t, r = [];
                for (t = 0; t < this.colCnt; t++) r.push([]);
                for (t = 0; t < e.length; t++) r[e[t].col].push(e[t]);
                return r
            }, n.prototype.attachSegsByCol = function (e, t) {
                var r, i, n;
                for (r = 0; r < this.colCnt; r++)
                    for (i = e[r], n = 0; n < i.length; n++) t[r].appendChild(i[n].el)
            }, n.prototype.getNowIndicatorUnit = function () {
                return "minute"
            }, n.prototype.renderNowIndicator = function (e, r) {
                if (this.colContainerEls) {
                    var i, n = this.computeDateTop(r),
                        o = [];
                    for (i = 0; i < e.length; i++) {
                        var s = t.createElement("div", {
                            className: "fc-now-indicator fc-now-indicator-line"
                        });
                        s.style.top = n + "px", this.colContainerEls[e[i].col].appendChild(s), o.push(s)
                    }
                    if (e.length > 0) {
                        var a = t.createElement("div", {
                            className: "fc-now-indicator fc-now-indicator-arrow"
                        });
                        a.style.top = n + "px", this.contentSkeletonEl.appendChild(a), o.push(a)
                    }
                    this.nowIndicatorEls = o
                }
            }, n.prototype.unrenderNowIndicator = function () {
                this.nowIndicatorEls && (this.nowIndicatorEls.forEach(t.removeElement), this.nowIndicatorEls = null)
            }, n.prototype.getTotalSlatHeight = function () {
                return this.slatContainerEl.offsetHeight
            }, n.prototype.computeDateTop = function (e, r) {
                return r || (r = t.startOfDay(e)), this.computeTimeTop(e.valueOf() - r.valueOf())
            }, n.prototype.computeTimeTop = function (e) {
                var r, i, n = this.slatEls.length,
                    o = this.props.dateProfile,
                    s = (e - t.asRoughMs(o.minTime)) / t.asRoughMs(this.slotDuration);
                return s = Math.max(0, s), s = Math.min(n, s), r = Math.floor(s), r = Math.min(r, n - 1), i = s - r, this.slatPositions.tops[r] + this.slatPositions.getHeight(r) * i
            }, n.prototype.computeSegVerticals = function (e) {
                var t, r, i, n = this.opt("timeGridEventMinHeight");
                for (t = 0; t < e.length; t++) r = e[t], i = this.props.cells[r.col].date, r.top = this.computeDateTop(r.start, i), r.bottom = Math.max(r.top + n, this.computeDateTop(r.end, i))
            }, n.prototype.assignSegVerticals = function (e) {
                var r, i;
                for (r = 0; r < e.length; r++) i = e[r], t.applyStyle(i.el, this.generateSegVerticalCss(i))
            }, n.prototype.generateSegVerticalCss = function (e) {
                return {
                    top: e.top,
                    bottom: -e.bottom
                }
            }, n.prototype.buildPositionCaches = function () {
                this.buildColPositions(), this.buildSlatPositions()
            }, n.prototype.buildColPositions = function () {
                this.colPositions.build()
            }, n.prototype.buildSlatPositions = function () {
                this.slatPositions.build()
            }, n.prototype.positionToHit = function (e, r) {
                var i = this,
                    n = i.dateEnv,
                    o = i.snapsPerSlot,
                    s = i.slatPositions,
                    a = i.colPositions,
                    l = a.leftToIndex(e),
                    d = s.topToIndex(r);
                if (null != l && null != d) {
                    var c = s.tops[d],
                        h = s.getHeight(d),
                        u = (r - c) / h,
                        p = Math.floor(u * o),
                        f = d * o + p,
                        g = this.props.cells[l].date,
                        m = t.addDurations(this.props.dateProfile.minTime, t.multiplyDuration(this.snapDuration, f)),
                        y = n.add(g, m);
                    return {
                        col: l,
                        dateSpan: {
                            range: {
                                start: y,
                                end: n.add(y, this.snapDuration)
                            },
                            allDay: !1
                        },
                        dayEl: this.colEls[l],
                        relativeRect: {
                            left: a.lefts[l],
                            right: a.rights[l],
                            top: c,
                            bottom: c + h
                        }
                    }
                }
            }, n.prototype._renderEventDrag = function (e) {
                e && (this.eventRenderer.hideByHash(e.affectedInstances), e.isEvent ? this.mirrorRenderer.renderSegs(e.segs, {
                    isDragging: !0,
                    sourceSeg: e.sourceSeg
                }) : this.fillRenderer.renderSegs("highlight", e.segs))
            }, n.prototype._unrenderEventDrag = function (e) {
                e && (this.eventRenderer.showByHash(e.affectedInstances), this.mirrorRenderer.unrender(e.segs, {
                    isDragging: !0,
                    sourceSeg: e.sourceSeg
                }), this.fillRenderer.unrender("highlight"))
            }, n.prototype._renderEventResize = function (e) {
                e && (this.eventRenderer.hideByHash(e.affectedInstances), this.mirrorRenderer.renderSegs(e.segs, {
                    isResizing: !0,
                    sourceSeg: e.sourceSeg
                }))
            }, n.prototype._unrenderEventResize = function (e) {
                e && (this.eventRenderer.showByHash(e.affectedInstances), this.mirrorRenderer.unrender(e.segs, {
                    isResizing: !0,
                    sourceSeg: e.sourceSeg
                }))
            }, n.prototype._renderDateSelection = function (e) {
                e && (this.opt("selectMirror") ? this.mirrorRenderer.renderSegs(e, {
                    isSelecting: !0
                }) : this.fillRenderer.renderSegs("highlight", e))
            }, n.prototype._unrenderDateSelection = function (e) {
                this.mirrorRenderer.unrender(e, {
                    isSelecting: !0
                }), this.fillRenderer.unrender("highlight")
            }, n
        }(t.DateComponent),
        S = function (e) {
            function r() {
                return null !== e && e.apply(this, arguments) || this
            }
            return i(r, e), r.prototype.getKeyInfo = function () {
                return {
                    allDay: {},
                    timed: {}
                }
            }, r.prototype.getKeysForDateSpan = function (e) {
                return e.allDay ? ["allDay"] : ["timed"]
            }, r.prototype.getKeysForEventDef = function (e) {
                return e.allDay ? t.hasBgRendering(e) ? ["timed", "allDay"] : ["allDay"] : ["timed"]
            }, r
        }(t.Splitter),
        C = t.createFormatter({
            week: "short"
        }),
        b = function (e) {
            function n(i, n, o, s) {
                var a = e.call(this, i, n, o, s) || this;
                a.splitter = new S, a.renderHeadIntroHtml = function () {
                    var e, r = a,
                        i = r.theme,
                        n = r.dateEnv,
                        o = a.props.dateProfile.renderRange,
                        s = t.diffDays(o.start, o.end);
                    return a.opt("weekNumbers") ? (e = n.format(o.start, C), '<th class="fc-axis fc-week-number ' + i.getClass("widgetHeader") + '" ' + a.axisStyleAttr() + ">" + t.buildGotoAnchorHtml(a, {
                        date: o.start,
                        type: "week",
                        forceOff: s > 1
                    }, t.htmlEscape(e)) + "</th>") : '<th class="fc-axis ' + i.getClass("widgetHeader") + '" ' + a.axisStyleAttr() + "></th>"
                }, a.renderTimeGridBgIntroHtml = function () {
                    return '<td class="fc-axis ' + a.theme.getClass("widgetContent") + '" ' + a.axisStyleAttr() + "></td>"
                }, a.renderTimeGridIntroHtml = function () {
                    return '<td class="fc-axis" ' + a.axisStyleAttr() + "></td>"
                }, a.renderDayGridBgIntroHtml = function () {
                    return '<td class="fc-axis ' + a.theme.getClass("widgetContent") + '" ' + a.axisStyleAttr() + "><span>" + t.getAllDayHtml(a) + "</span></td>"
                }, a.renderDayGridIntroHtml = function () {
                    return '<td class="fc-axis" ' + a.axisStyleAttr() + "></td>"
                }, a.el.classList.add("fc-timeGrid-view"), a.el.innerHTML = a.renderSkeletonHtml(), a.scroller = new t.ScrollComponent("hidden", "auto");
                var l = a.scroller.el;
                a.el.querySelector(".fc-body > tr > td").appendChild(l), l.classList.add("fc-time-grid-container");
                var d = t.createElement("div", {
                    className: "fc-time-grid"
                });
                return l.appendChild(d), a.timeGrid = new v(a.context, d, {
                    renderBgIntroHtml: a.renderTimeGridBgIntroHtml,
                    renderIntroHtml: a.renderTimeGridIntroHtml
                }), a.opt("allDaySlot") && (a.dayGrid = new r.DayGrid(a.context, a.el.querySelector(".fc-day-grid"), {
                    renderNumberIntroHtml: a.renderDayGridIntroHtml,
                    renderBgIntroHtml: a.renderDayGridBgIntroHtml,
                    renderIntroHtml: a.renderDayGridIntroHtml,
                    colWeekNumbersVisible: !1,
                    cellWeekNumbersVisible: !1
                }), a.dayGrid.bottomCoordPadding = a.el.querySelector(".fc-divider").offsetHeight), a
            }
            return i(n, e), n.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.timeGrid.destroy(), this.dayGrid && this.dayGrid.destroy(), this.scroller.destroy()
            }, n.prototype.renderSkeletonHtml = function () {
                var e = this.theme;
                return '<table class="' + e.getClass("tableGrid") + '">' + (this.opt("columnHeader") ? '<thead class="fc-head"><tr><td class="fc-head-container ' + e.getClass("widgetHeader") + '">&nbsp;</td></tr></thead>' : "") + '<tbody class="fc-body"><tr><td class="' + e.getClass("widgetContent") + '">' + (this.opt("allDaySlot") ? '<div class="fc-day-grid"></div><hr class="fc-divider ' + e.getClass("widgetHeader") + '" />' : "") + "</td></tr></tbody></table>"
            }, n.prototype.getNowIndicatorUnit = function () {
                return this.timeGrid.getNowIndicatorUnit()
            }, n.prototype.unrenderNowIndicator = function () {
                this.timeGrid.unrenderNowIndicator()
            }, n.prototype.updateSize = function (t, r, i) {
                e.prototype.updateSize.call(this, t, r, i), this.timeGrid.updateSize(t), this.dayGrid && this.dayGrid.updateSize(t)
            }, n.prototype.updateBaseSize = function (e, r, i) {
                var n, o, s, a = this;
                if (this.axisWidth = t.matchCellWidths(t.findElements(this.el, ".fc-axis")), !this.timeGrid.colEls) return void(i || (o = this.computeScrollerHeight(r), this.scroller.setHeight(o)));
                var l = t.findElements(this.el, ".fc-row").filter(function (e) {
                    return !a.scroller.el.contains(e)
                });
                this.timeGrid.bottomRuleEl.style.display = "none", this.scroller.clear(), l.forEach(t.uncompensateScroll), this.dayGrid && (this.dayGrid.removeSegPopover(), n = this.opt("eventLimit"), n && "number" != typeof n && (n = 5), n && this.dayGrid.limitRows(n)), i || (o = this.computeScrollerHeight(r), this.scroller.setHeight(o), s = this.scroller.getScrollbarWidths(), (s.left || s.right) && (l.forEach(function (e) {
                    t.compensateScroll(e, s)
                }), o = this.computeScrollerHeight(r), this.scroller.setHeight(o)), this.scroller.lockOverflow(s), this.timeGrid.getTotalSlatHeight() < o && (this.timeGrid.bottomRuleEl.style.display = ""))
            }, n.prototype.computeScrollerHeight = function (e) {
                return e - t.subtractInnerElHeight(this.el, this.scroller.el)
            }, n.prototype.computeDateScroll = function (e) {
                var t = this.timeGrid.computeTimeTop(e);
                return t = Math.ceil(t), t && t++, {
                    top: t
                }
            }, n.prototype.queryDateScroll = function () {
                return {
                    top: this.scroller.getScrollTop()
                }
            }, n.prototype.applyDateScroll = function (e) {
                void 0 !== e.top && this.scroller.setScrollTop(e.top)
            }, n.prototype.axisStyleAttr = function () {
                return null != this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : ""
            }, n
        }(t.View);
    b.prototype.usesMinMaxTime = !0;
    var E = function (e) {
            function r(r, i) {
                var n = e.call(this, r, i.el) || this;
                return n.buildDayRanges = t.memoize(c), n.slicer = new D, n.timeGrid = i, r.calendar.registerInteractiveComponent(n, {
                    el: n.timeGrid.el
                }), n
            }
            return i(r, e), r.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.calendar.unregisterInteractiveComponent(this)
            }, r.prototype.render = function (e) {
                var t = e.dateProfile,
                    r = e.dayTable,
                    i = this.dayRanges = this.buildDayRanges(r, t, this.dateEnv);
                this.timeGrid.receiveProps(p({}, this.slicer.sliceProps(e, t, null, this.timeGrid, i), {
                    dateProfile: t,
                    cells: r.cells[0]
                }))
            }, r.prototype.renderNowIndicator = function (e) {
                this.timeGrid.renderNowIndicator(this.slicer.sliceNowDate(e, this.timeGrid, this.dayRanges), e)
            }, r.prototype.buildPositionCaches = function () {
                this.timeGrid.buildPositionCaches()
            }, r.prototype.queryHit = function (e, t) {
                var r = this.timeGrid.positionToHit(e, t);
                if (r) return {
                    component: this.timeGrid,
                    dateSpan: r.dateSpan,
                    dayEl: r.dayEl,
                    rect: {
                        left: r.relativeRect.left,
                        right: r.relativeRect.right,
                        top: r.relativeRect.top,
                        bottom: r.relativeRect.bottom
                    },
                    layer: 0
                }
            }, r
        }(t.DateComponent),
        D = function (e) {
            function r() {
                return null !== e && e.apply(this, arguments) || this
            }
            return i(r, e), r.prototype.sliceRange = function (e, r) {
                for (var i = [], n = 0; n < r.length; n++) {
                    var o = t.intersectRanges(e, r[n]);
                    o && i.push({
                        start: o.start,
                        end: o.end,
                        isStart: o.start.valueOf() === e.start.valueOf(),
                        isEnd: o.end.valueOf() === e.end.valueOf(),
                        col: n
                    })
                }
                return i
            }, r
        }(t.Slicer),
        w = function (e) {
            function n(i, n, o, s) {
                var a = e.call(this, i, n, o, s) || this;
                return a.buildDayTable = t.memoize(h), a.opt("columnHeader") && (a.header = new t.DayHeader(a.context, a.el.querySelector(".fc-head-container"))), a.simpleTimeGrid = new E(a.context, a.timeGrid), a.dayGrid && (a.simpleDayGrid = new r.SimpleDayGrid(a.context, a.dayGrid)), a
            }
            return i(n, e), n.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.header && this.header.destroy(), this.simpleTimeGrid.destroy(), this.simpleDayGrid && this.simpleDayGrid.destroy()
            }, n.prototype.render = function (t) {
                e.prototype.render.call(this, t);
                var r = this.props.dateProfile,
                    i = this.buildDayTable(r, this.dateProfileGenerator),
                    n = this.splitter.splitProps(t);
                this.header && this.header.receiveProps({
                    dateProfile: r,
                    dates: i.headerDates,
                    datesRepDistinctDays: !0,
                    renderIntroHtml: this.renderHeadIntroHtml
                }), this.simpleTimeGrid.receiveProps(p({}, n.timed, {
                    dateProfile: r,
                    dayTable: i
                })), this.simpleDayGrid && this.simpleDayGrid.receiveProps(p({}, n.allDay, {
                    dateProfile: r,
                    dayTable: i,
                    nextDayThreshold: this.nextDayThreshold,
                    isRigid: !1
                }))
            }, n.prototype.renderNowIndicator = function (e) {
                this.simpleTimeGrid.renderNowIndicator(e)
            }, n
        }(b),
        G = t.createPlugin({
            defaultView: "timeGridWeek",
            views: {
                timeGrid: {
                    class: w,
                    allDaySlot: !0,
                    slotDuration: "00:30:00",
                    slotEventOverlap: !0
                },
                timeGridDay: {
                    type: "timeGrid",
                    duration: {
                        days: 1
                    }
                },
                timeGridWeek: {
                    type: "timeGrid",
                    duration: {
                        weeks: 1
                    }
                }
            }
        });
    e.AbstractTimeGridView = b, e.TimeGrid = v, e.TimeGridSlicer = D, e.TimeGridView = w, e.buildDayRanges = c, e.buildDayTable = h, e.default = G, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});