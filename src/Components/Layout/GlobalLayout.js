import React from "react"
import './global.css'
class GlobalLayout extends React.Component {
  render(){
    return (
      <>
        <header><button className="btn-primary">You Need More Mars</button> </header>
        <main>{this.props.children}</main>
      </>
    )
  }
}
export default GlobalLayout;
