import React from 'react'
import Footer from './Footer.js'
import Navbar from './Navbar.js'
import { useState, useEffect } from 'react';
import { Route, Routes, } from 'react-router-dom';
import Contact from './Contact.js';
import EditNotes from './EditNote.js';
import NotesTable from './NotesTable.js';
import Home from './Home.js';
import ViewNotesPage from './ViewNotesPage.js';


function Auth() {
    const [userNotes, setUsernotes] = useState(null)
    const [content, setContent] = useState()
    const [topic, setTopic] = useState()

    const deleteFech = async (index) => {
        const deleteId = userNotes[index]._id
        try {
            await fetch(`https://onotesbackend-production.up.railway.app/usernotes`, {
                method: "DELETE", credentials: "same-origin",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: deleteId })
            })
        } catch {
            console.log("nonono")
        }
    }

    const viewNote = (index) => {
        setTopic(() => {
            const topic = userNotes[index].topic
            return topic
        })
        setContent(() => {
            const content = userNotes[index].content
            return content
        })
    }

    const deleteNote = async (index) => {
        await deleteFech(index)
        fechUserNotes()
    }


    const fechUserNotes = async () => {
        try {
            const data = await fetch(`https://onotesbackend-production.up.railway.app/usernotes`, {
                credentials: "same-origin",
                method: "GET"
            });
            console.log(data)
            const notes = await data.json()
            setUsernotes(notes)
        } catch (err) {
            console.log(err)
            console.log("fail to get notes from server")
        }
    }
    useEffect(() => {
        fechUserNotes()
    }, [])

    return (
        <>
            <Navbar />
            <Routes>
                <Route path='home' element={<Home />} />
                <Route path='mynotes' element={<NotesTable viewNote={viewNote} deleteNote={deleteNote} userNotes={userNotes} />} />
                <Route path='viewnotes' element={<ViewNotesPage topic={topic} content={content} />} />
                <Route path='editnotes' element={<EditNotes fechUserNotes={fechUserNotes} userNotes={userNotes} />} />
                <Route path='contact' element={<Contact />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Auth
