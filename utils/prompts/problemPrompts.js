
const problemPrompts = {
    problemTitle:{
        prompt:"Create a slide title based on the problem summary. Keep it under 50 characters."
    },
    problemStatement:{
        prompt:"Summarize the given problem and add information that may be relevant to the topic. Focus only on the problem areas and not the solution or opportunity. Keep the output in under 300 characters strictly."
    },
    problemGPT:{
        prompt:"Identify the problem areas that this company is addressing into as few unique points as necessary, while ensuring they are mutually exclusive. Aim for minimum number of points while not exceeding 6 points.",
        Refine:"Only focus on the points which talk about the problem areas and remove the points which talk about a potential solution or opportunity. Merge the points associated with the same problem area in a single point. Keep the length of each point between 150 and 200 characters."
    },
    problemPointHeader:{
        prompt:"Create a point header for the given problem points. Keep the output in under 25 characters"
    }
}

module.exports = problemPrompts