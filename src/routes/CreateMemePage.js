import React from 'react';
import {connect} from "react-redux";

import {addPost} from "../actions/add/addPost";

class CreateMemePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            url: "",
            tags: ""
        }
    }

    add = e => {
        e.preventDefault();
        this.props.addPost({
            title: this.state.title,
            url: this.state.url,
            tags: this.state.tags.split(" ")
        });
    };

    inputEvent = e => {

        const {value, name} = e.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    };

    render() {

        return (
            <div onSubmit={this.add}>
                {this.props.error ?
                    <div className={"main-auth-error"}> {this.props.error.message}</div>
                    :
                    ""
                }

                {this.props.isAdded ?
                    <div className={"main-auth-error"}> Dodano</div>
                    :
                    ""
                }
                <form>
                    <input name={"title"} type={"text"} value={this.state.title} placeholder={"Tytuł"}
                           className={"main-auth-input"}
                           onChange={this.inputEvent}/>
                    <input name={"url"} type={"text"} value={this.state.url} placeholder={"URL"}
                           className={"main-auth-input"} onChange={this.inputEvent}/>
                    <input name={"tags"} type={"text"} value={this.state.tags} placeholder={"Tagi"}
                           className={"main-auth-input"} onChange={this.inputEvent}/>
                    <input type={"submit"} value={"Dodaj"} className={"main-auth-submit"}/>
                </form>
            </div>
        );
    }
}

export default connect(state => {
    return {
        error: state.addPost.error,
        isAdded: state.addPost.isAdded
    };
}, dispatch => {
    return {
        addPost: (content) => dispatch(addPost(content))
    };
})(CreateMemePage);
