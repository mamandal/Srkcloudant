'use strict';
/* global process */
/*******************************************************************************
 * Copyright (c) 2015 IBM Corp.
 *
 * All rights reserved. 
 *
 * Contributors:
 *   David Huffman - Initial implementation
 *******************************************************************************/
var express = require('express');
//var session = require('express-session');
var router = express.Router();
var setup = require('../setup.js');
//var ssn;

//anything in here gets passed to JADE template engine
function build_bag(){
	return {
				setup: setup,								//static vars for configuration settings
				e: process.error,							//send any setup errors
				jshash: process.env.cachebust_js,			//js cache busting hash (not important)
				csshash: process.env.cachebust_css,			//css cache busting hash (not important)
				//ssn:null,
			};
}

// ============================================================================================================================
// Home
// ============================================================================================================================
router.route('/').get(function(req, res){
	res.redirect('/p1');
	//ssn=req.session;
});

router.route('/login').get(function(req, res){
	//ssn=req.session;
	res.render('login.jade', {title: 'Please Sign In To Fleetchain',bag: build_bag()});
});

// ============================================================================================================================
// Part 1
// ============================================================================================================================
router.route('/p1').get(function(req, res){
	res.render('part1', {title: 'Fleetchain Uberdotcom', bag: build_bag()});
});
router.route('/p1/:page?').get(function(req, res){
	res.render('part1', {title: 'Fleetchain Uberdotcom', bag: build_bag()});
});

// ============================================================================================================================
// Part 2
// ============================================================================================================================
router.route('/p2').get(function(req, res){
	res.render('part2', {title: 'Fleetchain Uberdotcom', bag: build_bag()});
});
router.route('/p2/:page?').get(function(req, res){
	res.render('part2', {title: 'Fleetchain Uberdotcom', bag: build_bag()});
});

module.exports = router;