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
        this.getNodeFromId = this.getNodeFromId.bind(this);
        this.scanNodes = this.scanNodes.bind(this);
        this.state = {
            selected: {},
            expanded: {}
        }
        this.addressMap = {};
        this.scanNodes(root);
        console.log(this.addressMap);
    }

    scanNodes(children, prefix=[]) {
        let currentPrefix = this.addressMap;
        children.forEach((c, idx) => {
            currentPrefix[c.id] = [...prefix || [], idx];
            if(c.children) {
                this.scanNodes(c.children, currentPrefix[c.id]);
            }
        });
    }

    getNodeFromId(id) {
        let address = [...this.addressMap[id]];
        let node = root[address[0]];
        address.splice(0,1);
        while(address.length > 0) {
            node = node.children[address.splice(0, 1)];
        }
        return node;
    }

    handleOnClick(options, id) {
        //console.log(`id: ${id}`);
        let node = this.getNodeFromId(id);
        console.log(node);
        let optionsAll = {...this.state.selected};
        this.doActionForAllChildren(node, (n)=> {
            optionsAll[n.id] = options[id];
        });
        this.setState({
            selected: optionsAll
        });
    }

    doActionForAllChildren(node, func) {
        if(!(func instanceof Function)) {
            throw new Error("Second argument must be a function type!");
        }
        let queue = [node];
        while(queue.length > 0) {
            let n = queue.pop();
            func(n);
            if(n.children) {
                n.children.forEach((c)=> {
                    queue.push(c);
                });
            }
        }
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