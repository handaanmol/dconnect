
/**
 * This file contains the controller methods related to manipulation of item documents.
 */

//Importing the event service.
var eventService = require("../services/event.service.js");
var logger = require("../../logger.js");

//Importing the response object
var Response = require("../response.js");
var Promise = require("bluebird");

//Creating the object to be exported.
function init(router) {
    router.route('/events')
        .get(getEvents)
        .post(placeEvent);
    router.route('/events/:id')
        .get(getEventById);
};
/**
 * This controller method accepts the item json and passes it to the service layer for saving it as a item document.
 * @param {*} req
 *          The request json containing the payload for creating a item document.
 * @param {*} res
 *          The response json going out of controller layer.
 */
function placeEvent(req, res) {
    var response = new Response();
    var event = req.body;
    eventService.placeEvent(event).then(function (result) {
        response.data.event = result;
        response.status.code = "200";
        response.status.message = "Event Placed Successfully";
        logger.info("Event Placed Successfully");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while placing Event {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Event was not placed";
        res.status(500).json(response);
    });
}


function getEventById(req, res) {
    var response = new Response();
    var eventId = parseInt(req.params.id);
    eventService.getEventById(eventId).then(function (result) {
        response.data.event = result;
        response.status.code = "200";
        response.status.message = "event with id:" + eventId + " fetched successfully.";
        logger.info("event with id:" + eventId + " fetched successfully.");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching event with id :" + eventId + " {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "event was not fetched successfully";
        res.status(500).json(response);
    });
}

function getEvents(req, res) {
    var response = new Response();
    eventService.getEvents().then(function (result) {
        response.data.event = result;
        response.status.code = "200";
        response.status.message = "All Events fetched successfully.";
        logger.info("All Events fetched successfully.");
        res.status(200).json(response);
    }).catch(function (error) {
        logger.error("error while fetching Events {{In Controller}}", error);
        response.status.code = "500";
        response.status.message = "Events were not fetched successfully";
        res.status(500).json(response);
    });
}


//Finally exporting the employee controller methods as an object.
module.exports.init = init;