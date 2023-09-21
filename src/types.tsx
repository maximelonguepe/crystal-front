
export const apiUrl = process.env.REACT_APP_API_URL;
export interface Location {
    id: string;
    name: string;
    location:Coordinates;
}
export interface Coordinates {
    x: number;
    y: number;
}