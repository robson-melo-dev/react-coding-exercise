import React from "react"
import './global.css'
class GlobalLayout extends React.Component {
  render(){
    return (
      <>
        <main>{this.props.children}</main>
      </>
    )
  }
}
export default GlobalLayout;
