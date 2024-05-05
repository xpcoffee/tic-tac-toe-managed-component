import { ComponentSettings, Manager } from '@managed-components/types'

export default async function (manager: Manager, _settings: ComponentSettings) {
    const apiEndpoint = manager.proxy('/api', 'https://tic-tac-toe-worker.emerick-bosch.workers.dev')
    const publicEndpoint = manager.serve('/public', 'dist/public')

    manager.addEventListener('pageview', event => {
        console.log("Worker API running at " + apiEndpoint)
        console.log("Assets served from " + publicEndpoint)
    })


    // @ts-ignore - types do not match example https://managedcomponents.dev/specs/embed-and-widgets/widgets
    manager.registerWidget(async (): Promise<string> => {
        return `
        <div id='tic-tac-toe'></div>
        <script src="${publicEndpoint}/index-ux.js"></script>
        <link href="${publicEndpoint}/index-ux.css" rel="stylesheet">
        `
    });

}
