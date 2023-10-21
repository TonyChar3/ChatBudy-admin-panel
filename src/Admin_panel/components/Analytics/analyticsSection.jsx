import { useState, useEffect } from 'react';
import LinearChart from './Chart/LinearChart';
import { UserAuth } from '../../../context/AuthContext';
import { 
    VisitorGrandTotal, 
    BrowserUsageCalculator, 
    ConversionRateCalculator, 
    filterDataByInterval 
} from '../../../context/utils/manageAnalytics';

const AnalyticsSection = () => {

    const { analytics_data_array } = UserAuth();

    const [select_chart_interval, setSelectinterval] = useState('weekly');
    const [analytics_data, setAnalyticsData] = useState({
        conversion_rate: '',
        total_visitor: '',
        safari_usage: '',
        firefox_usage: '',
        chrome_usage: '',
        explorer_usage: '',
        edge_usage: '',
        opera_usage: ''
    })
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
        if(Object.keys(analytics_data_array).length > 0){
            setAnalyticsData(prevValue => ({
                ...prevValue,
                total_visitor: VisitorGrandTotal(analytics_data_array.visitor_data),
                conversion_rate: ConversionRateCalculator(analytics_data_array.conversion_data, analytics_data_array.visitor_data)
            }))
        
            const browser_usage = BrowserUsageCalculator(analytics_data_array.browser_data, analytics_data_array.visitor_data);
            browser_usage.map((data) => {
                switch (data.browser) {
                    case "Safari":
                        setAnalyticsData(prevValue => ({
                            ...prevValue,
                            safari_usage: data.percentage
                        }));
                        break;
                    case "Firefox":
                        setAnalyticsData(prevValue => ({
                            ...prevValue,
                            firefox_usage: data.percentage
                        }));
                        break;
                    case "Google Chrome":
                        setAnalyticsData(prevValue => ({
                            ...prevValue,
                            chrome_usage: data.percentage
                        }));
                        break;
                    case "Internet Explorer":
                        setAnalyticsData(prevValue => ({
                            ...prevValue,
                            explorer_usage: data.percentage
                        }));
                        break;    
                    case "Microsoft Edge":
                        setAnalyticsData(prevValue => ({
                            ...prevValue,
                            edge_usage: data.percentage
                        }));
                        break;
                    case "Opera":
                        setAnalyticsData(prevValue => ({
                            ...prevValue,
                            opera_usage: data.percentage
                        }));
                        break;
                    default:
                        break; 
                }
            })

        }
    },[analytics_data_array])

    useEffect(() => {
        if(Object.keys(analytics_data_array).length > 0){
            const updatedChartData = filterDataByInterval(analytics_data_array.visitor_data, select_chart_interval);
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
    }, [select_chart_interval, analytics_data_array.visitor_data]);
    

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
                            <span className="text-sm text-[#33b8b8] mx-1">total:<span className="text-[#33b8b8] text-3xl">{analytics_data.total_visitor || 0}</span></span>
                        </div>
                    </div>
                    <div className="h-full p-2 border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] rounded-lg">
                        <div className="w-full p-1 text-center">
                            <h3 className="text-[#33b8b8] text-3xl">Conversion %</h3>
                        </div>
                        <div className="my-1 p-1 w-full text-center">
                            <span className="text-3xl text-[#33b8b8] mx-1">{analytics_data.conversion_rate || 0}<span className="text-sm">%</span></span>
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
                                <span className="text-xl">{analytics_data.safari_usage || 0}<span className="text-xs">%</span></span>
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-firefox-browser text-3xl"></i>
                                </span>
                                <span className="text-xl">{analytics_data.firefox_usage || 0}<span className="text-xs">%</span></span>                            
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-chrome text-3xl"></i>
                                </span>
                                <span className="text-xl">{analytics_data.chrome_usage || 0}<span className="text-xs">%</span></span>                               
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-internet-explorer text-3xl"></i>
                                </span>
                                <span className="text-xl">{analytics_data.explorer_usage || 0}<span className="text-xs">%</span></span>                              
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-edge text-3xl"></i>
                                </span>
                                <span className="text-xl">{analytics_data.edge_usage || 0}<span className="text-xs">%</span></span>
                            </div>
                            <div className="w-full p-1 flex flex-row justify-start items-center">
                                <span className="mx-2">
                                    <i className="fa-brands fa-opera text-3xl"></i>
                                </span>
                                <span className="text-xl">{analytics_data.opera_usage || 0}<span className="text-xs">%</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnalyticsSection;