import React, {useState, useEffect} from 'react'
import {TextField, TextareaAutosize, Typography, Card, CardContent, CardActionArea, Select} from '@material-ui/core'
import {Button} from 'uikit-react'
import {useLocation} from 'wouter'
import Cookies from 'js-cookie'
import moment from 'moment'
import axios from 'axios'
import ReactMapGL, {Marker} from 'react-map-gl'

const About = ({params}) => {
    const [loc, setLoc] = useLocation()
    const [view, setView] = useState({
      latitude: 55.297,
      longitude: 82.768,
      width: '500px',
      height: '350px',
      zoom: 10
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
    const [friends, setFriends] = useState([
        {
            FIO: 'Aндрей',
            cords: {
                lat: 55.3118,
                long: 82.755
            }
        },
        {
            FIO: 'Aлексей',
            cords: {
                lat: 55.3199,
                long: 82.717
            }
        },
        {
            FIO: 'Роман',
            cords: {
                lat: 55.309,
                long: 82.7567
            }
        }
    ])
    const [infs, setInfs] = useState([
        {
            label: 'Вечера, проведенные за Pascal/JS',
            points: 15,
            isPositive: true 
        },
        {
            label: 'Поездки в НСК',
            points: 5,
            isPositive: false
        },
        {
            label: 'Изучение программы вуза',
            points: 15,
            isPositive: true
        }
    ])
    const [friend, setFriend] = useState(null)
    const [inf, setInf] = useState(null)
    const [per, setPer] = useState(70)

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

    useEffect(() => {
        if (inf !== null) {
            let z = ['+', '-']

            friends.map(el => {
                el.cords = {
                    lat: eval(`${el.cords.lat}${z[parseInt(Math.random() * z.length)]}${0.0005}`),
                    long: eval(`${el.cords.long}${z[parseInt(Math.random() * z.length)]}${0.0005}`)
                }
            })
        }
    }, [inf])

    useEffect(() => {
        if (friend !== null) {
            let z = ['+', '-']

            friends.map(el => {
                el.cords = {
                    lat: eval(`${el.cords.lat}${z[parseInt(Math.random() * z.length)]}${0.0005}`),
                    long: eval(`${el.cords.long}${z[parseInt(Math.random() * z.length)]}${0.0005}`)
                }
            })
        }
    }, [friend])

    const onGen = () => {
        let rand = infs[parseInt(Math.random() * infs.length)]

        if (rand !== undefined) {
            if (rand.isPositive === true) {
                setPer(per + rand.points < 100 ? per + rand.points : 100)
            } else {
                setPer(per - rand.points > 0 ? per - rand.points : 0)
            }

            setInf(rand)
        }
    }

    window.onscroll = e => {
        onGen()
    }

    return (
      <div className="con">
    
        <h2>About</h2>

        {data !== null &&
            <div className='invs-vert'>
                {data.map(el => {
                    if (el.contentType === 'headline') {
                        return <h4>{el.content}</h4>
                    } else {
                        return  <Card className='inv-vert'>
                            <CardContent>
                                <Typography>{el.content}</Typography>
                            </CardContent>
                        </Card>
                    }
                })}
            </div>
        }

        <h3>Двигайте колесо мыши</h3>
        <Typography>{per} % заинтересованости в НГТУ</Typography>
        {friend !== null && inf !== null &&
            <>
                <Typography>{friend.FIO} - {inf.label}</Typography>
            </>
        }
        <ReactMapGL {...view} mapboxApiAccessToken={token} onViewportChange={e => setView(e)}>
            {nav.filter((el, i) => i >= parseInt(params.index)).map(el => (
                <Marker latitude={el.cords.lat} longitude={el.cords.long}>
                <div className="con" onClick={() => setLoc(el.link)}>
                    <b>{el.title}</b>
                </div>
                </Marker>
            ))}
            {friends.map(el => (
                <Marker latitude={el.cords.lat} longitude={el.cords.long}>
                <div className="con" onClick={() => setFriend(el)}>
                    <b>{el.FIO}</b>
                </div>
                </Marker>
            ))}
        </ReactMapGL>
       
                
 
      </div>
    )
}

export default About


