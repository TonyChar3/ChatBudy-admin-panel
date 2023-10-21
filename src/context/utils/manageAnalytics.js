/**
 * Calculate the visitor total
 */
const VisitorGrandTotal = (visitor_data) => {
    // loop trough the array
    const visitor_total = visitor_data.reduce((acc, data) => acc + data.visitor_count, 0);
    // return the total
    return visitor_total
};
/**
 * Calculate the browser usage
 */
const BrowserUsageCalculator = (browser_data, visitor_data) => {
    const visitor_total = VisitorGrandTotal(visitor_data);
    // Calculate the percentages for each browser
    const browserUsageCount = browser_data.map(browser => ({
        browser: browser.browser,
        percentage: Math.round((browser.count / visitor_total) * 100)
    }))
    // return the browser usage percentages
    return browserUsageCount
}
/**
 * Calculate the conversion rate
 */
const ConversionRateCalculator = (conversion_data, visitor_data) => {
    // get the grand total
    const visitor_total = VisitorGrandTotal(visitor_data);
    // get the total of conversion 
    const conversion_total = conversion_data.reduce((acc, data) => acc + data.conversion_count, 0);
    // compare both the visitor and conversion total * 100
    const conversion_rate = (conversion_total / visitor_total) * 100
    // return the conversion rate
    return Math.round(conversion_rate)
}
/**
 * Function to filter and aggregate data based on selected interval
 */
const filterDataByInterval = (visitor_data, interval) => {
    const dataLabels = [];
    const dataPoints = [];
        
    const currentDate = new Date();
        
    // Calculate the date range based on the selected interval
    let startDate = new Date();
    if (interval === 'weekly') {
        startDate.setDate(currentDate.getDate() - 7);
    } else if (interval === 'monthly') {
        startDate.setMonth(currentDate.getMonth() - 1);
    }
        
    // Filter and aggregate the data
    const filteredData = visitor_data.filter((data) => {
        const dataDate = new Date(data.createdAt);
        return dataDate >= startDate && dataDate <= currentDate;
    });
        
    // Populate the labels and dataPoints arrays
    for (let date = startDate; date <= currentDate; date.setDate(date.getDate() + 1)) {
        const formattedDate = date.toDateString();
        dataLabels.push(formattedDate);
            
        const matchingData = filteredData.find((data) => {
            const dataDate = new Date(data.createdAt);
            return dataDate.toDateString() === formattedDate;
        });  
        dataPoints.push(matchingData ? matchingData.visitor_count : 0);
    }
        
    return { labels: dataLabels, data: dataPoints };
};

export { VisitorGrandTotal, BrowserUsageCalculator, ConversionRateCalculator, filterDataByInterval }