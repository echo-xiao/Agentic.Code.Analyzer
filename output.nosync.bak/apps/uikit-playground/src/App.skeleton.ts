## File: apps/uikit-playground/src/App.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useMediaQueries } from '@rocket.chat/fuselage-hooks';
import { ToastBarProvider } from '@rocket.chat/fuselage-toastbar';
import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomeLayout } from './Components/Routes/HomeLayout';
import { ProjectSpecificLayout } from './Components/Routes/ProjectSpecificLayout';
import { context, isMobileAction, isTabletAction } from './Context';
import FlowDiagram from './Pages/FlowDiagram';
import Home from './Pages/Home';
import Playground from './Pages/Playground';
import Prototype from './Pages/Prototype';
import SignInToWorkspace from './Pages/SignInSignUp';
import routes from './Routes/Routes';

import './App.css';
import './_global.css';
import './cssVariables.css';

function App() {
    /* Implementation Hidden */
}

export default App;

```