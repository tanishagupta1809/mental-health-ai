const axios = require("axios");
const Assessment = require("../models/Assessment");

// Create Assessment / Predict
exports.createAssessment = async (req, res) => {
  try {
    const { sleep_hours, stress_level, anxiety_score, depression_score } = req.body;
    const userId = req.user.userId;

    // Validation
    if (
      typeof sleep_hours !== "number" ||
      typeof stress_level !== "number" ||
      typeof anxiety_score !== "number" ||
      typeof depression_score !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields must be valid numbers"
      });
    }

    // Validate ranges (0-100)
    if (stress_level < 0 || stress_level > 100) {
      return res.status(400).json({
        success: false,
        message: "Stress level must be between 0-100"
      });
    }
    if (anxiety_score < 0 || anxiety_score > 100) {
      return res.status(400).json({
        success: false,
        message: "Anxiety score must be between 0-100"
      });
    }
    if (depression_score < 0 || depression_score > 100) {
      return res.status(400).json({
        success: false,
        message: "Depression score must be between 0-100"
      });
    }
    if (sleep_hours < 0 || sleep_hours > 24) {
      return res.status(400).json({
        success: false,
        message: "Sleep hours must be between 0-24"
      });
    }

    // Call ML service for prediction
    let prediction = { risk_level: "Moderate" };
    
    try {
      const mlResponse = await axios.post("http://127.0.0.1:5001/predict", {
        sleep_hours,
        stress_level,
        anxiety_score,
        depression_score
      }, { timeout: 5000 });
      
      // Extract risk_level from nested prediction object
      if (mlResponse.data && mlResponse.data.prediction && mlResponse.data.prediction.risk_level) {
        prediction.risk_level = mlResponse.data.prediction.risk_level;
      } else if (mlResponse.data && mlResponse.data.risk_level) {
        prediction.risk_level = mlResponse.data.risk_level;
      } else {
        console.warn("ML response missing risk_level, using default. Response:", mlResponse.data);
      }
    } catch (mlError) {
      console.warn("ML Service unavailable, using default prediction:", mlError.message);
      // Simple fallback algorithm
      const totalScore = stress_level + anxiety_score + depression_score;
      if (totalScore < 100) {
        prediction.risk_level = "Low";
      } else if (totalScore < 200) {
        prediction.risk_level = "Moderate";
      } else {
        prediction.risk_level = "High";
      }
    }

    // Ensure risk_level is set
    if (!prediction.risk_level) {
      prediction.risk_level = "Moderate";
    }

    // Save assessment to database
    const newAssessment = await Assessment.create({
      userId,
      sleep_hours,
      stress_level,
      anxiety_score,
      depression_score,
      risk_level: prediction.risk_level
    });

    // Populate userId with user info
    await newAssessment.populate("userId", "name email");

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      data: newAssessment
    });

  } catch (error) {
    console.error("Create Assessment Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating assessment"
    });
  }
};

// Get All User Assessments
exports.getAssessments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 50, sortBy = "createdAt" } = req.query;

    const assessments = await Assessment.find({ userId })
      .sort({ [sortBy]: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments
    });

  } catch (error) {
    console.error("Get Assessments Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching assessments"
    });
  }
};

// Get Single Assessment
exports.getAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const assessment = await Assessment.findById(id)
      .populate("userId", "name email");

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found"
      });
    }

    // Check ownership
    if (assessment.userId._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view this assessment"
      });
    }

    res.status(200).json({
      success: true,
      data: assessment
    });

  } catch (error) {
    console.error("Get Assessment Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching assessment"
    });
  }
};

// Delete Assessment
exports.deleteAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const assessment = await Assessment.findById(id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found"
      });
    }

    // Check ownership
    if (assessment.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this assessment"
      });
    }

    await Assessment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Assessment deleted successfully"
    });

  } catch (error) {
    console.error("Delete Assessment Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting assessment"
    });
  }
};

// Get Assessment Statistics
exports.getStatistics = async (req, res) => {
  try {
    const userId = req.user.userId;

    const assessments = await Assessment.find({ userId });

    if (assessments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No assessments yet",
        data: {
          totalAssessments: 0,
          averageStress: 0,
          averageAnxiety: 0,
          averageDepression: 0,
          averageSleep: 0,
          riskDistribution: {
            low: 0,
            moderate: 0,
            high: 0
          }
        }
      });
    }

    const totalAssessments = assessments.length;
    const averageStress =
      assessments.reduce((sum, a) => sum + a.stress_level, 0) / totalAssessments;
    const averageAnxiety =
      assessments.reduce((sum, a) => sum + a.anxiety_score, 0) / totalAssessments;
    const averageDepression =
      assessments.reduce((sum, a) => sum + a.depression_score, 0) / totalAssessments;
    const averageSleep =
      assessments.reduce((sum, a) => sum + a.sleep_hours, 0) / totalAssessments;

    const riskDistribution = {
      low: assessments.filter(a => a.risk_level === "Low").length,
      moderate: assessments.filter(a => a.risk_level === "Moderate").length,
      high: assessments.filter(a => a.risk_level === "High").length
    };

    res.status(200).json({
      success: true,
      data: {
        totalAssessments,
        averageStress: averageStress.toFixed(1),
        averageAnxiety: averageAnxiety.toFixed(1),
        averageDepression: averageDepression.toFixed(1),
        averageSleep: averageSleep.toFixed(1),
        riskDistribution,
        latestAssessment: assessments[0]
      }
    });

  } catch (error) {
    console.error("Get Statistics Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics"
    });
  }
};
