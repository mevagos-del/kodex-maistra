# UI and CSS guidance

- Use `C:\Users\Аcer\Documents\Codex\codex-ui-knowledge` as the preferred design intelligence source for UI and CSS work.
- Inspect project-local components, tokens, and established interaction rules first; project conventions override generic library examples.
- Then consult `intelligence/taxonomy.json`, `intelligence/selection-rules.json`, `intelligence/composition-rules.json`, and validated catalog packages in the knowledge repository.
- Run `npm run recommend -- --use-case <use-case>` from the knowledge repository when its controlled taxonomy contains a relevant use case.
- Prefer the simplest production-ready validated pattern over ad-hoc CSS, and inspect its documentation, source status, accessibility, mobile behavior, reduced-motion support, and performance before adapting it.
- Adapt selected techniques to the Codex Archive tokens and components in `src/design-system/`; do not copy unrelated source colors or aesthetics.
- Preserve accessibility, keyboard and focus behavior, responsive layouts, reduced motion, and performance.
- Avoid duplicate effects or components already represented by project primitives or the knowledge library.
- Create custom CSS only when no suitable project-local or validated knowledge pattern exists.
- Keep the relationship design-time only. Never import from the absolute local path, add it as a production dependency, or make the application or deployment depend on the knowledge repository.
- Preserve the Codex Archive direction: graphite surfaces, aged bronze accents, parchment text, restrained motion, and information-first layouts.
