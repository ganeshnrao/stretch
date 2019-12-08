(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{186:function(t,e,n){"use strict";n.r(e);n(6),n(4),n(2),n(1),n(5);var r=n(0),o=n(92),c=n(93);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var d={data:function(){return{fields:["name","hold","repeat","rest","alternate"]}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.c)("routines",["exercises"]),{},Object(c.b)("routines",["currentActionIndex"]),{},Object(o.c)("routines",["playing"]),{},Object(o.b)("routines",["actions"]))},m=n(43),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-fluid py-3"},[n("b-button-group",[n("b-button",{attrs:{variant:"outline-primary"},on:{click:function(e){return t.$store.dispatch("routines/togglePlaying")}}},[n("v-icon",{attrs:{name:t.playing?"stop-circle":"play"}}),t._v(" "+t._s(t.playing?"Stop":"Play"))],1),n("b-button",{attrs:{variant:"outline-success"},on:{click:function(e){return t.$store.dispatch("routines/save")}}},[n("v-icon",{attrs:{name:"save"}}),t._v(" Save")],1)],1),t.playing?n("div",{staticClass:"mt-3"},[n("b-form-input",{attrs:{type:"range",min:"0",max:t.actions.length,disabled:""},model:{value:t.currentActionIndex,callback:function(e){t.currentActionIndex=e},expression:"currentActionIndex"}}),n("b-list-group",{staticClass:"mt-3"},t._l(t.actions,(function(e,r){return n("b-list-group-item",{key:r,staticClass:"d-flex justify-content-between",class:{active:r===t.currentActionIndex},attrs:{button:""},on:{click:function(e){return t.$store.dispatch("routines/skipTo",r)}}},[n("span",[t._v(t._s(e.message)+" ")]),n("span",[n("b-badge",{attrs:{variant:"light"}},[t._v(t._s(e.duration)+" seconds")])],1)])})),1)],1):n("div",{staticClass:"mt-3"},[t._l(t.exercises,(function(e,r){return n("b-card",{key:e.id,staticClass:"mb-3"},[n("b-form-group",[n("b-button-group",[n("b-button",{attrs:{variant:"outline-secondary"},on:{click:function(t){e.include=!e.include}}},[n("v-icon",{attrs:{name:e.include?"check-square":"square"}})],1),r>0?n("b-button",{attrs:{variant:"outline-secondary"},on:{click:function(n){return t.$store.dispatch("routines/move",{id:e.id,direction:-1})}}},[n("v-icon",{attrs:{name:"arrow-up"}})],1):t._e(),r<t.exercises.length-1?n("b-button",{attrs:{variant:"outline-secondary"},on:{click:function(n){return t.$store.dispatch("routines/move",{id:e.id,direction:1})}}},[n("v-icon",{attrs:{name:"arrow-down"}})],1):t._e(),n("b-button",{attrs:{variant:"outline-danger"},on:{click:function(n){return t.$store.dispatch("routines/deleteExercise",e.id)}}},[n("v-icon",{attrs:{name:"trash-2"}})],1)],1)],1),n("b-form-group",[n("b-form-input",{attrs:{type:"text"},model:{value:e.name,callback:function(n){t.$set(e,"name",n)},expression:"item.name"}})],1),n("b-form-group",{attrs:{label:"Hold","label-cols":"3"}},[n("b-form-input",{attrs:{type:"number",min:"1",max:"300"},model:{value:e.hold,callback:function(n){t.$set(e,"hold",n)},expression:"item.hold"}})],1),n("b-form-group",{attrs:{label:"Repeat","label-cols":"3"}},[n("b-form-input",{attrs:{type:"number",min:"1",max:"300"},model:{value:e.repeat,callback:function(n){t.$set(e,"repeat",n)},expression:"item.repeat"}})],1),n("b-form-group",{attrs:{label:"Rest","label-cols":"3"}},[n("b-form-input",{attrs:{type:"number",min:"0",max:"300"},model:{value:e.rest,callback:function(n){t.$set(e,"rest",n)},expression:"item.rest"}})],1),n("b-button-group",[n("b-button",{class:{active:e.alternate},attrs:{variant:"outline-primary"},on:{click:function(t){e.alternate=!0}}},[n("v-icon",{attrs:{name:"shuffle"}}),t._v(" Alternate")],1),n("b-button",{class:{action:!e.alternate},attrs:{variant:"outline-primary"},on:{click:function(t){e.alternate=!1}}},[n("v-icon",{attrs:{name:"minimize-2"}}),t._v(" Both")],1)],1)],1)})),n("b-button",{attrs:{variant:"outline-success"},on:{click:function(e){return t.$store.dispatch("routines/add")}}},[n("v-icon",{attrs:{name:"plus"}}),t._v(" Add another")],1)],2)],1)}),[],!1,null,null,null);e.default=component.exports}}]);