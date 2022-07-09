import { computed, defineComponent } from 'vue';
import { createCheckboxGroup } from '@/composables/checkboxGroup';
import { useValidation, makeValidationProps } from '@/composables/validation';
import { useRender } from '@/utils/render';

export const LCheckboxGroup = defineComponent({
  name: 'LCheckboxGroup',
  inheritAttrs: false,
  props: {
    ...makeValidationProps<Array<boolean>>(),
  },
  setup(props, { slots }) {
    const checkboxGroup = createCheckboxGroup();

    const items = computed(() => checkboxGroup.items.value.map((content) => content.value));

    const validation = useValidation<Array<boolean>>(props, items);

    useRender(() => (
      <>
        { slots.default?.() }
        {
          validation.renderError.value
          && <p class="l-checkbox-group__error">{ validation.error.value }</p>
        }
      </>
    ));

    return {
      valid: validation.valid,
      error: validation.error,
    };
  },
});

export type LCheckboxGroup = InstanceType<typeof LCheckboxGroup>;
