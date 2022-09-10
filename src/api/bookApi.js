import axios from "axios";
import defaultImage from "../bookcovernotfound.png"; 


const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

/**
 * Static class tying together methods used to get/send to the Google Books Api. 
 */

class GoogleBooksApi {

    static async request(endpoint, data = {}, method = "get") {
        // console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}${endpoint}`;
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
        let res = await this.request(`/${id}`);

        let bookData = {
            id: id,
            title: res.volumeInfo.title, 
            authors: res.volumeInfo.authors.join(', '),
            publisher: res.volumeInfo.publisher || 'unknown',  
            publishedDate: res.volumeInfo.publishedDate || 'unknown', 
            description: res.volumeInfo.description || 'unknown',  
            pageCount: res.volumeInfo.pageCount || 0,
            image: res.volumeInfo.imageLinks || defaultImage,
            isbn: res.volumeInfo.industryIdentifiers[0].identifier
        }

        return bookData;
    }

    /** Search for book */
    static async bookSearch(phrase) {
        let res = await this.request(`?q=${phrase}`);

        return res;
    }

}


export default GoogleBooksApi