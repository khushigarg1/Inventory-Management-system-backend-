const express = require("express")
const router = express.Router();


const inventoryRouter = require("./inventoryRoute");
const locationRouter = require("./locationRoute");
const orderRouter = require("./orderRoute");

router.use("/inventoryRoute", inventoryRouter);
router.use("/locationRoute", locationRouter);
router.use("/orderRoute", orderRouter);

module.exports = router;