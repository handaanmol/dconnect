
/**
 * This service file contains the service layer methods for manipulating the order objects.
 */
var logger = require("../../logger.js");
var Promise = require('bluebird');
var _ = require('underscore');
var fs = require('fs');
// var itemFile = require('../../../item.json')
var eventFile = require('../../events.json')

//Creating the object which will finally be exported
var eventService = {
    placeEvent: placeEvent,
    getEventById: getEventById,
    getEvents:getEvents
};

/**
 * This method prepares the actual employee document to be stored in database.
 * @param {*event} event
 */
function placeEvent(event) {
    return new Promise(function (resolve, reject) {
        var eventNo = new Date().getTime();
        var obj = {
            eventId: eventNo,
            eventName: event.eventName,
            date: event.date
        }
        eventFile.events.push(obj);
        fs.writeFile(__dirname + "/../../events.json", JSON.stringify(eventFile), function (err) {
            if (err) {
                logger.error("Some error while adding new event in the event file");
                reject(err);
            } else {
                logger.info("event No:" + eventNo + " placed successfully");
                resolve(obj);
            }
        });
    })
};


function getEventById(eventId) {
    return new Promise(function (resolve, reject) {
        var events=eventFile.events;
        if (events!= undefined && events != null) {
            console.log("events are",events);
            var event = _.findWhere(events, {eventId: eventId });
            // console.log("events is",events);
            resolve(events);
        }
        else {
            logger.error("Some error in fetching the items from inventory");
            reject("Some error in fetching the items from inventory");
        }
    })
}


function getEvents() {
    return new Promise(function (resolve, reject) {
        var events=eventFile.events;
        if (events!= undefined && events != null) {
            logger.info("events fetched successfully")
            resolve(events);
        }
        else {
            logger.error("Some error in fetching the items from inventory");
            reject("Some error in fetching the items from inventory");
        }
    })
}
//Exporting allthe methods in an object
module.exports = eventService;