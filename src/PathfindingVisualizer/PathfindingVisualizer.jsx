import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/dijkstra';
import { Box, Button, Card, CardContent } from '@material-ui/core';
import './PathfindingVisualizer.css';

const START_NODE_ROW = 5;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 40;

export default class PathfindingVisualizer extends Component {
    state = {
        grid: [],
        mouseIsPressed: false,
        currentVisitedNodesInOrder: undefined
    };

    componentDidMount() {
        this.setState({ grid: getInitialGrid() });
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            const node = nodesInShortestPathOrder[i];
            setTimeout(() => {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';

                if (node.row === START_NODE_ROW && node.col === START_NODE_COL)
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-start';
                if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL)
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-finish';
            }, 50 * i);
        }
    }

    resetClassNames() {
        if (this.state.currentVisitedNodesInOrder) {
            for (const node of this.state.currentVisitedNodesInOrder) {
                if (node.row === START_NODE_ROW && node.col === START_NODE_COL)
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-start';
                else if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL)
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-finish';
                else
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node';
            }
        }
        this.setState({ grid: getInitialGrid() });
    }

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
        this.setState({ currentVisitedNodesInOrder: visitedNodesInOrder });
    }

    render() {
        return (
            <React.Fragment>
                <Card elevation={10} style={{ minWidth: 1283 }}>
                    <CardContent>
                        <Box style={{ textAlign: 'center' }}>
                            <Box m={5}>
                                <Button style={{ marginRight: 8 }} variant="contained" color="primary" onClick={() => this.visualizeDijkstra()}>Trigger Dijstra's Algorithm</Button>
                                <Button variant="outlined" color="primary" onClick={() => this.resetClassNames()}>Reset</Button>
                            </Box>
                            <Box >
                                {this.state.grid.map((row, rowIdx) => {
                                    return (
                                        <div key={rowIdx}>
                                            {row.map((node, nodeIdx) => {
                                                const { row, col, isFinish, isStart, isWall } = node;
                                                return (
                                                    <Node
                                                        key={nodeIdx}
                                                        col={col}
                                                        isFinish={isFinish}
                                                        isStart={isStart}
                                                        isWall={isWall}
                                                        mouseIsPressed={this.state.mouseIsPressed}
                                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                                        onMouseEnter={(row, col) =>
                                                            this.handleMouseEnter(row, col)
                                                        }
                                                        onMouseUp={() => this.handleMouseUp()}
                                                        row={row}></Node>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </React.Fragment>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
