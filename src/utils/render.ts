import type { VNode } from 'vue';
import { getCurrentInstance } from './currentInstance';

export function useRender(render: () => VNode): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vm = getCurrentInstance('useRender') as any;
  vm.render = render;
}
