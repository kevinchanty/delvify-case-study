import { ReactElement, useCallback, useContext, useEffect, useState } from 'react'
import { Badge, Button, Form, FormControl, ListGroup, Modal } from 'react-bootstrap'
import { IoAdd, IoTrashOutline, IoArrowUndoOutline, IoCreateOutline, IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router';
import { ListContext } from '../context/ListContext';
interface Props {

}

export type Task = {
    id: number,
    list_id: number,
    name: string,
    description: string,
    deadline: Date,
    is_completed: boolean,
    is_deleted: boolean,
    created_at: string,
    updated_at: string,
    isSelected: boolean
}

const sampleData = [
    {
        id: 1,
        list_id: 1,
        name: "Task 1",
        description: "sample description 1",
        deadline: new Date(),
        isSelected: false,
        is_completed: false,
        is_deleted: false,
        created_at: "2021-11-15T03:46:30.423Z",
        updated_at: "2021-11-15T03:46:30.423Z",
    },

]

export default function ListPage({ }: Props): ReactElement {
    const { listId } = useParams()
    const listContext = useContext(ListContext)

    const [taskList, setTaskList] = useState<Task[]>(sampleData);
    const [loadStatus, setLoadStatus] = useState<"LOADING" | "ERROR" | "LOADED">("LOADING");

    const [showAdd, setShowAdd] = useState(false);
    const [addState, setAddState] = useState({ name: "", description: "", deadline: new Date() });

    const [editState, setEditState] = useState({ show: false, name: "", description: "", deadline: new Date(), target: 0 });

    const [deleteState, setDeleteState] = useState({ show: false, target: [] as number[] });
    const deelteTargetName = taskList!.reduce<string[]>(
        (prev, task) => {
            if (deleteState.target.includes(task.id)) {
                prev.push(task.name)
            }
            return prev
        }, [])
    const [moveState, setMoveState] = useState({ show: false, target: [] as number[] });
    const moveTargetName = taskList!.reduce<string[]>(
        (prev, task) => {
            if (moveState.target.includes(task.id)) {
                prev.push(task.name)
            }
            return prev
        }, [])

    function handleSelected(index: number, checked: boolean) {
        setTaskList(prevTaskList => {
            let newState = [...prevTaskList]
            newState[index].isSelected = checked
            return newState
        })
    }
    const isMultiSelected = taskList!.some(task => task.isSelected)
    const multiTarget = taskList!.reduce<number[]>(
        (prev, task) => {
            if (task.isSelected) {
                prev.push(task.id)
            }
            return prev
        }, [])

    const loadTaskList = useCallback(async () => {
        const res = await fetch(`http://localhost:3100/tasks/${listId}`);
        const json = await res.json();

        if (json.error) {
            console.log(json.error);
            setLoadStatus("ERROR")
            return
        };

        const result = json.map((task: Task) => ({
            ...task,
            deadline: new Date(task.deadline)
        }))

        setLoadStatus("LOADED");
        setTaskList(result);

    }, [setTaskList,listId])

    const addSubmit = useCallback( async () =>{
        const body = {
            listId: listId,
            name: addState.name,
            description: addState.description,
            deadline: addState.deadline,
        }
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        let res: Response;
        try {
            res = await fetch(`http://localhost:3100/tasks`, {
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
        setShowAdd(false);
        setAddState({ name: "", description: "", deadline: new Date() });
        loadTaskList();
    },[setShowAdd,setAddState,loadTaskList,listId,addState])

    const editSubmit = useCallback(async () => {
        const body = {
            id: editState.target,
            name: editState.name,
            description: editState.description,
            deadline: editState.deadline,
        }
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        let res: Response;
        try {
            res = await fetch(`http://localhost:3100/tasks`, {
                headers,
                method: "PUT",
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
        setEditState({ show: false, name: "", description: "", deadline: new Date(), target: 0 });
        loadTaskList();
    }, [setEditState, loadTaskList, editState])

    const toogleCompleted = useCallback(async (id:number, isCompleted: boolean) => {
        const body = {
            id,
            isCompleted,
        }
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        let res: Response;
        try {
            res = await fetch(`http://localhost:3100/tasksStatus`, {
                headers,
                method: "PUT",
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
        loadTaskList();
    },[loadTaskList])

    
    const deleteSubmit = useCallback(async () => {
        const body = {
            id: editState.target,
            name: editState.name,
            description: editState.description,
            deadline: editState.deadline,
        }
        let headers: Headers = new Headers();
        headers.append("Content-Type", "application/json");
        let res: Response;
        try {
            res = await fetch(`http://localhost:3100/tasks`, {
                headers,
                method: "PUT",
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
        setEditState({ show: false, name: "", description: "", deadline: new Date(), target: 0 });
        loadTaskList();
    }, [setEditState, loadTaskList, editState])
    useEffect(() => {
        loadTaskList()
    }, [loadTaskList])

    return (
        <>
            {/* Top Bar */}
            <div className="d-flex justify-content-between">
                <h2>{listContext.status === "LOADED" ? listContext.value.find(list => list.id === parseInt(listId!))?.name : "Loading..."}</h2>
                <div className="d-flex">
                    {isMultiSelected
                        // Multi-Select Icons
                        ? (<>
                            <div onClick={() => setMoveState({ show: true, target: multiTarget })} className="fs-3">
                                <IoArrowUndoOutline />
                            </div>
                            <div onClick={() => setDeleteState({ show: true, target: multiTarget })} className="fs-3">
                                <IoTrashOutline />
                            </div>
                        </>)
                        : (<div onClick={() => setShowAdd(true)} className="fs-3">
                            <IoAdd />
                        </div>)
                    }
                </div>
            </div>

            {/*  Task List */}
            {loadStatus === "LOADED"
                ? (<ListGroup as="ol">
                    {taskList.map((task, index) => (
                        <ListGroup.Item
                            key={task.id}
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
                                    <div className="fw-bold me-2">{task.name}</div>
                                    <Badge bg="primary" className="me-2" pill >
                                        {task.deadline.toDateString() + " " + task.deadline.toLocaleTimeString()}
                                    </Badge>
                                    {task.is_completed
                                        ? <Badge bg="success" className="me-2" pill >
                                            Completed
                                        </Badge>
                                        : null}
                                </div>
                                <div>
                                    {task.description}
                                </div>
                            </div>
                            {/* Task Icons */}
                            <div className="fs-3 d-flex">
                                <div onClick={() => toogleCompleted(task.id, !task.is_completed)}>
                                    {task.is_completed
                                        ? <IoCloseOutline />
                                        : <IoCheckmarkOutline />}
                                </div>
                                <div onClick={() => setEditState({ show: true, name: task.name, description: task.description, deadline: new Date(task.deadline), target: task.id })}>
                                    <IoCreateOutline />
                                </div>
                                <div onClick={() => setMoveState({ show: true, target: [task.id] })}>
                                    <IoArrowUndoOutline />
                                </div>
                                <div onClick={() => setDeleteState({ show: true, target: [task.id] })}>
                                    <IoTrashOutline />
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))
                    }
                </ListGroup>)
                : <div>Loading...</div>
            }

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
                    <Button variant="primary" onClick={() => addSubmit()}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={editState.show} onHide={() => setEditState({ show: false, name: "", description: "", deadline: new Date(), target: 0 })}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Edit ${editState.name}`}</Modal.Title>
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
                    <Button variant="secondary" onClick={() => setEditState({ show: false, name: "", description: "", deadline: new Date(), target: 0 })}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => editSubmit()}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={deleteState.show} onHide={() => setDeleteState({ show: false, target: [] })}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Confirm to Delete ${deelteTargetName.join(", ")} ?`}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteState({ show: false, target: [] })}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => setDeleteState({ show: false, target: [] })}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Move Modal */}
            <Modal show={moveState.show} onHide={() => setMoveState({ show: false, target: [] })}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Move ${moveTargetName.join(", ")}`}</Modal.Title>
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
                    <Button variant="secondary" onClick={() => setMoveState({ show: false, target: [] })}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setMoveState({ show: false, target: [] })}>
                        Move
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
