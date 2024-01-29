import { createApp } from 'vue'
import App from './App.vue'
import "./index.css"
import router from './Routes'
import store from "./store/index"
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { GiBreakingChain, GiTakeMyMoney, MdAccesstime, IoThumbsDown, BiTrash3Fill, BiThreeDotsVertical, IoColorPalette, BiCardImage, MdModeeditoutline } from "oh-vue-icons/icons";

const app = createApp(App)
app.use(router)
app.use(store)
addIcons(GiBreakingChain, GiTakeMyMoney, MdAccesstime, IoThumbsDown, BiTrash3Fill, BiThreeDotsVertical, IoColorPalette, BiCardImage, MdModeeditoutline)
app.component("v-icon", OhVueIcon);
app.mount('#app')

// Call initializeEvents action when the app starts
store.dispatch('initializeEvents');
