import {
  computed, onBeforeMount, onBeforeUnmount, ref, watch,
} from 'vue';
import { useForm } from '@/composables/form';
import { getUniqueId } from '@/utils/uniqueId';

// Types
import type { PropType, Ref } from 'vue';

export type Validation<T> = (value: T) => true | string;

export interface ValidationProps<T> {
  validations: Array<Validation<T>>,
  hideErrors: boolean,
}

export const makeValidationProps = <T>() => ({
  validations: {
    type: Array as PropType<Array<Validation<T>>>,
    default: () => ([]),
  },
  hideErrors: {
    type: Boolean,
    default: () => false,
  },
});

export const useValidation = <T>(props: ValidationProps<T>, content: Ref<T>) => {
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
    const validated = props.validations.map((validation) => validation(content.value));
    const errors = validated.filter((possible) => possible !== true) as Array<string>;
    if (!errors.length) {
      error.value = '';
    } else {
      error.value = errors[0];
    }
  };

  const renderError = computed(() => !hideErrors && error.value);

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

  watch([() => content.value, () => props.validations, validating], validate);

  return {
    startValidating,
    valid: publicValid,
    privateValid,
    renderError,
    error,
  };
};
