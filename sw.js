if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const a=e=>i(e,l),u={module:{uri:l},exports:o,require:a};s[l]=Promise.all(n.map((e=>u[e]||a(e)))).then((e=>(r(...e),o)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/App.f7aeb82d.js",revision:null},{url:"assets/Container.8ccb85ff.js",revision:null},{url:"assets/index.0927be58.js",revision:null},{url:"assets/index.371015f6.js",revision:null},{url:"assets/index.717051fd.js",revision:null},{url:"assets/index.d632f1ff.js",revision:null},{url:"assets/index.e803a7a4.js",revision:null},{url:"assets/index.module.119d2d82.js",revision:null},{url:"assets/Root.de242ea7.js",revision:null},{url:"assets/TextField.9415666d.js",revision:null},{url:"assets/ThemeProvider.fbd9e6f9.js",revision:null},{url:"assets/workbox-window.prod.es5.d2780aeb.js",revision:null},{url:"index.html",revision:"ed7f9504731879ee0ada31bd23e91e20"},{url:"apple-touch-icon.png",revision:"4c6e3e292785be8edb4980288b8a0fa5"},{url:"favicon.svg",revision:"e47d241890646c4f6bad5f4502a847e0"},{url:"pwa-192x192.png",revision:"693a753a214a693ffb8c1b0e2a01ef6a"},{url:"pwa-512x512.png",revision:"e78b9c90eab6ac9f0f6a4934aedbf522"},{url:"favicon.svg",revision:"e47d241890646c4f6bad5f4502a847e0"},{url:"favicon.ico",revision:"709194c5288f141735c80d73c9980849"},{url:"robots.txt",revision:"5e0bd1c281a62a380d7a948085bfe2d1"},{url:"apple-touch-icon.png",revision:"4c6e3e292785be8edb4980288b8a0fa5"},{url:"pwa-192x192.png",revision:"693a753a214a693ffb8c1b0e2a01ef6a"},{url:"pwa-512x512.png",revision:"e78b9c90eab6ac9f0f6a4934aedbf522"},{url:"manifest.webmanifest",revision:"f7b88e696036941045f36b8d22d05355"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
