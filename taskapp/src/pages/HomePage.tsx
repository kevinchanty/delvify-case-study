import { ReactElement, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Badge, Button, FormControl, ListGroup, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { ListContext, ListContextState, ListValue } from '../context/ListContext';

interface Props {
    setListContextState: (state: ListContextState) => void
}

export default function HomePage({ setListContextState }: Props): ReactElement {
    const navigate = useNavigate();

    const listContext = useContext(ListContext)
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const handleClose = () => setShowAdd(false);
    const handleShow = () => setShowAdd(true);

    // Simuluate Load
    const ref = useRef<ListContextState>({
        status: 'LOADED',
        value: [
            {
                id: 1,
                user_id: 12,
                name: "List 1",
                is_deleted: false,
                created_at: new Date().toString(),
                updated_at: new Date().toString(),
            },
        ],
    })
    
    return (
        <>
            {/* Top Bar */}
            <div className="d-flex justify-content-between">
                <h2>
                    My List
                </h2>
                <Button variant="primary" size="sm" onClick={handleShow}>Add List</Button>
                <Button variant="primary" size="sm" onClick={() => setListContextState(ref.current)}>Load</Button>
            </div>

            {/* List */}
            <ListGroup as="ol" numbered>
                {listContext.status === "LOADED"
                    ?
                    listContext.value.map(list => (<ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        action
                    >
                        <div className="ms-2 me-auto flex-fill" onClick={() => navigate(`/list/${list.id}`)}>
                            <div className="fw-bold">{list.name}</div>
                        </div>
                        <div className="fs-3" onClick={() => setShowDelete(true)}>
                            <IoCloseOutline />
                        </div>
                    </ListGroup.Item>))
                    : <div>Loading...</div>
                }
            </ListGroup>

            {/* Add Modal */}
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

            {/* Delete Modal */}
            <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to Delete LISTNAME ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>
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
