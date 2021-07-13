import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

// name -> string
// phone -> number | string
// numberOfPeople -> number | string
// smoking -> boolean
// dateTime -> string
// specialRequests -> string

// every input of our form will be CONTROLLED
// this means that its value will be always stored in our component's state

// for having a CONTROLLED FORM we need a component STATE

const ReservationForm = () => {

    const [reservation, setReservation] = useState({
        name: '',
        phone: '',
        numberOfPeople: 1,
        smoking: false,
        dateTime: '',
        specialRequests: '',
    })

    const handleInput = (key, value) => {
        setReservation({
            ...reservation,
            // this will carry over every existing property, name, phone, etc.
            [key]: value
        })
    }

    const submitReservation = async (e) => {
        e.preventDefault()
        console.log(reservation)
        // now let's send this reservation object to the API
        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/reservation", {
                method: 'POST',
                body: JSON.stringify(reservation),
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization if you have it
                }
            })
            if (response.ok) {
                // if we fall here
                // everything went well!
                alert('RESERVATION SAVED!')
                setReservation({
                    name: '',
                    phone: '',
                    numberOfPeople: 1,
                    smoking: false,
                    dateTime: '',
                    specialRequests: '',
                })
            } else {
                // we fall here if an error occurred from the server
                // 400
                // 401
                // 404
                // 500
                alert('SOMETHING WENT WRONG ON THE SERVER')
            }
        } catch (error) {
            // generic error section
            console.log(error)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center my-5">
                <Col xs={12} md={6} className="text-center">
                    <h2>Book your table NOW!</h2>
                    <Form onSubmit={submitReservation}>
                        {/* every Form.Group in react bootstrap is input field */}
                        <Form.Group>
                            <Form.Label>Your name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={reservation.name}
                                onChange={(e) => {
                                    handleInput('name', e.target.value)
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Your phone</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter your phone"
                                value={reservation.phone}
                                onChange={(e) => handleInput('phone', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>How many people are you?</Form.Label>
                            <Form.Control as="select"
                                value={reservation.numberOfPeople}
                                onChange={(e) => handleInput('numberOfPeople', e.target.value)}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="Do you smoke?"
                                checked={reservation.smoking}
                                onChange={(e) => handleInput('smoking', e.target.checked)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Date and time</Form.Label>
                            <Form.Control type="datetime-local"
                                value={reservation.dateTime}
                                onChange={(e) => handleInput('dateTime', e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Do you have any special request?</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                value={reservation.specialRequests}
                                onChange={(e) => handleInput('specialRequests', e.target.value)} />
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Save reservation
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}


export default ReservationForm