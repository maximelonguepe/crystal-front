import {apiUrl, Location} from "./types";
import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";

const ComparePositions = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [result, setResult] = useState<string>("");
    const [errorFetch, setErrorFetch] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<Location>({
        id: "-1",
        location: {x: 0, y: 0, coordinates: []},
        name: ""
    });
    const [selectedLocation2, setSelectedLocation2] = useState<Location>({
        id: "-1",
        location: {x: 0, y: 0, coordinates: []},
        name: ""
    });


    const fetchLocations = async () => {
        try {
            const response = await fetch(apiUrl + "locations");
            const jsonData = await response.json();
            setLocations(jsonData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchLocationCheckIfNear = async () => {
        try {
            const locationArray=[]
            locationArray.push(selectedLocation,selectedLocation2);
            const response = await fetch(apiUrl + "locations/near", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(locationArray),
            });

            if (response.ok) {
                const jsonData = await response.json();
                if(jsonData.result==="<="){
                    setResult("Distance inférieure ou égale à 10km")
                }
                else{
                    setResult("Distance supérieure à 10km")
                }
                setErrorFetch("");
            } else {
                console.error("Erreur de la requête :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de la requête :", error);
        }
    };
    function findLocationById(array: Array<Location>, id: string) {
        return array.find(obj => obj.id === id);
    }



    useEffect(() => {
        fetchLocations();
    }, []);
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = event.target.value;
        const objetFound = findLocationById(locations, id);
        if (objetFound) {
            setSelectedLocation(objetFound);
        } else {

            setSelectedLocation({
                id: "-1",
                location: {x: 0, y: 0, coordinates: []},
                name: ""
            })
        }
    };

    const handleSelect2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = event.target.value;
        const objetFound = findLocationById(locations, id);
        if (objetFound) {
            setSelectedLocation2(objetFound);
        } else {

            setSelectedLocation2({
                id: "-1",
                location: {x: 0, y: 0, coordinates: []},
                name: ""
            })
        }
    };

    const onclickShowIfNear = () => {
        if(selectedLocation.id!=='-1'&&selectedLocation2.id!=='-1'){
            fetchLocationCheckIfNear();
        }else {
            setErrorFetch('Veuillez selectionner des données valides');
            setResult('');
        }
    };
    const renderCompare = () => {
        return (
            <>
                {locations.length > 0 ? (
                    <>

                        <Form>
                            <Row>

                                <Col>
                                    <Form.Label value='-1'>Position 1 :</Form.Label>
                                </Col>
                                <Col>

                                    <Form.Select value={selectedLocation.id} onChange={handleSelectChange}>
                                        <option value="">Sélectionnez une option</option>
                                        {locations.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.name}( {location.location.x}, {location.location.y} )
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col>
                                    <Form.Label value='-1'>Position 2 :</Form.Label>
                                </Col>
                                <Col>

                                    <Form.Select value={selectedLocation2.id} onChange={handleSelect2Change}>
                                        <option value="">Sélectionnez une option</option>
                                        {locations.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.name}( {location.location.x}, {location.location.y} )
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form>
                        <br/>
                        <br/>

                        <Row>
                            <Col>
                                <Button onClick={onclickShowIfNear}>
                                    Comparer
                                </Button>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p style={{ color: 'red' }}>
                                    {errorFetch}
                                </p>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <p>
                                    {result}
                                </p>

                            </Col>
                        </Row>
                    </>
                ) : (
                    <p>Veuillez d'abord enregistrer des positions</p>
                )}
            </>
        )
    }
    return (
        renderCompare()
    );
}
export default ComparePositions;