if(!self.define){let e,i={};const c=(c,s)=>(c=new URL(c+".js",s).href,i[c]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=i,document.head.appendChild(e)}else e=c,importScripts(c),i()})).then((()=>{let e=i[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,a)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let n={};const t=e=>c(e,r),d={module:{uri:r},exports:n,require:t};i[r]=Promise.all(s.map((e=>d[e]||t(e)))).then((e=>(a(...e),n)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/4vA786u202258-J-wS0Mt/_buildManifest.js",revision:"4b516d5d9c399c0bd68a3e7f7e5b5358"},{url:"/_next/static/4vA786u202258-J-wS0Mt/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/264-f5c914651e8b6997.js",revision:"f5c914651e8b6997"},{url:"/_next/static/chunks/373-acc4f66d86705151.js",revision:"acc4f66d86705151"},{url:"/_next/static/chunks/439-20cf10c4fae3b09b.js",revision:"20cf10c4fae3b09b"},{url:"/_next/static/chunks/736-c3f3ca638e0c9bc3.js",revision:"c3f3ca638e0c9bc3"},{url:"/_next/static/chunks/framework-114634acb84f8baa.js",revision:"114634acb84f8baa"},{url:"/_next/static/chunks/main-ac533633f8b32a28.js",revision:"ac533633f8b32a28"},{url:"/_next/static/chunks/pages/_app-046be497620f4f9d.js",revision:"046be497620f4f9d"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/home-709e2b7994a7b5c6.js",revision:"709e2b7994a7b5c6"},{url:"/_next/static/chunks/pages/home/mypage-f7a4eda8cda40137.js",revision:"f7a4eda8cda40137"},{url:"/_next/static/chunks/pages/index-89585f81b945ae4f.js",revision:"89585f81b945ae4f"},{url:"/_next/static/chunks/pages/kitchen-236c4ecc419af619.js",revision:"236c4ecc419af619"},{url:"/_next/static/chunks/pages/kitchen/detail/%5BrecipeId%5D-d16d6c9bc7302f36.js",revision:"d16d6c9bc7302f36"},{url:"/_next/static/chunks/pages/kitchen/filter-245353c0e4463174.js",revision:"245353c0e4463174"},{url:"/_next/static/chunks/pages/kitchen/ourpick-8d07729ed1bda0a8.js",revision:"8d07729ed1bda0a8"},{url:"/_next/static/chunks/pages/kitchen/process/%5BrecipeId%5D-3704b43a9e55e890.js",revision:"3704b43a9e55e890"},{url:"/_next/static/chunks/pages/kitchen/process/timer-6c8f0cb42e933564.js",revision:"6c8f0cb42e933564"},{url:"/_next/static/chunks/pages/library-e16626acb7bb4010.js",revision:"e16626acb7bb4010"},{url:"/_next/static/chunks/pages/library/add-e78912c3e13f84aa.js",revision:"e78912c3e13f84aa"},{url:"/_next/static/chunks/pages/library/report-9e07db5dd357415c.js",revision:"9e07db5dd357415c"},{url:"/_next/static/chunks/pages/onboarding-d11cdaffcf481434.js",revision:"d11cdaffcf481434"},{url:"/_next/static/chunks/pages/onboarding/splash-829434aebcfab237.js",revision:"829434aebcfab237"},{url:"/_next/static/chunks/pages/signup-9e77d2a5270a4c90.js",revision:"9e77d2a5270a4c90"},{url:"/_next/static/chunks/pages/signup/create-place-318dc1bdf548c486.js",revision:"318dc1bdf548c486"},{url:"/_next/static/chunks/pages/signup/enter-place-d3e42587e902a730.js",revision:"d3e42587e902a730"},{url:"/_next/static/chunks/pages/signup/loading-dd6e2b728c89c334.js",revision:"dd6e2b728c89c334"},{url:"/_next/static/chunks/pages/signup/survey-c4f0994074f470bc.js",revision:"c4f0994074f470bc"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ee7e63bc15b31913.js",revision:"ee7e63bc15b31913"},{url:"/_next/static/css/4df78f2cd73d6b26.css",revision:"4df78f2cd73d6b26"},{url:"/_next/static/css/cd6e05b543b6e738.css",revision:"cd6e05b543b6e738"},{url:"/_next/static/media/Pretendard-Bold.5d76ef66.woff",revision:"5d76ef66"},{url:"/_next/static/media/Pretendard-Medium.e750b571.woff",revision:"e750b571"},{url:"/_next/static/media/Pretendard-Regular.832fda20.woff",revision:"832fda20"},{url:"/_next/static/media/ajax-loader.0b80f665.gif",revision:"0b80f665"},{url:"/_next/static/media/slick.25572f22.eot",revision:"25572f22"},{url:"/_next/static/media/slick.653a4cbb.woff",revision:"653a4cbb"},{url:"/_next/static/media/slick.6aa1ee46.ttf",revision:"6aa1ee46"},{url:"/_next/static/media/slick.f895cfdf.svg",revision:"f895cfdf"},{url:"/font/Pretendard-Black.woff",revision:"cefa0543e98a463942e970450ec84b6a"},{url:"/font/Pretendard-Bold.woff",revision:"d93573b4d0c2d6b0cd2df2eb87a1d677"},{url:"/font/Pretendard-ExtraBold.woff",revision:"89373147524ab520e26ea0e58bb632c5"},{url:"/font/Pretendard-ExtraLight.woff",revision:"1104ea032b6413ea4eb21c8261d1dd17"},{url:"/font/Pretendard-Light.woff",revision:"bfff3a54757b20bec529ad0c11de7b7e"},{url:"/font/Pretendard-Medium.woff",revision:"7bab4a8a2580411ea263b78fb93436fa"},{url:"/font/Pretendard-Regular.woff",revision:"db095fbdc6e9c9a1cea9577fcb8e0f7a"},{url:"/font/Pretendard-SemiBold.woff",revision:"461720124becc9594739cd6750835c38"},{url:"/font/Pretendard-Thin.woff",revision:"483e171704cb7ae7ba35ee5487d25908"},{url:"/img/character/ch_0.svg",revision:"bed301198c6985bbc9bfaaaa3969d20d"},{url:"/img/character/ch_1.svg",revision:"bed301198c6985bbc9bfaaaa3969d20d"},{url:"/img/character/ch_2.svg",revision:"d85e02ee6efabb51f321f64ec7659200"},{url:"/img/character/ch_3.svg",revision:"3fe0d86806b79a7cd94de68a67209192"},{url:"/img/character/ch_4.svg",revision:"45cd3bff609063f8c9d0fa165f2719f4"},{url:"/img/character/ch_5.svg",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/img/character/like_0.svg",revision:"98d0778ef6e71b6301962cabf23b7148"},{url:"/img/character/like_1.svg",revision:"98d0778ef6e71b6301962cabf23b7148"},{url:"/img/character/like_2.svg",revision:"5ca15871b02384e61f031a56bb0e49bf"},{url:"/img/character/like_3.svg",revision:"5b279ea73d7c60c19b80e7ef111635ca"},{url:"/img/character/like_4.svg",revision:"38bd5171a893523c3a4c1a1e89b5d0ed"},{url:"/img/character/like_5.svg",revision:"38bd5171a893523c3a4c1a1e89b5d0ed"},{url:"/img/chart/arrow.svg",revision:"616348d7263e2ecfa188cc77252c6e66"},{url:"/img/chart/chart.svg",revision:"8e2afb56d57b1f2a20ed0d9a615e9679"},{url:"/img/chart/chart_0.svg",revision:"e4904a1d26ca6131f17bf887ded68fd4"},{url:"/img/icon/alert-circle.svg",revision:"975eca1a93d278c47853b2aa2f419622"},{url:"/img/icon/avg-time.svg",revision:"800698bd827c50544afcbcf4d9342086"},{url:"/img/icon/back.svg",revision:"74ada3521f8936f4746771a7137c81b0"},{url:"/img/icon/bulb.svg",revision:"2db6bd7eeabc0bfff13231b7611c38b5"},{url:"/img/icon/check-circle.svg",revision:"119e3066155700b96b8d890d8fd1d9cd"},{url:"/img/icon/check.svg",revision:"33cb04e1839db5689d709bee5df05932"},{url:"/img/icon/copy_black.svg",revision:"561cf4d730d65295ad5d21217c55e08e"},{url:"/img/icon/copy_white.svg",revision:"6488bb2f5261a6c48f16badabcf9e28b"},{url:"/img/icon/diabetes-measure.svg",revision:"738af21cae70176cab184b9f79436cb2"},{url:"/img/icon/down.svg",revision:"2aeac5c5adf32e282f31644640ec3e51"},{url:"/img/icon/fish-food.svg",revision:"78b231fa2d8328daa7100ee5b8f66d0e"},{url:"/img/icon/food.svg",revision:"0e264536dbeb9b844c15994a43b01051"},{url:"/img/icon/heart_empty.svg",revision:"0812b6389751b736e371d604b964d9bf"},{url:"/img/icon/heart_full.svg",revision:"76dc147c91b07773b60f1424ff6c20cc"},{url:"/img/icon/info-circle.svg",revision:"f7a6f718e697b59e973c3d2e42644b5a"},{url:"/img/icon/like_empty.svg",revision:"b6ee003e4abaf27d7dc98f189379d145"},{url:"/img/icon/like_full.svg",revision:"2ec66d2636299d16bec8014e7b7504c3"},{url:"/img/icon/logout.svg",revision:"ab765e0f3b82af30253e1e8163b2bdf6"},{url:"/img/icon/moon_black.svg",revision:"d329a93a79a14568d1a3b773d938b4d4"},{url:"/img/icon/moon_white.svg",revision:"2c90e90519af39868104c54413137ac2"},{url:"/img/icon/morning_black.svg",revision:"f9b31d8300c880db8d9675478a6c7fb1"},{url:"/img/icon/morning_white.svg",revision:"8e63b77b2d14a5359e751bd4c3559496"},{url:"/img/icon/next.svg",revision:"b9cd43e70d5c3c991c16a4a6ea4777c9"},{url:"/img/icon/pencil-simple-line.svg",revision:"499882e82bbe3e0b54ca73e53562efef"},{url:"/img/icon/push_add_record.svg",revision:"7c4ee04aa126d737fad62f0983a56ec5"},{url:"/img/icon/push_filter.svg",revision:"bee2933f342cc36e78e25dd6d1c890ab"},{url:"/img/icon/sun_black.svg",revision:"cb5cb09296cf72292f654ffd07c72662"},{url:"/img/icon/sun_white.svg",revision:"50cbe2d73dcd446dbd6efd0f14869a85"},{url:"/img/icon/tips.svg",revision:"24fba044636b4bc9c8e898b0a24890f3"},{url:"/img/icon/up.svg",revision:"75e06d65f042f70f2099d484f7de1bee"},{url:"/img/illust/character.svg",revision:"06854631247da85b6dffbb927989b256"},{url:"/img/illust/library_report.svg",revision:"82778ee7fc5aec1cd3764ed00c7a5178"},{url:"/img/illust/process_complete.svg",revision:"d4750713b668e96655c0390ec686e5be"},{url:"/img/illust/recipe_mine.svg",revision:"a69bd448fdd85c6a8543bdc1e01eaace"},{url:"/img/illust/recipe_pick.svg",revision:"78bf1ad2eaa8538328b9e3a919b3a449"},{url:"/img/illust/recipe_popular.svg",revision:"80101f50cf6582394a124affd1852562"},{url:"/img/illust/signin.svg",revision:"8150c6eac5c208d0bd72a45bd80814cc"},{url:"/img/illust/signup.svg",revision:"7b2374ed1c49ce6510adb6f386f39faf"},{url:"/img/illust/splash.svg",revision:"4e6d88b1df582fccfaeeae54c92041f5"},{url:"/img/logo.svg",revision:"4803cf36019c0f353c7ac81fc6fbbc37"},{url:"/img/tabbar/home.svg",revision:"de77b156c473e319f9171d10f047cba1"},{url:"/img/tabbar/home_empty.svg",revision:"bab9649ebe58cda742937bb161a6977a"},{url:"/img/tabbar/kitchen.svg",revision:"cdd7359df0699910d0a22eed8382776b"},{url:"/img/tabbar/kitchen_empty.svg",revision:"2596575e000f8623cdcdc0eb1e2a1c34"},{url:"/img/tabbar/library.svg",revision:"0b378229a2b4d21a3ec4539ca89a49cc"},{url:"/img/tabbar/library_empty.svg",revision:"8c4243940e1140945898ea6082cd092c"},{url:"/style.css",revision:"fa01b0cfdb9ccc55cde5b92730a18475"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:c,state:s})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));