import React, { Component } from 'react'
import {Link} from 'react-router-dom'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { getNotesForFolder} from '../notes-helpers.js'
import './NoteListMain.css'

 class NoteListMain extends Component {
     static defaultProps = {
         match: {
             params: {}
         }
     }
     static contextType = ApiContext


    render() {
        const {folderId} = this.props.match.params
        const {notes=[]} = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)

        return (
            <section className='NoteListMain'>
                <ul>
                    {notesForFolder.map(note =>
                        <li key={note.id}>
                            <Note 
                            id={note.id}
                            name={note.name}
                            modified={note.modified} />
                        </li>)}
                </ul>
                <div className='NoteListMain_button-container'>
                    <button 
                    tag={Link}
                    to='/add-note'
                    className='NoteListMain_add-note-button'>Add Note</button>
                </div>
            </section>
        )
    }
}

export default NoteListMain
