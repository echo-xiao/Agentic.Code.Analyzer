export type EdgeType =
    | 'call'
    | 'jsx'
    | 'new'
    | 'event_emit'
    | 'event_listen'
    | 'pubsub_publish'
    | 'pubsub_subscribe'
    | 'type';

export interface CallEdge {
    name: string;
    edgeType: EdgeType;
    event?: string;
}

export interface CallerRef {
    caller: string;
    file: string;
    edgeType: EdgeType;
}

export const GLOBAL_INDEX = {
    symbols:        new Map<string, Set<string>>(),
    fileDependents: new Map<string, Set<string>>(),
    allFiles:       new Set<string>(),
    callGraph:      new Map<string, Array<CallerRef>>(),
};
