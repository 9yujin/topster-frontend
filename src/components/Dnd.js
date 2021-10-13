export const handleDragStart = (e, title) => {
  console.log("drag start");
  let cardImg = e.target.style.backgroundImage;
  e.dataTransfer.setData("card_img", cardImg);
};

export const handleDragOver = (e) => {
  e.preventDefault(); //이걸 해야 드롭이 된다!!
};

export const handleDragEnter = (e) => {
  let dragNode = e.target.parentNode;
  dragNode.id = "dragover";

  console.log(dragNode);
};

export const handleDragLeave = (e) => {
  let dragNode = e.target.parentNode;
  dragNode.id = "";
  /*  dragNode.style.zIndex = "auto";
  dragNode.style.transform = "scale(" + 1 + ")";
  dragNode.style.opacity = "1";
  dragNode.style.boxShadow = "none";
  dragNode.style.backgroundColor = "lightgray"; */
};

export const handleDrop = (e) => {
  let dragNode = e.target.parentNode;
  dragNode.id = "";
  /* dragNode.style.zIndex = "auto";
  e.target.parentNode.style.transform = "scale(" + 1 + ")";
  dragNode.style.opacity = "1";
  dragNode.style.boxShadow = "none"; */
  const card_img = e.dataTransfer.getData("card_img");
  e.target.style.backgroundImage = card_img;
};
