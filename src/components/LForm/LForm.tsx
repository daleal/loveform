import { defineComponent } from 'vue';
import { useRender } from '@/utils/render';
import {
  createForm,
  makeFormEmits,
  makeFormProps,
  SUBMIT,
  SUBMIT_PROP,
} from '@/composables/form';

export const LForm = defineComponent({
  name: 'LForm',
  inheritAttrs: false,
  props: {
    ...makeFormProps(),
  },
  emits: {
    ...makeFormEmits(),
  },
  setup(props, { attrs, emit, slots }) {
    const form = createForm(props);

    const onSubmit = (event: Event) => {
      event.preventDefault();
      if (form.valid.value) {
        if (props[SUBMIT_PROP]) {
          emit(SUBMIT, event);
        } else {
          ((event as SubmitEvent).target as HTMLFormElement).submit();
        }
      }
    };

    useRender(() => (
      <form
        class="l-form"
        onSubmit={onSubmit}
        { ...attrs }
      >
        { slots.default?.() }
      </form>
    ));

    return form;
  },
});

export type LForm = InstanceType<typeof LForm>;
