import React from 'react';
import { compose, withState, withHandlers } from 'recompose'
import './App.css'

const withToggle = compose(
  withState('toggledOn', 'toggle', false),
  withHandlers({
    show: ({ toggle }) => (e) => toggle(true),
    hide: ({ toggle }) => (e) => toggle(false),
    toggle: ({ toggle }) => (e) => toggle((current) => !current),
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
