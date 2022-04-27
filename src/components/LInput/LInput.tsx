import { defineComponent, ref } from 'vue';
import { useValidation, makeValidationProps } from '@/composables/validation';
import { useRender } from '@/utils/render';

export const LInput = defineComponent({
  name: 'LInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: () => '',
    },
    ...makeValidationProps<string>(),
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string) => true,
  },
  setup(props, { attrs, emit }) {
    const content = ref(props.modelValue);

    const validation = useValidation<string>(props, content);

    const onInput = (event: Event) => {
      content.value = (event.target as HTMLInputElement).value;
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    };

    useRender(() => (
      <>
        <input
          value={content.value}
          onInput={onInput}
          onBlur={validation.startValidating}
          type="text"
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

export type LInput = InstanceType<typeof LInput>
