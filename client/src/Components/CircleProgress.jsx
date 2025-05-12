import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../Styles/CircleProgress.css"

const CircleProgressbar = ({ value, label }) => {
    return (
        <div className="circle-progress-container">
            <h3 className="card-title">{label}</h3>
            <div className="info-container">
                <CircularProgressbar
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles({
                        textColor: "#333",
                        pathColor: value >= 80 ? "#10b981" : value >= 50 ? "#facc15" : "#ef4444",
                        trailColor: "#ddd",
                    })}
                />
            </div>
        </div>
    )
}

export default CircleProgressbar;