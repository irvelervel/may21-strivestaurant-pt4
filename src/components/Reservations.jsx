// for having a state, you need a class

// 1) we're going to create our empty state, you want to make room for your data
// 2) we want to prepare our UI for showing the reservations

// 3) we want to fetch the reservations from the endpoint
// 4) we want to put them into the state


// WHAT HAPPENS WHEN YOU REFRESH THE PAGE AND SHOW RESERVATIONS.JSX?

// 1) STATE GETS INITIALIZED
// 2) RENDER() FIRES, MAPPING THE EMPTY RESERVATIONS ARRAY (-> not showing anything)
// 3) COMPONENTDIDMOUNT GETS FIRED



// initial render
// componentDidMount
// another render??!?

// EVERY TIME YOU CHANGE THE STATE YOU GET RENDER() FIRED AGAIN
// EVERY TIME YOU GET NEW PROPS YOU GET RENDER() FIRED AGAIN

import { Container, ListGroup, Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'

import Loading from "./Loading";
import Error from "./Error";
// import { parseISO, format } from 'date-fns'

import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import { useState } from "react";
import { useEffect } from 'react';

const Reservations = () => {

    // once you create the state for your component, you have to assign an initial value
    // for a string --> ''
    // for a number --> 0, 1
    // for an array --> []

    // constructor(props) {
    //     super(props)
    //     console.log('THIS IS CONSTRUCTOR')
    //     this.myFunction = this.myFunction.bind(this)
    // }

    const [reservations, setReservations] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)


    // the perfect place for doing a fetch in a React Component
    // we need a method that we're sure is going to be called just ONCE
    // for every lifetime of our component

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                let response = await fetch('https://striveschool-api.herokuapp.com/api/reservation')
                if (response.ok) {
                    // we got the reservations array!
                    // console.log(response)
                    let data = await response.json()
                    setReservations(data)
                    setIsLoading(false)
                    setIsError(false)
                } else {
                    setIsLoading(false)
                    setIsError(true)
                }
            } catch (error) {
                console.log('BIG ERRORRRR!!', error)
                setIsLoading(false)
                setIsError(true)
            }
        }
        fetchReservation()
    }, [])

    // you want the user to immediately be entertained by some content
    // after they are presented with something to see, we can do our expensive operations
    // under the hood, in the componentDidMount

    // from 2021-11-27T20:00:00.000Z
    // into Saturday, November the 27th

    // Date()

    console.log('THIS IS RENDER')

    return (
        <Container>
            <Row className="justify-content-center my-5">
                <Col xs={12} md={6} className="text-center">
                    <h1>RESERVATIONS GO HERE!</h1>
                    <h3>HERE ARE THE CURRENT RESERVATIONS!</h3>

                    {isError === true && <Error />}
                    {isLoading === true
                        ? <Loading />
                        : <ListGroup>
                            {reservations.map(r => (
                                <ListGroup.Item key={r._id}>
                                    From: {r.name} - For: {r.numberOfPeople} - At: {format(parseISO(r.dateTime), 'dd MMMM yyyy - HH:mm')}
                                    {/* we want to format dateTime, which is currently a string,
                                    into something more readable */}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    }

                </Col>
            </Row>
        </Container>
    )
}

export default Reservations