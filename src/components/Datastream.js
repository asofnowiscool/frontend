import { FaTimes } from 'react-icons/fa'
import ShowMoreBtn from "./ShowMoreBtn";

const Datastream = ({datastream, onDelete, onToggle, onUpdate}) => {

    let date = new Date(parseInt(datastream.timestamp));
    let timeStr = date.getDate()+
        '/'+ date.getMonth()+
        '/'+date.getFullYear()+
        ' '+date.getHours()+
        ':'+ date.getMinutes() +
        ':'+date.getSeconds();
    let temperature;
    let humidity;
    if (typeof parseFloat(datastream.temperature) === 'number'){
        temperature = parseFloat(datastream.temperature);
    } else {
        temperature = null;
    }

    if (typeof parseFloat(datastream.humidity) === 'number'){
        humidity = parseFloat(datastream.humidity);
    } else {
        humidity = null;
    }

return (

    <div className={`col s12 red lighten-4 datastream_div ${datastream.showData ? 'showData' : ''}`}
         onDoubleClick={() =>
             onToggle(datastream.id)}>
        <h4>
            <div><FaTimes style={{color: 'red', cursor: 'pointer'}}
                          onClick={() => {
                              if (window.confirm('Are you sure you want to delete sensor?')) {
                                  onDelete(datastream.id)
                              };
                          }}
            />
            </div>
            <div>
                <button className={'waves-effect waves-light btn-large right showMoreBtn'} text='showMore'
                        onClick={() => onUpdate(datastream.id)}>Show More</button>
            </div>
        </h4>
        <h4>{'Sensor ID: ' + datastream.sensorId}</h4>
        <span>{'Temperature: ' + temperature + '°'}</span>
        <p>Time of recording: <b>{datastream.timestamp ? timeStr : 'no timeslot available'}</b></p>
        <div>{datastream.showData === true ? 'humidity: ' + humidity + '%': ''}</div>
        <div>{datastream.showData === true ? 'Record ID: ' + datastream.id: ''}</div>

    </div>
)

}

export default Datastream