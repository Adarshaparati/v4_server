
async function contactController(submission){
    const {contactInfo} = submission

    const contactResponse = {
        contactEmail: contactInfo.contactEmail,
        contactPhone: contactInfo.contactPhone,
        contactWebsite: contactInfo.websiteLink,
        companyLinkedin: contactInfo.linkedinLink,
        contactUsCoverImage: "freepik"
    }
    return contactResponse;
}
module.exports = contactController 
