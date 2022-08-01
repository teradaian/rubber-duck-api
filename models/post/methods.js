import mongoose from 'mongoose'

function findPostByIterationText(topicId, search, sort, page) {
  const searchText = search ? search : ''
  const skipCount = page ? parseInt(page) * 10 : 0
  const order = { recent: { createdAt: -1 }, popular: { 'iterations.rating': -1 } }
  return this.aggregate([
    { $match: { topic: mongoose.Types.ObjectId(topicId) } },
    {
      $lookup: {
        from: 'profiles', localField: 'author', foreignField: '_id', as: 'author',
        pipeline: [{ $project: { name: 1, avatar: 1 } }],
      }
    },
    {
      $lookup: {
        from: "iterations",
        as: 'iterations',
        foreignField: '_id',
        localField: 'iterations',
        pipeline: [
          { $match: { text: { $regex: searchText, $options: 'i' } } },
          { $sort: { rating: -1 } },
          { $limit: 1 },
        ],
      }
    },
    { $sort: sort ? order[sort] : order.recent },
    { $skip: skipCount },
    { $limit: 10 },
  ])
}

export {
  findPostByIterationText
}