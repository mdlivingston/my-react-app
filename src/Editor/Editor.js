import React, { useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { db, storage } from '../firebase'
import { Button } from '@material-ui/core';

ClassicEditor.config = {
    mediaEmbed: {
        previewsInData: true
    }
}
const editorConfiguration = {
    toolbar: {
        items: [
            'heading', '|',
            'fontfamily', 'fontsize', '|',
            'alignment', '|',
            'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
            'link', '|',
            'outdent', 'indent', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'code', 'codeBlock', '|',
            'insertTable', '|',
            'undo', 'redo'
        ],
    },
    mediaEmbed: {
        previewsInData: true
    }
};



export default function EditorComp()
{
    useEffect(() =>
    {

        // get the whole collection
        db.collection("test")
            .get()
            .then(querySnapshot =>
            {
                const data = querySnapshot.docs.map(doc => doc.data());
                setEditorState(data[0].html);
                console.log(data); // array of cities objects
            });
    }, [])


    function printCode()
    {
        db.collection("test").doc("data").set({
            html: editorState
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
    const [editorState, setEditorState] = React.useState();

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Button variant="contained" style={{ backgroundColor: 'lightblue', marginBottom: '20px' }} onClick={printCode}>Save Data</Button>

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

    );

}

