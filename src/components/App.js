import React from 'react';
import TreeNodeContainer from './TreeNodeContainer';
import '../style.css';

const root = [
    {
        id: 1,
        text: 'node-1',
        children: [
            {
                id: 2,
                text: 'node-2'
            },
            {
                id: 3,
                text: 'node-3'
            }
        ]
    },
    {
        id: 4,
        text: 'node-4',
        children: []
    },
    {
        id: 5,
        text: 'node-5',
        children: [
            {
                id: 6,
                text: 'node-6',
                children: [
                    {
                        id: 7,
                        text: 'node-7',
                        children: [

                        ]
                    }
                ]
            }
        ]
    }
]

export default class App extends React.Component {
    constructor() {
        super();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnExpanded = this.handleOnExpanded.bind(this);
        this.state = {
            selected: {},
            expanded: {}
        }
    }

    handleOnClick(options, id) {
        console.log(`id: ${id}`);
        this.setState({
            selected: options
        });
    }

    handleOnExpanded(options, id) {
        console.log(options);
        this.setState({
            expanded: options
        });
    }

    render() {
        return (
            <div className="react-checkbox-container">
                <h4>react-checkbox-tree</h4>
                <TreeNodeContainer
                    children={root}
                    selected={this.state.selected}
                    expanded={this.state.expanded}
                    handleOnClick={(options, id) => this.handleOnClick(options, id)}
                    handleOnExpanded={(options, id) => this.handleOnExpanded(options, id)}
                />
            </div>
        )
    }
}