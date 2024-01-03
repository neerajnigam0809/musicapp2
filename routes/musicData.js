const express = require("express");
const mongoose = require("mongoose");
const { Router } = require("express");
const schema = require("../models/schema");
const { restart } = require("nodemon");
const route = Router();
var applicationListing = schema.musicapplications;


  
route.post('/', async (req, res) => {
    try {
      const MusicData = await applicationListing.find();
      res.status(200).send(MusicData);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving MusicData');
    }
  });

  route.post("/type/:Type", async (req, res) => {
    try {
      const { Type } = req.params; 
      const data = await applicationListing.find({ headphoneType: Type }); 
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error while fetching headphones');
    }
  });

   
  route.post("/brand/:Company", async (req, res) => {
    try {
      const { Company } = req.params; 
      const data = await applicationListing.find({ headphoneBrandName: Company}); 
      console.log("data", data);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error while fetching headphones');
    }
  });

  route.post("/color/:Color", async (req, res) => {
    try {
      const { Color } = req.params; 
      const data = await applicationListing.find({ headphoneColor: Color }); 
      console.log("data", data);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error while fetching headphones');
    }
  });

  
  route.post("/price-range", async (req, res) => {
    try {
      const { minPrice, maxPrice } = req.body; 
      const minPriceValue = parseInt(minPrice, 10);
      const maxPriceValue = parseInt(maxPrice, 10);
      const data = await applicationListing.find({
        $and: [
          { headphonePrice: { $gte: minPriceValue } }, 
          { headphonePrice: { $lte: maxPriceValue } }, 
        ],
      });
  
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error while fetching headphones');
    }
  });
  
  route.post("/sortlowestprice", async (req, res) => {
    try {
      const data = await applicationListing.find({}).sort({ headphonePrice: -1 }); 
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error while fetching sorted data');
    }
  });


  

  route.post("/sorthighestprice", async (req, res) => {
    try {
      const data = await applicationListing.find({}).sort({ headphonePrice: 1 }); // Sort by headphonePrice in ascending order (lowest to highest)
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error while fetching sorted data');
    }
  });

   // Sort alphabetically A to Z
route.post("/sortbrandnameasc", async (req, res) => {
  try {
    const data = await applicationListing.find({}).sort({ headphoneProductName: 1 }); // Sort by headphoneBrandName in ascending order (A to Z)
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error while fetching sorted data A to Z');
  }
});

// Sort alphabetically Z to A
route.post("/sortbrandnamedesc", async (req, res) => {
  try {
    const data = await applicationListing.find({}).sort({ headphoneProductName: -1 }); // Sort by headphoneBrandName in descending order (Z to A)
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error while fetching sorted data Z to A');
  }
});

route.post("/search", async (req, res) => {
  try {
    const { searchQuery } = req.body; 
    const data = await applicationListing.find({
      $or: [
        { headphoneBrandName: { $regex: searchQuery, $options: 'i' } }, 
        { headphoneProductName: { $regex: searchQuery, $options: 'i' } }, 
      ]
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error while performing search');
  }
});



module.exports = route;