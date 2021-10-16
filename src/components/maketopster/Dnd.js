export const handleDragStart = (e, title) => {
  console.log("drag start");
  let cardImg = e.target.style.backgroundImage;
  let albumTitle = e.target.id;
  console.log(albumTitle);
  e.dataTransfer.setData("card_img", cardImg);
  e.dataTransfer.setData("album_Title", albumTitle);
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
};

export const handleDrop = (e) => {
  let dragNode = e.target.parentNode;
  dragNode.id = "";
  const card_img = e.dataTransfer.getData("card_img");
  const album_Title = e.dataTransfer.getData("album_Title");
  e.target.style.backgroundImage = card_img;
  e.target.id = album_Title;
};
