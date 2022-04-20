import {
  computed, ComputedRef, onBeforeMount, onBeforeUnmount, provide, ref, watch,
} from 'vue';
import { useForm } from '@/composables/form';
import { getUniqueId, propsFactory } from '@/utils';

// Types
import type { InjectionKey, PropType } from 'vue';

export const UPDATE_MODEL_VALUE = 'update:modelValue';

export interface FieldProvide {
  valid: ComputedRef<boolean>,
}

export const getFieldKey = (id: number) => <InjectionKey<FieldProvide>>Symbol.for(`latter:field-${id}`);

export type Validation = (value: string) => true | string;

export interface ValidationProps {
  modelValue: string,
  validations: Array<Validation>,
}

export const makeValidationProps = propsFactory({
  modelValue: {
    type: String,
    required: true,
  },
  validations: {
    type: Array as PropType<Array<Validation>>,
    default: () => ([]),
  },
});

export const makeValidationEmits = () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [UPDATE_MODEL_VALUE]: (value: string) => true,
});

export const useValidation = (props: ValidationProps) => {
  const form = useForm();
  const uid = getUniqueId();
  const FieldKey = getFieldKey(uid);

  const validating = ref(false);
  const error = ref('');
  const privateValid = computed(() => !error.value.trim());

  const startValidating = () => {
    validating.value = true;
  };

  const validate = () => {
    if (!validating.value) {
      return;
    }
    const validated = props.validations.map((validation) => validation(props.modelValue));
    const errors = validated.filter((possible) => possible !== true) as Array<string>;
    if (!errors.length) {
      error.value = '';
    } else {
      error.value = errors[0];
    }
  };

  const publicValid = computed(() => {
    if (!validating.value) {
      startValidating();
      validate();
    }
    return privateValid.value;
  });

  onBeforeMount(() => {
    form?.register(uid, publicValid);
  });

  onBeforeUnmount(() => {
    form?.unregister(uid);
  });

  watch([() => props.modelValue, () => props.validations, validating], validate);

  provide(FieldKey, {
    valid: publicValid,
  });

  return {
    startValidating,
    valid: publicValid,
    privateValid,
    error,
  };
};
