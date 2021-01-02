import React, { Component } from 'react'
import { NavLink, Link} from 'react-router-dom'
import ApiContext from '../ApiContext'
import {countNotesForFolder} from '../notes-helpers'
import './NoteListNav.css'


 class NoteListNav extends Component {
    static contextType= ApiContext;

    render() {
        const {folders=[], notes=[]} = this.context
        return (
            <div className='NoteListNav'>
                <ul className='NoteListNav_list'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                            className='NoteListNave_folder-link'
                            to={`/folder/${folder.id}`}>
                            <span className='NotesListNav_num-notes'>
                                {countNotesForFolder(notes, folder.id)}
                            </span>
                            {folder.name}
                            </NavLink>
                        </li>)}
                </ul>
                <div className='NotesListNav_button-wrapper'>
                    <button 
                    tag={Link}
                    to='/add-folder'
                    className='NoteListNav_add-folder-button'>
                        New Folder
                    </button>
                </div>
            </div>
        )
    }
}

export default NoteListNav
