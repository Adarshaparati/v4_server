
async function processContactDetails(submission){
    const {contactInfo} = submission

    const contactResponse = {
        contactEmail: contactInfo.contactEmail,
        contactPhone: contactInfo.contactPhone,
        contactWebsite: contactInfo.websiteLink,
        companyLinkedin: contactInfo.linkedinLink,
        contactUsCoverImage: "freepik"
    }
    console.log("contact...");
    return contactResponse;
}
module.exports = processContactDetails 
