import {
  computed, inject, provide, shallowRef,
} from 'vue';

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue';

interface FormField {
  id: number | string
  valid: Ref<boolean>
}

export interface FormProvide {
  register: (
    id: number | string,
    valid: ComputedRef<boolean>,
  ) => void,
  unregister: (
    id: number | string,
  ) => void,
  valid: ComputedRef<boolean>,
}

export const FormKey: InjectionKey<FormProvide> = Symbol.for('latter:form');

export const createForm = () => {
  const items = shallowRef<Array<FormField>>([]);

  const computedValid = computed(() => {
    const areItemsValid: Array<boolean> = items.value.map(
      (item: FormField) => item.valid.value,
    );
    return areItemsValid.reduce((previous, current) => previous && current, true);
  });

  provide(FormKey, {
    register: (id: string | number, valid: ComputedRef) => {
      items.value.push({
        id,
        valid,
      });
    },
    unregister: (id: string | number) => {
      items.value = items.value.filter((item) => item.id !== id);
    },
    valid: computedValid,
  });
};

export const useForm = () => inject(FormKey, null);
