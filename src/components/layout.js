import React from "react"

import "semantic-styles"
import "@semantic-styles/reach-ui"
import "../styles/local.css"

const Layout = ({ children }) => {
  return (
    <>
      <header className="header padding">
        <h1 className="title">NYC Data </h1>
      </header>
      <main className="main">{children}</main>
      <footer className="footer padding">
        <h4 className="title">NYC Data </h4>
      </footer>
    </>
  )
}

export default Layout
