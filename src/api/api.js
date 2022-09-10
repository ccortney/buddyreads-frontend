import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/**
 * Static class tying together methods used to get/send to the Api. 
 */

class BuddyReadApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        // console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BuddyReadApi.token}`};
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes 

    /** Get the current user */
    static async getUser(id) {
        let res = await this.request(`users/${id}`);
        return res.user;
    }

    /** Get user by email */
    static async getUserbyEmail(email) {
        let res = await this.request("users", {email});
        return res.users[0];
    }


    /** Get token for login from email, password */
    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Signup for site */
    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Save user profile */
    static async saveProfile(id, data) {
        let res = await this.request(`users/${id}`, data, "patch");
        return res.user;
    }

    /** Get buddyreads*/
    static async getBuddyReads(createdBy) {
        let res = await this.request("buddyreads", {createdBy});
        return res.buddyreads;
    }

    /** Get buddyread invites */
    static async getInvites(buddy) {
        let res = await this.request("buddyreads", {buddy});
        return res.buddyreads;
    }

    /** Get buddyread invites */
    static async changeStatus(id, data) {
        let res = await this.request(`buddyreads/${id}`, data, "patch");
        return res;
    }

    /** Get buddyread data */
    static async getBuddyRead(id) {
        let res = await this.request(`buddyreads/${id}`);
        return res.buddyread;
    }

    /** Create new buddyread data */
    static async createBuddyRead(data) {
        let res = await this.request(`buddyreads`, data, "post");
        return res.buddyread;
    }

}


export default BuddyReadApi