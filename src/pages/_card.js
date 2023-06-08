import { useState ,useEffect} from 'react';
export default function Card(props) {
    var colors=['green-300','red-300','blue-300','cyan-300','orange-300','teal-300','violet-300','purple-300','fuchsia-300','pink-300','rose-300']
    var [bgColor,setBgColor]=useState()
    var [response, setResponse] = useState(
        {
          "base": null,
          "clouds": {
              "all": null
          },
          "cod": null,
          "coord": {
              "lat": null,
              "lon": null
          },
          "dt": null,
          "id": null,
          "main": {
              "feels_like": null,
              "humidity": null,
              "pressure": null,
              "temp": null,
              "temp_max": null,
              "temp_min": null
          },
          "name": null,
          "sys": {
              "country": null,
              "id": null,
              "sunrise": null,
              "sunset": null,
              "type": null
          },
          "timezone": null,
          "visibility": null,
          "weather": [
              {
                  "description": null,
                  "icon": null,
                  "id": null,
                  "main": null
              }
          ],
          "wind": {
              "deg": null,
              "speed": null
          }
      }
      
      );
      
       useEffect(() => {
        // var urlParams = new URLSearchParams(props.url);
        // var myParam = urlParams.get('city');
        console.log(props.addToSavedCity);
            getWeather(props.url)   
            setBgColor(colors[Math.floor(Math.random() * 10)])
            
    }, [props.url]);
   
    async function getWeather(apiUrl)
    {
        if(apiUrl!="" && apiUrl!=null && apiUrl!=undefined)
        {
            // const url = apiUrl
            const options = {method: 'GET',};
        
            try {
              let result = await fetch(apiUrl, options);
              setResponse(await result.json())
              console.log(response);
            } 
            catch (error) {
              console.error(error);
            }
        }
    }

    return <>

            {response.name!=null && response.name!="" &&
            <div className="flex justify-center ">
                <div style={  { "borderRadius": "33px" }}
                    className={`bg-${bgColor}  shadow-${bgColor}  shadow-2xl card  min-w-sm max-w-sm border border-gray-100   transition-shadow test  hover:shadow-shadow-xl w-full text-purple-50 rounded-md`}>
                    <h2 className="text-md mb-2 px-4 pt-4">
                        <div className="flex justify-between">
                            <div className="badge relative top-0">
                                <span className="mt-2 py-1 h-12px text-md font-bold text-2xl w-12px  rounded right-1 bottom-1 px-4">{response.name}</span></div>
                            <span className="text-lg font-bold ">{response.name!=null && <img className='inline-block' src={`https://flagcdn.com/40x30/${response.sys.country.toLowerCase()}.png`}></img>} </span>
                            
                            {props.addToSavedCity &&
                                <button onClick={()=>{props.addToSavedCity(props.url)}} className='text-black text-bold text-5xl hover:text-gray-600'>+</button>
                            }
                        </div>
                    </h2>
                   
                    <h1 className='block text-left ml-7 text-3xl'>{response.weather[0].description}</h1>
                    <div className="flex items-center p-4">
                        <div className="flex justify-center items-center w-96"><svg height="20" width="20" viewBox="0 0 32 32"
                                className="fill-current h-32 w-32 text-yellow-300">
                                <path
                                    d="M21.743,18.6872A6.05,6.05,0,0,0,22.8,17.6006a5.9977,5.9977,0,1,0-10.7334-4.4444,7.5568,7.5568,0,0,0-5.7158,5.0879A5.9926,5.9926,0,0,0,8,30H19a5.9854,5.9854,0,0,0,2.743-11.3128ZM18,10a4.0042,4.0042,0,0,1,4,4,3.9613,3.9613,0,0,1-.8,2.3994,4.0122,4.0122,0,0,1-.94.8917,7.5416,7.5416,0,0,0-6.1339-4.2395A3.9985,3.9985,0,0,1,18,10Zm1,18H8a3.9928,3.9928,0,0,1-.6729-7.93L7.99,19.958l.1456-.6562a5.4958,5.4958,0,0,1,10.729,0l.1464.6562.6622.1123A3.9928,3.9928,0,0,1,19,28Z"
                                    transform="translate(0 .005)"></path>
                                <path d="M26 13.005H30V15.005H26z"></path>
                                <path d="M23.071 5.929H27.071V7.929H23.071z" transform="rotate(-45 25.077 6.931)"></path>
                                <path d="M17 2.005H19V6.005H17z"></path>
                                <path d="M9.929 4.929H11.929V8.929H9.929z" transform="rotate(-45 10.935 6.931)"></path>
                            </svg></div>
                    </div>
                    <div className="text-md pt-4 pb-4 px-4">
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <span className="flex space-x-2 items-center">
                                    <svg height="20" width="20" viewBox="0 0 32 32" className="fill-current"><path d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"></path><path d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"></path></svg> <span>{response.wind.speed}km/h</span></span><span className="flex space-x-2 items-center"><svg height="20" width="20" viewBox="0 0 32 32" className="fill-current"><path d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"></path><path d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z"></path></svg>
                                     <span>{response.main.humidity}%</span></span>
                            </div>
                            <div>
                                <h1 className="text-6xl"> {response.main.temp}° </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    {/* <p className='hidden bg-green-300 bg-red-300 bg-blue-300 bg-cyan-300 bg-orange-300 bg-teal-300 bg-yellow-300 bg-violet-300 bg-purple-300 bg-fuchsia-300 bg-pink-300 bg-rose-300 shadow-green-300 shadow-red-300 shadow-blue-300 shadow-cyan-300 shadow-orange-300 shadow-teal-300 shadow-yellow-300 shadow-violet-300 shadow-purple-300 shadow-fuchsia-300 shadow-pink-300 shadow-rose-300'></p> */}
    </>
  }