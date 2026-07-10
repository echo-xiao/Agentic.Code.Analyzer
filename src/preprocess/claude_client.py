import os
import time
import anthropic
from src import config


def claude_complete(prompt, system="", model=None, max_tokens=2000):
    client = anthropic.Anthropic(api_key=os.environ.get("CLAUDE_API_KEY"))
    model = model or config.CLAUDE_MODEL
    for attempt in range(4):
        try:
            msg = client.messages.create(
                model=model, max_tokens=max_tokens,
                system=system or "You are a precise code analyst.",
                messages=[{"role": "user", "content": prompt}])
            return "".join(getattr(b, "text", "") for b in msg.content)
        except anthropic.RateLimitError:
            if attempt == 3:
                raise
            time.sleep(5 * (attempt + 1))
