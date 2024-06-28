const aboutController = require('../controllers/dataMapping/aboutController');
const problemController = require('../controllers/dataMapping/problemController');
const solutionController = require('../controllers/dataMapping/solutionController');
const productScreenShotController = require('../controllers/dataMapping/productScreenShotController');
const productController = require('../controllers/dataMapping/productController');
const businessModelController = require('../controllers/dataMapping/businessModelController');
const gtmController = require('../controllers/dataMapping/gtmController');
const trackRecordProcess = require('../controllers/dataMapping/trackRecordProcess')
const competitorsController = require('../controllers/dataMapping/competitorsController');
const marketController = require('../controllers/dataMapping/marketController');
const contactProcess = require('../controllers/dataMapping/contactController');
const caseStudiesProcess = require('../controllers/dataMapping/caseStudyProcess');
const testimonialProcess = require('../controllers/dataMapping/testimonialProcess');
const competitiveDiff = require('../controllers/dataMapping/diffController')
const financialInfoProcess = require('../controllers/dataMapping/financialSnapShotProcess')
const teamProcess = require('../controllers/dataMapping/teamProcess')
const mapping = {
    about:aboutController,
    problemDescription:problemController,
    solutionDescription:solutionController,
    market: marketController,
    product:productController,
    productScreen:productScreenShotController,
    businessModel: businessModelController,
    goToMarket: gtmController,
    trackRecord:trackRecordProcess,
    caseStudies: caseStudiesProcess,
    testimonials: testimonialProcess,
    competitors:competitorsController,
    competitiveDiff: competitiveDiff,
    teamMembers: teamProcess, 
    contactInfo: contactProcess,
    financialInfo: financialInfoProcess,
}

module.exports = mapping