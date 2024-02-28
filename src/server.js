"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleAnalytics_1 = require("./googleAnalytics");
const app = (0, express_1.default)();
const PORT = 8001;
app.use(express_1.default.json());
// Sample route to track user interactions
app.post('/track', (req, res) => {
    const { userId, event } = req.body;
    // Track the event
    (0, googleAnalytics_1.trackEvent)(userId, event);
    res.status(200).send('Event tracked successfully');
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
