import React, { useContext } from 'react'
import FavoriteContext from '../context/FavoriteContext'
import JobCard from '../components/JobCard'

const Favorites = () => {

    const {
        favorites,
        handleRemove
    } = useContext(FavoriteContext)


    return (
        <main className="container">

            <div className="favorites-header">

                <h1>Saved Jobs</h1>

                <p>
                    Total Saved: {favorites.length}
                </p>

            </div>


            {favorites.length === 0 && (

                <div className="empty-state">

                    <h3>
                        No Saved Jobs
                    </h3>

                    <p>
                        Please add some jobs.
                    </p>

                </div>

            )}


            {favorites.length > 0 && (

                <div className="favorites-list">

                    {favorites.map((job) => (

                        <div
                            className="favorite-card"
                            key={job.slug}
                        >

                            <JobCard job={job} />

                            <button
                                className="remove-btn"
                                onClick={() =>
                                    handleRemove(job.slug)
                                }
                            >
                                Remove Job
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </main>
    )
}

export default Favorites