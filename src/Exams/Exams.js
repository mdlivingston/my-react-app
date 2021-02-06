import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../Vault/context/AuthContext';
import AddExam from './AddExam';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Exams()
{
    const { currentUser } = useAuth()
    const [exams, setExams] = useState([])

    useEffect(() =>
    {
        if (!currentUser)
        {
            console.error("Error: Not Signed In!");
            return
        }

        return db.exams
            .where("userId", "==", currentUser.uid)
            .orderBy("createdAt")
            .onSnapshot(snapshot =>
            {
                setExams(snapshot.docs.map(db.formatDoc))
            })

    }, [currentUser])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h2>Exams</h2>
            <AddExam></AddExam>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '90%', padding: "20px" }}>
                {exams && (
                    exams.map(e => (
                        <Button
                            to={{ pathname: `/exams/${e.id}` }}
                            as={Link}>
                            {e.name}
                        </Button>
                    )))
                }
            </div>
        </div>
    );
}

