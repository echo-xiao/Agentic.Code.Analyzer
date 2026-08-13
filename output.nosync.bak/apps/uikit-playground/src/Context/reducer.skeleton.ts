## File: apps/uikit-playground/src/Context/reducer.ts

```typescript
import _ from 'lodash';

import {
	type IsMobileAction,
	type IsTabletAction,
	type SidebarToggleAction,
	type PreviewTabsToggleAction,
	type TemplatesToggleAction,
	type NavMenuToggleAction,
	type SurfaceAction,
	type UpdatePayloadAction,
	type ActionPreviewAction,
	type UserAction,
	type OpenCreateNewScreenAction,
	type ActiveScreenAction,
	type CreateNewScreenAction,
	type DuplicateScreenAction,
	type DeleteScreenAction,
	type RenameScreenAction,
	type EditorTabsToggleAction,
	type CreateNewProjectAction,
	type ActiveProjectAction,
	type DuplicateProjectAction,
	type DeleteProjectAction,
	type RenameProjectAction,
	type UpdateFlowEdgesAction,
	type UpdateNodesAndViewPortAction,
} from './action';
import type { initialStateType } from './initialState';
import { SurfaceOptions } from '../Components/Preview/Display/Surface/constant';
import { filterEdges } from '../utils/filterEdges';
import getDate from '../utils/getDate';
import getUniqueId from '../utils/getUniqueId';

type IAction =
	| IsMobileAction
	| IsTabletAction
	| SidebarToggleAction
	| PreviewTabsToggleAction
	| EditorTabsToggleAction
	| TemplatesToggleAction
	| NavMenuToggleAction
	| SurfaceAction
	| UpdatePayloadAction
	| ActionPreviewAction
	| UserAction
	| OpenCreateNewScreenAction
	| ActiveScreenAction
	| CreateNewScreenAction
	| DuplicateScreenAction
	| DeleteScreenAction
	| RenameScreenAction
	| CreateNewProjectAction
	| ActiveProjectAction
	| DuplicateProjectAction
	| DeleteProjectAction
	| RenameProjectAction
	| UpdateFlowEdgesAction
	| UpdateNodesAndViewPortAction;

export enum ActionTypes {
	IsMobile,
	IsTablet,
	SidebarToggle,
	PreviewToggle,
	EditorToggle,
	TemplatesToggle,
	NavMenuToggle,
	Surface,
	UpdatePayload,
	ActionPreview,
	User,
	OpenCreateNewScreen,
	ActiveScreen,
	CreateNewScreen,
	DuplicateScreen,
	DeleteScreen,
	RenameScreen,
	CreateNewProject,
	ActiveProject,
	DeleteProject,
	DuplicateProject,
	RenameProject,
	UpdateFlowEdges,
	UpdateNodesAndViewPort,
}

const reducer = (state: initialStateType, action: IAction) => {
    /* Implementation Hidden */
};

export default reducer;

```