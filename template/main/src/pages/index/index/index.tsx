import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { createPage } from '@/zero';
import './index.less';

import PanelGroup from './components/PanelGroup';
/**
 * 入口页面 demo页面
 *  需使用 createPage
 * @param config 页面配置参数
 *      pageId 必须 为页面唯一id，埋点预留，因暂没有埋点，则可随意配置
 *      permissions 非必须 当前页面可以访问的权限集合字符串，如不配置则可任意访问
 *      isNeedLogin 非必须 进入当前页面是否校验登录，默认需要登录
 *      pageStatus  非必须 页面状态 'loading' 加载中 | 'skeleton' 骨架屏 | 'error' 错误 | 'success' 成功;
 *      skeletonOptions 非必须 骨架屏配置信息，透传ant design配置
 *      loadingOptions 非必须 加载中配置信息，透传ant design配置
 * @param component 页面组件
 *      建议用 PageContainer
 *  props route 当前页面路由
 *        params 当前页面路由参数
 */
export default createPage({ pageId: '1000' }, () => {
  return (
    <PageContainer pageHeaderRender={false}>
      <PanelGroup />
    </PageContainer>
  );
});
