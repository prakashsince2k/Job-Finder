import React from 'react'
import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {

    return (
        <article className="job-card">

            <h3>{job.title}</h3>

            <p className="company">
                {job.company}
            </p>

            <div className="job-info">

                <p>{job.location}</p>

                <p>{job.category}</p>

                <p>{job.salary}</p>

            </div>

            <Link
                className="view-job-btn"
                to={`/jobs/${job.slug}`}
            >
                View Job
            </Link>

        </article>
    )
}

export default JobCard