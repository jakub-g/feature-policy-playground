import React, { Component } from 'react';
import './App.css';

import * as router from './router'

import Header from './elements/Header';
import AboutContent from './elements/AboutContent';
import FeatureDetail from './elements/FeatureDetail';
import FeatureSelector from './elements/FeatureSelector';
import Footer from './elements/Footer';

import policies from './_build/policies.json';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeFeature: null
    }
  }

  componentDidMount() {
    router.configure({
      routes: [
        { name: 'empty', pattern: /^\/$/, action: () => this.setPolicy(null) },
        { name: 'policy', pattern: /^\/policies\/([^/]+)\/?$/, action: params => this.setPolicy(params[1]) }
      ],
      title: { suffix: 'Feature policy', delim: ' - ' },
      triggerForInitialState: true
    })
  }

  setPolicy(newFeature) {
    this.setState(currentState => {
      if (currentState.activeFeature !== newFeature) {
        return {activeFeature: newFeature};
      }
    })
    router.pushState(newFeature ? '/policies/' + newFeature : '/', newFeature);
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          {Boolean(this.state.activeFeature) ? (
            <div className='row'>
              <FeatureDetail feature={policies.find(f => f.name === this.state.activeFeature)} />
            </div>
          ) : (
            <div>
              <AboutContent />
              <FeatureSelector
                policies={policies}
                activeFeature={this.state.activeFeature}
                onChange={newFeature => this.setPolicy(newFeature)}
              />
              <p>Browser support data courtesy of MDN's <a href='https://github.com/mdn/browser-compat-data'>public browser-compat-data</a> project.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
