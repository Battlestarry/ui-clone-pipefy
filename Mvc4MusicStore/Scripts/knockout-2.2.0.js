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
 * NUGET: END LICENSE TEXT */
// Knockout JavaScript library v2.2.0
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function() {function i(v){throw v;}var l=!0,n=null,q=!1;function t(v){return function(){return v}};var w=window,x=document,fa=navigator,E=window.jQuery,H=void 0;
function K(v){function ga(a,d,c,e,f){var g=[],a=b.j(function(){var a=d(c,f)||[];0<g.length&&(b.a.Xa(L(g),a),e&&b.r.K(e,n,[c,a,f]));g.splice(0,g.length);b.a.P(g,a)},n,{W:a,Ja:function(){return 0==g.length||!b.a.X(g[0])}});return{M:g,j:a.oa()?a:H}}function L(a){for(;a.length&&!b.a.X(a[0]);)a.splice(0,1);if(1<a.length){for(var d=a[0],c=a[a.length-1],e=[d];d!==c;){d=d.nextSibling;if(!d)return;e.push(d)}Array.prototype.splice.apply(a,[0,a.length].concat(e))}return a}function R(a,b,c,e,f){var g=Math.min,
h=Math.max,j=[],k,m=a.length,p,r=b.length,u=r-m||1,F=m+r+1,I,z,y;for(k=0;k<=m;k++){z=I;j.push(I=[]);y=g(r,k+u);for(p=h(0,k-1);p<=y;p++)I[p]=p?k?a[k-1]===b[p-1]?z[p-1]:g(z[p]||F,I[p-1]||F)+1:p+1:k+1}g=[];h=[];u=[];k=m;for(p=r;k||p;)r=j[k][p]-1,p&&r===j[k][p-1]?h.push(g[g.length]={status:c,value:b[--p],index:p}):k&&r===j[k-1][p]?u.push(g[g.length]={status:e,value:a[--k],index:k}):(g.push({status:"retained",value:b[--p]}),--k);if(h.length&&u.length)for(var a=10*m,s,b=c=0;(f||b<a)&&(s=h[c]);c++){for(e=
0;j=u[e];e++)if(s.value===j.value){s.moved=j.index;j.moved=s.index;u.splice(e,1);b=e=0;break}b+=e}return g.reverse()}function S(a,d,c,e,f){var f=f||{},g=a&&M(a),g=g&&g.ownerDocument,h=f.templateEngine||N;b.ya.ub(c,h,g);c=h.renderTemplate(c,e,f,g);("number"!=typeof c.length||0<c.length&&"number"!=typeof c[0].nodeType)&&i(Error("Template engine must return an array of DOM nodes"));g=q;switch(d){case "replaceChildren":b.e.N(a,c);g=l;break;case "replaceNode":b.a.Xa(a,c);g=l;break;case "ignoreTargetNode":break;
default:i(Error("Unknown renderM