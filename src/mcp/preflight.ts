// Both conditions are knowable before a single Gemini request is sent, and both would otherwise
// surface as a spent-quota failure: a missing index sinks the run after routing has been paid
// for, and a missing key fails with API_KEY_INVALID only once the request is on the wire.
export function preflightMessage(shardCount: number, apiKey: string | undefined): string | null {
    if (shardCount === 0) {
        return 'The definition index is missing. Build it with `npm run prewarm` '
            + '(it needs ../Rocket.Chat, or $ROCKET_CHAT_SRC pointing at the repo), then restart this server.';
    }
    if (!apiKey) {
        return 'GEMINI_API_KEY is not set. Put it in the project `.env`, then restart this server.';
    }
    return null;
}
