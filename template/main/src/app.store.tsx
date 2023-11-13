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
  /**
   * route 启动路由
   * params 启动时浏览器参数
   */
  *onLaunch(options: IOptions) {
    console.log('app onLunch start', options);
    const { route } = options;
    /**
     * 如果启动页为登录页，则直接进入登录页
     * 用户信息等其他信息暂不获取
     * 前置设置信息：
     *  1、http拦截器一定要设置，在登录页面会用到
     *  2、登录页的路由一定要注册，如果路由信息从接口获取，则可以先把登录页面的路由注册完成
     *     登录完成会刷新浏览器再设置其他路由
     */
    if (whiteRoutes.includes(route)) {
      yield runInAction(() => {
        this.appStatus = 'success';
      });
      return;
    }
    /**
     * 如果启动时无token，则重定向到登录页面进行登录操作
     */
    let token = getToken();
    if (!token) {
      yield runInAction(() => {
        this.appStatus = 'success';
      });
      navigate.redirect(`/login`);
      return;
    }
    /**
     * 路由&菜单数据
     * 路由类型：IRouteProps
     * 菜单类型：IMenuProps
     * 如无 appName 则配置 /
     *  isRouteRoot 节点必须
     * 如有路由是配置在后端，则请求接口之后处理为 IRouteMenuItem 类型的数据
     * 接口数据和本地数据可以合并，会根据path自动去重，例如：routesFormat(data).concat(env.routes),
     */
    const originRoutes: IRouteMenuItem[] = [
      {
        path: env.appName,
        isRouteRoot: true,
        children: cloneDeep(env.routes),
      },
    ];
    /**
     * 获取用户信息
     */
    let userAuth = sessionStorage.get('userInfo');
    try {
      if (!userAuth) {
        const result: Promise<any> = yield HttpClient.get('getUserInfo');
        userAuth = result;
        sessionStorage.set('userInfo', result);
      }
    } catch (error) {
      userAuth = {};
    }
    const { permissions, roles, user } = yield userAuth;

    yield runInAction(() => {
      this.appStatus = 'success';
      this.user = user;
      this.permissions = permissions;
      this.roles = roles;
      this.routes = originRoutes;
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
  async logout() {
    try {
      const token = getToken();
      /**
       * 调用登出接口
       */
      if (token) {
        await HttpClient.post('logout');
      }
    } catch (error) {}
    /**
     * 初始化全局数据
     * 清理session中业务数据
     * 删除token
     */
    await sessionStorage.clearAll();
    removeToken();
    navigate.redirect(`/login`);
  }
}

const appStore = new AppStore();

export default appStore;
