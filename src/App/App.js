import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from '../Components/NoteListNav/NoteListNav';
import NotePageNav from '../Components/NotePageNav/NotePageNav';
import NoteListMain from '../Components/NoteListMain/NoteListMain';
import NotePageMain from '../Components/NotePageMain/NotePageMain';
import AddFolder from '../Components/AddFolder/AddFolder'
import AddNote from '../Components/AddNote/AddNote'
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    setFolders = (folder) => {
        this.setState({
          folders: this.state.folders.concat(folder)
        })
      }

      handleAddNote = (note) => {
        this.setState({
          notes: [...this.state.notes, note],
        });
      };

      handleDeleteFolder = folderId => {
        this.setState({
            folders: this.state.folders.filter(folder => folder.id !== folderId)
        });
    };

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={AddFolder} />
                <Route exact path='/' component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            deleteFolder: this.handleDeleteFolder,
            setFolders: this.setFolders,
            addNote: this.handleAddNote
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                <header className="App__header">
                        <h1>
                            <Link to="/">Alex's Noteful App</Link>{' '}
                        </h1>
                    </header>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;