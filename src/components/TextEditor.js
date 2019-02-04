import React, {Component, Fragment} from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

import Icon from 'react-icons-kit'
import { bold } from 'react-icons-kit/feather/bold'
import { italic } from 'react-icons-kit/feather/italic'
import { code } from 'react-icons-kit/feather/code'
import { list } from 'react-icons-kit/feather/list'
import { underline } from 'react-icons-kit/feather/underline'

import { BoldMark, ItalicMark } from './index';
import FormatToolbar from "./FormatToolbar";

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'My first paragraph!',
                            },
                        ],
                    },
                ],
            },
        ],
    },
});

export default class TextEditor extends Component {

    state = {
        value: initialValue,
    };

    // On change, update the apps React state with teh new editor value.
    onChange = ({value}) => {
        this.setState({value})
    };

    onKeyDown = (e, change) => {

        /*
            we want all our commands to start with the user pressing ctrl,
            if they dont we cancel the action
        */
        if (!e.ctrlKey) { return }
        e.preventDefault();

        /* Decide what to do based on the key code */
        switch (e.key) {
            /* When "b" is pressed, add a bold mark to the text. */
            case 'b': {
                change.toggleMark('bold');
                return true;
            }

            case 'i': {
                change.toggleMark('italic');
                return true;
            }

            case 'c': {
                change.toggleMark('code');
                return true;
            }

            case 'l': {
                change.toggleMark('list');
                return true;
            }

            case 'u': {
                change.toggleMark('underline');
                return true;
            }

            default: {
                return;
            }
        }
    };

    ref = editor => {
        this.editor = editor
    };

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />;

            case 'italic':
                return <ItalicMark {...props} />;

            case 'code':
                return <code {...props.attributes}>{props.children}</code>;

            case 'list':
                return (
                    <ul {...props.attributes}>
                        <li>{props.children}</li>
                    </ul>
                );

            case 'underline':
                return <u {...props.attributes}>{props.children}</u>;

            default: {
                return;
            }
        }
    };

    onMarkClick = (e, type) => {
        // disabling browser default behaviour like page refresh etc.
        e.preventDefault();

        this.editor.toggleMark(type);
    };

    render() {
        return (
            <Fragment>
                <FormatToolbar>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'bold')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={bold} />
                    </button>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'italic')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={italic} />
                    </button>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'code')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={code}/>
                    </button>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'list')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={list}/>
                    </button>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'underline')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={underline}/>
                    </button>
                </FormatToolbar>
                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                    ref={this.ref}
                />
            </Fragment>
        )
    }
}