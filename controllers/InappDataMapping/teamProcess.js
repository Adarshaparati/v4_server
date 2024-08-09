const { GPT, NestedGPT } = require('../../services/gpt');
const cleanHeader = require('../../utils/cleanHeader')

async function team(submission, prompts,response) {
    const {teamMembers} = submission
    const {teamPrompts} = prompts;
    
    
    

    const experiencePromises = [
        GPT(teamPrompts.experience.Refine, teamMembers[0] ? `User Response: ${teamMembers[0].experience} Existing Response: ${response.teamMembers.experience1}` : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[1] ? `User Response: ${teamMembers[1].experience} Existing Response: ${response.teamMembers.experience2}` : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[2] ? `User Response: ${teamMembers[2].experience} Existing Response: ${response.teamMembers.experience3}` : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[3] ? `User Response: ${teamMembers[3].experience} Existing Response: ${response.teamMembers.experience4}` : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[4] ? `User Response: ${teamMembers[4].experience} Existing Response: ${response.teamMembers.experience5}` : ""),
        GPT(teamPrompts.experience.Refine, teamMembers[5] ? `User Response: ${teamMembers[5].experience} Existing Response: ${response.teamMembers.experience6}` : "")
      ];
      
    const experiences = await Promise.all(experiencePromises);
      
    const [experience1, experience2, experience3, experience4, experience5, experience6] = experiences;

    const teamTitle = await GPT(teamPrompts.teamTitle.prompt,`User Response: ${experience1} ${experience2} ${experience3} ${experience4} ${experience5} ${experience6} Existing Response: ${response.teamMembers.teamTitle} `)
    // console.log(Array(teamMembers)[0].teamMembers[0].name)
    const teamResponse = {
        teamTitle: cleanHeader(teamTitle),
        name1: Array(teamMembers)[0]?.teamMembers?.[0]?.name || "",
        designationTitle1: Array(teamMembers)[0]?.teamMembers?.[0]?.title || "",
        experience1: experience1,
        linkedin1: Array(teamMembers)[0]?.teamMembers?.[0]?.linkedin || "",
        image1: Array(teamMembers)[0]?.teamMembers?.[0]?.photoUrl || "",
        name2: Array(teamMembers)[0]?.teamMembers?.[1]?.name || "",
        designationTitle2: Array(teamMembers)[0]?.teamMembers?.[1]?.title || "",
        experience2: experience2,
        linkedin2: Array(teamMembers)[0]?.teamMembers?.[1]?.linkedin || "",
        image2: Array(teamMembers)[0]?.teamMembers?.[1]?.photoUrl || "",
        name3: Array(teamMembers)[0]?.teamMembers?.[2]?.name || "",
        designationTitle3: Array(teamMembers)[0]?.teamMembers?.[2]?.title || "",
        experience3: experience3,
        linkedin3: Array(teamMembers)[0]?.teamMembers?.[2]?.linkedin || "",
        image3: Array(teamMembers)[0]?.teamMembers?.[2]?.photoUrl || "",
        name4: Array(teamMembers)[0]?.teamMembers?.[3]?.name || "",
        designationTitle4: Array(teamMembers)[0]?.teamMembers?.[3]?.title || "",
        experience4: experience4,
        linkedin4: Array(teamMembers)[0]?.teamMembers?.[3]?.linkedin || "",
        image4: Array(teamMembers)[0]?.teamMembers?.[3]?.photoUrl || "",
        name5: Array(teamMembers)[0]?.teamMembers?.[4]?.name || "",
        designationTitle5: Array(teamMembers)[0]?.teamMembers?.[4]?.title || "",
        experience5: experience5,
        linkedin5: Array(teamMembers)[0]?.teamMembers?.[4]?.linkedin || "",
        image5: Array(teamMembers)[0]?.teamMembers?.[4]?.photoUrl || "",
        name6: Array(teamMembers)[0]?.teamMembers?.[5]?.name || "",
        designationTitle6: Array(teamMembers)[0]?.teamMembers?.[5]?.title || "",
        experience6: experience6,
        linkedin6: Array(teamMembers)[0]?.teamMembers?.[5]?.linkedin || "",
        image6: Array(teamMembers)[0]?.teamMembers?.[5]?.photoUrl || ""
    };
    console.log('team...')
    return teamResponse;
}

module.exports = team;
