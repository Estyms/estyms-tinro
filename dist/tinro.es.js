import{SvelteComponent as rt,check_outros as at,create_slot as nt,detach as it,empty as lt,group_outros as ct,init as ot,insert as st,safe_not_equal as ut,transition_in as k,transition_out as R,update_slot as ft}from"svelte/internal";import{getContext as T}from"svelte";import{writable as D}from"svelte/store";import{getContext as S,setContext as I,onMount as N,tick as H}from"svelte";import{writable as P}from"svelte/store";function v(e,a=!1){return e=e.slice(e.startsWith("/#")?2:0,e.endsWith("/*")?-2:void 0),e.startsWith("/")||(e="/"+e),e==="/"&&(e=""),a&&!e.endsWith("/")&&(e+="/"),e}function O(e,a){e=v(e,!0),a=v(a,!0);let n=[],r={},t=!0,i=e.split("/").map(l=>l.startsWith(":")?(n.push(l.slice(1)),"([^\\/]+)"):l).join("\\/"),c=a.match(new RegExp(`^${i}$`));return c||(t=!1,c=a.match(new RegExp(`^${i}`))),c?(n.forEach((l,p)=>r[l]=c[p+1]),{exact:t,params:r,part:c[0].slice(0,-1)}):null}function W(e,a,n){if(n==="")return e;if(n[0]==="/")return n;let r=c=>c.split("/").filter(l=>l!==""),t=r(e),i=a?r(a):[];return"/"+i.map((c,l)=>t[l]).join("/")+"/"+n}function w(e,a,n,r){let t=[a,"data-"+a].reduce((i,c)=>{let l=e.getAttribute(c);return n&&e.removeAttribute(c),l===null?i:l},!1);return!r&&t===""?!0:t||r||!1}function Q(e){let a=e.split("&").map(n=>n.split("=")).reduce((n,r)=>{let t=r[0];if(!t)return n;let i=r.length>1?r[r.length-1]:!0;return typeof i=="string"&&i.includes(",")&&(i=i.split(",")),n[t]===void 0?n[t]=[i]:n[t].push(i),n},{});return Object.entries(a).reduce((n,r)=>(n[r[0]]=r[1].length>1?r[1]:r[1][0],n),{})}function U(e){throw new Error("[Tinro] "+e)}var x=1,C=2,E=3,Z=4;function B(e,a,n,r){return e===x?a&&a():e===C?n&&n():r&&r()}function G(){return!window||window.location.pathname==="srcdoc"?E:x}var f={HISTORY:x,HASH:C,MEMORY:E,OFF:Z,run:B,getDeafault:G},A,g,m=J();function J(){let e=f.getDeafault(),a,n=i=>window.onhashchange=window.onpopstate=g=null,r=i=>a&&a(M(e));function t(i){i&&(e=i),n(),e!==f.OFF&&f.run(e,c=>window.onpopstate=r,c=>window.onhashchange=r)&&r()}return{mode:i=>t(i),get:i=>M(e),go(i){X(e,i),r()},replace(i){V(e,i),r()},start(i){a=i,t()},stop(){a=null,t(f.OFF)}}}function V(e,a){f.run(e,n=>history.replaceState({},"",a),n=>window.location.hash=a,n=>g=a)}function X(e,a){f.run(e,n=>history.pushState({},"",a),n=>window.location.hash=a,n=>g=a)}function M(e){let a=A,n=A=f.run(e,t=>window.location.pathname+window.location.search,t=>String(window.location.hash.slice(1)||"/"),t=>g||"/"),r=n.match(/^([^?#]+)(?:\?([^#]+))?(?:\#(.+))?$/);return{url:n,from:a,path:r[1]||"",query:Q(r[2]||""),hash:r[3]||""}}function q(e){let a=S("tinro");a&&(a.exact||a.fallback)&&U(`${e.fallback?"<Route fallback>":`<Route path="${e.path}">`}  can't be inside ${a.fallback?"<Route fallback>":`<Route path="${a.path||"/"}"> with exact path`}`);let n=e.fallback?"fallbacks":"childs",r=P({}),t={router:{},exact:!1,pattern:null,meta:{},parent:a,fallback:e.fallback,redirect:!1,replace:!1,firstmatch:!1,breadcrumb:null,matched:!1,childs:new Set,activeChilds:new Set,fallbacks:new Set,update(i){t.exact=!i.path.endsWith("/*"),t.pattern=v(`${t.parent&&t.parent.pattern||""}${i.path}`),t.redirect=i.redirect,t.replace=i.replace,t.firstmatch=i.firstmatch,t.breadcrumb=i.breadcrumb,t.match()},register:()=>{if(t.parent)return t.parent[n].add(t),()=>{t.parent[n].delete(t),t.router.un&&t.router.un()}},show:()=>{e.onShow(),!t.fallback&&t.parent&&t.parent.activeChilds.add(t)},hide:()=>{e.onHide(),!t.fallback&&t.parent&&t.parent.activeChilds.delete(t)},match:async()=>{t.matched=!1;let{path:i,url:c,from:l,query:p}=t.router,s=O(t.pattern,i);if(!t.fallback&&s&&t.redirect&&(!t.exact||t.exact&&s.exact)){await H();let u=W(i,t.parent&&t.parent.pattern,t.redirect);return t.replace?d.replaceWith(u):d.goto(u)}if(t.meta=s&&{from:l,url:c,query:p,match:s.part,pattern:t.pattern,breadcrumbs:t.parent&&t.parent.meta&&t.parent.meta.breadcrumbs.slice()||[],params:s.params,subscribe:r.subscribe},t.breadcrumb&&t.meta&&t.meta.breadcrumbs.push({name:t.breadcrumb,path:s.part}),r.set(t.meta),s&&!t.fallback&&(!t.exact||t.exact&&s.exact)&&(!t.parent||!t.parent.firstmatch||!t.parent.matched)?(e.onMeta(t.meta),t.parent&&(t.parent.matched=!0),t.show()):t.hide(),await H(),s&&!t.fallback&&(t.childs.size>0&&t.activeChilds.size==0||t.childs.size==0&&t.fallbacks.size>0)){let u=t;for(;u.fallbacks.size==0;)if(u=u.parent,!u)return;u&&u.fallbacks.forEach(h=>{if(h.redirect){let b=W("/",h.parent&&h.parent.pattern,h.redirect);h.replace?d.replaceWith(b):d.goto(b)}else h.show()})}}};return I("tinro",t),N(()=>t.register()),t.router.un=d.subscribe(i=>{t.router.path=i.path,t.router.url=i.url,t.router.query=i.query,t.router.from=i.from,t.pattern!==null&&t.match()}),t}function y(){return S("tinro").meta}var d=$();function $(){let{subscribe:e}=D(m.get(),a=>{m.start(a);let n=tt(m.go);return()=>{m.stop(),n()}});return{subscribe:e,goto:a=>m.go(a),replaceWith:a=>m.replace(a),params:et,meta:y,useHashNavigation:a=>m.mode(a?f.HASH:f.HISTORY),mode:{hash:()=>m.mode(f.HASH),history:()=>m.mode(f.HISTORY),memory:()=>m.mode(f.MEMORY)}}}function z(e){let a=w(e,"href"),n=w(e,"exact",!0),r=w(e,"active-class",!0,"active");return{destroy:d.subscribe(t=>{let i=O(a,t.path);i&&(i.exact&&n||!n)?e.classList.add(r):e.classList.remove(r)})}}function tt(e){let a=n=>{let r=n.target.closest("a[href]"),t=r&&w(r,"target",!1,"_self"),i=r&&w(r,"tinro-ignore"),c=n.ctrlKey||n.metaKey||n.altKey||n.shiftKey;if(t=="_self"&&!i&&!c&&r){let l=r.getAttribute("href").replace(/^\/#/,"");/^\/\/|^[a-zA-Z]+:/.test(l)||(n.preventDefault(),e(l.startsWith("/")?l:r.href.replace(window.location.origin,"")))}};return addEventListener("click",a),()=>removeEventListener("click",a)}function et(){return T("tinro").meta.params}var ht=e=>({params:e&2,meta:e&4}),F=e=>({params:e[1],meta:e[2]});function j(e){let a,n=e[10].default,r=nt(n,e,e[9],F);return{c(){r&&r.c()},m(t,i){r&&r.m(t,i),a=!0},p(t,i){r&&r.p&&i&518&&ft(r,n,t,t[9],i,ht,F)},i(t){a||(k(r,t),a=!0)},o(t){R(r,t),a=!1},d(t){r&&r.d(t)}}}function mt(e){let a,n,r=e[0]&&j(e);return{c(){r&&r.c(),a=lt()},m(t,i){r&&r.m(t,i),st(t,a,i),n=!0},p(t,[i]){t[0]?r?(r.p(t,i),i&1&&k(r,1)):(r=j(t),r.c(),k(r,1),r.m(a.parentNode,a)):r&&(ct(),R(r,1,1,()=>{r=null}),at())},i(t){n||(k(r),n=!0)},o(t){R(r),n=!1},d(t){r&&r.d(t),t&&it(a)}}}function dt(e,a,n){let{$$slots:r={},$$scope:t}=a,{path:i="/*"}=a,{fallback:c=!1}=a,{redirect:l=!1}=a,{replace:p=!1}=a,{firstmatch:s=!1}=a,{breadcrumb:u=null}=a,h=!1,b={},_={},L=q({fallback:c,onShow(){n(0,h=!0)},onHide(){n(0,h=!1)},onMeta(o){n(2,_=o),n(1,b=_.params)}});return e.$$set=o=>{"path"in o&&n(3,i=o.path),"fallback"in o&&n(4,c=o.fallback),"redirect"in o&&n(5,l=o.redirect),"replace"in o&&n(6,p=o.replace),"firstmatch"in o&&n(7,s=o.firstmatch),"breadcrumb"in o&&n(8,u=o.breadcrumb),"$$scope"in o&&n(9,t=o.$$scope)},e.$$.update=()=>{if(e.$$.dirty&488){t:L.update({path:i,redirect:l,replace:p,firstmatch:s,breadcrumb:u})}},[h,b,_,i,c,l,p,s,u,t,r]}var Y=class extends rt{constructor(a){super();ot(this,a,dt,mt,ut,{path:3,fallback:4,redirect:5,replace:6,firstmatch:7,breadcrumb:8})}},K=Y;export{K as Route,z as active,y as meta,d as router};