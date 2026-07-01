# How do you add a new service in Rocket.Chat?

## Baseline Answer (no tools)

Adding a new "service" in Rocket.Chat typically refers to implementing a new logical unit of functionality or an integration point within the existing application. Rocket.Chat is a large Meteor application, so this usually involves creating new modules, database collections, API endpoints, and potentially UI components.

Here's a structured approach to adding a new service, focusing on common Rocket.Chat patterns and file locations:

### 1. Define the Service Scope and Structure

First, determine what your service will do and how it will interact with other parts of Rocket.Chat. Create a dedicated directory for your service, usually under `app/` or `server/`. For example, `app/my-new-service/`.

```
app/
└── my-new-service/
    ├── client/             # Client-side code (UI, routing, subscriptions)
    │   ├── components/
    │   ├── views/
    │   └── router.ts
    ├── server/             # Server-side code (logic, database, API, methods, publications)
    │   ├── api/
    │   │   └── v1/
    │   ├── models/
    │   ├── methods/
    │   ├── publications/
    │   ├── permissions.ts
    │   ├── settings.ts
    │   └── index.ts        # Main server-side entry point
    ├── i18n/               # Internationalization files
    │   └── en.i18n.json
    ├── definition/         # Shared TypeScript interfaces/types
    │   └── IMyNewService.ts
    └── tests/              # Tests for the service
        ├── server/
        └── client/
```

### 2. Server-Side Logic (Core of the Service)

Most of your service's business logic will reside on the server.

#### a. Database Collection (if needed)

If your service needs to store data, define a new MongoDB collection.

*   **File:** `app/my-new-service/server/models/MyNewServiceCollection.ts`
*   **Content:**
    ```typescript
    import { Mongo } from 'meteor/mongo';
    import { IMyNewService } from '../../../definition/IMyNewService'; // Define your interface here

    export const MyNewServiceCollection = new Mongo.Collection<IMyNewService>('my_new_service');
    ```
*   **Interface:** `definition/IMyNewService.ts`
    ```typescript
    export interface IMyNewService {
        _id: string;
        name: string;
        description: string;
        createdAt: Date;
        createdBy: string;
        // ... other fields
    }
    ```

#### b. Meteor Methods

Implement server-side functions that can be called from the client.

*   **File:** `app/my-new-service/server/methods/myNewServiceMethods.ts`
*   **Content:**
    ```typescript
    import { Meteor } from 'meteor/meteor';
    import { MyNewServiceCollection } from '../models/MyNewServiceCollection';
    import { hasPermission } from '../../authorization/server/functions/hasPermission';

    Meteor.methods({
        'myNewService.create'(data: Partial<IMyNewService>) {
            if (!Meteor.userId() || !hasPermission(Meteor.userId(), 'manage-my-new-service')) {
                throw new Meteor.Error('not-authorized');
            }
            // Add validation and business logic
            return MyNewServiceCollection.insert({
                ...data,
                createdAt: new Date(),
                createdBy: Meteor.userId(),
            });
        },
        'myNewService.get'(serviceId: string) {
            if (!Meteor.userId() || !hasPermission(Meteor.userId(), 'view-my-new-service')) {
                throw new Meteor.Error('not-authorized');
            }
            return MyNewServiceCollection.findOne(serviceId);
        },
    });
    ```

#### c. Meteor Publications

If your client needs reactive data from your collection, define publications.

*   **File:** `app/my-new-service/server/publications/myNewServicePublication.ts`
*   **Content:**
    ```typescript
    import { Meteor } from 'meteor/meteor';
    import { MyNewServiceCollection } from '../models/MyNewServiceCollection';
    import { hasPermission } from '../../authorization/server/functions/hasPermission';

    Meteor.publish('myNewService.all', function() {
        if (!this.userId || !hasPermission(this.userId, 'view-my-new-service')) {
            return this.ready();
        }
        return MyNewServiceCollection.find({});
    });
    ```

#### d. REST API Endpoints (if needed)

Expose functionality via Rocket.Chat's REST API.

*   **File:** `app/my-new-service/server/api/v1/myNewServiceRoutes.ts`
*   **Content:**
    ```typescript
    import { API } from '../../api/server'; // Correct path to API

    API.v1.addRoute('my-new-service.list', { authRequired: true }, {
        get() {
            if (!this.userId || !this.hasPermission('view-my-new-service')) {
                return API.v1.unauthorized();
            }
            const services = MyNewServiceCollection.find().fetch();
            return API.v1.success({ services });
        },
        post() {
            if (!this.userId || !this.hasPermission('manage-my-new-service')) {
                return API.v1.unauthorized();
            }
            const { name, description } = this.bodyParams;
            // Call your method or directly insert
            const serviceId = Meteor.call('myNewService.create', { name, description });
            return API.v1.success({ serviceId });
        },
    });
    ```

#### e. Settings

Add configuration options for your service that can be managed via the admin UI.

*   **File:** `app/my-new-service/server/settings.ts`
*   **Content:**
    ```typescript
    import { settings } from '../../settings/server';

    settings.addGroup('My_New_Service', function() {
        this.add('MyNewService_Enabled', true, {
            type: 'boolean',
            public: true,
            i18nLabel: 'MyNewService_Enabled',
            i18nDescription: 'MyNewService_Enabled_Description',
        });
        this.add('MyNewService_API_Key', '', {
            type: 'string',
            public: false, // Keep sensitive settings private
            i18nLabel: 'MyNewService_API_Key',
        });
    });
    ```

#### f. Permissions

Define new roles and permissions specific to your service.

