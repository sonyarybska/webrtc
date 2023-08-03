const appendUser = (users, roomID, userID, user, socketId) => {
  if (users.has(roomID)) {
    users.get(roomID).push({ socketId, userId: userID, user });
  } else {
    users.set(roomID, [{ socketId, userId: userID, user }]);
  }
};

const filterUsers = (users, roomID, socketId) => {
  if (users.has(roomID)) {
    return users.get(roomID).filter((user) => user.socketId !== socketId);
  }
  return [];
};

const findUserByUserId = (users, roomID, userID) => {
  if (users.has(roomID)) {
    const usersInThisRoom = users.get(roomID);
    const user = usersInThisRoom.find((user) => user.userId === userID);
    return user;
  }
  return undefined;
};

const findUserBySocketId = (users, roomID, socketID) => {
  if (users.has(roomID)) {
    const usersInThisRoom = users.get(roomID);
    const user = usersInThisRoom.find((user) => user.socketId === socketID);
    return user;
  }
  return undefined;
};

const helperFunctions = {
  appendUser,
  filterUsers,
  findUserByUserId,
  findUserBySocketId,
};

module.exports = helperFunctions;
