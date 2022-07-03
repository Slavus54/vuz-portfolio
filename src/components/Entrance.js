import React, {useState, useEffect} from 'react'
import {TextField, TextareaAutosize, Typography, Card, CardContent, CardActionArea, Select} from '@material-ui/core'
import {Button} from 'uikit-react'
import {useLocation} from 'wouter'
import Cookies from 'js-cookie'
import moment from 'moment'
import axios from 'axios'
import ReactMapGL, {Marker} from 'react-map-gl'
import EntranceItem from './EntranceItem'

const Entrance = ({params}) => {
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
    const [data, setData] = useState(null)
  
    const token = 'pk.eyJ1Ijoic2xhdnVzNTQiLCJhIjoiY2toYTAwYzdzMWF1dzJwbnptbGRiYmJqNyJ9.HzjnJX8t13sCZuVe2PiixA'
   
    const getData = async () => {
        if (params.link !== 'null') {
            let dat = await axios.get(`https://vuz-portfolio.herokuapp.com/${params.link}`)

            setData(dat.data)
        }
      
    }

  
    useEffect(() => {
        if (data === null) {
            getData()
        }
    }, [data])
    
    const onChangeLoc = link => {
        window.location.href = link
    }

    return (
      <div className="con">
    
        <h2>Entrance</h2>

        {data !== null &&
            <div className='invs-vert'>
                {data.map((el, i) => {
                    if (el.contentType === 'headline') {
                        return <h4>{el.content}</h4>
                    } else {
                        return <EntranceItem data={el} index={i} />
                    }
                })}
            </div>
        }

   
                
 
      </div>
    )
}

export default Entrance