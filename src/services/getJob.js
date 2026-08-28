import axios from "axios";

async function getJob() {

    const response = await axios.get('https://remotelanders.com/api/jobs?limit=20');

    return response.data;

}

export default getJob;