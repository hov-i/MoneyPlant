import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../assets/close.svg';
import useViewport from '../../hooks/viewportHook';

const Modal = (props) => {
    const { isMobile } = useViewport();
    const { open, close, name, width, height, border } = props;

    const closeModal = () => {
        close(name);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <ModalStyle width={width} height={height} isMobile={isMobile} border={border}>
            <div className={open ? 'openModal modal' : 'modal'} onClick={handleOverlayClick}>
                {open ? (
                    <section>
                        <div className="topButton">
                            <button className="close" onClick={closeModal}>
                                <Close />
                            </button>
                        </div>
                        {props.children}
                    </section>
                ) : null}
            </div>
        </ModalStyle>
    );
};
export default Modal;
const ModalStyle = styled.div`
    .modal {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .modal button {
        outline: none;
        cursor: pointer;

        border: 0;
    }

    .modal > section {
        width: ${(props) => (props.isMobile ? '100%' : props.width || '60%')};
        height: ${(props) => (props.isMobile ? '100%' : props.height || '500px')};
        margin: 0 auto;
        border-radius: ${(props) => (props.isMobile ? '0px' : props.border || '10px')};
        background-color: ${({ theme }) => theme.bgColor};
        animation: modal-show 0.3s;
        overflow: scroll;
        -ms-overflow-style: none;
    }

    /* 스크롤바 설정*/
    .modal > section::-webkit-scrollbar {
        display: none;
        width: 0 !important;
    }

    .topButton {
        display: flex;
        flex-direction: row-reverse;
    }

    .modal > section .topButton button {
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        position: fixed;
        background-color: transparent;
        z-index: 1;
    }

    .modal.openModal {
        display: flex;
        align-items: center;
        animation: modal-bg-show 0.3s;
    }

    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }

    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
