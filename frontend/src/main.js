import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import {BIconPersonSquare, BIconJournalText, BIconTools, BIconPencilFill, BIconEmojiSmileFill, BIconImage,
        BIconHandThumbsUpFill, BIconXCircle, BIconShieldLockFill, BIconCaretDownSquare,BIconCheckSquare,
        BIconArrowRightSquare,BIconTrash,BIconPencilSquare,BIconPlusSquare,BIconInfoSquare, BIconHandThumbsUp,BIconExclamationSquareFill} from "bootstrap-icons-vue";

const app = createApp(App);
app.component("BIconPersonSquare", BIconPersonSquare);
app.component("BIconJournalText", BIconJournalText);
app.component("BIconTools", BIconTools);
app.component("BIconPencilFill", BIconPencilFill);
app.component("BIconEmojiSmileFill", BIconEmojiSmileFill);
app.component("BIconImage", BIconImage);
app.component("BIconHandThumbsUpFill", BIconHandThumbsUpFill);
app.component("BIconXCircle", BIconXCircle);
app.component("BIconShieldLockFill", BIconShieldLockFill);
app.component("BIconCaretDownSquare", BIconCaretDownSquare);
app.component("BIconCheckSquare", BIconCheckSquare);
app.component("BIconArrowRightSquare", BIconArrowRightSquare);
app.component("BIconTrash", BIconTrash);
app.component("BIconPencilSquare", BIconPencilSquare);
app.component("BIconPlusSquare", BIconPlusSquare);
app.component("BIconInfoSquare", BIconInfoSquare);
app.component("BIconHandThumbsUp", BIconHandThumbsUp);
app.component("BIconExclamationSquareFill", BIconExclamationSquareFill);

app.use(store).use(router).mount("#app");
