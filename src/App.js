import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName, setPropTypes } from 'recompose'
const { connect } = Redux()

const enhance = compose(
  setDisplayName('User'),  // mast be here  顺序先执行 connect 在执行 setPropTypes 最后执行 setDisplayName
  setPropTypes({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  connect(),
)

const User = enhance(({name, status, dispatch}) => (
  <div onClick = {
    () => dispatch({type: 'USER_ACTIVE'})
  }>
  {name}: {status}
  </div>
))

console.log(User.displayName);

const App = () =>
<div>
 <User status='active' />
</div>

export default App


// fake implementation of redux

function Redux() {
  return {
    connect: () => (BaseComponent) => (props) =>
      <BaseComponent
        {...props}
        dispatch={ ({ type }) => console.log(type + ' dispatched') }
      />
  }
}
