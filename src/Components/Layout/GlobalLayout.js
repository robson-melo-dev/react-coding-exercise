import React from "react"
import './global.css'
class GlobalLayout extends React.Component {
  render(){
    return (
      <>
        <header className="header"><input type='text' className="search_input" placeholder={"search by mission name..."}/><button className="btn-primary">Search</button> </header>
        <main>{this.props.children}</main>
      </>
    )
  }
}
export default GlobalLayout;
