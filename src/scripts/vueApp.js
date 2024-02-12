const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const ipAddress = ref('');
        const ipInfo = ref(null);

        const initMap = (latitude, longitude) => {
            const map = L.map('map').setView([latitude, longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(map);

            map.invalidateSize();
        };

        const fetchIPInfo = async () => {
            try {
                const response = await fetch(`https://ipapi.co/json/`);
                ipInfo.value = await response.json();
                if (ipInfo.value) {
                    initMap(ipInfo.value.latitude, ipInfo.value.longitude);
                }
            } catch (error) {
                console.error('Error fetching IP information:', error);
            }
        };
        onMounted(fetchIPInfo);

        return {
            ipAddress,
            ipInfo,
        };
    }
}).mount('#app');

