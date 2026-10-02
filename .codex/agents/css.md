# CSS and UI workflow

Knowledge source: `C:\Users\Аcer\Documents\Codex\codex-ui-knowledge`

1. Inspect the current component, layout, project tokens, and existing UI primitives.
2. Define the concrete UI problem and constraints.
3. Consult the knowledge repository taxonomy and selection rules.
4. When applicable, run `npm run recommend -- --use-case <use-case>` using a value from `intelligence/taxonomy.json`.
5. Inspect shortlisted package documentation and examples.
6. Choose the simplest production-ready pattern that satisfies accessibility, mobile, reduced-motion, compatibility, and performance requirements.
7. Adapt the technique to Codex Archive tokens and components; do not copy source aesthetics blindly.
8. Verify keyboard use, visible focus, narrow layouts, reduced motion, and performance.
9. Create new custom CSS only when project primitives and validated library patterns do not cover the need.

The knowledge repository is design-time intelligence only. Never add absolute-path imports, runtime filesystem references, deployment requirements, or production dependencies on it.
