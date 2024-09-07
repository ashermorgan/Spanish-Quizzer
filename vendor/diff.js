/*!

 diff v5.0.0

Software License Agreement (BSD License)

Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of Kevin Decker nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).Diff={})}(this,function(e){"use strict";function n(){}function t(e,n,t,r,i){for(var o=0,l=n.length,s=0,a=0;o<l;o++){var u=n[o];if(u.removed){if(u.value=e.join(r.slice(a,a+u.count)),a+=u.count,o&&n[o-1].added){var f=n[o-1];n[o-1]=n[o],n[o]=f}}else{if(!u.added&&i){var d=t.slice(s,s+u.count);d=d.map(function(e,n){var t=r[a+n];return t.length>e.length?t:e}),u.value=e.join(d)}else u.value=e.join(t.slice(s,s+u.count));s+=u.count,u.added||(a+=u.count)}}var c=n[l-1];return l>1&&"string"==typeof c.value&&(c.added||c.removed)&&e.equals("",c.value)&&(n[l-2].value+=c.value,n.pop()),n}n.prototype={diff:function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=r.callback;"function"==typeof r&&(i=r,r={}),this.options=r;var o=this;function l(e){return i?(setTimeout(function(){i(void 0,e)},0),!0):e}e=this.castInput(e),n=this.castInput(n),e=this.removeEmpty(this.tokenize(e));var s=(n=this.removeEmpty(this.tokenize(n))).length,a=e.length,u=1,f=s+a,d=[{newPos:-1,components:[]}],c=this.extractCommon(d[0],n,e,0);if(d[0].newPos+1>=s&&c+1>=a)return l([{value:this.join(n),count:n.length}]);function h(){for(var r=-1*u;r<=u;r+=2){var i=void 0,f=d[r-1],c=d[r+1],h=(c?c.newPos:0)-r;f&&(d[r-1]=void 0);var p=f&&f.newPos+1<s,v=c&&0<=h&&h<a;if(p||v){if(!p||v&&f.newPos<c.newPos?(i={newPos:(g=c).newPos,components:g.components.slice(0)},o.pushComponent(i.components,void 0,!0)):((i=f).newPos++,o.pushComponent(i.components,!0,void 0)),h=o.extractCommon(i,n,e,r),i.newPos+1>=s&&h+1>=a)return l(t(o,i.components,n,e,o.useLongestToken));d[r]=i}else d[r]=void 0}var g;u++}if(i)!function e(){setTimeout(function(){if(u>f)return i();h()||e()},0)}();else for(;u<=f;){var p=h();if(p)return p}},pushComponent:function(e,n,t){var r=e[e.length-1];r&&r.added===n&&r.removed===t?e[e.length-1]={count:r.count+1,added:n,removed:t}:e.push({count:1,added:n,removed:t})},extractCommon:function(e,n,t,r){for(var i=n.length,o=t.length,l=e.newPos,s=l-r,a=0;l+1<i&&s+1<o&&this.equals(n[l+1],t[s+1]);)l++,s++,a++;return a&&e.components.push({count:a}),e.newPos=l,s},equals:function(e,n){return this.options.comparator?this.options.comparator(e,n):e===n||this.options.ignoreCase&&e.toLowerCase()===n.toLowerCase()},removeEmpty:function(e){for(var n=[],t=0;t<e.length;t++)e[t]&&n.push(e[t]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};var r=new n;function i(e,n){if("function"==typeof e)n.callback=e;else if(e)for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}var o=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,l=/\S/,s=new n;s.equals=function(e,n){return this.options.ignoreCase&&(e=e.toLowerCase(),n=n.toLowerCase()),e===n||this.options.ignoreWhitespace&&!l.test(e)&&!l.test(n)},s.tokenize=function(e){for(var n=e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<n.length-1;t++)!n[t+1]&&n[t+2]&&o.test(n[t])&&o.test(n[t+2])&&(n[t]+=n[t+2],n.splice(t+1,2),t--);return n};var a=new n;function u(e,n,t){return a.diff(e,n,t)}a.tokenize=function(e){var n=[],t=e.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var r=0;r<t.length;r++){var i=t[r];r%2&&!this.options.newlineIsToken?n[n.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),n.push(i))}return n};var f=new n;f.tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)};var d=new n;function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return p(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return p(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}d.tokenize=function(e){return e.split(/([{}:;,]|\s+)/)};var v=Object.prototype.toString,g=new n;function m(e,n,t,r,i){var o,l;for(n=n||[],t=t||[],r&&(e=r(i,e)),o=0;o<n.length;o+=1)if(n[o]===e)return t[o];if("[object Array]"===v.call(e)){for(n.push(e),l=new Array(e.length),t.push(l),o=0;o<e.length;o+=1)l[o]=m(e[o],n,t,r,i);return n.pop(),t.pop(),l}if(e&&e.toJSON&&(e=e.toJSON()),"object"===c(e)&&null!==e){n.push(e),l={},t.push(l);var s,a=[];for(s in e)e.hasOwnProperty(s)&&a.push(s);for(a.sort(),o=0;o<a.length;o+=1)l[s=a[o]]=m(e[s],n,t,r,s);n.pop(),t.pop()}else l=e;return l}g.useLongestToken=!0,g.tokenize=a.tokenize,g.castInput=function(e){var n=this.options,t=n.undefinedReplacement,r=n.stringifyReplacer,i=void 0===r?function(e,n){return void 0===n?t:n}:r;return"string"==typeof e?e:JSON.stringify(m(e,null,null,i),i,"  ")},g.equals=function(e,t){return n.prototype.equals.call(g,e.replace(/,([\r\n])/g,"$1"),t.replace(/,([\r\n])/g,"$1"))};var w=new n;function y(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.split(/\r\n|[\n\v\f\r\x85]/),r=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],i=[],o=0;function l(){var e={};for(i.push(e);o<t.length;){var r=t[o];if(/^(\-\-\-|\+\+\+|@@)\s/.test(r))break;var l=/^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(r);l&&(e.index=l[1]),o++}for(s(e),s(e),e.hunks=[];o<t.length;){var u=t[o];if(/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(u))break;if(/^@@/.test(u))e.hunks.push(a());else{if(u&&n.strict)throw new Error("Unknown line "+(o+1)+" "+JSON.stringify(u));o++}}}function s(e){var n=/^(---|\+\+\+)\s+(.*)$/.exec(t[o]);if(n){var r="---"===n[1]?"old":"new",i=n[2].split("\t",2),l=i[0].replace(/\\\\/g,"\\");/^".*"$/.test(l)&&(l=l.substr(1,l.length-2)),e[r+"FileName"]=l,e[r+"Header"]=(i[1]||"").trim(),o++}}function a(){var e=o,i=t[o++].split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),l={oldStart:+i[1],oldLines:void 0===i[2]?1:+i[2],newStart:+i[3],newLines:void 0===i[4]?1:+i[4],lines:[],linedelimiters:[]};0===l.oldLines&&(l.oldStart+=1),0===l.newLines&&(l.newStart+=1);for(var s=0,a=0;o<t.length&&!(0===t[o].indexOf("--- ")&&o+2<t.length&&0===t[o+1].indexOf("+++ ")&&0===t[o+2].indexOf("@@"));o++){var u=0==t[o].length&&o!=t.length-1?" ":t[o][0];if("+"!==u&&"-"!==u&&" "!==u&&"\\"!==u)break;l.lines.push(t[o]),l.linedelimiters.push(r[o]||"\n"),"+"===u?s++:"-"===u?a++:" "===u&&(s++,a++)}if(s||1!==l.newLines||(l.newLines=0),a||1!==l.oldLines||(l.oldLines=0),n.strict){if(s!==l.newLines)throw new Error("Added line count did not match for hunk at line "+(e+1));if(a!==l.oldLines)throw new Error("Removed line count did not match for hunk at line "+(e+1))}return l}for(;o<t.length;)l();return i}function L(e,n,t){var r=!0,i=!1,o=!1,l=1;return function s(){if(r&&!o){if(i?l++:r=!1,e+l<=t)return l;o=!0}if(!i)return o||(r=!0),n<=e-l?-l++:(i=!0,s())}}function x(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof n&&(n=y(n)),Array.isArray(n)){if(n.length>1)throw new Error("applyPatch only works with a single input.");n=n[0]}var r,i,o=e.split(/\r\n|[\n\v\f\r\x85]/),l=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],s=n.hunks,a=t.compareLine||function(e,n,t,r){return n===r},u=0,f=t.fuzzFactor||0,d=0,c=0;function h(e,n){for(var t=0;t<e.lines.length;t++){var r=e.lines[t],i=r.length>0?r[0]:" ",l=r.length>0?r.substr(1):r;if(" "===i||"-"===i){if(!a(n+1,o[n],i,l)&&++u>f)return!1;n++}}return!0}for(var p=0;p<s.length;p++){for(var v=s[p],g=o.length-v.oldLines,m=0,w=c+v.oldStart-1,x=L(w,d,g);void 0!==m;m=x())if(h(v,w+m)){v.offset=c+=m;break}if(void 0===m)return!1;d=v.offset+v.oldStart+v.oldLines}for(var S=0,k=0;k<s.length;k++){var b=s[k],F=b.oldStart+b.offset+S-1;S+=b.newLines-b.oldLines;for(var N=0;N<b.lines.length;N++){var H=b.lines[N],P=H.length>0?H[0]:" ",C=H.length>0?H.substr(1):H,j=b.linedelimiters[N];if(" "===P)F++;else if("-"===P)o.splice(F,1),l.splice(F,1);else if("+"===P)o.splice(F,0,C),l.splice(F,0,j),F++;else if("\\"===P){var z=b.lines[N-1]?b.lines[N-1][0]:null;"+"===z?r=!0:"-"===z&&(i=!0)}}}if(r)for(;!o[o.length-1];)o.pop(),l.pop();else i&&(o.push(""),l.push("\n"));for(var A=0;A<o.length-1;A++)o[A]=o[A]+l[A];return o.join("")}function S(e,n,t,r,i,o,l){l||(l={}),void 0===l.context&&(l.context=4);var s=u(t,r,l);function a(e){return e.map(function(e){return" "+e})}s.push({value:"",lines:[]});for(var f=[],d=0,c=0,p=[],v=1,g=1,m=function(e){var n=s[e],i=n.lines||n.value.replace(/\n$/,"").split("\n");if(n.lines=i,n.added||n.removed){var o;if(!d){var u=s[e-1];d=v,c=g,u&&(p=l.context>0?a(u.lines.slice(-l.context)):[],d-=p.length,c-=p.length)}(o=p).push.apply(o,h(i.map(function(e){return(n.added?"+":"-")+e}))),n.added?g+=i.length:v+=i.length}else{if(d)if(i.length<=2*l.context&&e<s.length-2){var m;(m=p).push.apply(m,h(a(i)))}else{var w,y=Math.min(i.length,l.context);(w=p).push.apply(w,h(a(i.slice(0,y))));var L={oldStart:d,oldLines:v-d+y,newStart:c,newLines:g-c+y,lines:p};if(e>=s.length-2&&i.length<=l.context){var x=/\n$/.test(t),S=/\n$/.test(r),k=0==i.length&&p.length>L.oldLines;!x&&k&&t.length>0&&p.splice(L.oldLines,0,"\\ No newline at end of file"),(x||k)&&S||p.push("\\ No newline at end of file")}f.push(L),d=0,c=0,p=[]}v+=i.length,g+=i.length}},w=0;w<s.length;w++)m(w);return{oldFileName:e,newFileName:n,oldHeader:i,newHeader:o,hunks:f}}function k(e,n,t,r,i,o,l){return function(e){var n=[];e.oldFileName==e.newFileName&&n.push("Index: "+e.oldFileName),n.push("==================================================================="),n.push("--- "+e.oldFileName+(void 0===e.oldHeader?"":"\t"+e.oldHeader)),n.push("+++ "+e.newFileName+(void 0===e.newHeader?"":"\t"+e.newHeader));for(var t=0;t<e.hunks.length;t++){var r=e.hunks[t];0===r.oldLines&&(r.oldStart-=1),0===r.newLines&&(r.newStart-=1),n.push("@@ -"+r.oldStart+","+r.oldLines+" +"+r.newStart+","+r.newLines+" @@"),n.push.apply(n,r.lines)}return n.join("\n")+"\n"}(S(e,n,t,r,i,o,l))}function b(e,n){if(n.length>e.length)return!1;for(var t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}function F(e){var n=function e(n){var t=0;var r=0;n.forEach(function(n){if("string"!=typeof n){var i=e(n.mine),o=e(n.theirs);void 0!==t&&(i.oldLines===o.oldLines?t+=i.oldLines:t=void 0),void 0!==r&&(i.newLines===o.newLines?r+=i.newLines:r=void 0)}else void 0===r||"+"!==n[0]&&" "!==n[0]||r++,void 0===t||"-"!==n[0]&&" "!==n[0]||t++});return{oldLines:t,newLines:r}}(e.lines),t=n.oldLines,r=n.newLines;void 0!==t?e.oldLines=t:delete e.oldLines,void 0!==r?e.newLines=r:delete e.newLines}function N(e,n){if("string"==typeof e){if(/^@@/m.test(e)||/^Index:/m.test(e))return y(e)[0];if(!n)throw new Error("Must provide a base reference or pass in a patch");return S(void 0,void 0,n,e)}return e}function H(e){return e.newFileName&&e.newFileName!==e.oldFileName}function P(e,n,t){return n===t?n:(e.conflict=!0,{mine:n,theirs:t})}function C(e,n){return e.oldStart<n.oldStart&&e.oldStart+e.oldLines<n.oldStart}function j(e,n){return{oldStart:e.oldStart,oldLines:e.oldLines,newStart:e.newStart+n,newLines:e.newLines,lines:e.lines}}function z(e,n,t,r,i){var o={offset:n,lines:t,index:0},l={offset:r,lines:i,index:0};for(I(e,o,l),I(e,l,o);o.index<o.lines.length&&l.index<l.lines.length;){var s=o.lines[o.index],a=l.lines[l.index];if("-"!==s[0]&&"+"!==s[0]||"-"!==a[0]&&"+"!==a[0])if("+"===s[0]&&" "===a[0]){var u;(u=e.lines).push.apply(u,h(T(o)))}else if("+"===a[0]&&" "===s[0]){var f;(f=e.lines).push.apply(f,h(T(l)))}else"-"===s[0]&&" "===a[0]?E(e,o,l):"-"===a[0]&&" "===s[0]?E(e,l,o,!0):s===a?(e.lines.push(s),o.index++,l.index++):O(e,T(o),T(l));else A(e,o,l)}$(e,o),$(e,l),F(e)}function A(e,n,t){var r,i,o=T(n),l=T(t);if(M(o)&&M(l)){var s,a;if(b(o,l)&&q(t,o,o.length-l.length))return void(s=e.lines).push.apply(s,h(o));if(b(l,o)&&q(n,l,l.length-o.length))return void(a=e.lines).push.apply(a,h(l))}else if(i=l,(r=o).length===i.length&&b(r,i)){var u;return void(u=e.lines).push.apply(u,h(o))}O(e,o,l)}function E(e,n,t,r){var i,o=T(n),l=function(e,n){var t=[],r=[],i=0,o=!1,l=!1;for(;i<n.length&&e.index<e.lines.length;){var s=e.lines[e.index],a=n[i];if("+"===a[0])break;if(o=o||" "!==s[0],r.push(a),i++,"+"===s[0])for(l=!0;"+"===s[0];)t.push(s),s=e.lines[++e.index];a.substr(1)===s.substr(1)?(t.push(s),e.index++):l=!0}"+"===(n[i]||"")[0]&&o&&(l=!0);if(l)return t;for(;i<n.length;)r.push(n[i++]);return{merged:r,changes:t}}(t,o);l.merged?(i=e.lines).push.apply(i,h(l.merged)):O(e,r?l:o,r?o:l)}function O(e,n,t){e.conflict=!0,e.lines.push({conflict:!0,mine:n,theirs:t})}function I(e,n,t){for(;n.offset<t.offset&&n.index<n.lines.length;){var r=n.lines[n.index++];e.lines.push(r),n.offset++}}function $(e,n){for(;n.index<n.lines.length;){var t=n.lines[n.index++];e.lines.push(t)}}function T(e){for(var n=[],t=e.lines[e.index][0];e.index<e.lines.length;){var r=e.lines[e.index];if("-"===t&&"+"===r[0]&&(t="+"),t!==r[0])break;n.push(r),e.index++}return n}function M(e){return e.reduce(function(e,n){return e&&"-"===n[0]},!0)}function q(e,n,t){for(var r=0;r<t;r++){var i=n[n.length-t+r].substr(1);if(e.lines[e.index+r]!==" "+i)return!1}return e.index+=t,!0}w.tokenize=function(e){return e.slice()},w.join=w.removeEmpty=function(e){return e},e.Diff=n,e.applyPatch=x,e.applyPatches=function(e,n){"string"==typeof e&&(e=y(e));var t=0;!function r(){var i=e[t++];if(!i)return n.complete();n.loadFile(i,function(e,t){if(e)return n.complete(e);var o=x(t,i,n);n.patched(i,o,function(e){if(e)return n.complete(e);r()})})}()},e.canonicalize=m,e.convertChangesToDMP=function(e){for(var n,t,r=[],i=0;i<e.length;i++)t=(n=e[i]).added?1:n.removed?-1:0,r.push([t,n.value]);return r},e.convertChangesToXML=function(e){for(var n=[],t=0;t<e.length;t++){var r=e[t];r.added?n.push("<ins>"):r.removed&&n.push("<del>"),n.push((i=r.value,void 0,i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"))),r.added?n.push("</ins>"):r.removed&&n.push("</del>")}var i;return n.join("")},e.createPatch=function(e,n,t,r,i,o){return k(e,e,n,t,r,i,o)},e.createTwoFilesPatch=k,e.diffArrays=function(e,n,t){return w.diff(e,n,t)},e.diffChars=function(e,n,t){return r.diff(e,n,t)},e.diffCss=function(e,n,t){return d.diff(e,n,t)},e.diffJson=function(e,n,t){return g.diff(e,n,t)},e.diffLines=u,e.diffSentences=function(e,n,t){return f.diff(e,n,t)},e.diffTrimmedLines=function(e,n,t){var r=i(t,{ignoreWhitespace:!0});return a.diff(e,n,r)},e.diffWords=function(e,n,t){return t=i(t,{ignoreWhitespace:!0}),s.diff(e,n,t)},e.diffWordsWithSpace=function(e,n,t){return s.diff(e,n,t)},e.merge=function(e,n,t){e=N(e,t),n=N(n,t);var r={};(e.index||n.index)&&(r.index=e.index||n.index),(e.newFileName||n.newFileName)&&(H(e)?H(n)?(r.oldFileName=P(r,e.oldFileName,n.oldFileName),r.newFileName=P(r,e.newFileName,n.newFileName),r.oldHeader=P(r,e.oldHeader,n.oldHeader),r.newHeader=P(r,e.newHeader,n.newHeader)):(r.oldFileName=e.oldFileName,r.newFileName=e.newFileName,r.oldHeader=e.oldHeader,r.newHeader=e.newHeader):(r.oldFileName=n.oldFileName||e.oldFileName,r.newFileName=n.newFileName||e.newFileName,r.oldHeader=n.oldHeader||e.oldHeader,r.newHeader=n.newHeader||e.newHeader)),r.hunks=[];for(var i=0,o=0,l=0,s=0;i<e.hunks.length||o<n.hunks.length;){var a=e.hunks[i]||{oldStart:1/0},u=n.hunks[o]||{oldStart:1/0};if(C(a,u))r.hunks.push(j(a,l)),i++,s+=a.newLines-a.oldLines;else if(C(u,a))r.hunks.push(j(u,s)),o++,l+=u.newLines-u.oldLines;else{var f={oldStart:Math.min(a.oldStart,u.oldStart),oldLines:0,newStart:Math.min(a.newStart+l,u.oldStart+s),newLines:0,lines:[]};z(f,a.oldStart,a.lines,u.oldStart,u.lines),o++,i++,r.hunks.push(f)}}return r},e.parsePatch=y,e.structuredPatch=S,Object.defineProperty(e,"__esModule",{value:!0})});