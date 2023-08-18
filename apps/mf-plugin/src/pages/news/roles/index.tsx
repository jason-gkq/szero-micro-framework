import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { createPage } from '@/zero';

import TableList from './components/TableList';

export default createPage({ pageId: '1000' }, () => {
  return (
    <PageContainer pageHeaderRender={false}>
      <TableList />
    </PageContainer>
  );
});
// export default () => {
//   return (
//     <div
//       style={{
//         borderRadius: '4px',
//         padding: '2em',
//         backgroundColor: 'green',
//         color: 'white',
//       }}
//     >
//       this is roles list
//     </div>
//   );
// };
