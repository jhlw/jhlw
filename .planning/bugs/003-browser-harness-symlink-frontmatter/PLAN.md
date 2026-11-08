# Fix Plan

1. Confirm the user-level `browser-harness\SKILL.md` already has valid YAML frontmatter.
2. Find every user-level `SKILL.md` that was decoded as a plain `../../SKILL.md` pointer.
3. Replace only those pointer files with the actual contents of the valid root skill file.
4. Validate the affected skill and rescan user-level skills for any remaining missing frontmatter.
