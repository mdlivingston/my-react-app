import * as React from 'react';
import { Button, Box } from '@material-ui/core';

export interface CounterProps {
    name: string;
}

export interface CounterState {
    count: number;
    isLoading: boolean;
}

class Counter extends React.Component<CounterProps, CounterState> {
    state: CounterState = { count: 0, isLoading: false };

    render() {
        return (
            <React.Fragment>
                <Box style={{ textAlign: 'center' }} m={10}>
                    <Box m={5}>
                        <span style={{ marginRight: 10 }}>{this.state.count}</span>
                        <Button variant="contained" color="primary" onClick={this.handleIncrement}>Increment</Button>
                    </Box>
                </Box>
            </React.Fragment>
        );
    }

    handleIncrement = () => {
        this.setState({ count: this.state.count + 1 });
    }
}

export default Counter;

