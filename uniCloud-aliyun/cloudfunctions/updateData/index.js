const db = uniCloud.database();
exports.main = async (event, context) => {
  const { detail ,id,picArrs} = event;
  return await db
    .collection("article")
    .doc(id)
    .update({
      postTime: Date.now(),
      ...detail,
	  picArrs
    });
  // return await db.collection("article").doc(id).update()
};
