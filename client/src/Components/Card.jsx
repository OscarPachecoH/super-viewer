import { Link } from 'react-router-dom';
import '../Styles/Card.css'

const Card = ({ project }) => {
    return (
        <div className="card card-project text-center">
            <div className="card-body">
                <h5 className="card-title">{project.project}</h5>
                <p className="card-text">
                    {project.location}
                </p>
                <Link className="btn btn-submit" to={`/dashboard/${project.id}`}>Gestionar</Link>
            </div>
        </div>
    );
}

export default Card;