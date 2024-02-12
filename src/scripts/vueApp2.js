const { createApp, ref } = Vue;

createApp({
    setup() {
        const ipAddress = ref('');
        const ipInfo = ref(null);
        let map;

        const initMap = (latitude, longitude) => {
            if (map) {
                map.setView([latitude, longitude], 13);
            } else {
                map = L.map('map').setView([latitude, longitude], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                    maxZoom: 18,
                }).addTo(map);
            }
            try{
                map.invalidateSize();
            } catch(error){
                console.error('Error resizing', error);
            }
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup('IP Location.')
                .openPopup();
        };

        const fetchIPInfo = async () => {
            try {
                const response = await fetch(`https://ipapi.co/${ipAddress.value}/json/`);
                ipInfo.value = await response.json();
                if (ipInfo.value) {
                    initMap(ipInfo.value.latitude, ipInfo.value.longitude);
                }
            } catch (error) {
                console.error('Error fetching IP information:', error);
            }
        };

        const handleSubmit = () => {
            lookup();
        };

        const lookup = async () => {
            ipInfo.value = null;
            fetchIPInfo();
        }

        return {
            ipAddress,
            ipInfo,
            handleSubmit,
            lookup,
        };
    }
}).mount('#app');
