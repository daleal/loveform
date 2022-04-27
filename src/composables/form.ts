import {
  computed, inject, provide, shallowRef,
} from 'vue';

// Types
import type { InjectionKey, PropType, Ref } from 'vue';

export const SUBMIT = 'submit';
export const SUBMIT_PROP = 'onSubmit';

type IdType = number;

interface FormField {
  id: IdType,
  valid: Ref<boolean>,
}

export interface FormProps {
  onSubmit?: (event: Event) => void,
  hideErrors: boolean,
}

export interface FormProvide {
  register: (
    id: IdType,
    valid: Ref<boolean>,
  ) => void,
  unregister: (
    id: IdType,
  ) => void,
  hideErrors: boolean,
  valid: Ref<boolean>,
}

export const FormKey: InjectionKey<FormProvide> = Symbol.for('loveform:form');

export const makeFormProps = () => ({
  // onSubmit is declared as a hack to be able to detect
  // when the 'submit' listener is defined
  onSubmit: Function as PropType<(event: Event) => void>,
  hideErrors: {
    type: Boolean,
    default: () => false,
  },
});

export const makeFormEmits = () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [SUBMIT]: (event: Event) => true,
});

export const createForm = (props: FormProps) => {
  const items = shallowRef<Array<FormField>>([]);

  const publicValid = computed(() => {
    const areItemsValid: Array<boolean> = items.value.map(
      (item: FormField) => item.valid.value,
    );
    return areItemsValid.reduce((previous, current) => previous && current, true);
  });

  provide(FormKey, {
    register: (id: IdType, valid: Ref<boolean>) => {
      items.value = [...items.value, { id, valid }];
    },
    unregister: (id: IdType) => {
      items.value = items.value.filter((item) => item.id !== id);
    },
    hideErrors: props.hideErrors,
    valid: publicValid,
  });

  return { valid: publicValid };
};

export const useForm = () => inject(FormKey, null);
