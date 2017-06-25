(() => {
    "use strict";
    $(document).ready(()=>{
        console.log('index.js');
        drawVehiclePopulation();
    });

    function drawVehiclePopulation() {
        const vehiclePopulation = new VehiclePopulation("#vehicle-population");
        vehiclePopulation.draw();
    }

})();