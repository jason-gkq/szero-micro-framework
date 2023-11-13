import React from 'react';
import { navigate } from '@/zero';

export default () => {
  return (
    <div
      style={{
        borderRadius: '4px',
        padding: '2em',
        backgroundColor: 'green',
        color: 'white',
      }}
      onClick={() => navigate.goTo('/system/user')}
    >
      this is roles list
    </div>
  );
};
