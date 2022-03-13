import React, { useState } from "react";
import Modal from "../../Component/Table/Modal/Modal";
import "./CreatePosting.css";
import axios from "axios";

const CreatePosting = (props) => {
    const {history} = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);


    const onClickEntryBtn = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setConfirmVisible(false);
    };

    const savePosting = async() => {
        const postingContent = document.getElementById("posting-content-textarea").value;
        const postingTitle = document.getElementById("posting-content-title").value;
        if(!postingContent.length) {
            console.log("게시물을 입력하세요");
            setModalVisible(false);
            return setConfirmVisible(true);
        } else if(!postingTitle.length) {
            console.log("제목을 입력하세요");
            setModalVisible(false);
            return setConfirmVisible(true);
        } 
        try {
            const {data: result} = await savePostingContent({postingTitle, postingContent});
            if(!result.success) console.log("저장하지 못했습니다");
            history.push("/posts");
        } catch (error) {
            debugger
        }
    };


    return (
        <>
            <div >
                <Modal open={modalVisible}  save={savePosting} close={closeModal} header="게시글 등록">
                    <div>게시글을 등록하시겠습니까?</div>
                </Modal>
                <Modal open={confirmVisible} close={closeModal} header="필수 입력">
                    <div>게시글 내용을 입력하세요.</div>    
                </Modal>
            </div>
            <div className="create-container">
                <div style={{padding: "20px"}}>새글쓰는 곳</div>
                <div className="header-toolbar">
                    <button onClick={onClickEntryBtn}>등록</button> 
                </div>
                <div className="posting-content-textarea">
                    <input id="posting-content-title" placeholder="제목"/>
                    <textarea placeholder="내용"  id="posting-content-textarea"></textarea>
                </div>
            </div>
        </>
        
    )
}


const savePostingContent = async(data) => {
    try {
        return await axios.post("http://localhost:3001/posting", {
            title: data.postingTitle,
            content: data.postingContent,
            userId:"TEST"});
    } catch (error) {
        debugger;
        console.log(error);
    }
    
}
export default CreatePosting;