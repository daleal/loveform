import { defineComponent, ref } from 'vue';
import { useRender } from '@/utils/render';

export const LCheckbox = defineComponent({
  name: 'LCheckbox',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: boolean) => true,
  },
  setup(props, { attrs, emit }) {
    const content = ref(props.modelValue);

    const onInput = (event: Event) => {
      content.value = (event.target as HTMLInputElement).checked;
      emit('update:modelValue', (event.target as HTMLInputElement).checked);
    };

    useRender(() => (
      <>
        <input
          value={content.value}
          onInput={onInput}
          type="checkbox"
          { ...attrs }
        />
      </>
    ));
  },
});

export type LCheckbox = InstanceType<typeof LCheckbox>
