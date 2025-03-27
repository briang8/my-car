$(document).ready(function() {
    var carquery = new CarQuery();
    carquery.init();
    carquery.setFilters({ sold_in_us: true });
    carquery.initYearMakeModelTrim('car-years', 'car-makes', 'car-models', 'car-model-trims');

    $('#cq-show-data').click(function() {
        $('#car-model-data').html("<p>Loading...</p>").fadeIn();
        carquery.populateCarData('car-model-data', function(data) {
            if (!data || $.isEmptyObject(data)) {
                $('#car-model-data').html("<p>No data available for this model.</p>");
                return;
            }

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

            for (let key in fields) {
                if (data[key] && data[key] !== "Not Available") {
                    details += `<p><strong>${fields[key]}:</strong> ${data[key]}</p>`;
                }
            }

            $('#car-model-data').html(details || "<p>No details available.</p>").fadeIn();
            $('#search-again').fadeIn();
        });
    });

    $('#search-again').click(function() {
        $('.search-box select').prop('selectedIndex', 0);
        $('#car-model-data').fadeOut();
        $(this).fadeOut();
        carquery.init();
    });
});

