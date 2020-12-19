import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; <a href="https://belegic-portfolio.web.app/" target='-blank'>Belegic</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
