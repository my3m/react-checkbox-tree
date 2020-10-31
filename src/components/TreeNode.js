import React from 'react'
import '../style.css';

export default class TreeNode extends React.Component {
    constructor(props) {
        super();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnExpanded = this.handleOnExpanded.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
    }

    handleOnClick() {
        this.props.handleOnClick(this.props.id);
    }

    handleOnExpanded(e) {
        this.props.handleOnExpanded(this.props.expanded);
    }

    renderChildren() {
        if(this.props.expanded) {
            return (
                <div className="react-checkbox-tree-children" style={{ margin: '0 0 0 20px'}}>
                    {this.props.children}
                </div>            
            )
        }
    }

    render() {
        const carrotClass = this.props.expanded ? 'carrot-down' : "carrot-side";
        const displayCarrot = this.props.children && this.props.children.length > 0;
        return (
            <div className="react-checkbox-tree">
                <span
                    className={`${carrotClass}`}
                    onClick={this.handleOnExpanded}
                    style={{visibility:displayCarrot?'visible':'hidden'}}>
                    <svg
                        viewBox="0 0 1024 1024"
                        focusable="false"
                        className=""
                        data-icon="carrot-down"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true">
                        <path
                            d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z">
                        </path>
                    </svg>
                </span>
                <input
                    id={`{checkbox-${this.props.id}`}
                    name="checkbox"
                    type="checkbox"
                    className="form-check-input"
                    checked={this.props.selected}
                    onClick={this.handleOnClick} readOnly />
                <label htmlFor={`{checkbox-${this.props.id}`} className="checkbox-text form-check-label">{this.props.text}</label>
                {this.renderChildren()}                
            </div>
        )
    }
}