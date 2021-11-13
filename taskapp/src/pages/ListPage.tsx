import React, { ReactElement, useState } from 'react'
import { Badge, Button, Form, FormControl, ListGroup, Modal } from 'react-bootstrap'
import { IoMenuOutline, IoCloseOutline, IoAdd } from "react-icons/io5";


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

const sampleData2 = [
    {
        id: 1,
        name: "Task 1",
        description: "sample description 3",
        deadline: new Date(),
        selected: false,
    },
    {
        id: 2,
        name: "Task 2",
        description: "sample description 4",
        deadline: new Date(),
        selected: false,
    },
]
function alertClicked() {
    alert('You clicked the third ListGroupItem');
}

export default function ListPage({ }: Props): ReactElement {
    const [taskList, setTaskList] = useState(sampleData)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            <div onClick={handleShow} className="fs-3">
                                <IoAdd />
                            </div>
                            <div onClick={handleShow} className="fs-3">
                                <IoAdd />
                            </div></>)
                        : (<div onClick={handleShow} className="fs-3">
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
                            <IoMenuOutline />
                            <IoCloseOutline />
                        </div>

                    </ListGroup.Item>
                ))
                }
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
