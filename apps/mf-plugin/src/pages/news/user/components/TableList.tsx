import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import { HttpClient } from '@/zero';

const queryUserList = async (
  payload?: any
): Promise<{ rows: any; total: number }> => {
  const {
    rows,
    total,
  }: {
    rows: any;
    total: number;
  } = await HttpClient.get('system/user/list', { params: payload });
  return { rows, total };
};

export default () => {
  return (
    <ProTable
      columns={[
        {
          title: '编号',
          dataIndex: 'userId',
          hideInSearch: true,
          width: 60,
        },
        {
          title: '名称',
          dataIndex: 'userName',
        },
        {
          title: '手机号码',
          dataIndex: 'phonenumber',
          hideInTable: true,
        },
        {
          title: '昵称',
          dataIndex: 'nickName',
          hideInSearch: true,
        },
      ]}
      rowKey={'userId'}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: 10,
        defaultCurrent: 1,
        // onChange: (page, pageSize) => {
        //   console.log("pagination.onChange", page, pageSize);
        // },
      }}
      // polling={polling || undefined}
      request={async (params, sort, fliter) => {
        const { current: pageNum, pageSize, ...req } = params;
        const { rows: data, total } = await queryUserList({
          pageNum,
          pageSize,
          ...req,
        });
        return {
          data,
          total,
          success: true,
        };
      }}
      onRequestError={(error: any) => {
        console.error(error);
      }}
      options={{
        fullScreen: false,
        reload: false,
        setting: false,
        density: false,
      }}
      search={{ defaultCollapsed: false }}
      defaultSize='small'
      dateFormatter='string'
    />
    // <div
    //   style={{
    //     borderRadius: '4px',
    //     padding: '2em',
    //     backgroundColor: 'blue',
    //     color: 'white',
    //   }}
    // >
    //   this is user list
    // </div>
  );
};
