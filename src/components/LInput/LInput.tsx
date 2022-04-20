import { defineComponent } from 'vue';
import {
  useValidation,
  makeValidationEmits,
  makeValidationProps,
  UPDATE_MODEL_VALUE,
} from '@/composables/validation';
import { useRender } from '@/utils/render';

export const LInput = defineComponent({
  name: 'LInput',
  props: {
    ...makeValidationProps(),
  },
  emits: {
    ...makeValidationEmits(),
  },
  setup(props, { attrs, emit }) {
    const validation = useValidation(props);

    const onInput = (event: Event) => {
      emit(UPDATE_MODEL_VALUE, (event.target as HTMLInputElement).value);
    };

    useRender(() => (
      <input
        value={props.modelValue}
        onInput={onInput}
        onBlur={validation.startValidating}
        { ...{ attrs } }
      />
    ));

    return {
      valid: validation.valid,
      error: validation.error,
    };
  },
});

export type LInput = InstanceType<typeof LInput>
