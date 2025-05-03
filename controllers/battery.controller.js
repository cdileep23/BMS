import { batteryModel } from "../model/battery.model.js";

const allowedFields = ["voltage", "current", "temperature"];

export const postBattery = async (req, res) => {
  try {
    const { battery_id, current, voltage, time, temperature } = req.body;

    const batteryWithIdexists=await batteryModel.findOne({battery_id})
    if(batteryWithIdexists){
        return res.status(500).json({
            success:false,
            message:"batter_id already exists"
        })
    }
    const battery = await batteryModel.create({
      battery_id,
      current,
      voltage,
      time,
      temperature,
    });

    res.status(201).json({
      success: true,
      message: "Battery data created successfully",
      data: battery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBattery = async (req, res) => {
  try {
    const allBatteries = await batteryModel.find();
    res.status(200).json({
      success: true,
      message: "All batteries retrieved successfully",
      data: allBatteries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBatteryById = async (req, res) => {
  try {
    const { battery_id } = req.params;
    const battery = await batteryModel.findOne({ battery_id });
    if (!battery) {
      return res.status(404).json({
        success: false,
        message: "No battery exists with this ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Battery found by ID",
      data: battery,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBatteryByField = async (req, res) => {
  try {
    const { battery_id, field } = req.params;

    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        success: false,
        message:
          "Only 'voltage', 'current', or 'temperature' fields are allowed.",
      });
    }

    const battery = await batteryModel.findOne({ battery_id });
    if (!battery) {
      return res.status(404).json({
        success: false,
        message: "No battery exists with this ID",
      });
    }

    res.status(200).json({
      success: true,
      message: `Battery ${field} data retrieved successfully`,
      data: {
        _id: battery._id,
        battery_id: battery.battery_id,
        [field]: battery[field],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBatteryFieldByTimeRange = async (req, res) => {
  try {
    const { battery_id, field } = req.params;
    const { start, end } = req.query;

    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        success: false,
        message:
          "Only 'voltage', 'current', or 'temperature' fields are allowed.",
      });
    }

    if (!start || !end || isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
      return res.status(400).json({
        success: false,
        message:
          "Both 'start' and 'end' query parameters are required in valid ISO format.",
      });
    }

    const entries = await batteryModel
      .find({
        battery_id,
        time: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      })
      .select(`battery_id time ${field}`)
      .sort({ time: 1 }); // Optional: chronological order

    if (entries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found for the specified battery and time range.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Retrieved '${field}' data for battery ${battery_id}`,
      data: entries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
