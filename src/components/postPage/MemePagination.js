import React from "react";
import {Link} from "react-router-dom";

import {MemeItem} from "../memeItem/MemeItem";
import {MemeItemAdmin} from "../memeItem/MemeItemAdmin";
import {connect} from "react-redux";
import {fetchTagPage} from "../../actions/fetch/fetchTagPage";
 class MemePagination extends React.Component {

    render() {

        const {posts, nextPageUrl, isAdmin, refresh} = this.props;



        if(isAdmin){
            return (
                <div>
                    {posts.map(item =>
                        <MemeItemAdmin key={item.id} refresh={refresh} meme={item}/>
                    )}
                    <Link to={nextPageUrl} className="main-container-long-button">
                        Następna Strona
                    </Link>
                </div>
            );
        }
        return (
            <div>
                {posts.map(item =>
                    <MemeItem key={item.id} meme={item}/>
                )}
                <Link to={nextPageUrl} className="main-container-long-button">
                    Następna Strona
                </Link>
            </div>
        );
    }
}


export default connect(state => {
    return {
        isAdmin: state.auth.data.admin
    };
})(MemePagination);