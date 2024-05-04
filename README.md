# tic-tac-toe Managed Component

### Challenges

 - `npx webcm` does not work with node >= 19 (tries to set a value on a read-only object)
 - `npm init managed-widget` does not work out of the box
    - `esbuild.js` missing
    - `tsconfig.ts` and `tsconfig.build.ts` missing
    - eslint config not initialized (build fails)
 - `npm init managed-widget` UX
    - the confirmation at the end of the wizard is easy to auto-accept and it throws away the full wizard 
 -  https://managedcomponents.dev/specs/embed-and-widgets/widgets is out of date. Needs to return the string append to the doc, not call render on the element.