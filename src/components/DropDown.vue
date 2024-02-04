<template>
  <div class="absolute top-2.5 right-2">
    <Menu>
      <MenuButton class="outline-none">
        <v-icon name="bi-three-dots-vertical" scale="1.2" />
      </MenuButton>
      <MenuItems class="flex flex-col z-10 absolute right-0 top-8 bg-white rounded shadow border outline-none w-56">
        <MenuItem v-slot="{ active }">
        <button :class='{ "bg-gray-100": active }' class="text-left rounded" @click.prevent="">
          <Rename :event="event" />
        </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
        <button :class='{ "bg-gray-100": active }' class="text-left px-3 py-2 rounded flex gap-2 items-center"
          @click.prevent="removeEvent(event.id)">
          <v-icon name="bi-trash3-fill" />
          Delete
        </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useMutations } from '../helper';
const { deleteEvent } = useMutations(["deleteEvent"]);
import Rename from "./Rename.vue"

const { event } = defineProps(["event"])

function removeEvent(eventId) {
  deleteEvent(eventId);
}

</script>
