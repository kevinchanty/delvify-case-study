import { ReactElement, useState } from 'react'
import { Badge, Button, Form, FormControl, ListGroup, Modal } from 'react-bootstrap'
import { IoAdd, IoTrashOutline, IoArrowUndoOutline, IoCreateOutline, IoCheckmarkOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { reverse } from 'dns';
interface Props {

}


const sampleData = [
    {
        id: 1,
        name: "Task 1",
        description: "sample description 1",
        deadline: new Date(),
        isSelected: false,
        isCompleted: false,
    },
    {
        id: 2,
        name: "Task 2",
        description: "sample description 2",
        deadline: new Date(),
        isSelected: false,
        isCompleted: true,
    },
]

export default function ListPage({ }: Props): ReactElement {
    const [taskList, setTaskList] = useState(sampleData)

    const [showAdd, setShowAdd] = useState(false);
    const [addState, setAddState] = useState({ name: "", description: "", deadline: new Date(), target: [] as number[] });

    const [showEdit, setShowEdit] = useState(false);
    const [editState, setEditState] = useState({ name: "", description: "", deadline: new Date(), target: [] as number[] });

    const [deleteState, setDeleteState] = useState({ show: false, target: [] as number[] });
    const [showMove, setShowMove] = useState(false);


    function handleSelected(index: number, checked: boolean) {
        setTaskList(prevTaskList => {
            let newState = [...prevTaskList]
            newState[index].isSelected = checked
            return newState
        })
    }

    const isMultiSelected = taskList.some(task => task.isSelected)
    const multiTarget = taskList.reduce<number[]>(
        (prev, task, index) => {
            if (task.isSelected) {
                prev.push(index)
            }
            return prev
        }, [])
    const deelteTargetName = taskList.reduce<string[]>(
        (prev, task, index) => {
            if (deleteState.target.includes(index)) {
                prev.push(task.name)
            }
            return prev
        }, [])

    return (
        <>
            {/* Top Bar */}
            <div className="d-flex justify-content-between">
                <h2>LIST NAME</h2>
                <div className="d-flex">
                    {isMultiSelected
                        // Multi-Select Icons
                        ? (<>
                            <div onClick={() => setShowMove(true)} className="fs-3">
                                <IoArrowUndoOutline />
                            </div>
                            <div onClick={() => setDeleteState(prev => ({ show: true, target: multiTarget }))} className="fs-3">
                                <IoTrashOutline />
                            </div>
                        </>)
                        : (<div onClick={() => setShowAdd(true)} className="fs-3">
                            <IoAdd />
                        </div>)
                    }
                </div>
            </div>

            {/* Task List */}
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
                            checked={task.isSelected}
                            onChange={() => handleSelected(index, !task.isSelected)}
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
                        {/* Task Icons */}
                        <div className="fs-3 d-flex">
                            <div onClick={() => setShowMove(true)}>
                                <IoCheckmarkOutline />
                            </div>
                            <div onClick={() => setShowEdit(true)}>
                                <IoCreateOutline />
                            </div>
                            <div onClick={() => setShowMove(true)}>
                                <IoArrowUndoOutline />
                            </div>
                            <div onClick={() => setDeleteState(prev => ({show: true, target:[index]}))}>
                                <IoTrashOutline />
                            </div>
                        </div>


                    </ListGroup.Item>
                ))
                }
            </ListGroup>

            {/* Add Modal */}
            <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>New Task</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Label>
                        Name:
                    </Form.Label>
                    <FormControl aria-describedby="basic-addon3" value={addState.name} onChange={e => setAddState(prev => ({ ...prev, name: e.target.value, }))} />
                    <Form.Label>
                        Description
                    </Form.Label>
                    <FormControl aria-describedby="basic-addon3" value={addState.description} onChange={e => setAddState(prev => ({ ...prev, description: e.target.value, }))} />
                    <Form.Label>
                        Deadline:
                    </Form.Label>
                    <DatePicker
                        onChange={(value: Date) => setAddState(prev => (
                            {
                                ...prev,
                                deadline: value
                            }
                        )
                        )}
                        selected={addState.deadline}
                        showTimeSelect
                        dateFormat="Pp"
                    />

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAdd(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShowAdd(false)}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit TASKNAME</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Label>
                        Name:
                    </Form.Label>
                    <FormControl aria-describedby="basic-addon3" value={editState.name} onChange={e => setEditState(prev => ({ ...prev, name: e.target.value, }))} />
                    <Form.Label>
                        Description
                    </Form.Label>
                    <FormControl aria-describedby="basic-addon3" value={editState.description} onChange={e => setEditState(prev => ({ ...prev, description: e.target.value, }))} />
                    <Form.Label>
                        Deadline:
                    </Form.Label>
                    <DatePicker
                        onChange={(value: Date) => setEditState(prev => (
                            {
                                ...prev,
                                deadline: value
                            }
                        )
                        )}
                        selected={editState.deadline}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEdit(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShowEdit(false)}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={deleteState.show} onHide={() => setDeleteState(prev => ({ ...prev, show: false }))}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Confirm to Delete ${deelteTargetName.join(", ")} ?`}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteState(prev => ({ ...prev, show: false }))}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => setDeleteState(prev => ({ ...prev, show: false }))}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Move Modal */}
            <Modal show={showMove} onHide={() => setShowMove(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Move TASKNAME</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Label>
                        Destination:
                    </Form.Label>
                    <Form.Select>
                        <option>List One</option>
                    </Form.Select>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowMove(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShowMove(false)}>
                        Move
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
