import axios from "axios";

async function getSlug(slug) {

    const response = await axios.get(`https://remotelanders.com/api/jobs/${slug}`);

    return response.data;

}

export default getSlug;