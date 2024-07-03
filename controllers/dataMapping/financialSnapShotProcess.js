const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');


async function processFinancialSnapshot(submission,prompts) {

    const {financialInfoPrompts} =prompts;
    const {financialInfo} = submission;
    const {financialSnapshot,revenueCost} = financialInfo

    const financialTitle = await GPT(financialInfoPrompts.financialTitle.prompt,financialSnapshot);
    const financialSnapshotResult = await GPT(financialInfoPrompts.financialSnapshot.prompt,financialSnapshot);



    const revenue_Cost = {
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
      
      revenueCost.forEach(item => {
        const year = item.year;
        const revenueKey = `revenue${year}`;
        const costKey = `cost${year}`;
      
        if (revenue_Cost.hasOwnProperty(revenueKey)) {
          revenue_Cost[revenueKey] = parseInt(item.revenue, 10);
        }
        if (revenue_Cost.hasOwnProperty(costKey)) {
          revenue_Cost[costKey] = parseInt(item.cost, 10);
        }
      });


      let rev_chart = 'No'
      let cost_chart = 'No'
      for (const key in revenue_Cost) {
        if (key.startsWith("revenue") && revenue_Cost[key] > 0) {
            rev_chart = 'Yes'
        }
        if (key.startsWith("cost") && revenue_Cost[key] > 0) {
          cost_chart = 'Yes'
      }
    }
    let useoffunds_chart = 'No'
    if( financialInfo.useOfFunds[0]?.percentage || financialInfo.useOfFunds[1]?.percentage || financialInfo.useOfFunds[2]?.percentage || financialInfo.useOfFunds[3]?.percentage || financialInfo.useOfFunds[4]?.percentage){
        useoffunds_chart = 'Yes'
    }
     
    const financialSnapshotResponse = {
        financialTitle:financialTitle,
        financialSnapshot: financialSnapshotResult,        // Overview of the financial snapshot
        fundingAsk: financialInfo.plannedRaise,               // Funding request amount
        revenueChart:rev_chart,             // Revenue chart data or URL
        costChartValue: cost_chart,           // Cost chart data or URL
        useOfFunds: useoffunds_chart,               // Details on the use of funds
        revenue2019: revenue_Cost.revenue2019,               // Revenue for the year 2019
        revenue2020: revenue_Cost.revenue2020,               // Revenue for the year 2020
        revenue2021: revenue_Cost.revenue2021,               // Revenue for the year 2021
        revenue2022: revenue_Cost.revenue2022,               // Revenue for the year 2022
        revenue2023: revenue_Cost.revenue2023,               // Revenue for the year 2023
        revenue2024: revenue_Cost.revenue2024,               // Revenue for the year 2024
        revenue2025: revenue_Cost.revenue2025,               // Revenue for the year 2025
        revenue2026: revenue_Cost.revenue2026,               // Revenue for the year 2026
        revenue2027: revenue_Cost.revenue2027,               // Revenue for the year 2027
        revenue2028: revenue_Cost.revenue2028,               // Revenue for the year 2028
        cost2019: revenue_Cost.cost2019,                  // Cost for the year 2019
        cost2020: revenue_Cost.cost2020,                  // Cost for the year 2020
        cost2021: revenue_Cost.cost2021,                  // Cost for the year 2021
        cost2022: revenue_Cost.cost2022,                  // Cost for the year 2022
        cost2023: revenue_Cost.cost2023,                  // Cost for the year 2023
        cost2024: revenue_Cost.cost2024,                  // Cost for the year 2024
        cost2025: revenue_Cost.cost2025,                  // Cost for the year 2025
        cost2026: revenue_Cost.cost2026,                  // Cost for the year 2026
        cost2027: revenue_Cost.cost2027,                  // Cost for the year 2027
        cost2028: revenue_Cost.cost2028,                  // Cost for the year 2028
        productDevelopment: financialInfo.useOfFunds[0].percentage,       // Budget for product development
        marketingSales: financialInfo.useOfFunds[1].percentage,           // Budget for marketing and sales
        capex: financialInfo.useOfFunds[3].percentage,                    // Capital expenditures
        businessOperations: financialInfo.useOfFunds[2].percentage,       // Business operations budget
        teamSalaries: financialInfo.useOfFunds[4].percentage              // Team salaries
    };

    return financialSnapshotResponse;
}

module.exports = processFinancialSnapshot;
