async function s(t,n){let i=t.proxy("/api","https://tic-tac-toe-worker.emerick-bosch.workers.dev"),e=t.serve("/public","dist/public");t.addEventListener("pageview",o=>{console.log("Worker API running at "+i),console.log("Assets served from "+e)}),t.registerWidget(async()=>`
        <div id='tic-tac-toe'></div>
        <script src="${e}/index-ux.js">
        `)}export{s as default};
