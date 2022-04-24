import { defineComponent, ref } from 'vue';
import { useRender } from '@/utils/render';
import { createForm } from '@/composables/form';

// Types
import type { PropType } from 'vue';

export const LForm = defineComponent({
  name: 'LForm',
  props: {
    // onSubmit is declared as a hack to be able to detect
    // when the 'submit' listener is defined
    // eslint-disable-next-line vue/require-default-prop
    onSubmit: Function as PropType<(event: Event) => void>,
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submit: (event: Event) => true,
  },
  setup(props, { attrs, emit, slots }) {
    const form = createForm();

    const onSubmit = (event: Event) => {
      event.preventDefault();
      if (form.valid.value) {
        if (props.onSubmit) {
          emit('submit', event);
        } else {
          ((event as SubmitEvent).target as HTMLFormElement).submit();
        }
      }
    };

    useRender(() => (
      <form
        onSubmit={onSubmit}
        { ...{ attrs } }
      >
        { slots.default?.() }
      </form>
    ));

    return form;
  },
});

export type LForm = InstanceType<typeof LForm>;
