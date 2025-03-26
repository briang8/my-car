$(document).ready(function() {
    var carquery = new CarQuery();
    carquery.init();
    carquery.setFilters({ sold_in_us: true });
    carquery.initYearMakeModelTrim('car-years', 'car-makes', 'car-models', 'car-model-trims');
    $('#cq-show-data').click(function() { carquery.populateCarData('car-model-data'); });
});