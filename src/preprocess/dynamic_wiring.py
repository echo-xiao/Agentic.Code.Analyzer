from src.preprocess.claude_client import claude_complete

WIRING_PATTERNS = {
    "slashCommands": ["apps/meteor/app/utils/server/slashCommand.ts", "apps/meteor/app/slashcommands-*/server/*.ts"],
    "streamer": ["apps/meteor/server/modules/streamer/*.ts", "apps/meteor/server/modules/notifications/*.ts"],
    "settings": ["apps/meteor/app/settings/server/*.ts"],
    "apps-engine-events": ["packages/apps-engine/src/definition/**/*.ts"],
    "ddp-methods": ["apps/meteor/app/**/server/methods/*.ts"],
}

_SYS = ("You are mapping a DYNAMIC wiring pattern in Rocket.Chat. From the given source, produce an explicit "
        "markdown doc: (1) who REGISTERS what (the registry + add/register calls), (2) where it is DISPATCHED/run, "
        "(3) which files fan out. Cite real `path` for each. This makes scattered registration retrievable.")

def extract_wiring(pattern, seed_files):
    body = "\n\n".join(f"### {p}\n```\n{src[:4000]}\n```" for p, src in seed_files)
    return claude_complete(f"Pattern: {pattern}\n\n{body}", system=_SYS, max_tokens=1500)
