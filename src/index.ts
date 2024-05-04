import { ComponentSettings, Manager } from '@managed-components/types'

export default async function (manager: Manager, _settings: ComponentSettings) {
    manager.addEventListener('pageview', event => {
        console.log('Hello server!')
    })

    manager.proxy('/api', 'https://tic-tac-toe-worker.emerick-bosch.workers.dev/')

    // @ts-ignore - types do not match example https://managedcomponents.dev/specs/embed-and-widgets/widgets
    manager.registerWidget(async (): Promise<string> => {
        return "<p>hello, world!</p>"
    });

}
