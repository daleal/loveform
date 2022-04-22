import { getCurrentInstance as vueGetCurrentInstance } from 'vue';

export const getCurrentInstance = (name: string, message?: string) => {
  const vm = vueGetCurrentInstance();

  if (!vm) {
    throw new Error(`[Loveform] ${name} ${message || 'must be called from inside a setup function'}`);
  }

  return vm;
};
