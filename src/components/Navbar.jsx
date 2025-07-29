import React from 'react'

function Navbar() {
  return (
    <div className="nav-holder">
        <div className="nav-container">
            <div className="nav-left">
                <div className="nav-left-elements">
                    <div className="nav-clubs">clubs</div>
                    <div className="nav-myEvents">myEvents</div>
                </div>
            </div>
            <div className="nav-mid">
                <div className="nav-logo">EVENTRA</div>
            </div>
            <div className="nav-right">
                <div className="nav-profile"></div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
