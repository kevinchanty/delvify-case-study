import React, { ReactElement, useState } from 'react'
import { Badge, Button, Form, FormControl, ListGroup, Modal } from 'react-bootstrap'
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";


interface Props {

}

function alertClicked() {
    alert('You clicked the third ListGroupItem');
}

export default function ListPage({ }: Props): ReactElement {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="d-flex justify-content-between">
                <h2>LIST NAME</h2>
                <Button variant="primary" size="sm" onClick={handleShow}>Add Task</Button>
            </div>
            <ListGroup as="ol" numbered>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                // action onClick={alertClicked}
                >
                    <div className="ms-2 me-auto">
                        <div className="d-flex">
                            <div className="fw-bold me-3">Task 1</div>
                            <Badge bg="primary" pill >
                                {new Date().toDateString()}
                            </Badge>
                        </div>
                        <div>
                            Description
                        </div>
                    </div>
                    <div className="fs-3">
                        <IoMenuOutline />
                        <IoCloseOutline />
                    </div>

                </ListGroup.Item>
            </ListGroup>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New List</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Label>
                        Name:
                    </Form.Label>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                    <Form.Label>
                        Description
                    </Form.Label>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                    <Form.Label>
                        Deadline:
                    </Form.Label>
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
