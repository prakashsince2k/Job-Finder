import React from 'react'
import JobCard from './JobCard'

const JobList = ({ filteredJobs }) => {

    return (
        <div className="job-grid">

            {filteredJobs.map((job) => (

                <JobCard
                    key={job.slug}
                    job={job}
                />

            ))}

        </div>
    )
}

export default JobList