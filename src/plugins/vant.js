import Vue from 'vue'
import {
  Button,
  NavBar,
  Search,
  Rate,
  Swipe,
  SwipeItem,
  Lazyload,
  Dialog,
  Popup,
  Form,
  Field,
  Toast,
  Uploader
} from 'vant'

Vue.use(Button)
  .use(NavBar)
  .use(Search)
  .use(Rate)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Popup)
  .use(Form)
  .use(Field)
  .use(Uploader)

Vue.prototype.$dialog = Dialog
Vue.prototype.$toast = Toast
