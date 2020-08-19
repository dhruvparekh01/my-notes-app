import { useState, useEffect, useContext } from 'react'
import request from './ApiSetup'
import { UserContext } from './UserContext'

// Function to extract payload from a jwt token
function parseJwt (token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)  
}

// Custom hook to make all the API calls and also store the results in its state for all the components
function useNotes() {
    const [notes, setNotes] = useState([])
    const {user} = useContext(UserContext)
 
    // Empty the notes state variable on user logout or if the session ends
    useEffect(() => {
        if (user === null) {
            setNotes([])
        }
    }, [user])

    // Make API call to fetch notes on mount
    useEffect(() => {
        async function fetchNotes() {
            setNotes(await getNotes())
        }
       fetchNotes()
    }, [])
 
    async function addNote(note) {
        // Attach the user reference in the note and make API call
        const user = parseJwt(sessionStorage.getItem('jwt'))
        note.userId = user.sub
        await postNote(note)
        setNotes(prev => [...prev, note])
    }

    async function removeNote(note) {
        await request.delete(`/notes/${note._id}`)
        
        // Remove the note from the 'notes' state variable
        let newNotes = notes.slice()
        newNotes.splice(notes.indexOf(note), 1)
        setNotes(newNotes)
    }

    async function editNote(newNote) {
        await request.put(`/notes/${newNote._id}`, newNote)
        
        // Replace the note in the 'notes' state variable
        let newNotes = notes.slice()
        newNotes[notes.findIndex(note => note._id === newNote._id)] = newNote
        setNotes(newNotes)
    }

    async function getNotes() {
        const response = await request.get('/notes/')
        return response.data
    }

    async function postNote(note) {
        note.modified = new Date()
        await request.post('/notes/', note)
    }

    async function toggleLiked(note) {
        note.liked = !note.liked
        await request.put(`/notes/${note._id}`, note)
        
        // "Like" the note in the state variable
        let newNotes = notes.slice()
        newNotes[notes.findIndex(curNote => curNote._id === note._id)] = note
        setNotes(newNotes)
    }
 
    return { notes, addNote, removeNote, editNote, toggleLiked }
}

export default useNotes
