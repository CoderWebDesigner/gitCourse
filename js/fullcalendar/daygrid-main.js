/*!
FullCalendar Day Grid Plugin v4.2.0
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("@fullcalendar/core")) : "function" == typeof define && define.amd ? define(["exports", "@fullcalendar/core"], t) : (e = e || self, t(e.FullCalendarDayGrid = {}, e.FullCalendar))
}(this, function (e, t) {
    "use strict";

    function r(e, t) {
        function r() {
            this.constructor = e
        }
        l(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    }

    function n(e, t) {
        var r, n;
        for (r = 0; r < t.length; r++)
            if (n = t[r], n.firstCol <= e.lastCol && n.lastCol >= e.firstCol) return !0;
        return !1
    }

    function i(e, t) {
        return e.leftCol - t.leftCol
    }

    function o(e, r, n, i) {
        var o = n.dateEnv,
            s = n.theme,
            l = t.rangeContainsMarker(r.activeRange, e),
            a = t.getDayClasses(e, r, n);
        return a.unshift("fc-day", s.getClass("widgetContent")), '<td class="' + a.join(" ") + '"' + (l ? ' data-date="' + o.formatIso(e, {
            omitTime: !0
        }) + '"' : "") + (i ? " " + i : "") + "></td>"
    }

    function s(e, r) {
        var n = new t.DaySeries(e.renderRange, r);
        return new t.DayTable(n, /year|month|week/.test(e.currentRangeUnit))
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
    var l = function (e, t) {
            return (l = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
                })(e, t)
        },
        a = function () {
            return a = Object.assign || function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++) {
                    t = arguments[r];
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                }
                return e
            }, a.apply(this, arguments)
        },
        d = function (e) {
            function n() {
                return null !== e && e.apply(this, arguments) || this
            }
            return r(n, e), n.prototype.buildRenderRange = function (r, n, i) {
                var o, s = this.dateEnv,
                    l = e.prototype.buildRenderRange.call(this, r, n, i),
                    a = l.start,
                    d = l.end;
                if (/^(year|month)$/.test(n) && (a = s.startOfWeek(a), o = s.startOfWeek(d), o.valueOf() !== d.valueOf() && (d = t.addWeeks(o, 1))), this.options.monthMode && this.options.fixedWeekCount) {
                    var c = Math.ceil(t.diffWeeks(a, d));
                    d = t.addWeeks(d, 6 - c)
                }
                return {
                    start: a,
                    end: d
                }
            }, n
        }(t.DateProfileGenerator),
        c = function () {
            function e(e) {
                var t = this;
                this.isHidden = !0, this.margin = 10, this.documentMousedown = function (e) {
                    t.el && !t.el.contains(e.target) && t.hide()
                }, this.options = e
            }
            return e.prototype.show = function () {
                this.isHidden && (this.el || this.render(), this.el.style.display = "", this.position(), this.isHidden = !1, this.trigger("show"))
            }, e.prototype.hide = function () {
                this.isHidden || (this.el.style.display = "none", this.isHidden = !0, this.trigger("hide"))
            }, e.prototype.render = function () {
                var e = this,
                    r = this.options,
                    n = this.el = t.createElement("div", {
                        className: "fc-popover " + (r.className || ""),
                        style: {
                            top: "0",
                            left: "0"
                        }
                    });
                "function" == typeof r.content && r.content(n), r.parentEl.appendChild(n), t.listenBySelector(n, "click", ".fc-close", function (t) {
                    e.hide()
                }), r.autoHide && document.addEventListener("mousedown", this.documentMousedown)
            }, e.prototype.destroy = function () {
                this.hide(), this.el && (t.removeElement(this.el), this.el = null), document.removeEventListener("mousedown", this.documentMousedown)
            }, e.prototype.position = function () {
                var e, r, n = this.options,
                    i = this.el,
                    o = i.getBoundingClientRect(),
                    s = t.computeRect(i.offsetParent),
                    l = t.computeClippingRect(n.parentEl);
                e = n.top || 0, r = void 0 !== n.left ? n.left : void 0 !== n.right ? n.right - o.width : 0, e = Math.min(e, l.bottom - o.height - this.margin), e = Math.max(e, l.top + this.margin), r = Math.min(r, l.right - o.width - this.margin), r = Math.max(r, l.left + this.margin), t.applyStyle(i, {
                    top: e - s.top,
                    left: r - s.left
                })
            }, e.prototype.trigger = function (e) {
                this.options[e] && this.options[e].apply(this, Array.prototype.slice.call(arguments, 1))
            }, e
        }(),
        h = function (e) {
            function n() {
                return null !== e && e.apply(this, arguments) || this
            }
            return r(n, e), n.prototype.renderSegHtml = function (e, r) {
                var n, i, o = this.context.options,
                    s = e.eventRange,
                    l = s.def,
                    a = s.ui,
                    d = l.allDay,
                    c = a.startEditable,
                    h = d && e.isStart && a.durationEditable && o.eventResizableFromStart,
                    p = d && e.isEnd && a.durationEditable,
                    u = this.getSegClasses(e, c, h || p, r),
                    f = t.cssToStr(this.getSkinCss(a)),
                    g = "";
                return u.unshift("fc-day-grid-event", "fc-h-event"), e.isStart && (n = this.getTimeText(s)) && (g = '<span class="fc-time">' + t.htmlEscape(n) + "</span>"), i = '<span class="fc-title">' + (t.htmlEscape(l.title || "") || "&nbsp;") + "</span>", '<a class="' + u.join(" ") + '"' + (l.url ? ' href="' + t.htmlEscape(l.url) + '"' : "") + (f ? ' style="' + f + '"' : "") + '><div class="fc-content">' + ("rtl" === o.dir ? i + " " + g : g + " " + i) + "</div>" + (h ? '<div class="fc-resizer fc-start-resizer"></div>' : "") + (p ? '<div class="fc-resizer fc-end-resizer"></div>' : "") + "</a>"
            }, n.prototype.computeEventTimeFormat = function () {
                return {
                    hour: "numeric",
                    minute: "2-digit",
                    omitZeroMinute: !0,
                    meridiem: "narrow"
                }
            }, n.prototype.computeDisplayEventEnd = function () {
                return !1
            }, n
        }(t.FgEventRenderer),
        p = function (e) {
            function o(t) {
                var r = e.call(this, t.context) || this;
                return r.dayGrid = t, r
            }
            return r(o, e), o.prototype.attachSegs = function (e, t) {
                var r = this.rowStructs = this.renderSegRows(e);
                this.dayGrid.rowEls.forEach(function (e, t) {
                    e.querySelector(".fc-content-skeleton > table").appendChild(r[t].tbodyEl)
                }), t || this.dayGrid.removeSegPopover()
            }, o.prototype.detachSegs = function () {
                for (var e, r = this.rowStructs || []; e = r.pop();) t.removeElement(e.tbodyEl);
                this.rowStructs = null
            }, o.prototype.renderSegRows = function (e) {
                var t, r, n = [];
                for (t = this.groupSegRows(e), r = 0; r < t.length; r++) n.push(this.renderSegRow(r, t[r]));
                return n
            }, o.prototype.renderSegRow = function (e, r) {
                function n(e) {
                    for (; s < e;) c = (b[i - 1] || [])[s], c ? c.rowSpan = (c.rowSpan || 1) + 1 : (c = document.createElement("td"), l.appendChild(c)), v[i][s] = c, b[i][s] = c, s++
                }
                var i, o, s, l, a, d, c, h = this.dayGrid,
                    p = h.colCnt,
                    u = h.isRtl,
                    f = this.buildSegLevels(r),
                    g = Math.max(1, f.length),
                    m = document.createElement("tbody"),
                    y = [],
                    v = [],
                    b = [];
                for (i = 0; i < g; i++) {
                    if (o = f[i], s = 0, l = document.createElement("tr"), y.push([]), v.push([]), b.push([]), o)
                        for (a = 0; a < o.length; a++) {
                            d = o[a];
                            var w = u ? p - 1 - d.lastCol : d.firstCol,
                                S = u ? p - 1 - d.firstCol : d.lastCol;
                            for (n(w), c = t.createElement("td", {
                                    className: "fc-event-container"
                                }, d.el), w !== S ? c.colSpan = S - w + 1 : b[i][s] = c; s <= S;) v[i][s] = c, y[i][s] = d, s++;
                            l.appendChild(c)
                        }
                    n(p);
                    var C = h.renderProps.renderIntroHtml();
                    C && (h.isRtl ? t.appendToElement(l, C) : t.prependToElement(l, C)), m.appendChild(l)
                }
                return {
                    row: e,
                    tbodyEl: m,
                    cellMatrix: v,
                    segMatrix: y,
                    segLevels: f,
                    segs: r
                }
            }, o.prototype.buildSegLevels = function (e) {
                var t, r, o, s = this.dayGrid,
                    l = s.isRtl,
                    a = s.colCnt,
                    d = [];
                for (e = this.sortEventSegs(e), t = 0; t < e.length; t++) {
                    for (r = e[t], o = 0; o < d.length && n(r, d[o]); o++);
                    r.level = o, r.leftCol = l ? a - 1 - r.lastCol : r.firstCol, r.rightCol = l ? a - 1 - r.firstCol : r.lastCol, (d[o] || (d[o] = [])).push(r)
                }
                for (o = 0; o < d.length; o++) d[o].sort(i);
                return d
            }, o.prototype.groupSegRows = function (e) {
                var t, r = [];
                for (t = 0; t < this.dayGrid.rowCnt; t++) r.push([]);
                for (t = 0; t < e.length; t++) r[e[t].row].push(e[t]);
                return r
            }, o.prototype.computeDisplayEventEnd = function () {
                return 1 === this.dayGrid.colCnt
            }, o
        }(h),
        u = function (e) {
            function n() {
                return null !== e && e.apply(this, arguments) || this
            }
            return r(n, e), n.prototype.attachSegs = function (e, r) {
                var n = r.sourceSeg,
                    i = this.rowStructs = this.renderSegRows(e);
                this.dayGrid.rowEls.forEach(function (e, r) {
                    var o, s, l = t.htmlToElement('<div class="fc-mirror-skeleton"><table></table></div>');
                    n && n.row === r ? o = n.el : (o = e.querySelector(".fc-content-skeleton tbody")) || (o = e.querySelector(".fc-content-skeleton table")), s = o.getBoundingClientRect().top - e.getBoundingClientRect().top, l.style.top = s + "px", l.querySelector("table").appendChild(i[r].tbodyEl), e.appendChild(l)
                })
            }, n
        }(p),
        f = function (e) {
            function n(t) {
                var r = e.call(this, t.context) || this;
                return r.fillSegTag = "td", r.dayGrid = t, r
            }
            return r(n, e), n.prototype.renderSegs = function (t, r) {
                "bgEvent" === t && (r = r.filter(function (e) {
                    return e.eventRange.def.allDay
                })), e.prototype.renderSegs.call(this, t, r)
            }, n.prototype.attachSegs = function (e, t) {
                var r, n, i, o = [];
                for (r = 0; r < t.length; r++) n = t[r], i = this.renderFillRow(e, n), this.dayGrid.rowEls[n.row].appendChild(i), o.push(i);
                return o
            }, n.prototype.renderFillRow = function (e, r) {
                var n, i, o, s = this.dayGrid,
                    l = s.colCnt,
                    a = s.isRtl,
                    d = a ? l - 1 - r.lastCol : r.firstCol,
                    c = a ? l - 1 - r.firstCol : r.lastCol,
                    h = d,
                    p = c + 1;
                n = "businessHours" === e ? "bgevent" : e.toLowerCase(), i = t.htmlToElement('<div class="fc-' + n + '-skeleton"><table><tr></tr></table></div>'), o = i.getElementsByTagName("tr")[0], h > 0 && t.appendToElement(o, new Array(h + 1).join("<td></td>")), r.el.colSpan = p - h, o.appendChild(r.el), p < l && t.appendToElement(o, new Array(l - p + 1).join("<td></td>"));
                var u = s.renderProps.renderIntroHtml();
                return u && (s.isRtl ? t.appendToElement(o, u) : t.prependToElement(o, u)), i
            }, n
        }(t.FillRenderer),
        g = function (e) {
            function n(r, n) {
                var i = e.call(this, r, n) || this,
                    o = i.eventRenderer = new m(i),
                    s = i.renderFrame = t.memoizeRendering(i._renderFrame);
                return i.renderFgEvents = t.memoizeRendering(o.renderSegs.bind(o), o.unrender.bind(o), [s]), i.renderEventSelection = t.memoizeRendering(o.selectByInstanceId.bind(o), o.unselectByInstanceId.bind(o), [i.renderFgEvents]), i.renderEventDrag = t.memoizeRendering(o.hideByHash.bind(o), o.showByHash.bind(o), [s]), i.renderEventResize = t.memoizeRendering(o.hideByHash.bind(o), o.showByHash.bind(o), [s]), r.calendar.registerInteractiveComponent(i, {
                    el: i.el,
                    useEventCenter: !1
                }), i
            }
            return r(n, e), n.prototype.render = function (e) {
                this.renderFrame(e.date), this.renderFgEvents(e.fgSegs), this.renderEventSelection(e.eventSelection), this.renderEventDrag(e.eventDragInstances), this.renderEventResize(e.eventResizeInstances)
            }, n.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.renderFrame.unrender(), this.calendar.unregisterInteractiveComponent(this)
            }, n.prototype._renderFrame = function (e) {
                var r = this,
                    n = r.theme,
                    i = r.dateEnv,
                    o = i.format(e, t.createFormatter(this.opt("dayPopoverFormat")));
                this.el.innerHTML = '<div class="fc-header ' + n.getClass("popoverHeader") + '"><span class="fc-title">' + t.htmlEscape(o) + '</span><span class="fc-close ' + n.getIconClass("close") + '"></span></div><div class="fc-body ' + n.getClass("popoverContent") + '"><div class="fc-event-container"></div></div>', this.segContainerEl = this.el.querySelector(".fc-event-container")
            }, n.prototype.queryHit = function (e, r, n, i) {
                var o = this.props.date;
                if (e < n && r < i) return {
                    component: this,
                    dateSpan: {
                        allDay: !0,
                        range: {
                            start: o,
                            end: t.addDays(o, 1)
                        }
                    },
                    dayEl: this.el,
                    rect: {
                        left: 0,
                        top: 0,
                        right: n,
                        bottom: i
                    },
                    layer: 1
                }
            }, n
        }(t.DateComponent),
        m = function (e) {
            function n(t) {
                var r = e.call(this, t.context) || this;
                return r.dayTile = t, r
            }
            return r(n, e), n.prototype.attachSegs = function (e) {
                for (var t = 0, r = e; t < r.length; t++) {
                    var n = r[t];
                    this.dayTile.segContainerEl.appendChild(n.el)
                }
            }, n.prototype.detachSegs = function (e) {
                for (var r = 0, n = e; r < n.length; r++) {
                    var i = n[r];
                    t.removeElement(i.el)
                }
            }, n
        }(h),
        y = function () {
            function e(e) {
                this.context = e
            }
            return e.prototype.renderHtml = function (e) {
                var t = [];
                e.renderIntroHtml && t.push(e.renderIntroHtml());
                for (var r = 0, n = e.cells; r < n.length; r++) {
                    var i = n[r];
                    t.push(o(i.date, e.dateProfile, this.context, i.htmlAttrs))
                }
                return e.cells.length || t.push('<td class="fc-day ' + this.context.theme.getClass("widgetContent") + '"></td>'), "rtl" === this.context.options.dir && t.reverse(), "<tr>" + t.join("") + "</tr>"
            }, e
        }(),
        v = t.createFormatter({
            day: "numeric"
        }),
        b = t.createFormatter({
            week: "numeric"
        }),
        w = function (e) {
            function n(r, n, i) {
                var o = e.call(this, r, n) || this;
                o.bottomCoordPadding = 0, o.isCellSizesDirty = !1;
                var s = o.eventRenderer = new p(o),
                    l = o.fillRenderer = new f(o);
                o.mirrorRenderer = new u(o);
                var a = o.renderCells = t.memoizeRendering(o._renderCells, o._unrenderCells);
                return o.renderBusinessHours = t.memoizeRendering(l.renderSegs.bind(l, "businessHours"), l.unrender.bind(l, "businessHours"), [a]), o.renderDateSelection = t.memoizeRendering(l.renderSegs.bind(l, "highlight"), l.unrender.bind(l, "highlight"), [a]), o.renderBgEvents = t.memoizeRendering(l.renderSegs.bind(l, "bgEvent"), l.unrender.bind(l, "bgEvent"), [a]), o.renderFgEvents = t.memoizeRendering(s.renderSegs.bind(s), s.unrender.bind(s), [a]), o.renderEventSelection = t.memoizeRendering(s.selectByInstanceId.bind(s), s.unselectByInstanceId.bind(s), [o.renderFgEvents]), o.renderEventDrag = t.memoizeRendering(o._renderEventDrag, o._unrenderEventDrag, [a]), o.renderEventResize = t.memoizeRendering(o._renderEventResize, o._unrenderEventResize, [a]), o.renderProps = i, o
            }
            return r(n, e), n.prototype.render = function (e) {
                var t = e.cells;
                this.rowCnt = t.length, this.colCnt = t[0].length, this.renderCells(t, e.isRigid), this.renderBusinessHours(e.businessHourSegs), this.renderDateSelection(e.dateSelectionSegs), this.renderBgEvents(e.bgEventSegs), this.renderFgEvents(e.fgEventSegs), this.renderEventSelection(e.eventSelection), this.renderEventDrag(e.eventDrag), this.renderEventResize(e.eventResize), this.segPopoverTile && this.updateSegPopoverTile()
            }, n.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.renderCells.unrender()
            }, n.prototype.getCellRange = function (e, r) {
                var n = this.props.cells[e][r].date;
                return {
                    start: n,
                    end: t.addDays(n, 1)
                }
            }, n.prototype.updateSegPopoverTile = function (e, t) {
                var r = this.props;
                this.segPopoverTile.receiveProps({
                    date: e || this.segPopoverTile.props.date,
                    fgSegs: t || this.segPopoverTile.props.fgSegs,
                    eventSelection: r.eventSelection,
                    eventDragInstances: r.eventDrag ? r.eventDrag.affectedInstances : null,
                    eventResizeInstances: r.eventResize ? r.eventResize.affectedInstances : null
                })
            }, n.prototype._renderCells = function (e, r) {
                var n, i, o = this,
                    s = o.view,
                    l = o.dateEnv,
                    a = this,
                    d = a.rowCnt,
                    c = a.colCnt,
                    h = "";
                for (n = 0; n < d; n++) h += this.renderDayRowHtml(n, r);
                for (this.el.innerHTML = h, this.rowEls = t.findElements(this.el, ".fc-row"), this.cellEls = t.findElements(this.el, ".fc-day, .fc-disabled-day"), this.isRtl && this.cellEls.reverse(), this.rowPositions = new t.PositionCache(this.el, this.rowEls, !1, !0), this.colPositions = new t.PositionCache(this.el, this.cellEls.slice(0, c), !0, !1), n = 0; n < d; n++)
                    for (i = 0; i < c; i++) this.publiclyTrigger("dayRender", [{
                        date: l.toDate(e[n][i].date),
                        el: this.getCellEl(n, i),
                        view: s
                    }]);
                this.isCellSizesDirty = !0
            }, n.prototype._unrenderCells = function () {
                this.removeSegPopover()
            }, n.prototype.renderDayRowHtml = function (e, t) {
                var r = this.theme,
                    n = ["fc-row", "fc-week", r.getClass("dayRow")];
                t && n.push("fc-rigid");
                var i = new y(this.context);
                return '<div class="' + n.join(" ") + '"><div class="fc-bg"><table class="' + r.getClass("tableGrid") + '">' + i.renderHtml({
                    cells: this.props.cells[e],
                    dateProfile: this.props.dateProfile,
                    renderIntroHtml: this.renderProps.renderBgIntroHtml
                }) + '</table></div><div class="fc-content-skeleton"><table>' + (this.getIsNumbersVisible() ? "<thead>" + this.renderNumberTrHtml(e) + "</thead>" : "") + "</table></div></div>"
            }, n.prototype.getIsNumbersVisible = function () {
                return this.getIsDayNumbersVisible() || this.renderProps.cellWeekNumbersVisible || this.renderProps.colWeekNumbersVisible
            }, n.prototype.getIsDayNumbersVisible = function () {
                return this.rowCnt > 1
            }, n.prototype.renderNumberTrHtml = function (e) {
                var t = this.renderProps.renderNumberIntroHtml(e, this);
                return "<tr>" + (this.isRtl ? "" : t) + this.renderNumberCellsHtml(e) + (this.isRtl ? t : "") + "</tr>"
            }, n.prototype.renderNumberCellsHtml = function (e) {
                var t, r, n = [];
                for (t = 0; t < this.colCnt; t++) r = this.props.cells[e][t].date, n.push(this.renderNumberCellHtml(r));
                return this.isRtl && n.reverse(), n.join("")
            }, n.prototype.renderNumberCellHtml = function (e) {
                var r, n, i = this,
                    o = i.view,
                    s = i.dateEnv,
                    l = "",
                    a = t.rangeContainsMarker(this.props.dateProfile.activeRange, e),
                    d = this.getIsDayNumbersVisible() && a;
                return d || this.renderProps.cellWeekNumbersVisible ? (r = t.getDayClasses(e, this.props.dateProfile, this.context), r.unshift("fc-day-top"), this.renderProps.cellWeekNumbersVisible && (n = s.weekDow), l += '<td class="' + r.join(" ") + '"' + (a ? ' data-date="' + s.formatIso(e, {
                    omitTime: !0
                }) + '"' : "") + ">", this.renderProps.cellWeekNumbersVisible && e.getUTCDay() === n && (l += t.buildGotoAnchorHtml(o, {
                    date: e,
                    type: "week"
                }, {
                    class: "fc-week-number"
                }, s.format(e, b))), d && (l += t.buildGotoAnchorHtml(o, e, {
                    class: "fc-day-number"
                }, s.format(e, v))), l += "</td>") : "<td></td>"
            }, n.prototype.updateSize = function (e) {
                var t = this,
                    r = t.fillRenderer,
                    n = t.eventRenderer,
                    i = t.mirrorRenderer;
                (e || this.isCellSizesDirty || this.view.calendar.isEventsUpdated) && (this.buildPositionCaches(), this.isCellSizesDirty = !1), r.computeSizes(e), n.computeSizes(e), i.computeSizes(e), r.assignSizes(e), n.assignSizes(e), i.assignSizes(e)
            }, n.prototype.buildPositionCaches = function () {
                this.buildColPositions(), this.buildRowPositions()
            }, n.prototype.buildColPositions = function () {
                this.colPositions.build()
            }, n.prototype.buildRowPositions = function () {
                this.rowPositions.build(), this.rowPositions.bottoms[this.rowCnt - 1] += this.bottomCoordPadding
            }, n.prototype.positionToHit = function (e, t) {
                var r = this,
                    n = r.colPositions,
                    i = r.rowPositions,
                    o = n.leftToIndex(e),
                    s = i.topToIndex(t);
                if (null != s && null != o) return {
                    row: s,
                    col: o,
                    dateSpan: {
                        range: this.getCellRange(s, o),
                        allDay: !0
                    },
                    dayEl: this.getCellEl(s, o),
                    relativeRect: {
                        left: n.lefts[o],
                        right: n.rights[o],
                        top: i.tops[s],
                        bottom: i.bottoms[s]
                    }
                }
            }, n.prototype.getCellEl = function (e, t) {
                return this.cellEls[e * this.colCnt + t]
            }, n.prototype._renderEventDrag = function (e) {
                e && (this.eventRenderer.hideByHash(e.affectedInstances), this.fillRenderer.renderSegs("highlight", e.segs))
            }, n.prototype._unrenderEventDrag = function (e) {
                e && (this.eventRenderer.showByHash(e.affectedInstances), this.fillRenderer.unrender("highlight"))
            }, n.prototype._renderEventResize = function (e) {
                e && (this.eventRenderer.hideByHash(e.affectedInstances), this.fillRenderer.renderSegs("highlight", e.segs), this.mirrorRenderer.renderSegs(e.segs, {
                    isResizing: !0,
                    sourceSeg: e.sourceSeg
                }))
            }, n.prototype._unrenderEventResize = function (e) {
                e && (this.eventRenderer.showByHash(e.affectedInstances), this.fillRenderer.unrender("highlight"), this.mirrorRenderer.unrender(e.segs, {
                    isResizing: !0,
                    sourceSeg: e.sourceSeg
                }))
            }, n.prototype.removeSegPopover = function () {
                this.segPopover && this.segPopover.hide()
            }, n.prototype.limitRows = function (e) {
                var t, r, n = this.eventRenderer.rowStructs || [];
                for (t = 0; t < n.length; t++) this.unlimitRow(t), !1 !== (r = !!e && ("number" == typeof e ? e : this.computeRowLevelLimit(t))) && this.limitRow(t, r)
            }, n.prototype.computeRowLevelLimit = function (e) {
                var r, n, i = this.rowEls[e],
                    o = i.getBoundingClientRect().bottom,
                    s = t.findChildren(this.eventRenderer.rowStructs[e].tbodyEl);
                for (r = 0; r < s.length; r++)
                    if (n = s[r], n.classList.remove("fc-limited"), n.getBoundingClientRect().bottom > o) return r;
                return !1
            }, n.prototype.limitRow = function (e, r) {
                var n, i, o, s, l, a, d, c, h, p, u, f, g, m, y, v = this,
                    b = this,
                    w = b.colCnt,
                    S = b.isRtl,
                    C = this.eventRenderer.rowStructs[e],
                    E = [],
                    R = 0,
                    H = function (n) {
                        for (; R < n;) a = v.getCellSegs(e, R, r), a.length && (h = i[r - 1][R], y = v.renderMoreLink(e, R, a), m = t.createElement("div", null, y), h.appendChild(m), E.push(m)), R++
                    };
                if (r && r < C.segLevels.length) {
                    for (n = C.segLevels[r - 1], i = C.cellMatrix, o = t.findChildren(C.tbodyEl).slice(r), o.forEach(function (e) {
                            e.classList.add("fc-limited")
                        }), s = 0; s < n.length; s++) {
                        l = n[s];
                        var D = S ? w - 1 - l.lastCol : l.firstCol,
                            P = S ? w - 1 - l.firstCol : l.lastCol;
                        for (H(D), c = [], d = 0; R <= P;) a = this.getCellSegs(e, R, r), c.push(a), d += a.length, R++;
                        if (d) {
                            for (h = i[r - 1][D], p = h.rowSpan || 1, u = [], f = 0; f < c.length; f++) g = t.createElement("td", {
                                className: "fc-more-cell",
                                rowSpan: p
                            }), a = c[f], y = this.renderMoreLink(e, D + f, [l].concat(a)), m = t.createElement("div", null, y), g.appendChild(m), u.push(g), E.push(g);
                            h.classList.add("fc-limited"), t.insertAfterElement(h, u), o.push(h)
                        }
                    }
                    H(this.colCnt), C.moreEls = E, C.limitedEls = o
                }
            }, n.prototype.unlimitRow = function (e) {
                var r = this.eventRenderer.rowStructs[e];
                r.moreEls && (r.moreEls.forEach(t.removeElement), r.moreEls = null), r.limitedEls && (r.limitedEls.forEach(function (e) {
                    e.classList.remove("fc-limited")
                }), r.limitedEls = null)
            }, n.prototype.renderMoreLink = function (e, r, n) {
                var i = this,
                    o = this,
                    s = o.view,
                    l = o.dateEnv,
                    a = t.createElement("a", {
                        className: "fc-more"
                    });
                return a.innerText = this.getMoreLinkText(n.length), a.addEventListener("click", function (t) {
                    var o = i.opt("eventLimitClick"),
                        a = i.isRtl ? i.colCnt - r - 1 : r,
                        d = i.props.cells[e][a].date,
                        c = t.currentTarget,
                        h = i.getCellEl(e, r),
                        p = i.getCellSegs(e, r),
                        u = i.resliceDaySegs(p, d),
                        f = i.resliceDaySegs(n, d);
                    "function" == typeof o && (o = i.publiclyTrigger("eventLimitClick", [{
                        date: l.toDate(d),
                        allDay: !0,
                        dayEl: h,
                        moreEl: c,
                        segs: u,
                        hiddenSegs: f,
                        jsEvent: t,
                        view: s
                    }])), "popover" === o ? i.showSegPopover(e, r, c, u) : "string" == typeof o && s.calendar.zoomTo(d, o)
                }), a
            }, n.prototype.showSegPopover = function (e, r, n, i) {
                var o, s, l = this,
                    a = this,
                    d = a.calendar,
                    h = a.view,
                    p = a.theme,
                    u = this.isRtl ? this.colCnt - r - 1 : r,
                    f = n.parentNode;
                o = 1 === this.rowCnt ? h.el : this.rowEls[e], s = {
                    className: "fc-more-popover " + p.getClass("popover"),
                    parentEl: h.el,
                    top: t.computeRect(o).top,
                    autoHide: !0,
                    content: function (t) {
                        l.segPopoverTile = new g(l.context, t), l.updateSegPopoverTile(l.props.cells[e][u].date, i)
                    },
                    hide: function () {
                        l.segPopoverTile.destroy(), l.segPopoverTile = null, l.segPopover.destroy(), l.segPopover = null
                    }
                }, this.isRtl ? s.right = t.computeRect(f).right + 1 : s.left = t.computeRect(f).left - 1, this.segPopover = new c(s), this.segPopover.show(), d.releaseAfterSizingTriggers()
            }, n.prototype.resliceDaySegs = function (e, r) {
                for (var n = r, i = t.addDays(n, 1), o = {
                        start: n,
                        end: i
                    }, s = [], l = 0, d = e; l < d.length; l++) {
                    var c = d[l],
                        h = c.eventRange,
                        p = h.range,
                        u = t.intersectRanges(p, o);
                    u && s.push(a({}, c, {
                        eventRange: {
                            def: h.def,
                            ui: a({}, h.ui, {
                                durationEditable: !1
                            }),
                            instance: h.instance,
                            range: u
                        },
                        isStart: c.isStart && u.start.valueOf() === p.start.valueOf(),
                        isEnd: c.isEnd && u.end.valueOf() === p.end.valueOf()
                    }))
                }
                return s
            }, n.prototype.getMoreLinkText = function (e) {
                var t = this.opt("eventLimitText");
                return "function" == typeof t ? t(e) : "+" + e + " " + t
            }, n.prototype.getCellSegs = function (e, t, r) {
                for (var n, i = this.eventRenderer.rowStructs[e].segMatrix, o = r || 0, s = []; o < i.length;) n = i[o][t], n && s.push(n), o++;
                return s
            }, n
        }(t.DateComponent),
        S = t.createFormatter({
            week: "numeric"
        }),
        C = function (e) {
            function n(r, n, i, o) {
                var s = e.call(this, r, n, i, o) || this;
                s.renderHeadIntroHtml = function () {
                    var e = s.theme;
                    return s.colWeekNumbersVisible ? '<th class="fc-week-number ' + e.getClass("widgetHeader") + '" ' + s.weekNumberStyleAttr() + "><span>" + t.htmlEscape(s.opt("weekLabel")) + "</span></th>" : ""
                }, s.renderDayGridNumberIntroHtml = function (e, r) {
                    var n = s.dateEnv,
                        i = r.props.cells[e][0].date;
                    return s.colWeekNumbersVisible ? '<td class="fc-week-number" ' + s.weekNumberStyleAttr() + ">" + t.buildGotoAnchorHtml(s, {
                        date: i,
                        type: "week",
                        forceOff: 1 === r.colCnt
                    }, n.format(i, S)) + "</td>" : ""
                }, s.renderDayGridBgIntroHtml = function () {
                    var e = s.theme;
                    return s.colWeekNumbersVisible ? '<td class="fc-week-number ' + e.getClass("widgetContent") + '" ' + s.weekNumberStyleAttr() + "></td>" : ""
                }, s.renderDayGridIntroHtml = function () {
                    return s.colWeekNumbersVisible ? '<td class="fc-week-number" ' + s.weekNumberStyleAttr() + "></td>" : ""
                }, s.el.classList.add("fc-dayGrid-view"), s.el.innerHTML = s.renderSkeletonHtml(), s.scroller = new t.ScrollComponent("hidden", "auto");
                var l = s.scroller.el;
                s.el.querySelector(".fc-body > tr > td").appendChild(l), l.classList.add("fc-day-grid-container");
                var a = t.createElement("div", {
                    className: "fc-day-grid"
                });
                l.appendChild(a);
                var d;
                return s.opt("weekNumbers") ? s.opt("weekNumbersWithinDays") ? (d = !0, s.colWeekNumbersVisible = !1) : (d = !1, s.colWeekNumbersVisible = !0) : (s.colWeekNumbersVisible = !1, d = !1), s.dayGrid = new w(s.context, a, {
                    renderNumberIntroHtml: s.renderDayGridNumberIntroHtml,
                    renderBgIntroHtml: s.renderDayGridBgIntroHtml,
                    renderIntroHtml: s.renderDayGridIntroHtml,
                    colWeekNumbersVisible: s.colWeekNumbersVisible,
                    cellWeekNumbersVisible: d
                }), s
            }
            return r(n, e), n.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.dayGrid.destroy(), this.scroller.destroy()
            }, n.prototype.renderSkeletonHtml = function () {
                var e = this.theme;
                return '<table class="' + e.getClass("tableGrid") + '">' + (this.opt("columnHeader") ? '<thead class="fc-head"><tr><td class="fc-head-container ' + e.getClass("widgetHeader") + '">&nbsp;</td></tr></thead>' : "") + '<tbody class="fc-body"><tr><td class="' + e.getClass("widgetContent") + '"></td></tr></tbody></table>'
            }, n.prototype.weekNumberStyleAttr = function () {
                return null != this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
            }, n.prototype.hasRigidRows = function () {
                var e = this.opt("eventLimit");
                return e && "number" != typeof e
            }, n.prototype.updateSize = function (t, r, n) {
                e.prototype.updateSize.call(this, t, r, n), this.dayGrid.updateSize(t)
            }, n.prototype.updateBaseSize = function (e, r, n) {
                var i, o, s = this.dayGrid,
                    l = this.opt("eventLimit"),
                    a = this.header ? this.header.el : null;
                if (!s.rowEls) return void(n || (i = this.computeScrollerHeight(r), this.scroller.setHeight(i)));
                this.colWeekNumbersVisible && (this.weekNumberWidth = t.matchCellWidths(t.findElements(this.el, ".fc-week-number"))), this.scroller.clear(), a && t.uncompensateScroll(a), s.removeSegPopover(), l && "number" == typeof l && s.limitRows(l), i = this.computeScrollerHeight(r), this.setGridHeight(i, n), l && "number" != typeof l && s.limitRows(l), n || (this.scroller.setHeight(i), o = this.scroller.getScrollbarWidths(), (o.left || o.right) && (a && t.compensateScroll(a, o), i = this.computeScrollerHeight(r), this.scroller.setHeight(i)), this.scroller.lockOverflow(o))
            }, n.prototype.computeScrollerHeight = function (e) {
                return e - t.subtractInnerElHeight(this.el, this.scroller.el)
            }, n.prototype.setGridHeight = function (e, r) {
                this.opt("monthMode") ? (r && (e *= this.dayGrid.rowCnt / 6), t.distributeHeight(this.dayGrid.rowEls, e, !r)) : r ? t.undistributeHeight(this.dayGrid.rowEls) : t.distributeHeight(this.dayGrid.rowEls, e, !0)
            }, n.prototype.computeDateScroll = function (e) {
                return {
                    top: 0
                }
            }, n.prototype.queryDateScroll = function () {
                return {
                    top: this.scroller.getScrollTop()
                }
            }, n.prototype.applyDateScroll = function (e) {
                void 0 !== e.top && this.scroller.setScrollTop(e.top)
            }, n
        }(t.View);
    C.prototype.dateProfileGeneratorClass = d;
    var E = function (e) {
            function t(t, r) {
                var n = e.call(this, t, r.el) || this;
                return n.slicer = new R, n.dayGrid = r, t.calendar.registerInteractiveComponent(n, {
                    el: n.dayGrid.el
                }), n
            }
            return r(t, e), t.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.calendar.unregisterInteractiveComponent(this)
            }, t.prototype.render = function (e) {
                var t = this.dayGrid,
                    r = e.dateProfile,
                    n = e.dayTable;
                t.receiveProps(a({}, this.slicer.sliceProps(e, r, e.nextDayThreshold, t, n), {
                    dateProfile: r,
                    cells: n.cells,
                    isRigid: e.isRigid
                }))
            }, t.prototype.buildPositionCaches = function () {
                this.dayGrid.buildPositionCaches()
            }, t.prototype.queryHit = function (e, t) {
                var r = this.dayGrid.positionToHit(e, t);
                if (r) return {
                    component: this.dayGrid,
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
            }, t
        }(t.DateComponent),
        R = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return r(t, e), t.prototype.sliceRange = function (e, t) {
                return t.sliceRange(e)
            }, t
        }(t.Slicer),
        H = function (e) {
            function n(r, n, i, o) {
                var l = e.call(this, r, n, i, o) || this;
                return l.buildDayTable = t.memoize(s), l.opt("columnHeader") && (l.header = new t.DayHeader(l.context, l.el.querySelector(".fc-head-container"))), l.simpleDayGrid = new E(l.context, l.dayGrid), l
            }
            return r(n, e), n.prototype.destroy = function () {
                e.prototype.destroy.call(this), this.header && this.header.destroy(), this.simpleDayGrid.destroy()
            }, n.prototype.render = function (t) {
                e.prototype.render.call(this, t);
                var r = this.props.dateProfile,
                    n = this.dayTable = this.buildDayTable(r, this.dateProfileGenerator);
                this.header && this.header.receiveProps({
                    dateProfile: r,
                    dates: n.headerDates,
                    datesRepDistinctDays: 1 === n.rowCnt,
                    renderIntroHtml: this.renderHeadIntroHtml
                }), this.simpleDayGrid.receiveProps({
                    dateProfile: r,
                    dayTable: n,
                    businessHours: t.businessHours,
                    dateSelection: t.dateSelection,
                    eventStore: t.eventStore,
                    eventUiBases: t.eventUiBases,
                    eventSelection: t.eventSelection,
                    eventDrag: t.eventDrag,
                    eventResize: t.eventResize,
                    isRigid: this.hasRigidRows(),
                    nextDayThreshold: this.nextDayThreshold
                })
            }, n
        }(C),
        D = t.createPlugin({
            defaultView: "dayGridMonth",
            views: {
                dayGrid: H,
                dayGridDay: {
                    type: "dayGrid",
                    duration: {
                        days: 1
                    }
                },
                dayGridWeek: {
                    type: "dayGrid",
                    duration: {
                        weeks: 1
                    }
                },
                dayGridMonth: {
                    type: "dayGrid",
                    duration: {
                        months: 1
                    },
                    monthMode: !0,
                    fixedWeekCount: !0
                }
            }
        });
    e.AbstractDayGridView = C, e.DayBgRow = y, e.DayGrid = w, e.DayGridSlicer = R, e.DayGridView = H, e.SimpleDayGrid = E, e.buildBasicDayTable = s, e.default = D, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});