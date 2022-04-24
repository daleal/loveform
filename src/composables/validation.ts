import {
  computed, onBeforeMount, onBeforeUnmount, ref, watch,
} from 'vue';
import { useForm } from '@/composables/form';
import { getUniqueId } from '@/utils/uniqueId';

// Types
import type { PropType } from 'vue';

export const UPDATE_MODEL_VALUE = 'update:modelValue';

export type Validation<T> = (value: T) => true | string;

export interface ValidationProps<T> {
  modelValue: T,
  validations: Array<Validation<T>>,
  hideErrors: boolean,
}

export const makeValidationProps = <T>() => ({
  modelValue: {
    type: null as unknown as PropType<T>,
    required: true as const,
  },
  validations: {
    type: Array as PropType<Array<Validation<T>>>,
    default: () => ([]),
  },
  hideErrors: {
    type: Boolean,
    default: () => false,
  },
});

export const makeValidationEmits = <T>() => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [UPDATE_MODEL_VALUE]: (value: T) => true,
});

export const useValidation = <T>(props: ValidationProps<T>) => {
  const form = useForm();
  const uid = getUniqueId();

  const validating = ref(false);
  const error = ref('');
  const privateValid = computed(() => !error.value.trim());

  const hideErrors = form?.hideErrors || props.hideErrors;

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

  return {
    startValidating,
    valid: publicValid,
    privateValid,
    hideErrors,
    error,
  };
};
