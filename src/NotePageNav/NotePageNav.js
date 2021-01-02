import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'

 class NotePageNav extends Component {
    static defaultProps = {
        history: {
          goBack: () => { }
        },
        match: {
          params: {}
        }
      }
      static contextType = ApiContext;

    render() {
        const { notes, folders, } = this.context
        const {noteId} = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        return (
            <div className='NotePageNav'>
                <button
                onClick={() => this.props.history.goBack()}
                className='NotePageNav_back-button'>
                    Back
                </button>
                {folder && (
                    <h3 className='NotePageNav_folder-name'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
}

export default NotePageNav
