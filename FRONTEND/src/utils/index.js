import { routers } from '../components/Router/router.config';
const Utils = {}
Utils.getRoute = (path) => {
    return routers.filter(route => route.path === path)[0];
  };
export default Utils;