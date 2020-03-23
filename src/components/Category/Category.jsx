/* eslint-disable no-undefined */
import React from 'react';
import Grid from '@material-ui/core/Grid';

class Category extends React.Component {

    render() {
        const { children } = this.props;
        return (
            <Grid className="flex flex-column center" style={{ width: `${100 / 6}%` }}>
                <header className="flex flex-center flex-middle bg-blue b-black" style={{ width: '100%', textTransform: 'uppercase', height: 90 }}>
                    <span style={{ padding: '0 10px', fontWeight: 'bold', fontSize: 'medium' }}>{this.props.title}</span>
                </header>
                {children}
            </Grid>
        );
    }
}

const connectedCategory = Category;
export { connectedCategory as Category };
