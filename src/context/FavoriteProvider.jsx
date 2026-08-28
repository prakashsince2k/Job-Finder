import React, { useEffect, useState } from 'react'
import FavoriteContext from './FavoriteContext';

const FavoriteProvider = ({ children }) => {

    const [favorites, setFavorites] = useState(loadFavorites);

    function loadFavorites() {
        const savedJobs = localStorage.getItem('favorites');
        if (savedJobs) {
            return JSON.parse(savedJobs);
        } else {
            return [];
        }
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);


    function handleSave(job) {

        const existingJob = favorites.some((favorite) => favorite.slug === job.slug);

        if (existingJob) {
            return;
        }

        setFavorites([...favorites, job]);
    }


    function handleRemove(slug) {
        const updatedFavorites = favorites.filter((favorite) => favorite.slug !== slug);
        setFavorites(updatedFavorites);
    }

    return (
        <FavoriteContext.Provider value={{ favorites, handleSave, handleRemove }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteProvider