# Root Cause

The distributed checkout contains Unix-style symlinks represented as plain text on this Windows installation. Both affected files were exactly 14 bytes and contained:

```text
../../SKILL.md
```

The skill scanner therefore read a path string instead of the expected YAML frontmatter.

Affected locations:

- `C:\Users\jhlw\.agents\skills\browser-harness\skills\browser-harness\SKILL.md`
- `C:\Users\jhlw\.agents\skills\browser-harness\src\browser_harness\SKILL.md`
