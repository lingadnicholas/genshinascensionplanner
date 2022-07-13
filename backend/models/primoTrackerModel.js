const mongoose = require('mongoose')

const primoTrackerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    pulls: {
      type: Number,
      required: true,
      min: [0, "Must be at least 0"] 
    },
    type: {
      type: String,
      required: [true, 'Please add a type: predicted/inputted value got {VALUE}'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('PrimoTracker', primoTrackerSchema)

/* fields
{
    "user": "62cc6a7a7a5ff98b5ae07944",
    "pulls": 64,
    "type": "inputted",
    "_id": "62cee4f7521028231ee0c200",
    "createdAt": "2022-07-13T15:29:59.757Z",
    "updatedAt": "2022-07-13T15:29:59.757Z",
    "__v": 0
}
*/