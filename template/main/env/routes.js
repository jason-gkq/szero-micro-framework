module.exports.routes = [
  {
    path: 'index',
    name: '首页',
    hideInMenu: false,
    icon: 'HomeOutlined',
    component: 'index/index',
    redirect: '/index/index',
    children: [
      {
        path: 'index',
        icon: 'HomeOutlined',
        hideInMenu: false,
        name: '首页',
      },
    ],
  },
  {
    path: 'system',
    component: 'common/plugins',
    name: '系统管理',
    hideInMenu: false,
    icon: 'HomeOutlined',
    isPlugin: true,
    children: [
      {
        path: 'user',
        hideInMenu: false,
        icon: 'UserOutlined',
        name: '用户列表',
      },
      {
        path: 'roles',
        hideInMenu: false,
        icon: 'RobotOutlined',
        name: '角色管理',
      },
    ],
  },
  {
    path: 'login',
    name: '登录',
    isNoneLayout: true,
  },
];
