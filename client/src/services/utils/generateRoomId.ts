export const generateRoomId = () => {
  const numbers = "0123456789";
  let result = "";
  for (let i = 0; i < 20; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  const roomId = `room-${result}`;
  return roomId;
};
