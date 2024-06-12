

const aboutPrompts = {
    tagline:{
        prompt:"Create a tag line for the company with the given description. Keep the output in under 50 characters"
    },
    aboutTitle:{
        prompt:"Create a slide title for about the company section for the following company description and vision. Keep it under 25 characters"
    },
    aboutVision:{
        prompt:"Refine the given company vision. Keep the output between 200 and 250 characters."
    },
    aboutGPT:{
        prompt:"Convert the given company description into as few unique points as necessary, while ensuring they are mutually exclusive. Aim for minimum number of points while not exceeding 5 points.",
        Refine:"Merge the points associated with the same aspect of the company in a single point. Keep the length of each point between 150 and 200 characters"
    },
    aboutPointtsHeader:{
        prompt:"Create a point header for the following point around a company's description. Keep it under 25 characters."
    }

}

module.exports =  aboutPrompts;

