import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/dijkstra';
import { Box, Button } from '@material-ui/core';
import './PathfindingVisualizer.css';

let START_NODE_ROW = 20;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 20;
let FINISH_NODE_COL = 60;

export default class PathfindingVisualizer extends Component {
    state = {
        grid: [],
        mouseIsPressed: false,
        currentVisitedNodesInOrder: undefined,
        isDraggingStartNode: false,
        isDraggingFinishNode: false
    };

    componentDidMount() {
        this.setState({ grid: getInitialGrid() });
    }

    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        if (START_NODE_ROW === row && START_NODE_COL === col) {
            this.setState({ isDraggingStartNode: true });
            newGrid[row][col].isStart = false;
        }

        if (FINISH_NODE_ROW === row && FINISH_NODE_COL === col) {
            this.setState({ isDraggingFinishNode: true });
            newGrid[row][col].isFinish = false;
        }

        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;

        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col, this.state.isDraggingStartNode, this.state.isDraggingFinishNode);

        if (this.state.isDraggingStartNode) {
            newGrid[row][col].isStart = true;
        }

        if (this.state.isDraggingFinishNode) {
            newGrid[row][col].isFinish = true;
        }
        this.setState({ grid: newGrid });
    }

    handleMouseLeave(row, col) {
        let newGrid = this.state.grid;
        if (this.state.isDraggingStartNode) {
            newGrid[row][col].isStart = false;
        }

        if (this.state.isDraggingFinishNode) {
            newGrid[row][col].isFinish = false;
        }
    }

    handleMouseUp(row, col) {
        let newGrid = this.state.grid;
        if (this.state.isDraggingStartNode) {
            newGrid[row][col].isStart = true;
            START_NODE_ROW = row;
            START_NODE_COL = col;
        }
        if (this.state.isDraggingFinishNode) {
            newGrid[row][col].isFinish = true;
            FINISH_NODE_ROW = row;
            FINISH_NODE_COL = col;
        }
        this.setState({ grid: newGrid, mouseIsPressed: false, isDraggingStartNode: false, isDraggingFinishNode: false });
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
                if (!this.isStartNode(node) && !this.isFinishNode(node))
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

                if (this.isStartNode(node))
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-start';
                else if (this.isFinishNode(node))
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-finish';
            }, 50 * i);
        }
    }

    resetClassNames() {
        if (this.state.currentVisitedNodesInOrder) {
            for (const node of this.state.currentVisitedNodesInOrder) {
                if (this.isStartNode(node))
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-start';
                else if (this.isFinishNode(node))
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-finish';
                else
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node';
            }
        }
        this.setState({ grid: getInitialGrid() });
    }

    isStartNode(node) {
        if (node.row === START_NODE_ROW && node.col === START_NODE_COL)
            return true;
        return false;
    }

    isFinishNode(node) {
        if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL)
            return true;
        return false;
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
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                    <table>
                        <tbody>
                            {this.state.grid.map((row, rowIdx) => {
                                return (
                                    <tr key={rowIdx}>
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
                                                    onMouseUp={() => this.handleMouseUp(row, col)}
                                                    onMouseOut={() => this.handleMouseLeave(row, col)}
                                                    row={row}></Node>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Box>
                <Box m={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                    <Button style={{ marginRight: 8 }} variant="contained" color="primary" onClick={() => this.visualizeDijkstra()}>Visualize Dijstra's Algorithm</Button>
                    <Button variant="outlined" color="primary" onClick={() => this.resetClassNames()}>Reset</Button>
                </Box>

            </React.Fragment>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 40; row++) {
        const currentRow = [];
        for (let col = 0; col < 70; col++) {
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

const getNewGridWithWallToggled = (grid, row, col, isDraggingStartNode, isDraggingFinishNode) => {
    if (!isDraggingStartNode && !isDraggingFinishNode && !grid[row][col].isStart && !grid[row][col].isFinish) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }
    return grid;
};

