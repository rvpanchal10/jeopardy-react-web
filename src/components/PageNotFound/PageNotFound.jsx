import React from 'react';
import Typography from '@material-ui/core/Typography';

class PageNotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Typography variant="h3" component="h3" style={{ textAlign: 'center', marginTop: 20, color: '#FFF' }}>
                Page Not Found
            </Typography>
        );
    }
}

const connectedPageNotFound = PageNotFound;
export { connectedPageNotFound as PageNotFound };
