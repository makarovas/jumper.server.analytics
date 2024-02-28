"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackEvent = void 0;
const axios_1 = __importDefault(require("axios"));
const GA_MEASUREMENT_ID = 'UA-XXXXXXXXX-X'; // Replace with your Google Analytics Measurement ID
function trackEvent(userId, event) {
    const payload = {
        v: '1',
        tid: GA_MEASUREMENT_ID,
        cid: userId,
        t: 'event',
        ec: 'User Interaction',
        ea: event,
    };
    axios_1.default
        .post('https://www.google-analytics.com/collect', null, { params: payload })
        .then(() => console.log('Event sent to Google Analytics'))
        .catch((error) => console.error('Error sending event to Google Analytics:', error));
}
exports.trackEvent = trackEvent;
