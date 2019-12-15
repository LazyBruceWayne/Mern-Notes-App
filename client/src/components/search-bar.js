import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from '../modules/Auth';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
		this.state = { note:'' };
		this.state = { category:'Random' };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(term) {
        this.setState({ term });
    }
	onInputChangeNote(note) {
        this.setState({ note });
    }

    onSubmit(event) {
        event.preventDefault();

        const userID = encodeURIComponent(Auth.getUser());
        const note = encodeURIComponent(this.state.term);
		const usernote = encodeURIComponent(this.state.note);
		const category = encodeURIComponent(this.state.category);
        const noteData = `userID=${userID}&note=${note}&usernote=${usernote}&category=${category}`;
		if(usernote=="undefined" || note=="undefined"){
			console.log("inavild");
			alert("Please add all field");
			return;
		}
		

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/notes');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            localStorage.setItem('successMessage', xhr.response.message);
		} else {
            const errors = xhr.response.errors ? xhr.response.errors : {};
            errors.summary = xhr.response.message;
        }
        });
        xhr.send(noteData);
        
        this.props.onNoteSubmit();
        this.setState({ term: '' });
		this.setState({ note: '' });
		this.setState({ category: 'Random' });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="input-group">
                    <TextField
                        floatingLabelText="Title *"
                        floatingLabelFixed={true}
						required
                        className="search-bar form-control"
                        value={this.state.term}
                        onChange={event => this.onInputChange(event.target.value)}
                        />
					<select className="search-bar form-control"  onChange={(e) => this.setState({ category: e.target.value })}>
					  <option value="Random">Random</option>
					  <option value="Development">Development</option>
					</select>

					<TextField
                        floatingLabelText="Type Your Note *"
                        floatingLabelFixed={true}
						required
                        className="search-bar form-control"
                        value={this.state.note}
                        onChange={event => this.onInputChangeNote(event.target.value)}
                        />					
						
                    <span className="input-group-btn">
                        <RaisedButton label="Submit" type="submit" primary={true} />
                    </span>
                </form>
            </div>
        );
    }
}