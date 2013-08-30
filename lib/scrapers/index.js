var scrapeBasicInfo = require('./scrape-basic-info');
var scrapeEconStandards = require('./scrape-basic-info');
var scrapePersonalFinanceStandards = require('./scrape-basic-info');

module.exports = {
  basicInfo: scrapeBasicInfo,
  econStandards: scrapeEconStandards,
  personalFinanceStandards: scrapePersonalFinanceStandards
};