import React, {useState, useEffect} from 'react'
import {TextField, TextareaAutosize, Typography, Card, CardContent, CardActionArea, Select} from '@material-ui/core'
import {Button} from 'uikit-react'
import {useLocation} from 'wouter'
import Cookies from 'js-cookie'
import moment from 'moment'
import axios from 'axios'
import ReactMapGL, {Marker} from 'react-map-gl'

const Callback = () => {
    const [loc, setLoc] = useLocation()
    const [view, setView] = useState({
      latitude: 55.297,
      longitude: 82.768,
      width: '500px',
      height: '350px',
      zoom: 7
    })
    const [form, setForm] = useState({
        name: '',
        msg: ''
    })
    const {name, msg} = form

    const onGetRow = () => {
        return (parseInt(msg.split(' ').length / 5) + 3)
    }

    const onGetMail = () => {
        window.navigator.clipboard.writeText('x.miros@yandex.ru')
    }

 

    const onSend = async () => {
        await axios.post('/email', {
            form
        })
    }

    return (
        <div className="con">
            <h2>С критикой/предложением писать на почту</h2>
            <Button onClick={onGetMail}>Почта</Button>
            <h3>Написать сразу</h3>
            <TextField value={name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Как вас зовут" />
            <TextareaAutosize value={msg} onChange={e => setForm({...form, msg: e.target.value})} placeholder="Ваш текст" minRows={onGetRow} />
            <Button onClick={onSend}>Отравить</Button>
        </div>
    )
}

export default Callback