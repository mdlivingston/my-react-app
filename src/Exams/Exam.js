import React, { useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { db } from '../firebase'
import { useAuth } from '../Vault/context/AuthContext';
import { Button } from '@material-ui/core';
const editorConfiguration = {
    toolbar: {
        items: [
            'heading', '|',
            'bold', 'italic', '|',
            'link', '|',
            'outdent', 'indent', '|',
            'bulletedList', 'numberedList', '|',
            'insertTable', '|',
            'undo', 'redo'
        ],
    },
    mediaEmbed: {
        previewsInData: true
    }
};

export default function Exam()
{
    const { currentUser } = useAuth()
    const [editorState, setEditorState] = React.useState();

    useEffect(() =>
    {
        if (!currentUser)
        {
            console.error("Error: Not Signed In!");
            return
        }

        db.editor
            .where("userId", "==", currentUser.uid)
            .get('data')
            .then(querySnapshot =>
            {
                const data = querySnapshot.docs.map(doc => doc.data());
                if (data.length === 0)
                    return
                setEditorState(data[0].html);
            });
    }, [currentUser])

    function saveEditorData()
    {
        if (!currentUser)
        {
            console.error("Error: Not Signed In!");
            return
        }

        db.editor.doc("data").set({
            html: editorState,
            userId: currentUser.uid
        })
            .then(function ()
            {
                console.log("Document successfully written!");
            })
            .catch(function (error)
            {
                console.error("Error writing document: ", error);
            });
    }

    return (
        <div>
            <Button variant="contained" style={{ backgroundColor: 'lightblue', marginBottom: '20px' }} onClick={saveEditorData}>Save Data</Button>

            <div style={{ width: '1000px' }}>
                <CKEditor
                    editor={ClassicEditor}
                    data={editorState}
                    config={editorConfiguration}
                    onReady={editor =>
                    {
                    }}
                    onChange={(event, editor) =>
                    {
                        const data = editor.getData();
                        setEditorState(data)
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) =>
                    {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) =>
                    {
                        console.log('Focus.', editor);
                    }}
                />

            </div>

            <h3>Firestore HTML</h3>

            { editorState ? <p dangerouslySetInnerHTML={{ __html: editorState }}></p> : ''}
        </div>
    )
}
