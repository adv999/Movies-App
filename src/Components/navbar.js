import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class  extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'0.5'}}>
          <Link to='/' style={{textDecoration: 'None'}}><h1 style={{marginTop: '1rem', marginLeft:'1rem'}}>Movies App</h1></Link>
          
          <Link to='/favourites' style={{textDecoration: 'None'}}><h2 style={{marginTop: '1.4rem', marginLeft:'2rem'}}>Favourites</h2></Link>
          
      </div>
    )
  }
}
