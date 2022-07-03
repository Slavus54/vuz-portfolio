import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Link, Route} from 'wouter'
import {TextField, TextareaAutosize, Typography, Card, CardContent, CardActionArea, Checkbox} from '@material-ui/core'
import {Button} from 'uikit-react'
import moment from 'moment'
import Main from './components/Main'
import About from './components/About'
import EGE from './components/EGE'
import Portfolio from './components/Portfolio'
import Entrance from './components/Entrance'
import Callback from './components/Callback'
import './App.css'

function App() {

  return (
    <div className="App">
    
        <nav>
          <Link href="/">Главная</Link>
          <Link href="/about/1/bio">Обо мне</Link>
          <Link href="/ege/2/null">ЕГЭ</Link>
          <Link href="/portfolio/3/portfolio">Портфолио</Link>
          <Link href="/entrance/4/vuz">Поступление</Link>
          <Link href="/contacts">Обратная связь</Link>
        </nav>
    

  
      
      <Route path="/" component={Main} /> 
      <Route path="/about/:index/:link" component={About} /> 
      <Route path="/ege/:index/:link" component={EGE} /> 
      <Route path="/portfolio/:index/:link" component={Portfolio} /> 
      <Route path="/entrance/:index/:link" component={Entrance} /> 
      <Route path="/contacts" component={Callback} /> 
    </div>
  );
}

export default App;