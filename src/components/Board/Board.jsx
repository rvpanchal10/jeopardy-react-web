/* eslint-disable no-undefined */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import lodash from 'lodash';
import striptags from 'striptags';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CreateIcon from '@material-ui/icons/Create';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Categories } from '../Categories';
import { Clue } from '../Clue';
import { jServiceActions } from './../../actions/jservice.actions';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        minWidth: 120
    }
});

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: {},
            challenge: null,
            questions: {},
            isClueDialogOpen: false,
            open: false,
            noOfCategoryToDisplay: 5,
            noOfQuestionToDisplay: 5
        };

        this.handleCategoryBoard = this.handleCategoryBoard.bind(this);
        this.setCategoryNQuestions = this.setCategoryNQuestions.bind(this);
        this.renderJeopardyBoard = this.renderJeopardyBoard.bind(this);
        this.handleOnClickedDisplayClueDialog = this.handleOnClickedDisplayClueDialog.bind(this);
        this.handleOnClueClose = this.handleOnClueClose.bind(this);
        this.handleBoardState = this.handleBoardState.bind(this);
        this.sortRandomPlacedDailyDouble = this.sortRandomPlacedDailyDouble.bind(this);
        this.handleWayToControlDialog = this.handleWayToControlDialog.bind(this);
        this.handleChangeCategoryNQuestion = this.handleChangeCategoryNQuestion.bind(this);
        this.handleOnCloseCategoryNQuestion = this.handleOnCloseCategoryNQuestion.bind(this);
    }

    componentDidMount() {
        this.handleBoardState();
    }

    handleBoardState = () => {
        const { actions: { getRandomQuestions } } = this.props;
        this.setState({
            categories: {},
            challenge: null,
            questions: {},
            isClueDialogOpen: false
        },() => {
            getRandomQuestions({ count: 12 }, this.sortRandomPlacedDailyDouble);
        });
    }

    sortRandomPlacedDailyDouble(items) {
        let { noOfCategoryToDisplay } = this.state;
        let categories = [];

        lodash.shuffle(items).forEach(clue => {
            if (categories.indexOf(clue.category.id) > -1 || categories.length > noOfCategoryToDisplay) {
                void 0;
            } else {
                categories.push(clue.category.id);
            }
        });

        this.handleCategoryBoard(categories);
    }

    handleCategoryBoard(categories) {
        const { actions: { getCategoryById } } = this.props;
        if (categories && categories.length > 0) {
            categories.forEach((id) => {
                getCategoryById({ id: id }, this.setCategoryNQuestions);
            });
        }
    }

    setCategoryNQuestions(category) {
        let { categories, questions, noOfQuestionToDisplay } = this.state;

        const find = '[",\'()]';
        const re = new RegExp(find, 'g');
        if (category) {

            categories[category.id] = {
                id: category.id,
                title: category.title
            };

            category.clues.slice(0,noOfQuestionToDisplay).forEach(clue => {

                questions[clue.id] = {
                    id: clue.id,
                    categoryId: category.id,
                    answered: false,
                    clue: clue.question,
                    answer: striptags(clue.answer.replace(re, '').replace('&', 'and'))
                };
            });
        }
        this.setState({ categories: categories, questions: questions });
    }

    handleOnSelectClue(opt) {
        let questions = this.state.questions;
        questions[opt.id].answered = true;

        this.setState({
            challenge: opt,
            questions: questions,
            isClueDialogOpen: true
        });
    }

    renderJeopardyBoard(questions) {
        const { categories } = this.state;
        const answeredQuestions = lodash.filter(questions, { answered: true }).length;

        if (answeredQuestions <= 5) {
            return <Categories
                onSelect={this.handleOnSelectClue.bind(this)}
                categories={categories}
                questions={questions} />;
        } else {
            return (
                <Typography variant="h3" component="h3" style={{ textAlign: 'center', marginTop: 20, color: '#FFF' }}>
                    Click on Reset, to play again!!
                </Typography>
            );
        }
    }

    handleOnClueClose = () => {
        this.setState({ isClueDialogOpen: false });
    }

    handleWayToControlDialog = () => {
        this.setState((prevState) => {
            return {
                open: !prevState.open
            };
        });
    }

    handleOnClickedDisplayClueDialog(challenge) {
        const { isClueDialogOpen } = this.state;
        return (
            <Clue
                clue={challenge.clue || ''}
                answer={challenge.answer || ''}
                isOpenClue={isClueDialogOpen}
                handleOnClose={this.handleOnClueClose}
            />
        );
    }

    handleChangeCategoryNQuestion = event => {
        if (event.target.value !== '') {
            this.setState({ [event.target.name]: parseInt(event.target.value) });
        }
    }

    handleOnCloseCategoryNQuestion = (from) => {
        this.setState(() => {
            return {
                open: false
            };
        },() => {
            if (from !== 'cancel') {
                this.handleBoardState();
            }
        });

    }

    render() {
        const { questions , challenge, isClueDialogOpen, noOfCategoryToDisplay, noOfQuestionToDisplay, open } = this.state;
        const { classes } = this.props;
        const answeredQuestions = lodash.filter(questions, { answered: true }).length;
        return (
            <div>
                {(answeredQuestions <= 5 && isClueDialogOpen) ? this.handleOnClickedDisplayClueDialog(challenge) : null}
                {this.renderJeopardyBoard(questions)}
                <div className="actions-container">
                    <Grid container>
                        <Grid item xs={7}></Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="default" onClick={() => { this.setState({ open: true }); }} className={classes.button}>
                                Way To Control
                                <CreateIcon className={classes.rightIcon} />
                            </Button>
                            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={this.handleOnCloseCategoryNQuestion}>
                                <DialogTitle>Way To Control Categories & Questions</DialogTitle>
                                <DialogContent>
                                    <form className={classes.container}>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="demo-dialog-native">Categories</InputLabel>
                                                    <Select
                                                        name="noOfCategoryToDisplay"
                                                        value={noOfCategoryToDisplay || ''}
                                                        onChange={this.handleChangeCategoryNQuestion}
                                                        input={<Input id="demo-dialog-native" />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={2}>Three</MenuItem>
                                                        <MenuItem value={3}>Four</MenuItem>
                                                        <MenuItem value={4}>Five</MenuItem>
                                                        <MenuItem value={5}>Six</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={5}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-dialog-select-label">Clues</InputLabel>
                                                    <Select
                                                        name="noOfQuestionToDisplay"
                                                        id="demo-dialog-select"
                                                        value={noOfQuestionToDisplay}
                                                        onChange={this.handleChangeCategoryNQuestion}
                                                        input={<Input />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={3}>Three</MenuItem>
                                                        <MenuItem value={4}>Four</MenuItem>
                                                        <MenuItem value={5}>Five</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => { this.handleOnCloseCategoryNQuestion('cancel'); }} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => { this.handleOnCloseCategoryNQuestion('ok'); }} color="primary">
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="default" onClick={this.handleBoardState} className={classes.button}>
                                Reset
                                <RotateLeftIcon className={classes.rightIcon} />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    const actions = {
        ...jServiceActions
    };

    return {
        actions: bindActionCreators(actions ,dispatch)
    };
};

const connectedBoard = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Board));
export { connectedBoard as Board };
