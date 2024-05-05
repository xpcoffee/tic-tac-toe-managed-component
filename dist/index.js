async function c(e,i){let n=e.route("/opponentMove",async s=>{let o=await(await e.fetch("https://tic-tac-toe-worker.emerick-bosch.workers.dev/",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(s.body)}))?.json();return new Response(JSON.stringify(o),{status:200})}),t=e.serve("/public","dist/public");e.addEventListener("pageview",s=>{console.log("Worker API running at "+n),console.log("Assets served from "+t)}),e.registerWidget(async()=>`
        <div id='tic-tac-toe'></div>
        <script src="${t}/index-ux.js"></script>
        <link href="${t}/index-ux.css" rel="stylesheet">
        `)}export{c as default};
