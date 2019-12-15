import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
const spinnerStyle = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default class NoteList extends Component {
    constructor(props) {
        super(props);

        this.state = { notes: '' };

        this.renderNotes = this.renderNotes.bind(this);
    }

    renderNotes() {
        if (this.props.notes.length == 0) {
            return (
                <div style={spinnerStyle.container}>
                    <RefreshIndicator
                        size={40}
                        left={10}
                        top={0}
                        status="loading"
                        style={spinnerStyle.refresh}
                        />
                </div>
            );
        }
        
        if (this.props.notes) {
            return this.props.notes.map((note) => {
                return (
				
                    <Card className="container" key={note._id}>
                        
							<span style={{padding: 20}}>{note.note}</span> 
							<span style={{padding: 20}}>{note.usernote}</span>
							<span style={{padding: 20}}>{note.category}</span>
							<span style={{padding: 20}}>{note.created}</span>
							<FlatButton label="Edit" />
                            <FlatButton label="Delete" />
                       
                    </Card>
                );
            })
        }
    }

    render() {
        return (
            <div>
                {this.renderNotes()}
            </div>
        );
    }
}
