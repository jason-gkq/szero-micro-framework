import { makeAutoObservable, runInAction } from 'mobx';
import { IRouteMenuItem } from '@/zero';

type IOptions = {
  route: string;
  params?: any;
  [key: string]: any;
};

export class AppStore {
  appStatus: 'loading' | 'error' | 'success' = 'loading';
  errorInfo: any;
  user = {};
  roles = [];
  permissions = [];
  routes: IRouteMenuItem[] = [];
  layout = {
    pure: true,
  };
  constructor() {
    makeAutoObservable(this);
  }
  /* 静默授权获取凭证code */
  *onLaunch(options: IOptions) {
    console.log('app onLunch start', options);
    yield runInAction(() => {
      this.appStatus = 'success';
    });
    console.log('app onLunch end');
  }
  /**
   * 统一页面拦截
   * @returns
   */
  pageBeforeOnLoad({ pageStore, params, route, pageConfig }: any) {
    console.log(
      'plugin pageBeforeOnLoad',
      this.permissions,
      params,
      route,
      pageConfig
    );

    return true;
  }
  checkPermission() {
    return true;
  }
  onHide() {}
}

const appStore = new AppStore();

export default appStore;
