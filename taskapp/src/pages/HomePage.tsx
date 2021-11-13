import { ReactElement, useState } from 'react'
import { Badge, Button, Form, FormControl, InputGroup, ListGroup, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

interface Props {

}

export default function HomePage({ }: Props): ReactElement {
    const navigate = useNavigate();
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>


            <div className="d-flex justify-content-between">
                <h2>
                    My List
                </h2>
                <Button variant="primary" size="sm" onClick={handleShow}>Add List</Button>
            </div>
            <ListGroup as="ol" numbered>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    action
                    onClick={() => navigate("/list")}
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">List Name </div>
                    </div>
                    <Badge bg="primary" pill>
                        14
                    </Badge>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">List Name </div>
                    </div>
                    <Badge bg="primary" pill>
                        14
                    </Badge>
                </ListGroup.Item>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">List Name </div>
                    </div>
                    <Badge bg="primary" pill>
                        14
                    </Badge>
                </ListGroup.Item>
            </ListGroup>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter a Name:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
