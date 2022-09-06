import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://www.googleapis.com/books/v1/volumes";

/**
 * Static class tying together methods used to get/send to the Google Books Api. 
 */

class GoogleBooksApi {

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const params = (method === "get") ? data : {};

        try {
            return (await axios({url, method, data, params})).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes 

    /** Get book data by book id */
    static async getBook(id) {
        let res = await this.request(`${id}`);

        let bookData = {
            id: id,
            title: res.volumeInfo.title, 
            authors: res.volumeInfo.authors, 
            publisher: res.volumeInfo.publisher, 
            publishedDate: res.volumeInfo.publishedDate, 
            description: res.volumeInfo.description, 
            pageCount: res.volumeInfo.pageCount, 
            image: res.volumeInfo.imageLinks || null, 
            isbn: res.volumeInfo.industryIdentifiers[1].identifier || 'isbn unknown'
        }

        return bookData;
    }
}


export default GoogleBooksApi