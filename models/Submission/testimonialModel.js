const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    testimonials: [{
        type: Object,
        default: [{                      
            name:"",
            company:"",
            designation:"",
            testimonial:""
        }]
    }]
});



module.exports =  testimonialSchema;
