const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AnalysisReport = require("../models/AnalysisReport.model");
const auth = require("../middleware/auth");

const router = express.Router();

// Configure multer for audio file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `audio-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "audio/wav",
            "audio/mp3",
            "audio/mpeg",
            "audio/webm",
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only audio files are allowed."));
        }
    },
});

// Mock AI analysis function
const generateMockAnalysis = () => {
    const fillerWords = ["um", "ah", "uh", "like", "you know", "so", "well"];
    const transcript =
        "Hello, this is a sample speech analysis. Um, I think that speaking clearly is important. Ah, it helps with communication. You know, when we speak with confidence, people listen better. So, practice makes perfect.";

    // Generate random filler word counts
    const fillerWordCounts = {};
    fillerWords.forEach((word) => {
        fillerWordCounts[word] = Math.floor(Math.random() * 8);
    });

    const totalFillerWords = Object.values(fillerWordCounts).reduce(
        (sum, count) => sum + count,
        0
    );

    // Generate scores
    const clarityScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const confidenceScore = Math.floor(Math.random() * 25) + 75; // 75-100
    const fluencyScore = Math.floor(Math.random() * 20) + 80; // 80-100
    const paceScore = Math.floor(Math.random() * 35) + 65; // 65-100
    const toneScore = Math.floor(Math.random() * 25) + 75; // 75-100

    const overallScore = Math.round(
        (clarityScore +
            confidenceScore +
            fluencyScore +
            paceScore +
            toneScore) /
            5
    );

    return {
        overallScore,
        transcript,
        metrics: {
            clarity: clarityScore,
            confidence: confidenceScore,
            fluency: fluencyScore,
            pace: paceScore,
            tone: toneScore,
        },
        fillerWords: fillerWordCounts,
        totalFillerWords,
        pace: {
            wordsPerMinute: Math.floor(Math.random() * 40) + 140, // 140-180 WPM
            status:
                Math.random() > 0.5
                    ? "Good"
                    : Math.random() > 0.5
                    ? "Too Fast"
                    : "Too Slow",
        },
        recommendations: [
            "Try to reduce filler words like 'um' and 'ah'",
            "Practice speaking at a steady pace",
            "Work on projecting confidence in your voice",
            "Consider pausing instead of using filler words",
        ],
        strengths: [
            "Good vocal clarity",
            "Appropriate volume level",
            "Clear pronunciation",
        ],
        areasForImprovement: [
            "Reduce filler word usage",
            "Maintain consistent pace",
            "Build more confidence in delivery",
        ],
    };
};

// Base URL: api/speech
router.get("/", (req, res) => {
    res.status(200).json({ message: "Speech routes are working" });
});

// Analyze speech
router.post("/analyze", auth, upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No audio file provided" });
        }

        // Simulate AI processing delay
        await new Promise((resolve) =>
            setTimeout(resolve, 2000 + Math.random() * 1000)
        );

        // Generate mock analysis
        const analysisData = generateMockAnalysis();

        // Save analysis report to database
        const report = new AnalysisReport({
            userId: req.user._id,
            analysisData,
            transcript: analysisData.transcript,
            overallScore: analysisData.overallScore,
            audioFileName: req.file.filename,
        });

        await report.save();

        res.json({
            message: "Analysis completed successfully",
            report: {
                id: report._id,
                ...analysisData,
                createdAt: report.createdAt,
            },
        });
    } catch (error) {
        console.error("Speech analysis error:", error);
        res.status(500).json({ message: "Analysis failed" });
    }
});

// Get analysis history
router.get("/history", auth, async (req, res) => {
    try {
        const reports = await AnalysisReport.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .select("-analysisData -audioFileName");

        res.json({ reports });
    } catch (error) {
        console.error("History fetch error:", error);
        res.status(500).json({ message: "Failed to fetch history" });
    }
});

// Get specific analysis report
router.get("/report/:id", auth, async (req, res) => {
    try {
        const report = await AnalysisReport.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.json({
            report: {
                id: report._id,
                ...report.analysisData,
                createdAt: report.createdAt,
            },
        });
    } catch (error) {
        console.error("Report fetch error:", error);
        res.status(500).json({ message: "Failed to fetch report" });
    }
});

module.exports = router;
