map = new google.maps.Map(document.getElementById("map"), {
    center: LatLng,
    zoom: 15,
    zoomControl: false,
    fullScreenControl: false,
    mapTypeControl: false,
    streetViewControl: false
});

const marker = new google.maps.Marker({
    map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    title: "Click to zoom",

});

function handleChangePosition(data) {
    const lat = data.latLng.lat()
    const lng = data.latLng.lng()
    const geocoder = new google.maps.Geocoder()

    console.log(marker)
    marker.setPosition({ lat, lng })

    map.panTo({ lat, lng })

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK') {
            const address = results[0].formatted_address
            const input = document.querySelector('address')
            input.value = address
        }
    })
}


marker.addListener('dragend', (data) => {
    handleChangePosition(data)
})
map.addListener('click', (data) => {
    handleChangePosition(data)
})
