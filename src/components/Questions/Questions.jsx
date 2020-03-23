/* eslint-disable no-undefined */
import React from 'react';
import { Question } from '../Question';
import Grid from '@material-ui/core/Grid';

class Questions extends React.Component {

    constructor() {
        super();
        this.renderQuestionsList = this.renderQuestionsList.bind(this);
    }

    renderQuestionsList = (opt) => {
        let QuestionComps = [];
        const { questions } = this.props;

        if (questions && questions.length > 0) {
            questions.map((question, keyIndex) => {
                QuestionComps.push(
                    <Question key={`category-${keyIndex}`} points={((keyIndex + 1) * opt)} isAnswered={question.answered} {...question} onSelect={this.props.onSelect} />
                );
            });
        }
        return QuestionComps;
    }

    render() {
        return (
            <Grid container wrap="nowrap" spacing={0} direction="column">
                {this.renderQuestionsList(200)}
            </Grid>
        );
    }
}

const connectedQuestions = Questions;
export { connectedQuestions as Questions };
