import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';
import Card from './_card';
import cityArray from '../../public/cityArray.json';
import cityObj from '../../public/city.list.json';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    var [searchInp, setSearchInp] = useState()
    var [filterdCity, setFilterdCity] = useState([])
    var [url,setUrl]=useState();
    var [savedCity,setSavedCity]=useState([])
    // var [savedCity,setSavedCity]=useState(['https://api.openweathermap.org/data/2.5/weather?q=London,US&appid=2e7e1d8fabd7c153330e11d1f13782d9&units=metric',
    // 'https://api.openweathermap.org/data/2.5/weather?q=surat&appid=2e7e1d8fabd7c153330e11d1f13782d9&units=metric',
    // 'https://api.openweathermap.org/data/2.5/weather?q=Surendranagar&appid=2e7e1d8fabd7c153330e11d1f13782d9&units=metric',
    // 'https://api.openweathermap.org/data/2.5/weather?q=paris&appid=2e7e1d8fabd7c153330e11d1f13782d9&units=metric'])
    function getLocation() {
        if (typeof window !== 'undefined' && navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                (position) =>{
                    setUrl(`https://api.openweathermap.org/data/2.5/weather?lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${process.env.NEXT_PUBLIC_API_ID}&units=metric`)
                });
    }

    async function seacrhInList()
    {
        var a=[]
        if(searchInp!="" && searchInp.trim().length != 0 ){
            for (var i=cityObj.length - 1; i >= 0; i--)
            {
                if(cityObj[i].name.toLowerCase().startsWith(searchInp.toLowerCase()))
                {
                    a.push(`${cityObj[i].name},${cityObj[i].country}`)
                }
            }
        }
        setFilterdCity(a)
    }
    async function search(city){
        searchInp=""
        document.getElementById("searchInp").value=""
        setFilterdCity([])
        setUrl(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_ID}&units=metric`)
    }
    function addToSavedCity(url)
    {
        var arr=[...savedCity]
        arr.push(url)
        setSavedCity(arr)
    }

  return (
    <>
      <div className='container mx-auto text-center p-2'>
        <button className=' bg-green-400 mx-auto text-center w-48 rounded-full h-10 shadow-md shadow-green-500/70' onClick={()=>getLocation()}>Current Location</button>

        <div className='my-3 bg-slate-200 w-fit text-center rounded-2xl mx-auto shadow-md shadow-black-500/70'>

            <div >
                <input onKeyUp={()=>(seacrhInList())}  onChange={(e)=>(setSearchInp(e.target.value))} id='searchInp' className='bg-slate-200 rounded-full p-2 outline-none ' placeholder='Enter City Name'></input>
                {/* <button className='bg-green-400 py-3 px-5  rounded-full font-semibold' onClick={()=>search()}>Search</button> */}
            </div>
            <div className='bg-slate-200 rounded-b-2xl w-72 text-center mx-auto'>
                {
                    filterdCity.slice(0, 5).map((f) =>
                    <div className='py-2 hover:bg-green-200 hover:rounded-2xl' onClick={()=>search(f)}>{f}</div>
                  )
                }
            </div>
        </div>

        <Card addToSavedCity={addToSavedCity} url={url}></Card>
        {/* <Card response={response} city="Ahmedabad"></Card>
        <Card response={response} city="Surendranagar"></Card>
        <Card response={response} city="london"></Card> */}

      </div>
        <div class="mt-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">
            {
                savedCity.map((c) =><Card url={c}></Card>)
            }
        </div>
    </>
  )
}
