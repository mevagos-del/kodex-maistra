import type { FutureModule } from '@/types/content';

type FutureModuleTileProps = {
  module: FutureModule;
};

export function FutureModuleTile({ module }: FutureModuleTileProps) {
  return (
    <article className="future-tile" aria-disabled="true">
      <span>{module.status}</span>
      <h3>{module.title}</h3>
      <p>{module.description}</p>
    </article>
  );
}
