import React, { ReactElement, useState } from 'react'
import { Badge, Button, Form, FormControl, ListGroup, Modal } from 'react-bootstrap'
import { IoAdd, IoTrashOutline, IoArrowUndoOutline, IoCreateOutline, IoCheckmarkOutline } from "react-icons/io5";


interface Props {

}

const sampleData = [
    {
        id: 1,
        name: "Task 1",
        description: "sample description 1",
        deadline: new Date(),
        selected: false,
    },
    {
        id: 2,
        name: "Task 2",
        description: "sample description 2",
        deadline: new Date(),
        selected: false,
    },
]

function alertClicked() {
    alert('You clicked the third ListGroupItem');
}

export default function ListPage({ }: Props): ReactElement {
    const [taskList, setTaskList] = useState(sampleData)
    
    const [showAdd, setShowAdd] = useState(false);
    const handleClose = () => setShowAdd(false);
    const handleShowDelete = () => setShowAdd(true);

    const [showDelete, setShowDelete] = useState(false);
    const [showMove, setShowMove] = useState(true);


    function mySetSelected(index: number, checked: boolean) {
        console.log(checked)
        setTaskList(prevTaskList => {
            let newState = [...prevTaskList]
            newState[index].selected = checked
            return newState
        })
        console.log(taskList)
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <h2>LIST NAME</h2>
                <div className="d-flex">
                    {taskList.some(task => task.selected)
                        ? (<>
                            <div onClick={handleShowDelete} className="fs-3">
                                <IoArrowUndoOutline />
                            </div>
                            <div onClick={handleShowDelete} className="fs-3">
                                <IoTrashOutline />
                            </div></>)
                        : (<div onClick={handleShowDelete} className="fs-3">
                            <IoAdd />
                        </div>)
                    }
                </div>


            </div>
            <ListGroup as="ol">
                {taskList.map((task, index) => (
                    <ListGroup.Item
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    // action onClick={alertClicked}
                    >
                        <Form.Check
                            as="input"
                            type="checkbox"
                            id={`default-checkbox`}
                            checked={task.selected}
                            onChange={() => mySetSelected(index, !task.selected)}
                        />
                        <div className="ms-2 me-auto">
                            <div className="d-flex">
                                <div className="fw-bold me-3">{task.name}</div>
                                <Badge bg="primary" pill >
                                    {task.deadline.toDateString()}
                                </Badge>
                            </div>
                            <div>
                                {task.description}
                            </div>
                        </div>
                        <div className="fs-3">
                            <IoCheckmarkOutline/>
                            <IoCreateOutline />
                            <IoArrowUndoOutline />
                            <IoTrashOutline />
                        </div>

                    </ListGroup.Item>
                ))
                }
            </ListGroup>

            {/* Add Modal */}
            <Modal show={showAdd} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Task</Modal.Title>
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

            
            {/* Delete Modal */}
            <Modal show={showDelete} onHide={()=>setShowDelete(false)}>
            <Modal.Header closeButton>
                    <Modal.Title>Confirm to Delete LISTNAME ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowDelete(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={()=>setShowDelete(false)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            
            {/* Move Modal */}
            <Modal show={showMove} onHide={()=>setShowMove(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit TASKNAME</Modal.Title>
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
                    <Button variant="secondary" onClick={()=>setShowMove(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>setShowMove(false)}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
