import { defineComponent } from 'vue';
import {
  useValidation,
  makeValidationEmits,
  makeValidationProps,
  UPDATE_MODEL_VALUE,
} from '@/composables/validation';
import { useRender } from '@/utils/render';

export const LTextarea = defineComponent({
  name: 'LTextarea',
  inheritAttrs: false,
  props: {
    ...makeValidationProps<string>(),
  },
  emits: {
    ...makeValidationEmits<string>(),
  },
  setup(props, { attrs, emit }) {
    const validation = useValidation<string>(props);

    const onInput = (event: Event) => {
      emit(UPDATE_MODEL_VALUE, (event.target as HTMLInputElement).value);
    };

    useRender(() => (
      <>
        <textarea
          value={props.modelValue}
          onInput={onInput}
          onBlur={validation.startValidating}
          { ...attrs }
        />
        { validation.renderError.value && <p>{ validation.error.value }</p> }
      </>
    ));

    return {
      valid: validation.valid,
      error: validation.error,
    };
  },
});

export type LTextarea = InstanceType<typeof LTextarea>
