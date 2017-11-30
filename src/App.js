import React from 'react';
import { lifecycle }  from 'recompose';
import './App.css';

const configPromise = fetch();

const withConfig = lifecycle({
  state: { config: {} },
  componentDidMount() {
    configPromise.then(config =>
      this.setState({ config }));
  }
});

const User = withConfig(({ name, status, config }) =>
  <div className="User">
    { name }
    { config.showStatus && '—' + status }
    { config.canDeleteUsers && <button>X</button> }
  </div>
);

export const  App = () =>
  <div>
    <User name="Tim" status="active" />
  </div>;
// Mock Configuration

const config = {
  showStatus: true,
  canDeleteUsers: true
}

function fetch() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(config), 300);
  });
}
