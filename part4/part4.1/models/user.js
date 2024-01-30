const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  hashedPw: {
    type: String,
    required: true
  },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
    delete returned.hashedPw
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User