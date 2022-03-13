import React from "react";
import "./Modal.css";

const Modal = props => {

    const { open, close, save, header} = props;

    return (
        <div className={open ? "openModal modal": "modal"} >
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            &times;    
                        </button>
                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer>
                        {save && <button className="save" onClick={save}>등록</button>}
                        <button className="close" onClick={close}>닫기</button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default Modal;