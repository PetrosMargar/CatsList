import React from 'react';
import { Fragment } from 'react';

const Layout = (props: any) => {

  return (
    <Fragment>
      <main style={{ display: 'flex' }}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;