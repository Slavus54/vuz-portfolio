import React, {useState, useEffect} from 'react'
import {TextField, TextareaAutosize, Typography, Card, CardContent, CardActionArea, Select} from '@material-ui/core'
import {Button} from 'uikit-react'
import {useLocation} from 'wouter'
import Cookies from 'js-cookie'
import moment from 'moment'
import axios from 'axios'
import ReactMapGL, {Marker} from 'react-map-gl'

const EntranceItem = ({data, index}) => {
    const [loc, setLoc] = useLocation()
    const [view, setView] = useState({
      latitude: 55.297,
      longitude: 82.768,
      width: '500px',
      height: '350px',
      zoom: 7
    })
    const [state, setState] = useState([
        {
            index: 1,
            text: 'Очень интересно покопаться в электронике'
        },
        {
            index: 2,
            text: 'Было бы здорово совместив современные иформационные/инженерные технологии и медицину, создать что-то полезное'
        },
        {
            index: 3,
            text: 'Мобильная связь, её обслуживание и подлинные возможности стимулируют изучение данной области'
        }
    ])
    const [det, setDet] = useState(null)

    const onShowDet = () => {
        if (det !== null) {
            setDet(null)
        } else {
            setDet(state.find(el => el.index === index))
        }
    }

    return (
    
        <Card className='inv-vert' onMouseEnter={onShowDet} onClick={() => onChangeLoc(data.link)}>
            <CardContent>
                <Typography>{data.content}</Typography>
                <Typography>{data.points} баллов</Typography>
                {det !== null && <Typography>{det.text}</Typography>}
            </CardContent>
        </Card>
             
   
    )
}

export default EntranceItem