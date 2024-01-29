<template>
  <Disclosure>
    <DisclosureButton class="flex gap-2 w-full items-center text-left font-medium outline-none px-3 py-2 ">
      <v-icon name="md-modeeditoutline" />
      <p class="">Rename</p>
    </DisclosureButton>
    <DisclosurePanel class="px-4 pt-3 pb-3 border-t text-sm">
      <input type="text" class="border-b border-[#FE6367] outline-none mb-1" v-model="newName.habit"
        placeholder="new name" @keydown.enter="changeName" />
      <div class="flex justify-around gap-2.5 pt-3">
        <button class="rounded bg-gray-200 px-3 py-1.5 hover:bg-gray-300" @click.prevent="changeName"
          :disabled="newName.habit.length <= 0">
          Save
        </button>
        <DisclosureButton as="button" class="rounded bg-gray-200 px-3 py-1.5 hover:bg-gray-300">
          Cancel
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useMutations } from '../helper';
import { reactive } from 'vue';

const { editEventName } = useMutations(["editEventName"])
const { event } = defineProps(["event"])

const newName = reactive({
  habit: ""
})

function changeName() {
  if (newName.habit.length) {
    editEventName({ eventId: event.id, newName: newName.habit });
    newName.habit = "";
  }
}
</script>
