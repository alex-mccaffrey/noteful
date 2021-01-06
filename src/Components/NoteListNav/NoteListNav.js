import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import CircleButton from '../../CircleButton/CircleButton'
import ApiContext from '../../ApiContext'
//import { countNotesForFolder } from '../../notes-helpers'
import './NoteListNav.css'
import config from '../../config'

export default class NoteListNav extends React.Component {

  static defaultProps ={
    onDeleteFolder: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = (e) => {
    e.preventDefault()
    const folderId = e.target.value

    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteFolder(folderId)
        this.props.onDeleteFolder(folderId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <h3>Folders</h3>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id} value={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </NavLink>
              <button
          className='Folder__delete'
          type='button'
          value={folder.id}
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
            </li>
          )}
        </ul>
       
      </div>
    )
  }
}