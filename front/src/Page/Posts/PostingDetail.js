import React, { useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";


const PostingContent = (props) => {
    debugger
    const {id} = useParams();
    const history = useHistory()
    const postingById = props.posting && props.posting.find(post => post.POSTINGID === parseInt(id));
    useEffect(() => {
        if(postingById) {
            console.log("matched");
        } else {
            history.push("/404-NotFound")
        }
    }, []);

    return  postingById ? (
        <div className="detail-background">
            <div className="detail-container">
                <div className="detail-container-header">
                    <div className="header-highlighted font-larger">#{postingById.POSTINGID}</div>
                    <div className="header-highlighted font-xxlarge">{postingById.TITLE}</div>
                    <div className="font-smaller">- {postingById.USERID}</div>
                    <hr/>
                </div>
                <div className="detail-container-content">
                    <div>{postingById.CONTENT}</div>
                </div>
            </div>
        </div>
    ) : ""
    
}

export default PostingContent;