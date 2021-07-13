import { useState } from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap'
import items from '../data/menu.json'
import DishComments from './DishComments'

// map ->
// const myArray = [1, 2, 3]
// const newArray = myArray.map(num => num * 2)
// newArray -> [2, 4, 6]

// so we're going to implement a state object into this Home component
// for having a state we need a Class Component
// so we need to convert this functional component into a class based one

const Home = () => {

    const [selectedDish, setSelectedDish] = useState(null)

    // this render method is the only mandatory one

    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <Col xs={12} md={6}>
                    <h1 className="text-center">Welcome To Strivestaurant!</h1>
                    <p className="text-center">We can only cook Pasta!</p>
                    <Carousel>
                        {
                            items.map(item => (
                                <Carousel.Item key={item.id}>
                                    {/* this are the slides of the carousel */}
                                    <img
                                        className="d-block w-100"
                                        src={item.image}
                                        alt="First slide"
                                        onClick={
                                            () => setSelectedDish(item)
                                            // this.setState({
                                            //     selectedDish: item
                                            // })
                                        }
                                    />
                                    <Carousel.Caption>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </Col>
            </Row>
            {/* now this Row should be mounted just if selectedDish is !== null */}
            {
                // LET'S WRITE THE COMMENTS SECTION

                // CONDITIONAL RENDER IN REACT.JS
                // SHORT CIRCUIT
                selectedDish && (
                    <DishComments dish={selectedDish} />
                )

                // WITH A TERNARY OPERATOR WITH A FALLBACK
                // this.state.selectedDish ? (
                //     <Row>
                //         {/* LET'S WRITE THE COMMENTS SECTION */}
                //         {this.state.selectedDish.comments.map(c => (
                //             <div>{c.comment}</div>
                //         ))}
                //     </Row>
                // ) : <p>I DON'T HAVE A SELECTED DISH YET!</p>
            }
        </Container>
    )
}

export default Home