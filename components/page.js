import React, { Component } from 'react';
import Router from 'next/router';
import getConfig from 'next/config';
import NProgress from 'nprogress';

//  firebase
import { firebase } from '../lib/db';

//  Children
import Navigator from './navigator';
import PageFooter from './page-footer';
import PageHead from './page-head';

const { publicRuntimeConfig } = getConfig();

NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner });

Router.onRouteChangeStart = () => {
  // console.log('onRouteChnageStart triggered');
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  // console.log('onRouteChnageComplete triggered');
  NProgress.done();
};

Router.onRouteChangeError = () => {
  // console.log('onRouteChnageError triggered');
  NProgress.done();
};

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _isMounted: false,
    };
  }

  componentDidMount() {
    const { _isMounted } = this.state;

    if (!_isMounted) {
      firebase.analytics();

      this.setState(prevState => {
        const newState = {
          ...prevState,

          _isMounted: true,
        };

        return newState;
      });
    }
  }
  render() {
    return (
      <>
        <PageHead />
        <Navigator />
        <div className="site">
          <main className="container">{this.props.children}</main>
          <PageFooter />
        </div>
        <style jsx>
          {`
            main {
              flex: 1;
              width: 100%;
            }
            .site {
              display: flex;
              min-height: 100vh;
              flex-direction: column;
            }
          `}
        </style>
      </>
    );
  }
}

export default Page;
