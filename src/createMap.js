import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
////////////
////making marker for click on map
const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
export let initialPoint;
export let destinationPoint;
//////////////////
///function for creating map
const CreateMap = ({ settingX, settingY }) => {
  useEffect(() => {
    //Runs only on the first render
    const map = L.map("map").setView([29.6, 52.54], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // // a layer group, used here like a container for markers
    const markersGroup = L.layerGroup();
    map.addLayer(markersGroup);
    function onMapClick(e) {
      if (!initialPoint) {
        L.marker(e.latlng, { icon: customMarkerIcon }).addTo(markersGroup);
        initialPoint = e.latlng;
        settingX(e.latlng);
        document.getElementById(
          "initial"
        ).innerHTML = `مبدا: ${initialPoint?.lng} , ${initialPoint?.lat}`;
      } else if (!destinationPoint) {
        L.marker(e.latlng, { icon: customMarkerIcon }).addTo(markersGroup);
        destinationPoint = e.latlng;
        settingY(e.latlng);
        document.getElementById(
          "destination"
        ).innerHTML = `مقصد: ${destinationPoint?.lng} , ${destinationPoint?.lat}`;
      } else if (initialPoint && destinationPoint) {
        markersGroup.clearLayers();
        initialPoint = null;
        destinationPoint = null;
        document.getElementById("initial").innerHTML = `مبدا را انتخاب کنید`;
        document.getElementById(
          "destination"
        ).innerHTML = `مقصد را انتخاب کنید`;

        settingX(null);
        settingY(null);
        console.log("clear");
      }
      console.log(initialPoint, destinationPoint);
    }
    map.on("click", onMapClick);
  }, []);
};
export default CreateMap;
