const { GPT, NestedGPT } = require('../../services/gpt');

async function team(submission, prompts) {
    const {teamMembers} = submission
    const {teamPrompts} = prompts;

    const experiencePromises = [
        GPT(teamPrompts.experience.Refine, teamMembers[0] ? teamMembers[0].experience : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[1] ? teamMembers[1].experience : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[2] ? teamMembers[2].experience : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[3] ? teamMembers[3].experience : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[4] ? teamMembers[4].experience : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[5] ? teamMembers[5].experience : "")
      ];
      
    const experiences = await Promise.all(experiencePromises);
      
    const [experience1, experience2, experience3, experience4, experience5, experience6] = experiences;

    const teamTitle = await GPT(teamPrompts.teamTitle.prompt,`${experience1} ${experience2} ${experience3} ${experience4} ${experience5} ${experience6} meet our team `)

    const teamResponse = {
        teamTitle: teamTitle,
        name1: teamMembers[0].name,
        designationTitle1: teamMembers[0].title,
        experience1: experience1,
        linkedin1: teamMembers[0].linkedin,
        image1: teamMembers[0].photoUrl,
        name2: teamMembers[1] ? teamMembers[1].name : "",
        designationTitle2: teamMembers[1] ? teamMembers[1].title : "",
        experience2: teamMembers[1] ? experience2 : "",
        linkedin2: teamMembers[1] ? teamMembers[1].linkedin : "",
        image2: teamMembers[1] ? teamMembers[1].photoUrl : "",
        name3: teamMembers[2] ? teamMembers[2].name : "",
        designationTitle3: teamMembers[2] ? teamMembers[2].title : "",
        experience3: teamMembers[2] ? experience3 : "",
        linkedin3: teamMembers[2] ? teamMembers[2].linkedin : "",
        image3: teamMembers[2] ? teamMembers[2].photoUrl : "",
        name4: teamMembers[3] ? teamMembers[3].name : "",
        designationTitle4: teamMembers[3] ? teamMembers[3].title : "",
        experience4: teamMembers[3] ? experience4 : "",
        linkedin4: teamMembers[3] ? teamMembers[3].linkedin : "",
        image4: teamMembers[3] ? teamMembers[3].photoUrl : "",
        name5: teamMembers[4] ? teamMembers[4].name : "",
        designationTitle5: teamMembers[4] ? teamMembers[4].title : "",
        experience5: teamMembers[4] ? experience5 : "",
        linkedin5: teamMembers[4] ? teamMembers[4].linkedin : "",
        image5: teamMembers[4] ? teamMembers[4].photoUrl : "",
        name6: teamMembers[5] ? teamMembers[5].name : "",
        designationTitle6: teamMembers[5] ? teamMembers[5].title : "",
        experience6: teamMembers[5] ? experience6 : "",
        linkedin6: teamMembers[5] ? teamMembers[5].linkedin : "",
        image6: teamMembers[5] ? teamMembers[5].photoUrl : ""
    };

    return teamResponse;
}

module.exports = team;
