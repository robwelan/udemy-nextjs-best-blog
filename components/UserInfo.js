import React, { Component, Fragment } from 'react';
import Link from 'next/link';

//  Components
import SpinnerLoader from './spinner-loader';

//  Utilities
import { fetchDocumentFromCollection, isEmpty } from '../lib/utility';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: null,
    };

    this.setLoading = this.setLoading.bind(this);
  }

  async componentDidMount() {
    const { userId } = this.props;

    const isLoading = await this.setLoading({ value: true });

    if (isLoading.success) {
      fetchDocumentFromCollection({
        id: userId,
        collection: 'users',
      })
        .then(user => {
          if (!isEmpty(user)) {
            this.setState({ user });
          }
        })
        .finally(() => {
          this.setLoading({ value: false });
        });
    }
  }

  async setLoading({ value }) {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        loading: value,
      };

      return newState;
    });

    return { success: true };
  }

  render() {
    const { loading, user } = this.state;

    if (loading) {
      return (
        <div className="user-profile">
          <div>
            <SpinnerLoader />
          </div>
        </div>
      );
    }

    if (!loading && user === null) {
      return (
        <div>
          <span>User not found</span>
        </div>
      );
    }

    return (
      <Fragment>
        <div className="user-profile">
          <div>
            <figure className="image is-48x48">
              <img
                src={this.state.user.avatar}
                alt="User profile photo"
                className="is-rounded"
              />
            </figure>
          </div>
          <div>
            <Link href="#">
              <a>@{this.state.user.name}</a>
            </Link>
          </div>
        </div>
        <style jsx>{`
          .user-profile {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          }
          figure {
            margin-right: 0.3rem;
            margin-left: 0;
          }
        `}</style>
      </Fragment>
    );
  }
}
