const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const ipAddress = ref('');
        const ipInfo = ref(null);

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

        const initMap = (latitude, longitude) => {
            const map = L.map('map').setView([latitude, longitude], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup('Your IP Location')
                .openPopup();
        };

        return {
            ipAddress,
            ipInfo,
            initMap
        };
    }
}).mount('#app');
