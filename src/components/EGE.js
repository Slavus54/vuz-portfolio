import React, {useState, useEffect} from 'react'
import {TextField, TextareaAutosize, Typography, Card, CardContent, CardActionArea, Select} from '@material-ui/core'
import {Button} from 'uikit-react'
import {useLocation} from 'wouter'
import Cookies from 'js-cookie'
import moment from 'moment'
import axios from 'axios'
import ReactMapGL, {Marker} from 'react-map-gl'
import res from '../img/res.jpg'

const EGE = ({params}) => {
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
    const [items, setItems] = useState([
        {
            title: 'Линейная алгебра',
            subject: 'Math',
            classes: [5, 8],
            coof: 20
        },
        {
            title: 'История',
            subject: 'History',
            classes: [5, 11],
            coof: 5
        },
        {
            title: 'Практика программирования на Pascal',
            subject: 'CS',
            classes: [9, 11],
            coof: 30
        },
        {
            title: 'Логика',
            subject: 'Math',
            classes: [10, 11],
            coof: 25
        },
        {
            title: 'Английский язык',
            subject: 'English',
            classes: [5, 11],
            coof: 15
        },
        
    ])
    const [points, setPoints] = useState(0)
    const [item, setItem] = useState(null)
  
    const token = 'pk.eyJ1Ijoic2xhdnVzNTQiLCJhIjoiY2toYTAwYzdzMWF1dzJwbnptbGRiYmJqNyJ9.HzjnJX8t13sCZuVe2PiixA'
  
    useEffect(() => {
        if (item === null && points === 0) {
            setItem(items[parseInt(Math.random() * items.length)])
        }
    }, [item])

    const onNextItem = () => {
        let num = parseInt(Math.random() * item.coof)

        if (points + num <= 199) {
            setPoints(points + num)

            let filtered = items.filter(el => el.title !== item.title)
            let rand = filtered[parseInt(Math.random() * filtered.length)]
    
            if (rand !== undefined) {
                setItem(rand)
            }
        } else {
            setPoints(199)
            setItem(null)
        }
    }

    return (
      <div className="con">
    
        <h2>Результаты ЕГЭ</h2>
        <h3>Текущий балл: {points}</h3>
        <img src={res} className="bigphoto" />
        
        {item !== null &&
            <Card className='inv' onClick={onNextItem}>
                <CardContent>
                    <Typography>{item.title}</Typography> 
                    <Typography>{item.classes[0]}-{item.classes[1]} классы</Typography>
                </CardContent>
            </Card>
        }

        <h3>Двигайте для навигации</h3>
        <ReactMapGL {...view} mapboxApiAccessToken={token} onViewportChange={e => setView(e)}>
          {nav.filter((el, i) => i >= parseInt(params.index)).map(el => (
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

export default EGE