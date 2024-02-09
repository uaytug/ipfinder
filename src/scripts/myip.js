async function fetchIPInfo(ipAddress) {
    try {
        const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching IP information:', error);
        throw error;
    }
}
