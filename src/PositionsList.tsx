import {Button, Col, Modal, Row, Table} from "react-bootstrap";
import {apiUrl, Location} from "./types";
import {useEffect, useState} from "react";

const PositionsList = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [showModalDeleteLocation, setShowModalDeleteLocation] = useState(false);
    const [locationToBeDeleted, setLocationToBeDeleted] = useState<Location>({
        id: "", location: {x: 0, y: 0}, name: ""
    });
    const fetchLocations = async () => {
        try {
            const response = await fetch(apiUrl+"locations");
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
                        'Content-Type': 'application/json', // Vous pouvez ajuster les en-têtes selon vos besoins
                    },
                }

            );
            fetchLocations();

        }catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function closeModalDeleteLocation() {
        setShowModalDeleteLocation(false);
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
            // Gérer le cas où l'objet n'est pas trouvé, par exemple, afficher une erreur ou une notification.
            console.error(`Aucun objet trouvé avec l'ID ${id}`);
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
                        <Button variant="primary">Ajouter une localisation</Button>
                    </Col>
                </Row>
                <Modal show={showModalDeleteLocation} onHide={closeModalDeleteLocation}>
                    <Modal.Header closeButton>
                        <Modal.Title>Etes vous sur de supprimer l'objet suivant</Modal.Title>
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
            </>

        )
    }
    return (
        renderList()
    );
}
export default PositionsList;