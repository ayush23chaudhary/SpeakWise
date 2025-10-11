const mongoose = require('mongoose');

const analysisReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  analysisData: {
    type: Object,
    required: true
  },
  transcript: {
    type: String,
    required: true
  },
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  audioFileName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('AnalysisReport', analysisReportSchema);
