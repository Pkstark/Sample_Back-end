const express = require('express');
const { default: mongoose } = require('mongoose');

const CDatas = mongoose.Schema;

const clientDetail = new CDatas({
    username : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        default : ''
    },
    password : {
        type : String,
        default : ''
    },
    sickleave : {
        type : Number,
        default : 0
    },
    casualleave : {
        type : Number,
        default : 0
    },
    earnleave : {
        type : Number,
        default : 0
    },
    totalnumberleaves : {
        type : Number,
        default : 25
    },
    appiledleave : {
        type : Number,
        default : 0
    },
    balanceleave : {
        type : Number,
        default : 25
    }
});

const userData = mongoose.model("Leave", clientDetail);

module.exports = userData;