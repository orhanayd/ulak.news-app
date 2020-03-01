import axios from 'axios';
import { API_URL, TOKEN } from 'react-native-dotenv'

class Api {

    constructor() {
        this.api_url = API_URL;
        this.token = TOKEN;
    }
    
    /**
     * get all news
     * 
     * @param {int} limit 
     * @return {Array}
     */
    async getAllNews(limit=20) {
        try {
            let api = await axios.get( this.api_url + "/news?limit="+limit, {
                headers: { Authorization: this.token }
            });
            return await Promise.all([api]);
        } catch (err) {
            return false;
        }
    }

    /**
     * get new
     * 
     * @param {int} id 
     * @param {string} agency 
     * @return {Array}
     */
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

    /**
     * get agencies
     * 
     */
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

    /**
     * 
     * @param {string} agency 
     * @param {int} limit 
     * @return {Array}
     */
    async getAgencyNews(agency, limit=20) {
        try {
            let api = await axios.get( this.api_url + "/news/"+agency+"?limit="+limit, {
                headers: { Authorization: this.token }
            });
            return await Promise.all([api]);
        } catch (err) {
            return false;
        }
    }

    /**
     * 
     * @param {string} q 
     * @param {int} limit 
     * @return {Array}
     */
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