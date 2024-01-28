<template>
  <Menu>
    <MenuButton>
      <v-icon name="bi-three-dots-vertical" scale="1.2" />
    </MenuButton>
    <MenuItems class="flex flex-col z-10 absolute right-0 top-8 bg-white p-3 rounded-lg shadow border outline-none">
      <MenuItem v-slot="{ active }">
      <button :class='{ "bg-gray-100": active }' class="text-left px-3 py-2 rounded" @click.prevent="removeEvent(id)">
        Delete
      </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useMutations } from '../helper';
const { deleteEvent } = useMutations(["deleteEvent"]);

const { id } = defineProps(["id"])

function removeEvent(eventId) {
  deleteEvent(eventId);
}

</script>
