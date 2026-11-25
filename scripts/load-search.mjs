import { readFile } from 'node:fs/promises';
import ts from 'typescript';

export async function searchModuleUrl() {
  const source = await readFile(new URL('../src/features/catalog/utils/referenceSearch.ts', import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
}

export async function withSearchImport(source) {
  return source.replace("'@/features/catalog/utils/referenceSearch'", `'${await searchModuleUrl()}'`);
}
