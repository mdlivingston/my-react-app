import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { db } from '../firebase'
import { useAuth } from '../Vault/context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'

export default function AddExam()
{
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const { currentUser } = useAuth()

    function openModal()
    {
        setOpen(true)
    }

    function closeModal()
    {
        setOpen(false)
    }

    function handleSubmit(e)
    {
        e.preventDefault()

        if (!currentUser)
        {
            setName("")
            closeModal()
            return
        }

        db.exams.add({
            name: name,
            userId: currentUser.uid,
            createdAt: db.getCurrentTimeStamp(),
        })
        setName("")
        closeModal()
    }

    return (
        <>

            <Button onClick={openModal} variant="outline-success" size="sm">
                Add Exam &nbsp;
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Add Folder
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
