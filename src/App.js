import './App.css';
import { useEffect,useState} from 'react'
import Post from './Post'
import Favorites from './Favorites';

function App() {
    const [arrListFavorites , setArrListFavorites] = useState([]);
    const [city , setCity] = useState('');
    const [cityKey , setCityKey] = useState('');
    const [val , setVal] = useState('');
    const [autoComp , setAutoComp] = useState('');
    const [displayIndex , setDisplayIndex] = useState('block');
    const [displayFav , setDisplayFav] = useState('none');
    const [daily , setDaily] = useState([]);
    const [fiveDays , setFiveDays] = useState([]);
    const apiKey = 'GQMVTWNRvAN02wppccGTwv44CIuT13dS';
    const pathLocationKey = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    const pathAutoComplete = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${val}`;
    const pathFiveDays =`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}` ;
    const pathCurrentWeather = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`;
    var cityVar = city;
   

    
   //get locationKey to city 
useEffect(()=>{
  
  fetch(pathLocationKey).then(res => res.json()).then(data => {setCityKey(data[0].Key); console.log(data[0].Key);});
},[city])


  // get Weather for 5 days
useEffect(()=>{
        fetch(pathFiveDays).then(res=> res.json()).then(dataWeather=>{console.log('תחזית 5 ימים'); console.log(dataWeather);let add = [[dataWeather.DailyForecasts[0].Day.IconPhrase , dataWeather.DailyForecasts[0].Temperature.Maximum.Value, dataWeather.DailyForecasts[4].Temperature.Maximum.Unit],[dataWeather.DailyForecasts[1].Day.IconPhrase , dataWeather.DailyForecasts[1].Temperature.Maximum.Value, dataWeather.DailyForecasts[4].Temperature.Maximum.Unit],[dataWeather.DailyForecasts[2].Day.IconPhrase ,dataWeather.DailyForecasts[2].Temperature.Maximum.Value, dataWeather.DailyForecasts[4].Temperature.Maximum.Unit],[dataWeather.DailyForecasts[3].Day.IconPhrase , dataWeather.DailyForecasts[3].Temperature.Maximum.Value, dataWeather.DailyForecasts[4].Temperature.Maximum.Unit],[dataWeather.DailyForecasts[4].Day.IconPhrase , dataWeather.DailyForecasts[4].Temperature.Maximum.Value , dataWeather.DailyForecasts[4].Temperature.Maximum.Unit]]; setFiveDays(add);} );

},[cityKey])

  // get current Weather 
useEffect(()=>{
  fetch(pathCurrentWeather).then(res=> res.json()).then(dataWeatherCurrent=> { console.log("תחזית יומית"); console.log(dataWeatherCurrent);setDaily([dataWeatherCurrent[0].WeatherText, dataWeatherCurrent[0].Temperature.Metric.Value ]);console.log(daily);;});
 
},[cityKey])




  return (
    <div className="App">
      <div style={{display:displayIndex}}>
        {/* input search */}
        <input type={'search'} id={'inptId'} placeholder={'Enter Id'} onChange={(e)=>{setVal(e.target.value);}} list={'ss'} />
        {/* button search*/}
      <button onClick={()=>{setCity(val)}}>Search</button>
        {/* button favorites */}
      <button onClick={()=>{let add = [city,cityKey,daily,fiveDays];setArrListFavorites([...arrListFavorites,add]);}}>save to favorite</button>
        {/* button display favorites */}
      <button onClick={()=>{setDisplayFav('block');setDisplayIndex('none')}}>Favorites</button>
        {/* display weather */}
      <h1>תחזית יומית</h1>
      
           <Post city={cityVar} condition={daily[0]} temperature={daily[1]} day={'Today'}/> 
        
      <h1>תחזית 5 ימים</h1>
      
        {
          fiveDays.map((val , i)=>{
            return <Post city={cityVar} condition={val[0]} temperature={val[1]} mark={val[2]} day={'day'+' '+(i+1)}/>
            
          })
}
      </div>
      {/* display favorites */}
        <div style={{display:displayFav}}>
          <button onClick={()=>{setDisplayFav('none');setDisplayIndex('block');}}>back</button>
          {
            arrListFavorites.map((val)=>{return <Favorites nameCity={val[0]} conDaily={val[2][0]} tempDaily={val[2][1]} fiveDays={val[3]}/>})
          }
        </div>
      
       

     
       
      
    </div>
  );
}

export default App;
