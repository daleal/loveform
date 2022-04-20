import {
  computed, inject, provide, shallowRef,
} from 'vue';

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue';

type IdType = number;

interface FormField {
  id: IdType
  valid: Ref<boolean>
}

export interface FormProvide {
  register: (
    id: IdType,
    valid: ComputedRef<boolean>,
  ) => void,
  unregister: (
    id: IdType,
  ) => void,
  valid: ComputedRef<boolean>,
}

export const FormKey: InjectionKey<FormProvide> = Symbol.for('latter:form');

export const createForm = () => {
  const items = shallowRef<Array<FormField>>([]);

  const publicValid = computed(() => {
    const areItemsValid: Array<boolean> = items.value.map(
      (item: FormField) => item.valid.value,
    );
    return areItemsValid.reduce((previous, current) => previous && current, true);
  });

  provide(FormKey, {
    register: (id: IdType, valid: ComputedRef) => {
      items.value.push({
        id,
        valid,
      });
    },
    unregister: (id: IdType) => {
      items.value = items.value.filter((item) => item.id !== id);
    },
    valid: publicValid,
  });

  return { valid: publicValid };
};

export const useForm = () => inject(FormKey, null);
