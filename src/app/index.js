import configureStore from './configureStore';
import createApp from './createApp';
import routesConfig from './router/routes';
//暴露给后端渲染用
export default {
  configureStore,
  createApp,
  routesConfig
}