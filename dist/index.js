async function o(e,s){let i=e.proxy("/api","https://tic-tac-toe-worker.emerick-bosch.workers.dev"),t=e.serve("/public","dist/public");e.addEventListener("pageview",n=>{console.log("Worker API running at "+i),console.log("Assets served from "+t)}),e.registerWidget(async()=>`
        <div id='tic-tac-toe'></div>
        <script src="${t}/index-ux.js"></script>
        <link href="${t}/index-ux.css" rel="stylesheet">
        `)}export{o as default};
