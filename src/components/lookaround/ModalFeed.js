import React, { useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import LoginContext from "../../context/LoginContext";

const ModalFeed = ({ closeModal, delPostID, setDelSucceeded }) => {
  const cookies = new Cookies();
  const context = useContext(LoginContext);

  const onDelPost = async () => {
    const response = await axios({
      method: "get",
      url: `http://9yujin.shop:5000/api/delete`,
      //url: `http://localhost:5000/api/delete`,
      headers: { postid: delPostID },
    });
    if (response.data.msg == "succeeded") {
      closeModal();
      setDelSucceeded(true);
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "22px",
          borderBottom: "1px solid #e0e0e0",
          color: "red",
          fontWeight: "500",
        }}
        onClick={onDelPost}
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
