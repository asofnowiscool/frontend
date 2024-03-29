import Header from "./Header";
import AddData from "./AddData";
import Data from "./Data";
import * as React from "react";
import {useEffect, useState} from "react";

const Homepage = () => {



    const [showAddData, setShowAddData] = useState
    (false)
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const dataFromServer = await fetchData()
            setData(dataFromServer)
        }
        getData()
    }, [])

    //fetching the data
    const fetchData = async () => {
        //await cause fetch returns promise
        const res = await fetch('http://localhost:9191/sensorrecords/findAllSensorrecords')
        const data = await res.json()

        return data
    }


        //fetching the datastream
    const fetchDatastream = async (id) => {
        //await cause fetch returns promise
        const res = await fetch(`http://localhost:9191/sensorrecords/findSensorrecord/${id}`)
        const data = await res.json()

        return data
    }



    //Add Data
    const addData = async (datastream) => {
        //request response
        const res = await fetch('http://localhost:9191/sensorrecords/addSensorrecord', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(datastream)
        })
        //new data that was just created
        const newData = await res.json()
        //add the new data
        setData([...data, newData])
    }

    //delete Data
    const  deleteData = async (id) => {
        await fetch(`http://localhost:9191/sensorrecords/deleteSensorrecord/${id}`,
            {method: 'DELETE'})
        setData(data.filter((datastream) => datastream.id !== id))
    }

    //Toggle data
    const toggleData = async (id) => {



            const dataToToggle = await fetchDatastream(id)
        const updDatastream = { ...dataToToggle, showData : !dataToToggle.showData }
        //updateNewestSensorrecord
            const res = await  fetch(`http://localhost:9191/sensorrecords/updateNewestSensorrecord/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updDatastream)
            })
            const data2 = await res.json();
            setData(data.map((datastream) =>
                    datastream.sensorId === data2.sensorId ? {...datastream, showData: !datastream.showData} : datastream
                )
            )
        }



    return (
        <div className="home_container">

            <Header onAdd={() =>setShowAddData
            (!showAddData)}
                    showAdd={showAddData} />
            {showAddData && <AddData onAdd={addData} />}
            {data.length > 0 ?
                <Data data={data}   onDelete={deleteData}
                    onToggle={toggleData} onUpdate={toggleData}/>
                : <h3>'No Data available'</h3>}
        </div>
    )
}


export default Homepage