import mongoose from 'mongoose'

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    nickName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    collection: 'cats'
  }
)

Schema.index({ description: 'text', name: 'text' })

export default mongoose.model('Cat', Schema)
