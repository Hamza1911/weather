import axios from 'axios'
import {apikey} from "../Constant/"

const forcastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${apikey}&q=${params.cityName}`
 const apiCall= async(endpoint)=>{
    const options = {
        method: 'GET',
        url: endpoint,
    };

    try{
        const res =await axios.request(options)
        return res.data
    }catch(e){
        console.log(e)
        return {}
    }
 }
 export const fetchWeatherforecast =params =>{
    let forecastUrl = forcastEndpoint(params);
    return apiCall(forecastUrl);
 }  
 export const fetchlocation =params =>{
    let locationsUrl = locationEndpoint(params);
    return apiCall(locationsUrl);
 }  