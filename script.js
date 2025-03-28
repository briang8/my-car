$(document).ready(function() {
    // Initializing CarQuery API
    var carquery = new CarQuery();
    carquery.init();

    // Set filter to only show cars sold in the US
    carquery.setFilters({ sold_in_us: false });

    // Populate dropdowns with car data
    carquery.initYearMakeModelTrim('car-years', 'car-makes', 'car-models', 'car-model-trims');

    // Event Listener for "Search" button
    $('#cq-show-data').click(function() {
        // Display a loading message while fetching data
        $('#car-model-data').html("<p>Loading...</p>").fadeIn();

        // Fetch car data and populate results
        carquery.populateCarData('car-model-data', function(data) {
            if (!data || $.isEmptyObject(data)) {
                $('#car-model-data').html("<p>No data available for this model.</p>");
                return;
            }

            // Define the fields to display
            let details = "";
            const fields = {
                year: "Year",
                make_display: "Make",
                model_name: "Model",
                model_trim: "Trim",
                model_body: "Body Type",
                model_engine_fuel: "Fuel Type",
                model_engine_power_hp: "Horsepower",
                model_transmission_type: "Transmission",
                model_top_speed_kph: "Top Speed (km/h)"
            };

            // Loop through the fields and display data
            for (let key in fields) {
                if (data[key] && data[key] !== "Not Available") {
                    details += `<p><strong>${fields[key]}:</strong> ${data[key]}</p>`;
                }
            }

            // Show results or message if no data is available
            $('#car-model-data').html(details || "<p>No details available.</p>").fadeIn();
        });
    });

    // Event Listener for "Reset" button
    $('#reset-all').click(function () {
        location.reload(); // Reload the page to reset selections
    });
});
