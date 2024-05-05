async function c(e,i){let o=e.proxy("/api","https://tic-tac-toe-worker.emerick-bosch.workers.dev/");e.route("/opponentMove",async s=>{let n=await(await e.fetch("https://tic-tac-toe-worker.emerick-bosch.workers.dev/",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(s.body)}))?.json();return new Response(JSON.stringify(n),{status:200})});let t=e.serve("/public","dist/public");e.addEventListener("pageview",s=>{console.log("Worker API running at "+o),console.log("Assets served from "+t)}),e.registerWidget(async()=>`
        <div id='tic-tac-toe'></div>
        <script src="${t}/index-ux.js"></script>
        <link href="${t}/index-ux.css" rel="stylesheet">
        `)}export{c as default};
