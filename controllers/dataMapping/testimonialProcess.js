async function processTestimonials(submission) {
    const {testimonials} = submission;
    
    const testimonialsResponse = {
        testimonial1: testimonials.testimonials[0]?.testimonial,         
        testimonialName1: testimonials.testimonials[0]?.name,     
        designation1: testimonials.testimonials[0]?.designation,          
        testimonial2: testimonials.testimonials[1]?.testimonial,         
        testimonialName2: testimonials.testimonials[1]?.name,     
        designation2: testimonials.testimonials[1]?.designation,         
        testimonial3: testimonials.testimonials[2]?.testimonial,          
        testimonialName3: testimonials.testimonials[2]?.name,     
        designation3: testimonials.testimonials[2]?.designation,       
        testimonial4: testimonials.testimonials[3]?.testimonial,          
        testimonialName4: testimonials.testimonials[3]?.name,      
        designation4: testimonials.testimonials[3]?.designation 
    };

    return testimonialsResponse;
}

module.exports = processTestimonials;