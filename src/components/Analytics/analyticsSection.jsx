import { useState, useEffect } from 'react';
import LinearChart from './Chart/LinearChart';
import { UserAuth } from '../../context/AuthContext';
import { VisitorGrandTotal, BrowserUsageCalculator, ConversionRateCalculator, filterDataByInterval } from '../../context/utils/manageAnalytics';

const AnalyticsSection = () => {

    const { analytics_data } = UserAuth();

    const [select_chart_interval, setSelectinterval] = useState('weekly');
    const [conversion_rate, setConversionRate] = useState('');
    const [visitor_total, setVisitorTotal] = useState('');
    const [safari_usage, setSafariUsage] = useState('');
    const [firefox_usage, setFireFoxUsage] = useState('');
    const [chrome_usage, setChromeUsage] = useState('');
    const [explorer_usage, setExplorerUsage] = useState('');
    const [edge_usage, setEdgeUsage] = useState('');
    const [opera_usage, setOperaUsage] = useState('');
    const [chart_data, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Users Gained',
            data: [],
            backgroundColor: ['#33b8b8'],
            borderColor: ['#33b8b8'],
          },
        ],
    });

    useEffect(() => {
        if(Object.keys(analytics_data).length > 0){
            setVisitorTotal(VisitorGrandTotal(analytics_data.visitor_data));
            setConversionRate(ConversionRateCalculator(analytics_data.conversion_data, analytics_data.visitor_data));
        
            const browser_usage = BrowserUsageCalculator(analytics_data.browser_data, analytics_data.visitor_data);
            browser_usage.map((data) => {
                switch (data.browser) {
                    case "Safari":
                        setSafariUsage(data.percentage);
                        break;
                    case "Firefox":
                        setFireFoxUsage(data.percentage);
                        break;
                    case "Google Chrome":
                        setChromeUsage(data.percentage);
                        break;
                    case "Internet Explorer":
                        setExplorerUsage(data.percentage);
                        break;    
                    case "Microsoft Edge":
                        setEdgeUsage(data.percentage);
                        break;
                    case "Opera":
                        setOperaUsage(data.percentage);
                        break;
                    default:
                        break; 
                }
            })

        }
    },[analytics_data])

    useEffect(() => {
        if(Object.keys(analytics_data).length > 0){
            const updatedChartData = filterDataByInterval(analytics_data.visitor_data, select_chart_interval);
            console.log(updatedChartData)
            setChartData({
                labels: updatedChartData.labels,
                datasets: [
                {
                    ...chart_data.datasets[0],
                    data: updatedChartData.data,
                },
                ],
            });
        }
    }, [select_chart_interval, analytics_data.visitor_data]);
    

    return (
        <>
            <div
                className="relative h-full w-full flex flex-col justify-around items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-[85%] h-[50%] p-1 my-1 mx-auto flex flex-col justify-center items-center shadow-lg shadow-[#33b8b8] rounded-lg">
                    <div className="absolute top-0 left-3 p-3">
                        <select name="chart-view" id="chart_dropdown" className="px-2 py-1 border-[1px] border-[#33b8b8] text-[#33b8b8] rounded-md outline-none" value={select_chart_interval} onChange={(e) => setSelectinterval(e.target.value)}>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    <LinearChart chartData={chart_data}/>
                </div>
                <div className="w-full p-1 my-1 flex flex-row justify-around">
                    <div className="h-full p-2 border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] rounded-lg">
                        <div className="w-full p-1 text-center">
                            <h3 className="text-[#33b8b8] text-3xl">Total visitors</h3>
                        </div>
                        <div className="my-1 p-1 w-full text-center">
                            <span className="text-sm text-[#33b8b8] mx-1">total:<span className="text-[#33b8b8] text-3xl">{visitor_total || 0}</span></span>
                        </div>
                    </div>
                    <div className="h-full p-2 border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] rounded-lg">
                        <div className="w-full p-1 text-center">
                            <h3 className="text-[#33b8b8] text-3xl">Conversion %</h3>
                        </div>
                        <div className="my-1 p-1 w-full text-center">
                            <span className="text-3xl text-[#33b8b8] mx-1">{conversion_rate || 0}<span className="text-sm">%</span></span>
                        </div>
                    </div>
                    <div className="w-[50%] h-full p-2 border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] rounded-lg">
                        <div className="w-full p-1 text-center">
                            <h3 className="text-[#33b8b8] text-3xl">Browser usage</h3>
                        </div>
                        <div className="my-1 p-1 w-full flex flex-row text-[#33b8b8]">
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-safari text-3xl"></i>
                                </span>
                                <span className="text-xl">{safari_usage || 0}<span className="text-xs">%</span></span>
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-firefox-browser text-3xl"></i>
                                </span>
                                <span className="text-xl">{firefox_usage || 0}<span className="text-xs">%</span></span>                            
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-chrome text-3xl"></i>
                                </span>
                                <span className="text-xl">{chrome_usage || 0}<span className="text-xs">%</span></span>                               
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-internet-explorer text-3xl"></i>
                                </span>
                                <span className="text-xl">{explorer_usage || 0}<span className="text-xs">%</span></span>                              
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-edge text-3xl"></i>
                                </span>
                                <span className="text-xl">{edge_usage || 0}<span className="text-xs">%</span></span>
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-opera text-3xl"></i>
                                </span>
                                <span className="text-xl">{opera_usage || 0}<span className="text-xs">%</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnalyticsSection;