import React, { useEffect, useState } from 'react'
import JobList from '../components/JobList'
import getJob from '../services/getJob'

const Home = () => {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [search, setSearch] = useState('')
    const [location, setLocation] = useState('')

    const [appliedSearch, setAppliedSearch] = useState('')
    const [appliedLocation, setAppliedLocation] = useState('')

    const [categoryFilter, setCategoryFilter] = useState('all')


    useEffect(() => {

        async function fetchJob() {

            setLoading(true)
            setError('')

            try {

                const data = await getJob()
                setJobs(data.jobs)

            } catch (error) {

                setError('Something went wrong. Please try again later.')

            } finally {

                setLoading(false)

            }
        }

        fetchJob()

    }, [])


    function handleSearch() {
        setAppliedSearch(search)
        setAppliedLocation(location)
    }


    function handleClear() {

        setSearch('')
        setLocation('')
        setAppliedSearch('')
        setAppliedLocation('')
        setCategoryFilter('all')

    }


    function handleKeyDown(e) {

        if (e.key === 'Enter') {
            handleSearch()
        }

    }


    const jobCategoryFilter = [
        ...new Set(jobs.map((job) => job.category))
    ]


    const filteredJobs = jobs.filter((job) => {

        const matchesSearch =
            job.title.toLowerCase().includes(
                appliedSearch.toLowerCase()
            )

        const matchesCompany =
            job.company.toLowerCase().includes(
                appliedSearch.toLowerCase()
            )

        const matchesLocation =
            job.location.toLowerCase().includes(
                appliedLocation.toLowerCase()
            )

        const matchesCategory =
            categoryFilter === 'all' ||
            job.category === categoryFilter


        return (
            (matchesSearch || matchesCompany) &&
            matchesLocation &&
            matchesCategory
        )

    })


    return (
        <main className="container">

            <section className="search-section">

                <div className="search-header">

                    <h2>Search Your Jobs</h2>

                    <p>
                        Find jobs by title, company, location or category.
                    </p>

                </div>


                <div className="search-controls">

                    <input
                        type="text"
                        placeholder="Search title or company"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <input
                        type="text"
                        placeholder="Search location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >

                        <option value="all">
                            All Categories
                        </option>

                        {jobCategoryFilter.map((category) => (

                            <option
                                value={category}
                                key={category}
                            >
                                {category}
                            </option>

                        ))}

                    </select>


                    <button
                        className="search-btn"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    <button
                        className="clear-btn"
                        onClick={handleClear}
                    >
                        Clear
                    </button>

                </div>

            </section>


            <section className="job-results">

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


                {!loading &&
                    !error &&
                    jobs.length > 0 &&
                    filteredJobs.length === 0 && (

                        <div className="empty-state">

                            <h2>No Jobs Found</h2>

                            <p>
                                Please change your search or location.
                            </p>

                        </div>

                    )}


                {!loading &&
                    !error &&
                    filteredJobs.length > 0 && (

                        <JobList
                            filteredJobs={filteredJobs}
                        />

                    )}

            </section>

        </main>
    )
}

export default Home