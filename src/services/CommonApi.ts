import axios from "axios";


export const CommonApi = async (reqmethod: string, apiurl: string, reqbody: any, headers: object) => {

    const config = {

        method: reqmethod,
        url: apiurl,
        data: reqbody,
        headers: headers ? headers : { 'Content-Type': 'application/json' }
    }

    return await axios(config).then((res) => (res)).catch((err) => (err))

}