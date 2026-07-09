export const slashCommands = {
    commands: {} as Record<string, unknown>,
    add(command: string, callback: () => void): void {
        this.commands[command] = callback;
    },
    run(command: string): void {
        const cb = this.commands[command];
        if (typeof cb === "function") cb();
    },
};
