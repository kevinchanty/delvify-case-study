import { ReactElement, useState } from 'react'
import { Badge, Button, FormControl, ListGroup, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";


interface Props {

}

export default function HomePage({ }: Props): ReactElement {
    const navigate = useNavigate();

    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const handleClose = () => setShowAdd(false);
    const handleShow = () => setShowAdd(true);

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
                >
                    <div className="ms-2 me-auto flex-fill" onClick={() => navigate("/list")}>
                        <div className="fw-bold">List Name </div>
                    </div>
                    <div className="fs-3" onClick={()=>setShowDelete(true)}>
                        <IoCloseOutline />
                    </div>
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

            <Modal show={showAdd} onHide={handleClose}>
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

            <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to Delete LISTNAME ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowDelete(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
