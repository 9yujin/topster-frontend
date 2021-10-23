import React from "react";

const ModalFeed = ({ closeModal }) => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "22px",
          borderBottom: "1px solid #e0e0e0",
          color: "red",
          fontWeight: "500",
        }}
      >
        삭제
      </div>
      <div style={{ padding: "22px" }} onClick={closeModal}>
        취소
      </div>
    </div>
  );
};

export default ModalFeed;
