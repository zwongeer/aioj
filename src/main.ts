import { createVueApp } from './main.server';

const { app, router, store } = createVueApp(false);

if ('__INITIAL_STATE__' in window) {
  store.replaceState((window as any).__INITIAL_STATE__);
}

router.push(location.pathname + location.search + location.hash).then(() => {
  app.mount('#app', true);
});
