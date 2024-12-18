const mongoose = require('mongoose');

// Schema - rules the entries in the database must follow
const HistoricalFigureSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        img: {
            type: String,
            // required: [true, 'Image URL is required']
        },
        era: {
            type: String,
            required: [true, 'Era is required']
        },
        achievements: {
            type: String,
            required: [true, 'Achievements are required']
        },
        lifeSpan: {
            type: Object,
            required: true['Enter life span data'],
            default: {
                birthEra: 'AD'
            },
            validate: [
                {
                    validator: function (value) {
                        return value.birthYear && value.birthEra

                    },
                    message: 'birth year information requred'
                },
                {
                    validator: function (value) {
                        return value.deathYear && value.deathEra

                    },
                    message: 'Death Year information required'
                }
            ]
            
        },

        notableQuote: {
            type: String,
            required: [true, 'A notable quote is required']
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Model - used to make queries
const HistoricalFigure = mongoose.model('HistoricalFigure', HistoricalFigureSchema);

module.exports = HistoricalFigure;
