const coverProcess = require('../controllers/InappDataMapping/coverProvess');
const aboutProcess = require('../controllers/InappDataMapping/aboutController')
const problemController = require('../controllers/InappDataMapping/problemController');
const solutionController = require('../controllers/InappDataMapping/solutionController');
const productScreenShotController = require('../controllers/dataMapping/productScreenShotController');
const productController = require('../controllers/InappDataMapping/productController');
const processProductRoadMap = require('../controllers/InappDataMapping/productRoadMapProcess')
const businessModelController = require('../controllers/InappDataMapping/businessModelController');
const gtmController = require('../controllers/InappDataMapping/gtmController');
// const Stakeholders = require('../controllers/InappDataMapping/stakeholders');
const CustomerPersona = require('../controllers/InappDataMapping/customerPersona')
const trackRecordProcess = require('../controllers/InappDataMapping/trackRecordProcess')
const competitorsController = require('../controllers/InappDataMapping/competitorsController');
const marketController = require('../controllers/InappDataMapping/marketController');
const contactProcess = require('../controllers/dataMapping/contactController');
const caseStudiesProcess = require('../controllers/InappDataMapping/caseStudyProcess');
const testimonialProcess = require('../controllers/InappDataMapping/testimonialProcess');
const competitiveDiff = require('../controllers/InappDataMapping/diffController');
const financialInfoProcess = require('../controllers/InappDataMapping/financialSnapShotProcess')
const teamProcess = require('../controllers/InappDataMapping/teamProcess');
const webAppScreenshotsProcess = require('../controllers/dataMapping/webAppScreenshotsProcess')
const mobileAppScreenshotsProcess = require('../controllers/dataMapping/mobileAppScreenshotsProcess');
const ProcessTechnicalArchitecture = require('../controllers/InappDataMapping/technicalArchitectureProcess');
const processStakeholders = require('../controllers/InappDataMapping/stakeholders');
const mapping = {
    about:coverProcess,
    companyDetails:aboutProcess,
    problemDescription:problemController,
    solutionDescription:solutionController,
    market: marketController,
    product:productController,
    productRoadmap:processProductRoadMap,
    webScreenshots:webAppScreenshotsProcess,
    mobileScreenshots:mobileAppScreenshotsProcess,
    productScreen:productScreenShotController,
    businessModel: businessModelController,
    goToMarket: gtmController,
    keyStakeholders:processStakeholders,
    customerPersona:CustomerPersona,
    trackRecord:trackRecordProcess,
    caseStudies: caseStudiesProcess,
    testimonials: testimonialProcess,
    competitors:competitorsController,
    competitiveDiff: competitiveDiff,
    teamMembers: teamProcess, 
    contactInfo: contactProcess,
    financialInfo: financialInfoProcess,
    technicalArchitecture:ProcessTechnicalArchitecture
}

module.exports = mapping