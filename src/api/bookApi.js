import axios from "axios";
import defaultImage from "../bookcovernotfound.png"; 


const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

/**
 * Static class tying together methods used to get/send to the Google Books Api. 
 */

/** Clean up data in case of missing fields */
const cleanData = (res) => {
    let cleanedData = {
        id: res.id,
        title: res.volumeInfo.title, 
        authors: 'unknown',
        publisher: 'unknown',  
        publishedDate: 'unknown', 
        description: 'unknown',  
        pageCount: null,
        image:  defaultImage,
        isbn: 'unknown'
    }

    if (res.volumeInfo.hasOwnProperty('authors')) {
        cleanedData = {...cleanedData, authors: res.volumeInfo.authors.join(', ')}
    }
    if (res.volumeInfo.hasOwnProperty('publisher')) {
        cleanedData = {...cleanedData, publisher: res.volumeInfo.publisher}
    }
    if (res.volumeInfo.hasOwnProperty('publishedDate')) {
        cleanedData = {...cleanedData, publishedDate: res.volumeInfo.publishedDate}
    }
    if (res.volumeInfo.hasOwnProperty('description')) {
        cleanedData = {...cleanedData, description: res.volumeInfo.description}
    }
    if (res.volumeInfo.hasOwnProperty('pageCount')) {
        cleanedData = {...cleanedData, pageCount: res.volumeInfo.pageCount}
    }
    if (res.volumeInfo.hasOwnProperty('imageLinks')) {
        cleanedData = {...cleanedData, image: res.volumeInfo.imageLinks.thumbnail}
    }
    if (res.volumeInfo.hasOwnProperty('industryIdentifiers')) {
        cleanedData = {...cleanedData, isbn: res.volumeInfo.industryIdentifiers[0].identifier}
    }

    return cleanedData
}

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

    /** Search for book */
    static async bookSearch(phrase) {
        let res = await this.request(`?q=${phrase}`);
        let cleanRes = []
        if (res.totalItems > 0) {
            for (let result of res.items) {
                cleanRes.push(cleanData(result))
            }
        }
        return cleanRes;
    }

    /** Get book data by book id */
    static async getBook(id) {
        let res = await this.request(`/${id}`);
        res = cleanData(res);
        return res
    }

}


export default GoogleBooksApi