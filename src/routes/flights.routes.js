const { Router } = require("express");
const router = Router();
const FlightsController = require("../controllers/flightsController");

router.get("/", async(request, response) => {
    return response.send("Welcome to Simulator Check-in")
})

router.get("/flights", async (request, response) => {

    try {
        const flightsController = new FlightsController();
        const listFligths = await flightsController.getFlights();

        return response.json({
            ok: true,
            message: 'endpoint flights',
            flights: listFligths
        });

    } catch (error) {
        console.log("~❌ file: flights.router ~ error => /flights, ",error);
    }  
});

router.get("/flights/:id/passengers", async (request, response) => {
    const { id } = request.params;
    const flightsController = new FlightsController();
    const flightId = await flightsController.getFlightsById(Number(id));
    //console.log('flightId', flightId)
    if (!flightId) {
        return response.status(404).json({
            code: 404,
            data: {}
        });
    } else if (flightId == 'error') {
        return response.status(400).json({
            code: 400,
            errors: "could not connect to db"
        });
    }

    return response.status(200).json({
        code: 200,
        data: flightId,
        id: id
    });
    
});

module.exports = router;