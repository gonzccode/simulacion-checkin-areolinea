const { Router } = require("express");
const router = Router();
const FlightsController = require("../controllers/flightsController");

router.get("/", (request, response) => {
    return response.send("Welcome to Simulator Check-in")
})

router.get("/flights/:id/passengers", (request, response) => {
    const { id } = request.params;
    const flightsController = new FlightsController();
    const flightId = flightsController.getFlightsById(Number(id));
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
        data: flightId
    });
    
});

module.exports = router;