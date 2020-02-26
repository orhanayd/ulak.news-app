import axios from 'axios';
import { API_URL, TOKEN } from 'react-native-dotenv'

class Api {

    constructor() {
        this.api_url = API_URL;
        this.token = TOKEN;
    }
    
    async getAllNews() {
        try {
            let api = await axios.get( this.api_url + "/news", {
                headers: { Authorization: this.token }
            });
            return await Promise.all([api]);
        } catch (err) {
            return false;
        }
    }
    async getNew(id, agency) {
        try {
            let api = await axios.get( this.api_url + "/news/"+agency+"/"+id, {
                headers: { Authorization: this.token }
            });
            return await Promise.all([api]);
        } catch (err) {
            return false;
        }
    }

    async getAgencies() {
        try {
            let api = await axios.get( this.api_url + "/agencies", {
                headers: { Authorization: this.token }
            });
            return await Promise.all([api]);
        } catch (err) {
            return false;
        }
    }

    async getAgencyNews(agency) {
        try {
            let api = await axios.get( this.api_url + "/news/"+agency, {
                headers: { Authorization: this.token }
            });
            return await Promise.all([api]);
        } catch (err) {
            return false;
        }
    }

    async getSearchNews(q, limit=15) {
        try {
            let api = await axios.get( this.api_url + "/search?q="+q+"&limit="+limit, {
                headers: { Authorization: this.token }
            });
            return await Promise.all([api]);
        } catch (err) {
            return false;
        }
    }
}

export default Api;