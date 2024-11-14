const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now 
    }
});

const ChatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    isGroupChat: {
        type: Boolean,
        default: false
    },
    messages: [MessageSchema], 
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    chatName: {
        type: String,
        default: '',  
        trim: true
    }
});

ChatSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
