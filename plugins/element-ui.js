import Vue from 'vue'
import {
  Button,
  Tag,
  Tree,
  Dialog,
  Input,
  Form,
  Option,
  Select,
  FormItem,
  DatePicker,
  Cascader,
  Radio,
  RadioGroup,
  Message,
  Notification
} from 'element-ui'

export default () => {
  Vue.use(Button)
    .use(Tag)
    .use(Tree)
    .use(Dialog)
    .use(Input)
    .use(Form)
    .use(Option)
    .use(Select)
    .use(FormItem)
    .use(DatePicker)
    .use(Cascader)
    .use(Radio)
    .use(RadioGroup)
  Vue.prototype.$message = Message
  Vue.prototype.$notify = Notification
}
