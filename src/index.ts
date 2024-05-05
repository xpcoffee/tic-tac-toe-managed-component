import { ComponentSettings, Manager } from '@managed-components/types'

export default async function (manager: Manager, _settings: ComponentSettings) {
    /**
     * Manually proxy POST request to fetch the opponent's next move & gamestate.
     * 
     * Note:
     * Tried the following, but that doesn't seem to work with POST requests (connection resets)
     * const apiEndpoint = manager.proxy('/api', 'https://tic-tac-toe-worker.emerick-bosch.workers.dev/')
     */
    const apiEndpoint = manager.route('/opponentMove', async (request) => {
        const response = await manager.fetch('https://tic-tac-toe-worker.emerick-bosch.workers.dev/', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(request.body)
        })

        const responseBody = await response?.json()
        return new Response(JSON.stringify(responseBody), { status: 200 })
    })

    /**
     * Serve JS and CSS
     */
    const publicEndpoint = manager.serve('/public', 'dist/public')

    manager.addEventListener('pageview', event => {
        // info logs (for dev)
        console.log("Worker API running at " + apiEndpoint)
        console.log("Assets served from " + publicEndpoint)
    })

    /**
     * Inject a tic-tac-toe app into the page
     * 
     * Not sure how to get a reactive UX without doing this. 
     * Can send requests on events, but unclear how UI can then be updated with response.
     */
    manager.registerWidget(async (): Promise<string> => {
        return `
        <div id='tic-tac-toe'></div>
        <script src="${publicEndpoint}/index-ux.js"></script>
        <link href="${publicEndpoint}/index-ux.css" rel="stylesheet">
        `
    });
}
