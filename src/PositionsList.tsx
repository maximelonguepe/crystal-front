import {Button, Col, FormControl, Modal, Row, Table} from "react-bootstrap";
import {apiUrl, Location} from "./types";
import {useEffect, useState} from "react";

const PositionsList = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [showModalDeleteLocation, setShowModalDeleteLocation] = useState(false);
    const [showModalCreateLocation, setShowModalCreateLocation] = useState(false);

    const [locationToBeDeleted, setLocationToBeDeleted] = useState<Location>({
        id: "", location: {x: 0, y: 0,coordinates:[]}, name: ""
    });
    const [locationToBeCreated, setLocationToBeCreated] = useState<Location>({
        id: "", location: {x: 0, y: 0,coordinates:[]}, name: ""
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

    const fetchdeleteLocation = async () => {
        try {

            const response = await fetch(apiUrl + `locations?id=${locationToBeDeleted.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            closeModalDeleteLocation();
            fetchLocations();

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetchSaveLocation = async () => {
        locationToBeCreated.location.coordinates.push(locationToBeCreated.location.x,locationToBeCreated.location.y);
        try {
            const response = await fetch(apiUrl + "locations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(locationToBeCreated)
            });

            const data = await response.json();

            if (response.ok) {
                closeModalCreateLocation();
                await fetchLocations();

            } else {

            }
        } catch (error) {

        }
    };


    function closeModalDeleteLocation() {
        setShowModalDeleteLocation(false);
    }

    function closeModalCreateLocation() {
        setShowModalCreateLocation(false);
    }

    function findLocationById(array: Array<Location>, id: string) {
        return array.find(obj => obj.id === id);
    }

    const onclickShowModalDeleteLocation = (id: string) => {
        const objetFound = findLocationById(locations, id);

        if (objetFound) {
            setLocationToBeDeleted(objetFound);
            setShowModalDeleteLocation(true);
        } else {
            console.error(`Aucun objet trouvé avec l'ID ${id}`);
        }
    };

    const onclickShowModalCreateLocation = () => {
        setLocationToBeCreated({
            id: "", location: {x: 0, y: 0,coordinates:[]}, name: ""
        });
        setShowModalCreateLocation(true);

    };
    const handleInputLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;


        if (name === 'x' || name === 'y') {
            if (value !== '' && !isNaN(parseFloat(value))) {
            setLocationToBeCreated((prevState) => ({
                ...prevState,
                location: {
                    ...prevState.location,
                    [name]: parseFloat(value),
                },
            }));}
        } else {

            setLocationToBeCreated((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    useEffect(() => {
        fetchLocations();
    }, []);
    const renderList = () => {
        return (
            <>
                {locations.length > 0 ? (
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                        </thead>
                        <tbody>
                        {locations.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.location.x}</td>
                                <td>{item.location.y}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => onclickShowModalDeleteLocation(item.id)}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>Aucune position pour le moment</p>
                )}
                <Row>
                    <Col>
                        <Button variant="primary" onClick={onclickShowModalCreateLocation}>Ajouter une localisation</Button>
                    </Col>
                </Row>

                <Modal show={showModalDeleteLocation} onHide={closeModalDeleteLocation}>
                    <Modal.Header closeButton>
                        <Modal.Title>Etes vous sur de supprimer la localisation suivant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                Identifiant :
                            </Col>
                            <Col>
                                {locationToBeDeleted.id}
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                Nom :
                            </Col>
                            <Col>
                                {locationToBeDeleted.name}
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                Latitude :
                            </Col>
                            <Col>
                                {locationToBeDeleted.location.x}
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                Longitude :
                            </Col>
                            <Col>
                                {locationToBeDeleted.location.y}
                            </Col>

                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={fetchdeleteLocation}>Supprimer</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModalCreateLocation} onHide={closeModalCreateLocation}>
                    <Modal.Header closeButton>
                        <Modal.Title>Creer une localisation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                Nom :
                            </Col>
                            <Col>
                                <FormControl
                                    type="text"
                                    name="name"
                                    value={locationToBeCreated.name}
                                    onChange={handleInputLocationChange}
                                    autoFocus
                                />
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                Latitude :
                            </Col>
                            <Col>
                                <FormControl
                                    type="text"
                                    name="x"
                                    value={locationToBeCreated.location.x}
                                    onChange={handleInputLocationChange}

                                />
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                Longitude :
                            </Col>

                            <Col>
                                <FormControl
                                    type="text"
                                    name="y"
                                    value={locationToBeCreated.location.y}
                                    onChange={handleInputLocationChange}

                                />
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={fetchSaveLocation}>Ajouter</Button>
                    </Modal.Footer>
                </Modal>

            </>

        )
    }
    return (
        renderList()
    );
}
export default PositionsList;