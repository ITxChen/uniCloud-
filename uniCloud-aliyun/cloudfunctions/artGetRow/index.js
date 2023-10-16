const db =uniCloud.database()
exports.main = async (event, context) => {
	const {id} = event
	return await db.collection("article").doc(id).get()
};
