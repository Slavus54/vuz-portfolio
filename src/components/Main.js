import React, {useState, useEffect} from 'react'
import {TextField, TextareaAutosize, Typography, Card, CardContent, CardActionArea, Select} from '@material-ui/core'
import {Button} from 'uikit-react'
import {useLocation} from 'wouter'
import Cookies from 'js-cookie'
import moment from 'moment'
import axios from 'axios'
import ReactMapGL, {Marker} from 'react-map-gl'

const Main = () => {
    const [loc, setLoc] = useLocation()
    const [view, setView] = useState({
      latitude: 55.297,
      longitude: 82.768,
      width: '500px',
      height: '350px',
      zoom: 7
    })
    const [nav, setNav] = useState([
        {
          title: 'Я',
          link: `/about/${1}/${`bio`}`,
          cords: {
            lat: 55.313,
            long: 82.753
          }
        },
        {
          title: 'ЕГЭ',
          link: '/ege/2/null',
          cords: {
            lat: 55.3059,
            long: 82.739
          }
        },
        {
          title: 'Достижения',
          link: '/portfolio/3/porfolio',
          cords: {
            lat: 55.2,
            long: 82.7
          }
        },
        {
          title: 'Поступление в НГТУ',
          link: '/entrance/4/vuz',
          cords: {
            lat: 54.9878,
            long: 82.9065
          }
        }
    ])
  
    const token = 'pk.eyJ1Ijoic2xhdnVzNTQiLCJhIjoiY2toYTAwYzdzMWF1dzJwbnptbGRiYmJqNyJ9.HzjnJX8t13sCZuVe2PiixA'
   
  

    return (
      <div className="con">
    
        <h3>Двигайте для навигации</h3>
        <ReactMapGL {...view} mapboxApiAccessToken={token} onViewportChange={e => setView(e)}>
          {nav.filter((el, i) => i >= 0).map(el => (
            <Marker latitude={el.cords.lat} longitude={el.cords.long}>
              <div className="con" onClick={() => setLoc(el.link)}>
                <b>{el.title}</b>
              </div>
            </Marker>
          ))}
        </ReactMapGL>
               
                
 
      </div>
    )
}

export default Main


