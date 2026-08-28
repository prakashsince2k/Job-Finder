import React, {
    useContext,
    useEffect,
    useState
} from 'react'

import {
    Link,
    useParams
} from 'react-router-dom'

import FavoriteContext from '../context/FavoriteContext'
import getSlug from '../services/getSlug'

const JobDetails = () => {

    const { slug } = useParams()

    const {
        favorites,
        handleSave
    } = useContext(FavoriteContext)


    const [job, setJob] = useState(null)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState('')


    const isInSave = favorites.some(
        (favorite) => favorite.slug === job?.slug
    )


    useEffect(() => {

        async function fetchSlug() {

            setLoading(true)
            setError('')

            try {

                const data = await getSlug(slug)

                setJob(data)

            } catch (error) {

                setError('Failed to fetch job details')

            } finally {

                setLoading(false)

            }
        }

        fetchSlug()

    }, [slug])


    return (
        <main className="container">

            {loading && (
                <p className="status-message">
                    Loading....
                </p>
            )}


            {error && (
                <p className="status-message error-message">
                    {error}
                </p>
            )}


            {job && (

                <section className="job-details">

                    <Link
                        className="back-link"
                        to="/"
                    >
                        ← Back To Jobs
                    </Link>


                    <div className="job-details-card">

                        <h1>{job.title}</h1>

                        <p className="company">
                            {job.company}
                        </p>


                        <div className="job-meta">

                            <p>
                                <strong>Location:</strong>
                                {job.location}
                            </p>

                            <p>
                                <strong>Salary:</strong>
                                {job.salary}
                            </p>

                            <p>
                                <strong>Type:</strong>
                                {job.type}
                            </p>

                            <p>
                                <strong>Category:</strong>
                                {job.category}
                            </p>

                        </div>


                        <div className="job-actions">

                            <a
                                className="apply-btn"
                                href={job.applyUrl}
                                target="_blank"
                            >
                                Apply Job
                            </a>

                            <button
                                onClick={() => handleSave(job)}
                                disabled={isInSave}
                            >
                                {isInSave
                                    ? 'Saved Job ✅'
                                    : 'Save Job'}
                            </button>

                        </div>

                    </div>

                </section>

            )}

        </main>
    )
}

export default JobDetails