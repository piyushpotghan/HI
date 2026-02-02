export const getStoredChats = () =>
  JSON.parse(localStorage.getItem("chats")) || [];

export const saveChats = (chats) =>
  localStorage.setItem("chats", JSON.stringify(chats));
