document.addEventListener('DOMContentLoaded', () => {
    const fetchDataBtn = document.getElementById('fetch-data');

    fetchDataBtn.addEventListener('click', () => {
        // Fetch geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } else {
            alert('Geolocation is not supported by your browser');
        }
    });

    function handleSuccess(position) {
        const { latitude, longitude } = position.coords;

       

        // Redirect to details.html with query parameters
        window.location.href = `details.html?lat=${latitude}&long=${longitude}`;
    }

    function handleError(error) {
        console.error('Error getting geolocation:', error.message);
        // Handle errors, show user-friendly messages
    }
});
