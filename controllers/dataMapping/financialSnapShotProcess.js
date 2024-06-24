const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');


async function processFinancialSnapshot(submission,prompts) {

    const {financialInfoPrompts} =prompts;
    const {financialInfo} = submission;
    const {financialSnapshot} = financialInfo

    const financialTitle = await GPT(financialInfoPrompts.financialTitle.prompt,financialSnapshot);
    const financialSnapshotResult = await GPT(financialInfoPrompts.financialSnapshot.prompt,financialSnapshot);


    const revenueCost = {
        revenue2019: 0,
        revenue2020: 0,
        revenue2021: 0,
        revenue2022: 0,
        revenue2023: 0,
        revenue2024: 0,
        revenue2025: 0,
        revenue2026: 0,
        revenue2027: 0,
        revenue2028: 0,
        cost2019: 0,
        cost2020: 0,
        cost2021: 0,
        cost2022: 0,
        cost2023: 0,
        cost2024: 0,
        cost2025: 0,
        cost2026: 0,
        cost2027: 0,
        cost2028: 0
      };
      
      data.forEach(item => {
        const year = item.year;
        const revenueKey = `revenue${year}`;
        const costKey = `cost${year}`;
      
        if (revenueCost.hasOwnProperty(revenueKey)) {
          revenueCost[revenueKey] = parseInt(item.revenue, 10);
        }
        if (revenueCost.hasOwnProperty(costKey)) {
          revenueCost[costKey] = parseInt(item.cost, 10);
        }
      });
      

    const financialSnapshotResponse = {
        financialTitle:financialTitle,
        financialSnapshot: financialSnapshotResult,        // Overview of the financial snapshot
        fundingAsk: financialInfo.plannedRaise,               // Funding request amount
        revenueChart:"",             // Revenue chart data or URL
        costChartValue: "",           // Cost chart data or URL
        useOfFunds: "",               // Details on the use of funds
        revenue2019: revenueCost.revenue2019,               // Revenue for the year 2019
        revenue2020: revenueCost.revenue2020,               // Revenue for the year 2020
        revenue2021: revenueCost.revenue2021,               // Revenue for the year 2021
        revenue2022: revenueCost.revenue2022,               // Revenue for the year 2022
        revenue2023: revenueCost.revenue2023,               // Revenue for the year 2023
        revenue2024: revenueCost.revenue2024,               // Revenue for the year 2024
        revenue2025: revenueCost.revenue2025,               // Revenue for the year 2025
        revenue2026: revenueCost.revenue2026,               // Revenue for the year 2026
        revenue2027: revenueCost.revenue2027,               // Revenue for the year 2027
        revenue2028: revenueCost.revenue2028,               // Revenue for the year 2028
        cost2019: revenueCost.cost2019,                  // Cost for the year 2019
        cost2020: revenueCost.cost2020,                  // Cost for the year 2020
        cost2021: revenueCost.cost2021,                  // Cost for the year 2021
        cost2022: revenueCost.cost2022,                  // Cost for the year 2022
        cost2023: revenueCost.cost2023,                  // Cost for the year 2023
        cost2024: revenueCost.cost2024,                  // Cost for the year 2024
        cost2025: revenueCost.cost2025,                  // Cost for the year 2025
        cost2026: revenueCost.cost2026,                  // Cost for the year 2026
        cost2027: revenueCost.cost2027,                  // Cost for the year 2027
        cost2028: revenueCost.cost2028,                  // Cost for the year 2028
        productDevelopment: "",       // Budget for product development
        marketingSales: "",           // Budget for marketing and sales
        capex: "",                    // Capital expenditures
        businessOperations: "",       // Business operations budget
        teamSalaries: ""              // Team salaries
    };

    return financialSnapshotResponse;
}

module.exports = processFinancialSnapshot;
