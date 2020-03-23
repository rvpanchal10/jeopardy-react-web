import React from 'react';
import { CircularProgress } from '@material-ui/core';

class Spinner extends React.Component {
    render() {
        return (
            <div>
                {this.props.isVisible
                    ? (<div className="loaderView">
                        <CircularProgress size={100} thickness={2} />
                    </div>)
                    : (null)}
            </div>
        );
    }
}

const connectedSpinner = Spinner;
export { connectedSpinner as Spinner };
