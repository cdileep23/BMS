import { getAllBattery, getBatteryByField, getBatteryById, getBatteryFieldByTimeRange, postBattery } from "./controllers/battery.controller.js";

import express from "express"
 const router=express.Router()

router.route('/battery/data').post(postBattery)
router.route("/battery/all").get(getAllBattery);
router.route('/battery/:battery_id').get(getBatteryById)
router.route('/battery/:battery_id/:field').get(getBatteryByField)
router.route("/battery/:id/:field").get(getBatteryFieldByTimeRange);

export default router