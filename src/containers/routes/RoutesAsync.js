import React from 'react';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      console.log('Component',Component)
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

export const Home = asyncComponent(() => System.import('./Home.js').then(module => module.default));
export const Foo = asyncComponent(() => System.import('./Foo.js').then(module => module.default));
export const Bar = asyncComponent(() => System.import('./Bar.js').then(module => module.default));