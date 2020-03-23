import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    }
});

class Clue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChecked: true
        };
        this.handleOnChangeToggle = this.handleOnChangeToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleOnChangeToggle = () => {
        this.setState((prevState) => {
            return {
                isChecked: !prevState.isChecked
            };
        });
    }

    render() {
        const { clue, answer, isOpenClue, handleOnClose, classes } = this.props;
        const { isChecked } = this.state;
        return (
            <Dialog
                open={isOpenClue}
                keepMounted
                maxWidth={'lg'}
                fullWidth={true}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description" >
                <DialogContent>
                    <Grid container wrap="nowrap" spacing={0} justify='center' alignItems='center'>
                        <Grid item xs={2}>
                            <h1 className='center' style={{ color: '#FE6B61', textAlign: 'right' }}>
                                {isChecked ? 'Clue:' : 'Answer:'}
                            </h1>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={9}>
                            <h1 className='center' style={{ color: '#000', margin: '0 auto', textAlign: 'left', minWidth: '300px' }}>
                                {isChecked ? clue : answer}
                            </h1>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container spacing={0} justify='center' alignItems='center'>
                        <Grid item xs={6} style={{ textAlign: 'right' }}>
                            {!isChecked
                                ? (<Button variant="contained" color="default" onClick={this.handleOnChangeToggle} className={classes.button}>
                                    Clue
                                    <BookmarkBorderRoundedIcon className={classes.rightIcon} />
                                </Button>)
                                : (<Button variant="contained" color="default" className={classes.button} onClick={this.handleOnChangeToggle}>
                                    Answer
                                    <BookmarkRoundedIcon className={classes.rightIcon} />
                                </Button>)}
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'left' }}>
                            <Button onClick={handleOnClose} className={classes.button} variant="contained" color="primary">
                                <span style={{ color: '#FFF' }}>Done</span>
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        );
    }
}

const connectedClue = withStyles(styles)(Clue);
export { connectedClue as Clue };
