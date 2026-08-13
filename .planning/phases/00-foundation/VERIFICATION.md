# 00 Foundation Verification

Verify setup phase is complete.

- [ ] Run required planning file check
- [ ] Run task tracking check
- [ ] Verify no critical TBD placeholders

```sh
.planning/scripts/check-required-planning-files.sh . || true
.planning/scripts/check-task-tracking.sh . || true
grep -L "TBD" .planning/{PROJECT,REQUIREMENTS,STACK,ARCHITECTURE}.md
```
