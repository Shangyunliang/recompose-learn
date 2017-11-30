import React from 'react';
import { compose, withReducer, withHandlers } from 'recompose'
import './App.css'

// 不能够修改这个顺序，虽然compose(h1, h2, h3) = h1(h2(h3(BaseComponent)))
// 但是执行的时候toggle是从父级上取toggle， 如果外层没有 toggle 取到 undefined

// withReducer<S, A>(
//   stateName: string,
//   dispatchName: string,
//   reducer: (state: S, action: A) => S,
//   initialState: S | (ownerProps: Object) => S
// ): HigherOrderComponent
const withToggle = compose(
  withReducer('toggledOn', 'dispatch', (state, action) => {
    switch (action.type) {
      case 'SHOW':
        return true
      case 'HIDE':
        return false
      case 'TOGGLE':
        return !state;
      default:
        return state;
    }
  }, false),
  withHandlers({
    show: ({ dispatch }) => (e) => dispatch({type: 'SHOW'}),
    hide: ({ dispatch }) => (e) => dispatch({type: 'HIDE'}),
    toggle: ({ dispatch }) => (e) => dispatch({type: 'TOGGLE'}),
   })
)

const StatusList = () =>
  <div className='StatusList' >
   <div>pending </div>
   <div>inactive </div>
   <div>active </div>
  </div>;
//
// const Status = withState('listShown', 'setListVisible', false)(
//   ({ status, listShown, setListVisible }) =>
//  <span onClick={()=> setListVisible((x) => !x)}>
//    {status}
//    { listShown && <StatusList /> }
//  </span>
// );

const Status = withToggle(({ status, toggledOn, toggle }) =>
<span onClick={toggle}>
 {status}
 { toggledOn && <StatusList /> }
</span>)

// const Tooltip = withState('tooltipShown', 'setTooltipVisible', false)(
//   ({ text, children, tooltipShown, setTooltipVisible }) =>
//   <span>
//    { tooltipShown && <div className = 'Tooltip'>{ text } </div>}
//    <span onMouseEnter={() => setTooltipVisible(true)}
//    onMouseLeave={() => setTooltipVisible(false)}>{children}</span>
//   </span>
// )
//

const Tooltip = withToggle(({ text, children, toggledOn, show, hide }) =>
  <span>
   { toggledOn && <div className = 'Tooltip'>{ text } </div>}
   <span onMouseEnter={show} onMouseLeave={hide}>{children}</span>
  </span>)

const User = ({ name, status }) =>
  <div className='User'>
    <Tooltip text='Cool Dude'>{name}</Tooltip>---
    <Status status={status} />
  </div>;

const App = () => <User name='SYL' status='ACTIVE' />

export default App