*   **File:** `app/my-new-service/server/permissions.ts`
*   **Content:**
    ```typescript
    import { RocketChat } from 'meteor/rocketchat:lib'; // Or direct import from models/permissions

    RocketChat.models.Permissions.create('manage-my-new-service', ['admin']);
    RocketChat.models.Permissions.create('view-my-new-service', ['admin', 'user']);
    ```

#### g. Server-Side Entry Point

Ensure all your server-side files are loaded by Meteor.

*   **File:** `app/my-new-service/server/index.ts`
*   **Content:**
    ```typescript
    import './models/MyNewServiceCollection';
    import './methods/myNewServiceMethods';
    import './publications/myNewServicePublication';
    import './api/v1/myNewServiceRoutes';
    import './settings';
    import './permissions';
    // Add any other server-side initializations here
    ```

### 3. Client-Side Integration (if UI is needed)

If your service requires a user interface, you'll need client-side code. Rocket.Chat primarily uses React for newer UI components.

#### a. Routing

Add new client-side routes to access your service's UI.

*   **File:** `app/my-new-service/client/router.ts`
*   **Content:**
    ```typescript
    import { FlowRouter } from 'meteor/kadira:flow-router';
    import { lazy } from 'react';
    import { registerAdminSidebarItem } from '../../ui-admin/client/sidebarItems'; // Example for admin UI

    FlowRouter.route('/admin/my-new-service', {
        name: 'my-new-service-admin',
        action() {
            const MyNewServiceAdminPage = lazy(() => import('./views/MyNewServiceAdminPage'));
            // Use Rocket.Chat's layout manager to render your React component
            // Example: render(<AdminLayout page={<MyNewServiceAdminPage />} />);
        },
    });

    // Register sidebar item for admin panel
    registerAdminSidebarItem({
        href: '/admin/my-new-service',
        i18nLabel: 'MyNewService_Admin_Title',
        icon: 'puzzle', // Choose an appropriate icon
        permissionGranted: () => true, // Or check specific permissions
    });
    ```

#### b. UI Components

Create React components for your service's pages and forms.

*   **File:** `app/my-new-service/client/views/MyNewServiceAdminPage.tsx`
*   **Content (Example):**
    ```tsx
    import React, { useEffect, useState } from 'react';
    import { Meteor } from 'meteor/meteor';
    import { useSubscription, useMethod } from '@rocket.chat/ui-contexts'; // Rocket.Chat hooks
    import { MyNewServiceCollection } from '../../server/models/MyNewServiceCollection'; // Client-side access to collection

    const MyNewServiceAdminPage: React.FC = () => {
        const [services, setServices] = useState([]);
        const isLoading = useSubscription('myNewService.all'); // Subscribe to your publication
        const createService = useMethod('myNewService.create');

        useEffect(() => {
            if (!isLoading) {
                const cursor = MyNewServiceCollection.find({});
                const handle = cursor.observeChanges({
                    added: (id, fields) => setServices(prev => [...prev, { _id: id, ...fields }]),
                    changed: (id, fields) => setServices(prev => prev.map(s => (s._id === id ? { ...s, ...fields } : s))),
                    removed: (id) => setServices(prev => prev.filter(s => s._id !== id)),
                });
                return () => handle.stop();
            }
        }, [isLoading]);

        const handleCreate = async () => {
            try {
                await createService({ name: 'New Service', description: 'A new service entry' });
                alert('Service created!');
            } catch (error) {
                alert(`Error creating service: ${error.reason}`);
            }
        };

        return (
            <div>
                <h1>My New Service Admin</h1>
                <button onClick={handleCreate}>Create New Service</button>
                <ul>
                    {services.map((service: any) => (
                        <li key={service._id}>{service.name} - {service.description}</li>
                    ))}
                </ul>
            </div>
        );
    };

    export default MyNewServiceAdminPage;
    ```

### 4. Internationalization (i18n)

Add translation keys for all new strings in your service.

*   **File:** `app/my-new-service/i18n/en.i18n.json`
*   **Content:**
    ```json
    {
        "MyNewService_Enabled": "Enable My New Service",
        "MyNewService_Enabled_Description": "Enables the custom service functionality.",
        "MyNewService_API_Key": "My New Service API Key",
        "MyNewService_Admin_Title": "My New Service Management",
        "Create_New_Service": "Create New Service"
    }
    ```
    Remember to add these keys to other language files as well.

### 5. Testing

Write unit and integration tests for your new service.

*   **Server Tests:** `app/my-new-service/tests/server/my-new-service.spec.ts`
*   **Client Tests:** `app/my-new-service/tests/client/my-new-service.spec.ts`

### Key Rocket.Chat Specifics to Remember:

*   **`RocketChat` Global Object:** Many core functionalities are exposed via the `RocketChat` global object (e.g., `RocketChat.models`, `RocketChat.callbacks`, `RocketChat.settings`).
*   **`API.v1`:** For registering REST API endpoints.
*   **`settings` module:** For managing application settings.
*   **`authorization` module:** For handling user permissions.
*   **`callbacks` module:** For hooking into various Rocket.Chat events (e.g., `RocketChat.callbacks.add('afterSaveMessage', ...) `).
*   **`definition/` directory:** For shared TypeScript interfaces and types.
*   **`ee/` directory:** If your service is an Enterprise Edition feature, it should reside under `ee/my-new-service/`.

By following these steps, you can effectively integrate a new service or feature into the Rocket.Chat codebase.

## Metrics

| Metric | Value |
|--------|-------|
| Tokens | 6,715 |
| Model | gemini-2.5-flash |
| Tools | NONE |
