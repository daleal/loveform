import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useCheckboxGroup } from '@/composables/checkboxGroup';
import { getUniqueId } from '@/utils/uniqueId';

// Types
import type { Ref } from 'vue';

export const useCheckbox = (content: Ref<boolean>) => {
  const checkboxGroup = useCheckboxGroup();
  const uid = getUniqueId();

  onBeforeMount(() => {
    checkboxGroup?.register(uid, content);
  });

  onBeforeUnmount(() => {
    checkboxGroup?.unregister(uid);
  });
};
