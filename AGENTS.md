# AGENTS.md

This repository uses the Project Genesis Harness.

Before doing feature work, bug fixes, refactors, or architecture changes, read:

1. `.planning/SUMMARY.md`
2. `.planning/STATE.md`
3. `.planning/PROJECT.md`
4. `.planning/REQUIREMENTS.md`
5. `.planning/STACK.md`
6. `.planning/ARCHITECTURE.md`
7. `.planning/CONVENTIONS.md`
8. `.planning/PITFALLS.md`
9. `.planning/LESSONS_LEARNED.md`

For new features, create a folder under `.planning/features/`.
For bug fixes, create a folder under `.planning/bugs/`.
For major decisions, create an ADR under `.planning/decisions/`.

Do not claim completion unless verification passed, docs were synchronized, task tracking was updated, and changed files were reviewed.

## Skill Installation Preference

When installing skills, prefer installing them at the user level ($CODEX_HOME/skills, e.g. C:\Users\jhlw\.codex\skills). Avoid installing skills into this project's .codex/skills unless there is an explicit reason to keep them project-scoped.

