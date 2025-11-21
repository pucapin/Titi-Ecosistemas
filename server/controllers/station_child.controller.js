const { emitEvent } = require("../services/socket.service");

const { getStationChildDB, endStationDB, getStationProgressDB } = require('../db/station_child.db');

const getStationChild = async (req, res) => {
  try {
    const data = await getStationChildDB();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
};
const endStation = async (req, res) => {
  try {
    const { childId, stationId, completed, correctas } = req.body;
    const result = await endStationDB(childId, stationId, completed, correctas);

    await emitEvent("endStation");
    res.json({ ok: true, data: result });
  } catch (error) {
    console.error("Error in endStation:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

const getStationProgress = async (req, res) => {
  try {
    const { id: childId } = req.params;
    const response = await getStationProgressDB(childId);
    
    if (!response.success) {
      return res.status(404).json(response);
    }
    
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      error: err.message 
    });
  }
};

module.exports = { getStationChild, endStation, getStationProgress };
