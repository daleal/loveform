import {
  computed, inject, provide, shallowRef,
} from 'vue';

// Types
import type { InjectionKey, Ref } from 'vue';

type IdType = number;

interface Checkbox {
  id: IdType,
  value: Ref<boolean>,
}

export interface CheckboxGroupProvide {
  register: (
    id: IdType,
    value: Ref<boolean>,
  ) => void,
  unregister: (
    id: IdType,
  ) => void,
}

export const CheckboxGroupKey: InjectionKey<CheckboxGroupProvide> = Symbol.for('loveform:checkbox-group');

export const createCheckboxGroup = () => {
  const items = shallowRef<Array<Checkbox>>([]);

  const values = computed(() => items.value.map((checkbox) => checkbox.value));

  provide(CheckboxGroupKey, {
    register: (id: IdType, value: Ref<boolean>) => {
      items.value = [...items.value, { id, value }];
    },
    unregister: (id: IdType) => {
      items.value = items.value.filter((item) => item.id !== id);
    },
  });

  return { items: values };
};

export const useCheckboxGroup = () => inject(CheckboxGroupKey, null);
