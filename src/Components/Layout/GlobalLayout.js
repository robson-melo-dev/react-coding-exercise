import React from "react"
import './global.css'
import logo from "../../assets/vector/wordmark.svg"
class GlobalLayout extends React.Component {
  render(){
    return (
      <>
      <div className="header-wrapper">
        <header className="header">
          <img src={logo} alt="" className="logo"/>
          <input type='text' className="search_input" placeholder={"search by mission name..."}/>
          <button className="btn-primary btn_search">Search</button> 
          </header>
          </div>
        <main>{this.props.children}</main>
      </>
    )
  }
}
export default GlobalLayout;
