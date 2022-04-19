import { defineComponent } from 'vue';
import { useRender } from '@/utils/render';
import { createForm } from '@/composables/form';

export const LForm = defineComponent({
  name: 'LForm',
  setup(_, { slots }) {
    const form = createForm();

    useRender(() => (
      <form>
        { slots.default }
      </form>
    ));

    return form;
  },
});

export type LForm = InstanceType<typeof LForm>
