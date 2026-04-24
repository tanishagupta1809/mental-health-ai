from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ==================== PREDICTION MODEL ====================

def predict_risk_level(stress_level, anxiety_score, depression_score, sleep_hours):
    """
    AI-based mental health risk prediction model
    
    Weighted scoring system:
    - Stress: 35% weight
    - Anxiety: 35% weight  
    - Depression: 20% weight
    - Sleep: 10% weight
    
    Returns: Low, Moderate, or High risk
    """
    
    # Normalize sleep hours (optimal is 7-9 hours)
    sleep_score = 0
    if sleep_hours < 4:
        sleep_score = 30  # Very poor sleep
    elif sleep_hours < 6:
        sleep_score = 20  # Poor sleep
    elif sleep_hours < 7 or sleep_hours > 9:
        sleep_score = 10  # Below optimal
    else:
        sleep_score = 0   # Optimal sleep
    
    # Calculate weighted score (0-100)
    weighted_score = (
        (stress_level * 0.35) +
        (anxiety_score * 0.35) +
        (depression_score * 0.20) +
        (sleep_score * 0.10)
    )
    
    # Determine risk level
    if weighted_score < 30:
        risk_level = "Low"
    elif weighted_score < 60:
        risk_level = "Moderate"
    else:
        risk_level = "High"
    
    return {
        "risk_level": risk_level,
        "weighted_score": round(weighted_score, 2),
        "sleep_quality": sleep_score
    }


# ==================== ROUTES ====================

@app.route("/")
def home():
    return jsonify({
        "message": "Mental Health ML Service Running",
        "version": "1.0.0",
        "status": "active",
        "timestamp": datetime.now().isoformat()
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "ml-prediction"
    })


@app.route("/predict", methods=["POST"])
def predict():
    """
    Predict mental health risk level based on input metrics
    
    Expected JSON:
    {
        "stress_level": 0-100,
        "anxiety_score": 0-100,
        "depression_score": 0-100,
        "sleep_hours": 0-24
    }
    """
    try:
        data = request.json
        
        # Validate input
        required_fields = ["stress_level", "anxiety_score", "depression_score"]
        for field in required_fields:
            if field not in data:
                return jsonify({
                    "success": False,
                    "error": f"Missing required field: {field}"
                }), 400
        
        # Extract and validate values
        stress_level = int(data.get("stress_level", 0))
        anxiety_score = int(data.get("anxiety_score", 0))
        depression_score = int(data.get("depression_score", 0))
        sleep_hours = float(data.get("sleep_hours", 7))
        
        # Validate ranges
        if not (0 <= stress_level <= 100):
            return jsonify({"success": False, "error": "Stress level must be 0-100"}), 400
        if not (0 <= anxiety_score <= 100):
            return jsonify({"success": False, "error": "Anxiety score must be 0-100"}), 400
        if not (0 <= depression_score <= 100):
            return jsonify({"success": False, "error": "Depression score must be 0-100"}), 400
        if not (0 <= sleep_hours <= 24):
            return jsonify({"success": False, "error": "Sleep hours must be 0-24"}), 400
        
        # Get prediction
        prediction = predict_risk_level(
            stress_level,
            anxiety_score,
            depression_score,
            sleep_hours
        )
        
        return jsonify({
            "success": True,
            "prediction": prediction,
            "input": {
                "stress_level": stress_level,
                "anxiety_score": anxiety_score,
                "depression_score": depression_score,
                "sleep_hours": sleep_hours
            },
            "timestamp": datetime.now().isoformat()
        }), 200
        
    except ValueError:
        return jsonify({
            "success": False,
            "error": "Invalid input format. All fields must be numeric."
        }), 400
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route("/batch-predict", methods=["POST"])
def batch_predict():
    """
    Predict for multiple assessments at once
    
    Expected JSON:
    {
        "assessments": [
            {
                "stress_level": 0-100,
                "anxiety_score": 0-100,
                "depression_score": 0-100,
                "sleep_hours": 0-24
            }
        ]
    }
    """
    try:
        data = request.json
        assessments = data.get("assessments", [])
        
        if not assessments or not isinstance(assessments, list):
            return jsonify({"success": False, "error": "Invalid assessments format"}), 400
        
        predictions = []
        for assessment in assessments:
            try:
                prediction = predict_risk_level(
                    int(assessment.get("stress_level", 0)),
                    int(assessment.get("anxiety_score", 0)),
                    int(assessment.get("depression_score", 0)),
                    float(assessment.get("sleep_hours", 7))
                )
                predictions.append(prediction)
            except (ValueError, TypeError):
                predictions.append({"error": "Invalid assessment data"})
        
        return jsonify({
            "success": True,
            "predictions": predictions,
            "count": len(predictions),
            "timestamp": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/info", methods=["GET"])
def info():
    return jsonify({
        "service": "Mental Health Prediction Service",
        "version": "1.0.0",
        "endpoints": {
            "GET /": "Service status",
            "GET /health": "Health check",
            "POST /predict": "Single prediction",
            "POST /batch-predict": "Batch predictions",
            "GET /info": "Service information"
        },
        "model": {
            "type": "Weighted Risk Assessment",
            "weights": {
                "stress": 0.35,
                "anxiety": 0.35,
                "depression": 0.20,
                "sleep": 0.10
            },
            "risk_levels": ["Low", "Moderate", "High"]
        }
    })


# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": "Endpoint not found"
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500


if __name__ == "__main__":
    print("🚀 Starting Mental Health ML Service...")
    app.run(host="0.0.0.0", port=5001, debug=True)
