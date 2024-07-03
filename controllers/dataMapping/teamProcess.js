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
    console.log(Array(teamMembers)[0].teamMembers[0].name)
    const teamResponse = {
        teamTitle: teamTitle,
        name1: Array(teamMembers)[0]?.teamMembers?.[0]?.name || "",
        designationTitle1: Array(teamMembers)[0]?.teamMembers?.[0]?.title || "",
        experience1: Array(teamMembers)[0]?.teamMembers?.[0]?.experience || "",
        linkedin1: Array(teamMembers)[0]?.teamMembers?.[0]?.linkedin || "",
        image1: Array(teamMembers)[0]?.teamMembers?.[0]?.photoUrl || "",
        name2: Array(teamMembers)[0]?.teamMembers?.[1]?.name || "",
        designationTitle2: Array(teamMembers)[0]?.teamMembers?.[1]?.title || "",
        experience2: Array(teamMembers)[0]?.teamMembers?.[1]?.experience || "",
        linkedin2: Array(teamMembers)[0]?.teamMembers?.[1]?.linkedin || "",
        image2: Array(teamMembers)[0]?.teamMembers?.[1]?.photoUrl || "",
        name3: Array(teamMembers)[0]?.teamMembers?.[2]?.name || "",
        designationTitle3: Array(teamMembers)[0]?.teamMembers?.[2]?.title || "",
        experience3: Array(teamMembers)[0]?.teamMembers?.[2]?.experience || "",
        linkedin3: Array(teamMembers)[0]?.teamMembers?.[2]?.linkedin || "",
        image3: Array(teamMembers)[0]?.teamMembers?.[2]?.photoUrl || "",
        name4: Array(teamMembers)[0]?.teamMembers?.[3]?.name || "",
        designationTitle4: Array(teamMembers)[0]?.teamMembers?.[3]?.title || "",
        experience4: Array(teamMembers)[0]?.teamMembers?.[3]?.experience || "",
        linkedin4: Array(teamMembers)[0]?.teamMembers?.[3]?.linkedin || "",
        image4: Array(teamMembers)[0]?.teamMembers?.[3]?.photoUrl || "",
        name5: Array(teamMembers)[0]?.teamMembers?.[4]?.name || "",
        designationTitle5: Array(teamMembers)[0]?.teamMembers?.[4]?.title || "",
        experience5: Array(teamMembers)[0]?.teamMembers?.[4]?.experience || "",
        linkedin5: Array(teamMembers)[0]?.teamMembers?.[4]?.linkedin || "",
        image5: Array(teamMembers)[0]?.teamMembers?.[4]?.photoUrl || "",
        name6: Array(teamMembers)[0]?.teamMembers?.[5]?.name || "",
        designationTitle6: Array(teamMembers)[0]?.teamMembers?.[5]?.title || "",
        experience6: Array(teamMembers)[0]?.teamMembers?.[5]?.experience || "",
        linkedin6: Array(teamMembers)[0]?.teamMembers?.[5]?.linkedin || "",
        image6: Array(teamMembers)[0]?.teamMembers?.[5]?.photoUrl || ""
    };
    console.log('team...')
    return teamResponse;
}

module.exports = team;
