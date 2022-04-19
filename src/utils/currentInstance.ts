// Utilities
import { getCurrentInstance as _getCurrentInstance } from 'vue';

export function getCurrentInstance(name: string, message?: string) {
  const vm = _getCurrentInstance();

  if (!vm) {
    throw new Error(`[Latter] ${name} ${message || 'must be called from inside a setup function'}`);
  }

  return vm;
}
