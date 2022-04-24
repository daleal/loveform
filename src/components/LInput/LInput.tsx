import { computed, defineComponent } from 'vue';
import {
  useValidation,
  makeValidationEmits,
  makeValidationProps,
  UPDATE_MODEL_VALUE,
} from '@/composables/validation';
import { useRender } from '@/utils/render';

export const LInput = defineComponent({
  name: 'LInput',
  inheritAttrs: false,
  props: {
    ...makeValidationProps<string>(),
  },
  emits: {
    ...makeValidationEmits<string>(),
  },
  setup(props, { attrs, emit }) {
    const validation = useValidation<string>(props);

    const showErrors = computed(() => !validation.hideErrors && validation.error.value);

    const onInput = (event: Event) => {
      emit(UPDATE_MODEL_VALUE, (event.target as HTMLInputElement).value);
    };

    useRender(() => (
      <>
        <input
          value={props.modelValue}
          onInput={onInput}
          onBlur={validation.startValidating}
          { ...attrs }
        />
        { showErrors.value && <p>{ validation.error.value }</p> }
      </>
    ));

    return {
      valid: validation.valid,
      error: validation.error,
    };
  },
});

export type LInput = InstanceType<typeof LInput>
