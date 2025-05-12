import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import "../Styles/LinearBar.css"

const LinearBar = ({ data, label }) => {
    return (
        <div className="linear-bar-container">
            <h3 className="card-title text-title">{label}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="piso" />
                    <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} labelFormatter={(label) => `${label}`} />
                    <Bar dataKey="avance" fill="#14919B" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LinearBar;