const sectionToUrlMap1 = require("./sectionToUrlMapping1");

const additionalUrlsMap = {
  companyDetails: [
    sectionToUrlMap1.about,
    sectionToUrlMap1.problemDescription,
    sectionToUrlMap1.solutionDescription,
    sectionToUrlMap1.competitors
  ],
  product: [
    // sectionToUrlMap1.productScreen,
    sectionToUrlMap1.goToMarket,
    sectionToUrlMap1.businessModel,
    sectionToUrlMap1.competitiveDiff,
  ],
};

module.exports = additionalUrlsMap;
