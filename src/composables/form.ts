import {
  computed, inject, provide, shallowRef,
} from 'vue';

// Types
import type {
  ComputedRef, InjectionKey, PropType, Ref,
} from 'vue';

export const SUBMIT = 'submit';
export const SUBMIT_PROP = 'onSubmit';

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

export const FormKey: InjectionKey<FormProvide> = Symbol.for('loveform:form');

export const makeFormProps = () => ({
  // onSubmit is declared as a hack to be able to detect
  // when the 'submit' listener is defined
  onSubmit: Function as PropType<(event: Event) => void>,
});

export const makeFormEmits = () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [SUBMIT]: (event: Event) => true,
});

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
