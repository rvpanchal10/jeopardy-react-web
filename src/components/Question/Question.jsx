/* eslint-disable no-undefined */
import React from 'react';
import Grid from '@material-ui/core/Grid';

class Question extends React.Component {

    render() {
        const { answer, isAnswered, clue, id, onSelect, points } = this.props;
        return (
            <Grid
                container
                key={`question-${id}`}
                style={{ backgroundColor: isAnswered ? 'red' : '#0A1172', height: 90 }}
                alignItems="center"
                className='flex flex-middle b-black'
                onClick={isAnswered ? void 0 : onSelect.bind(this, { answer: answer, clue: clue, points: points, id: id })}>
                <h3 className='yellow' style={{ margin: 0, padding: '15px 0', fontSize: 'x-large' }}>{`$${points}`}</h3>
            </Grid>
        );
    }
}

const connectedQuestion = Question;
export { connectedQuestion as Question };
