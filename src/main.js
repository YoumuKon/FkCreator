import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import './assets/main.css';
import hljs from 'highlight.js/lib/core';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import 'highlight.js/lib/common';
import 'highlight.js/styles/a11y-dark.css';

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn });
app.use(createPinia());
app.use(router);
app.mount('#app');

app.directive('highlight', function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block) => {
    hljs.highlightElement(block);
  });
});

app.use(hljsVuePlugin);
