import axios from 'axios'
import { useState } from 'react'
export const axiosPost = () => {

}
/* Petición Get */
export const axiosGet = (url) => {
    //const [dataReceived, setDataReceived] = useState("")
    //const [error, setError] = useState("")

    let dataReceived = ""
    let error = ""
    //console.log(url)

    axios.get(url)
        .then(({ data }) => {
            //console.log("Respuesta", data)
            dataReceived = data
            //setDataReceived(data)

        })
        .catch((err) => {
            //console.log(err)
            //setError(err)

        })
    //.finally(()=>{console.log("Servicio finalizado. bien o mal")})

    return [dataReceived, error]


}
/* Petición Get.End */

export const axiosDelete = () => {

}
export const axiosPut = () => {

}
export const axiosPatch = () => {

}