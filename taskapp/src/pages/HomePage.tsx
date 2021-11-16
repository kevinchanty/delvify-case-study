import { ReactElement, useCallback, useContext, useState } from 'react'
import { Button, FormControl, ListGroup, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { ListContext, ListContextState } from '../context/ListContext';

interface Props {
    setListContextState: (state: ListContextState) => void
    loadLists: ()=> void
}

export default function HomePage({ setListContextState, loadLists }: Props): ReactElement {
    const navigate = useNavigate();

    const listContext = useContext(ListContext)
    const [addState, setAddState] = useState({ show: false, name: "" });
    const [deleteState, setDeleteState] = useState({ show: false, target: 0 , name: ""});
    const handleClose = () => setAddState({ show: false, name: "" });
    const handleShow = () => setAddState({ show: true, name: "" });

    const addSubmit = useCallback(async () => {
        const body = {
            name: addState.name,
        }
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        let res: Response;
        try {
            res = await fetch(`http://localhost:3100/lists`, {
                headers,
                method: "POST",
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error(`Failed to POST:`, error);
            return
        }
        let json;
        try {
            json = await res.json();
        } catch (error) {
            console.error(`Failed decode json, POST:`, error);
            return
        }
        if (json.error) {
            console.error(`Failed to POST API:`, json.error);
        }
        setAddState({ show: false, name: "" });
        loadLists();
    },[loadLists,setAddState,addState],)

    const deleteSubmit = useCallback(async () => {
        const body = {
            listId: deleteState.target
        }
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        let res: Response;
        try {
            res = await fetch(`http://localhost:3100/lists`, {
                headers,
                method: "DELETE",
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error(`Failed to POST:`, error);
            return
        }
        let json;
        try {
            json = await res.json();
        } catch (error) {
            console.error(`Failed decode json, POST:`, error);
            return
        }
        if (json.error) {
            console.error(`Failed to POST API:`, json.error);
        }
        setDeleteState({ show: false, target: 0 , name: ""});
        loadLists();
    },[loadLists,setDeleteState,deleteState],)

    return (
        <>
            {/* Top Bar */}
            <div className="d-flex justify-content-between">
                <h2>
                    My List
                </h2>
                <Button variant="primary" size="sm" onClick={handleShow}>Add List</Button>
            </div>

            {/* List */}
            <ListGroup as="ol" numbered>
                {listContext.status === "LOADED"
                    ?
                    listContext.value.map(list => (<ListGroup.Item
                        key={list.id}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        action
                    >
                        <div className="ms-2 me-auto flex-fill" onClick={() => navigate(`/list/${list.id}`)}>
                            <div className="fw-bold">{list.name}</div>
                        </div>
                        <div className="fs-3" onClick={() => setDeleteState({ show: true, target: list.id , name: list.name})}>
                            <IoCloseOutline />
                        </div>
                    </ListGroup.Item>))
                    : <div>Loading...</div>
                }
            </ListGroup>

            {/* Add Modal */}
            <Modal show={addState.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter a Name:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl value={addState.name} onChange={e => setAddState({ show: true, name: e.target.value })} aria-describedby="basic-addon3" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={deleteState.show} onHide={()=> setDeleteState({ show: false, target: 0 , name: ""})}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Confirm to Delete ${deleteState.name} ?`}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteState({ show: false, target: 0 , name: ""})}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
