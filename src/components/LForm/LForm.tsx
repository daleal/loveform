import { defineComponent } from 'vue';
import { useRender } from '@/utils/render';
import { createForm } from '@/composables/form';

export const LForm = defineComponent({
  name: 'LForm',
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submit: (event: Event) => true,
  },
  setup(_, { emit, slots }) {
    const form = createForm();

    const onSubmit = (event: Event) => {
      event.preventDefault();
      if (form.valid.value) {
        emit('submit', event);
      }
    };

    useRender(() => (
      <form onSubmit={onSubmit}>
        { slots.default?.() }
      </form>
    ));

    return form;
  },
});

export type LForm = InstanceType<typeof LForm>;
