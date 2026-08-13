## File: packages/apps/src/server/managers/AppExternalComponentManager.ts

```typescript
import type { IExternalComponent } from '@rocket.chat/apps-engine/definition/externalComponent';

/**
 * The external component manager for the apps.
 *
 * An app will register external components during its `initialize` method.
 * Then once an app's `onEnable` method is called and it returns true,
 * only then will that app's external components be enabled.
 */
export class AppExternalComponentManager {
	/**
	 * The map that maintains all registered components.
	 * The key of the top map is app id and the key of inner map is the
	 * external component name.
	 */
	private registeredExternalComponents: Map<string, Map<string, IExternalComponent>>;

	/**
	 * Contains the apps and the external components they have touhed.
	 * The key of the top map is app id and the key of inner map is the
	 * external component name.
	 * Doesn't matter whether the app provided, modified, disabled,
	 * or enabled. As long as an app touched external components, then
	 * they are listed here.
	 */
	private appTouchedExternalComponents: Map<string, Map<string, IExternalComponent>>;

	constructor() {
        /* Implementation Hidden */
    }

	/**
	 * Get all registered components.
	 */
	public getRegisteredExternalComponents(): Map<string, Map<string, IExternalComponent>> {
        /* Implementation Hidden */
    }

	/**
	 * Get all external components that apps have registered
	 * before, including disabled apps' external components.
	 */
	public getAppTouchedExternalComponents(): Map<string, Map<string, IExternalComponent>> {
        /* Implementation Hidden */
    }

	/**
	 * Get all external components of an app by specifying the appId.
	 *
	 * @param appId the id of the app
	 */
	public getExternalComponents(appId: string): Map<string, IExternalComponent> {
        /* Implementation Hidden */
    }

	/**
	 * Get an array of external components which are enabled and ready for usage.
	 */
	public getProvidedComponents(): Array<IExternalComponent> {
        /* Implementation Hidden */
    }

	/**
	 * Add an external component to the appTouchedExternalComponents.
	 * If you call this method twice and the component
	 * has the same name as before, the first one will be
	 * overwritten as the names provided **must** be unique.
	 *
	 * @param appId the id of the app
	 * @param externalComponent the external component about to be added
	 */
	public addExternalComponent(appId: string, externalComponent: IExternalComponent): void {
        /* Implementation Hidden */
    }

	/**
	 * Add enabled apps' external components from the appTouchedExternalComponents
	 * to the registeredExternalComponents.
	 *
	 * @param appId the id of the app
	 */
	public registerExternalComponents(appId: string): void {
        /* Implementation Hidden */
    }

	/**
	 * Remove all external components of an app from the
	 * registeredExternalComponents by specifying the appId.
	 *
	 * @param appId the id of the app
	 */
	public unregisterExternalComponents(appId: string): void {
        /* Implementation Hidden */
    }

	/**
	 * Remove all external components of an app from both the
	 * registeredExternalComponents and the appTouchedComponents
	 * by specifying the appId.
	 *
	 * @param appId the id of the app
	 */
	public purgeExternalComponents(appId: string): void {
        /* Implementation Hidden */
    }
}

```