import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Keep Node's validation on exactly the static data Vite consumes, without a TS runtime dependency.
export async function loadSpells() {
  const fileUrl = new URL('../src/data/rules/spells.ts', import.meta.url);
  const source = await readFile(fileUrl, 'utf8');
  const parsed = ts.createSourceFile('spells.ts', source, ts.ScriptTarget.Latest, true);
  const imports = new Map();
  for (const node of parsed.statements) {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) continue;
    const specifier = node.moduleSpecifier.text;
    if (!specifier.startsWith('./spells-level-') || !specifier.endsWith('.json')) {
      throw new Error(`Unexpected runtime dependency in spell dataset: ${specifier}`);
    }
    const data = JSON.parse(await readFile(new URL(specifier, fileUrl), 'utf8'));
    imports.set(specifier, `data:text/javascript;base64,${Buffer.from(`export default ${JSON.stringify(data)}`).toString('base64')}`);
  }
  const transformImports = context => root => ts.visitNode(root, function visit(node) {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      return ts.factory.updateImportDeclaration(node, node.modifiers, node.importClause,
        ts.factory.createStringLiteral(imports.get(node.moduleSpecifier.text)), node.attributes);
    }
    return ts.visitEachChild(node, visit, context);
  });
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext }, transformers: { before: [transformImports] },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
