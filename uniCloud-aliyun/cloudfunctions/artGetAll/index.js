"use strict";
const db = uniCloud.database();
exports.main = async (event, context) => {
  // 翻页
  let { skip =0} = event;
  return await db
    .collection("article")
    .limit(8)
    .skip(skip)
    .orderBy("postTime", "desc")
    .get();
};
