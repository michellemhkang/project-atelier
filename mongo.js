const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema({

    productId:{
        type: Number,
        required: true,
        questions: [
            {
                questionId: {
                    type: Number,
                    required: true,
                },
                body: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                helpfulness: {
                    type: Number,
                    required: true,
                },
                reported: {
                    type: Boolean,
                    required: true
                },
                answers: [
                    {
                        answerId: {
                            type: Number,
                            required: true
                        },
                        body: {
                            type: String,
                            required: true
                        },
                        date: {
                            type: Date,
                            required: true
                        },
                        name: {
                            type: String,
                            required: true
                        },
                        helpfulness: {
                            type: Number,
                            required: true
                        },
                        photos: [
                            {
                                photoId: {
                                    type: Number,
                                    required: true
                                },
                                url: {
                                    type: String,
                                    required: true
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }

})

// not fully embed - array of answer ids, then separate answer schema,
// with its own question id 
// for search - Postgres and Elastic Search

const QA = mongoose.model('QA', qaSchema);

module.exports.QA = QA;