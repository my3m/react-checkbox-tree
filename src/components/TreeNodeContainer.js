import React from 'react'
import TreeNode from './TreeNode'

export default class TreeNodeContainer extends React.Component {

    constructor(props) {
        super();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnExpanded = this.handleOnExpanded.bind(this);
    }

    handleOnClick(id) {
        let copy = { ...this.props.selected };
        if (copy[id]) {
            copy[id] = !copy[id];
        }
        else {
            copy[id] = true;
        }
        this.props.handleOnClick(copy, id);
    }

    handleOnExpanded(id) {
        let copy = { ...this.props.expanded };
        if (copy[id]) {
            copy[id] = !copy[id];
        }
        else {
            copy[id] = true;
        }
        this.props.handleOnExpanded(copy, id);
    }

    renderTree(nodes = []) {
        return (
            nodes.map((c, idx) => {
                const selected = this.props.selected[c.id] === true;
                const expanded = this.props.expanded[c.id] === true;                
                if (c.children) {
                    return (
                        <TreeNode
                            key={c.id} 
                            id={c.id}
                            text={c.text}
                            selected={selected}
                            expanded={expanded}
                            handleOnClick={id => this.handleOnClick(c.id)}
                            handleOnExpanded={id => this.handleOnExpanded(c.id)}>
                            {this.renderTree(c.children)}
                        </TreeNode>
                    )
                }
                else {
                    return (
                        <TreeNode 
                            key={c.id} 
                            id={c.id}
                            text={c.text}
                            selected={selected}
                            expanded={expanded}
                            handleOnClick={id => this.handleOnClick(c.id)}
                            handleOnExpanded={id => this.handleOnExpanded(c.id)} />
                    )
                }
            })
        )
    }

    render() {
        return this.renderTree(this.props.children);
    }
}