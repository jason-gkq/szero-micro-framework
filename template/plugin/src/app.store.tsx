import { makeAutoObservable, runInAction } from 'mobx';
import {
  HttpClient,
  sessionStorage,
  navigate,
  useEnv,
  type IRouteMenuItem,
  useToken,
  cloneDeep,
} from '@/zero';
import initHttpClient from './initHttpClient';
import Logo from '@/assets/logo/logo.svg';

// 免登录页面路由白名单
const whiteRoutes = ['/login'];

type IOptions = {
  route: string;
  params?: any;
  [key: string]: any;
};

const { getToken, removeToken } = useToken();
const env = useEnv();

export class AppStore {
  appStatus: 'loading' | 'error' | 'success' = 'loading';
  errorInfo: any;
  user = {}; // 用户信息
  roles = []; // 角色信息
  permissions = []; // 权限信息
  routes: IRouteMenuItem[] = []; // 路由信息， 必须
  layout = {
    // ant design组件ProLayout组件相关参数，透传
    logo: Logo,
    title: '中台项目',
    layout: 'mix',
    contentWidth: 'Fluid',
    splitMenus: true,
  };
  constructor() {
    /**
     * 设置http拦截器
     */
    initHttpClient(env.REQUEST);
    makeAutoObservable(this, undefined, { autoBind: true });
  }
  *onLaunch(options: IOptions) {
    console.log('app onLunch start', options);
    yield runInAction(() => {
      this.appStatus = 'success';
    });
    console.log('app onLunch end');
  }
  /**
   * 统一页面拦截
   * 可以获得参数有：
   *  route 当前页面路由
   *  params 当前页面携带参数
   *  pageConfig 当前页面静态配置
   *  pageStore 全局page的store对象
   *
   * @returns
   */
  pageBeforeOnLoad() {
    return true;
  }
  /**
   * 权限判断，如不需要可自行删除
   * @szero/pc 中权限校验组件会调用该方法
   * @returns
   */
  checkPermission() {
    return true;
  }
  onHide() {}
}

const appStore = new AppStore();

export default appStore;
