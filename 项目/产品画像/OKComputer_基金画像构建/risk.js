// 风险评估页面 JavaScript 逻辑

// 模拟基金数据
const mockFundData = [
    {
        id: '000001',
        name: '华夏成长混合',
        type: '混合型',
        riskLevel: '中风险',
        nav: 1.2345,
        dailyChange: 2.34,
        annualReturn: 15.67,
        size: 156.8,
        establishDate: '2001-12-18',
        manager: '张三',
        company: '华夏基金',
        starRating: 4,
        sharpeRatio: 1.23,
        maxDrawdown: -18.45,
        volatility: 22.15,
        informationRatio: 0.87,
        trackingError: 4.32,
        var95: -8.23,
        riskScore: 75
    },
    {
        id: '000002',
        name: '易方达沪深300ETF',
        type: '指数型',
        riskLevel: '中高风险',
        nav: 4.5678,
        dailyChange: -0.89,
        annualReturn: 8.92,
        size: 892.3,
        establishDate: '2013-03-06',
        manager: '李四',
        company: '易方达基金',
        starRating: 5,
        sharpeRatio: 0.89,
        maxDrawdown: -25.67,
        volatility: 28.34,
        informationRatio: 0.65,
        trackingError: 2.15,
        var95: -12.45,
        riskScore: 45
    },
    {
        id: '000003',
        name: '博时信用债券A',
        type: '债券型',
        riskLevel: '中低风险',
        nav: 1.0987,
        dailyChange: 0.15,
        annualReturn: 6.78,
        size: 45.2,
        establishDate: '2009-06-10',
        manager: '王五',
        company: '博时基金',
        starRating: 4,
        sharpeRatio: 1.45,
        maxDrawdown: -8.23,
        volatility: 12.45,
        informationRatio: 1.12,
        trackingError: 1.89,
        var95: -3.21,
        riskScore: 85
    },
    {
        id: '000004',
        name: '南方现金增利货币A',
        type: '货币型',
        riskLevel: '低风险',
        nav: 1.0000,
        dailyChange: 0.01,
        annualReturn: 2.45,
        size: 234.5,
        establishDate: '2004-03-05',
        manager: '赵六',
        company: '南方基金',
        starRating: 5,
        sharpeRatio: 2.15,
        maxDrawdown: -0.02,
        volatility: 0.89,
        informationRatio: 1.87,
        trackingError: 0.15,
        var95: -0.15,
        riskScore: 95
    },
    {
        id: '000005',
        name: '嘉实新兴产业股票',
        type: '股票型',
        riskLevel: '高风险',
        nav: 3.4567,
        dailyChange: 4.56,
        annualReturn: 28.91,
        size: 78.9,
        establishDate: '2014-09-17',
        manager: '钱七',
        company: '嘉实基金',
        starRating: 4,
        sharpeRatio: 1.08,
        maxDrawdown: -32.15,
        volatility: 35.67,
        informationRatio: 0.76,
        trackingError: 6.23,
        var95: -15.67,
        riskScore: 35
    },
    {
        id: '000006',
        name: '广发稳健增长混合',
        type: '混合型',
        riskLevel: '中风险',
        nav: 2.3456,
        dailyChange: 1.23,
        annualReturn: 12.34,
        size: 167.4,
        establishDate: '2003-12-03',
        manager: '孙八',
        company: '广发基金',
        starRating: 4,
        sharpeRatio: 1.34,
        maxDrawdown: -15.67,
        volatility: 19.87,
        informationRatio: 0.92,
        trackingError: 3.45,
        var95: -6.78,
        riskScore: 70
    },
    {
        id: '000007',
        name: '汇添富消费行业混合',
        type: '混合型',
        riskLevel: '中高风险',
        nav: 4.1234,
        dailyChange: -1.45,
        annualReturn: 18.76,
        size: 234.6,
        establishDate: '2013-05-03',
        manager: '周九',
        company: '汇添富基金',
        starRating: 5,
        sharpeRatio: 1.15,
        maxDrawdown: -22.34,
        volatility: 26.78,
        informationRatio: 0.83,
        trackingError: 4.67,
        var95: -10.23,
        riskScore: 55
    },
    {
        id: '000008',
        name: '富国天惠成长混合',
        type: '混合型',
        riskLevel: '中风险',
        nav: 3.7890,
        dailyChange: 2.89,
        annualReturn: 22.15,
        size: 345.7,
        establishDate: '2005-11-16',
        manager: '吴十',
        company: '富国基金',
        starRating: 5,
        sharpeRatio: 1.42,
        maxDrawdown: -16.89,
        volatility: 21.34,
        informationRatio: 1.05,
        trackingError: 3.12,
        var95: -7.89,
        riskScore: 78
    }
];

// 图表实例
let riskMatrixChart = null;
let portfolioRiskChart = null;
let stressTestChart = null;

// 当前投资组合
let currentPortfolio = [];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化应用
function initializeApp() {
    initializeCharts();
    setupEventListeners();
    setupScrollReveal();
    updateRiskMetrics();
    generateRiskAlerts();
    generateRecommendedPortfolio();
}

// 设置事件监听器
function setupEventListeners() {
    // 投资目标按钮
    const goalButtons = document.querySelectorAll('.investment-goal-btn');
    goalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            goalButtons.forEach(b => {
                b.classList.remove('active', 'bg-yellow-500', 'text-gray-900');
                b.classList.add('bg-gray-700', 'text-gray-300');
            });
            this.classList.add('active', 'bg-yellow-500', 'text-gray-900');
            this.classList.remove('bg-gray-700', 'text-gray-300');
            
            generateRecommendedPortfolio();
        });
    });
    
    // 风险承受能力滑块
    const riskTolerance = document.getElementById('risk-tolerance');
    riskTolerance.addEventListener('input', function() {
        generateRecommendedPortfolio();
    });
    
    // 投资期限选择
    const investmentHorizon = document.getElementById('investment-horizon');
    investmentHorizon.addEventListener('change', function() {
        generateRecommendedPortfolio();
    });
    
    // 基金类型筛选
    const fundTypeFilter = document.getElementById('fund-type-filter');
    fundTypeFilter.addEventListener('change', updateRiskMatrix);
    
    // 风险等级筛选
    const riskFilter = document.getElementById('risk-filter');
    riskFilter.addEventListener('change', updateRiskMatrix);
}

// 初始化图表
function initializeCharts() {
    initRiskMatrixChart();
    initPortfolioRiskChart();
    initStressTestChart();
}

// 初始化风险矩阵图
function initRiskMatrixChart() {
    const chartDom = document.getElementById('risk-matrix-chart');
    riskMatrixChart = echarts.init(chartDom);
    updateRiskMatrix();
}

// 更新风险矩阵图
function updateRiskMatrix() {
    const fundType = document.getElementById('fund-type-filter').value;
    const riskLevel = document.getElementById('risk-filter').value;
    
    let filteredFunds = mockFundData.filter(fund => {
        const typeMatch = fundType === 'all' || fund.type === fundType;
        const riskMatch = riskLevel === 'all' || fund.riskLevel === riskLevel;
        return typeMatch && riskMatch;
    });
    
    if (filteredFunds.length === 0) {
        filteredFunds = mockFundData;
    }
    
    const data = filteredFunds.map(fund => {
        const riskScore = fund.riskLevel === '低风险' ? 1 : 
                         fund.riskLevel === '中低风险' ? 2 :
                         fund.riskLevel === '中风险' ? 3 :
                         fund.riskLevel === '中高风险' ? 4 : 5;
        
        const colors = {
            '股票型': '#d69e2e',
            '债券型': '#3182ce',
            '混合型': '#38a169',
            '指数型': '#dd6b20',
            '货币型': '#9f7aea'
        };
        
        return {
            name: fund.name,
            value: [fund.volatility, fund.annualReturn, riskScore],
            itemStyle: {
                color: colors[fund.type] || '#718096'
            },
            symbolSize: Math.max(15, fund.size / 10),
            fundData: fund
        };
    });
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '10%'
        },
        xAxis: {
            type: 'value',
            name: '风险(波动率%)',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                color: '#a0aec0'
            },
            axisLine: {
                lineStyle: {
                    color: '#4a5568'
                }
            },
            axisLabel: {
                color: '#a0aec0'
            },
            splitLine: {
                lineStyle: {
                    color: '#2d3748',
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '收益(年化%)',
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: {
                color: '#a0aec0'
            },
            axisLine: {
                lineStyle: {
                    color: '#4a5568'
                }
            },
            axisLabel: {
                color: '#a0aec0'
            },
            splitLine: {
                lineStyle: {
                    color: '#2d3748',
                    type: 'dashed'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(26, 54, 93, 0.9)',
            borderColor: '#d69e2e',
            textStyle: {
                color: '#e2e8f0'
            },
            formatter: function(params) {
                const fund = params.data.fundData;
                return `${fund.name}<br/>` +
                       `年化收益: ${fund.annualReturn.toFixed(2)}%<br/>` +
                       `波动率: ${fund.volatility.toFixed(2)}%<br/>` +
                       `风险等级: ${fund.riskLevel}<br/>` +
                       `夏普比率: ${fund.sharpeRatio.toFixed(2)}<br/>` +
                       `最大回撤: ${fund.maxDrawdown.toFixed(2)}%`;
            }
        },
        legend: {
            data: ['股票型', '债券型', '混合型', '指数型', '货币型'],
            textStyle: {
                color: '#e2e8f0'
            },
            bottom: 10
        },
        series: [
            {
                type: 'scatter',
                data: data,
                label: {
                    show: false
                },
                emphasis: {
                    scale: 1.5,
                    label: {
                        show: true,
                        position: 'top',
                        color: '#e2e8f0',
                        fontSize: 12
                    }
                }
            }
        ]
    };
    
    riskMatrixChart.setOption(option);
}

// 初始化组合风险图
function initPortfolioRiskChart() {
    const chartDom = document.getElementById('portfolio-risk-chart');
    portfolioRiskChart = echarts.init(chartDom);
    updatePortfolioRiskChart();
}

// 更新组合风险图
function updatePortfolioRiskChart() {
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(26, 54, 93, 0.9)',
            borderColor: '#d69e2e',
            textStyle: {
                color: '#e2e8f0'
            },
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
                color: '#e2e8f0'
            }
        },
        series: [
            {
                name: '投资组合',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['60%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#1a202c',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#e2e8f0'
                    }
                },
                labelLine: {
                    show: false
                },
                data: currentPortfolio.length > 0 ? currentPortfolio.map((item, index) => ({
                    value: item.weight,
                    name: item.fund.name,
                    itemStyle: {
                        color: ['#d69e2e', '#3182ce', '#38a169', '#dd6b20'][index % 4]
                    }
                })) : [
                    { value: 100, name: '请添加基金', itemStyle: { color: '#4a5568' } }
                ]
            }
        ]
    };
    
    portfolioRiskChart.setOption(option);
}

// 初始化压力测试图
function initStressTestChart() {
    const chartDom = document.getElementById('stress-test-chart');
    stressTestChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: '请选择压力测试场景',
            textStyle: {
                color: '#a0aec0',
                fontSize: 16
            },
            left: 'center',
            top: 'middle'
        }
    };
    
    stressTestChart.setOption(option);
}

// 更新风险指标
function updateRiskMetrics() {
    const avgSharpe = mockFundData.reduce((sum, fund) => sum + fund.sharpeRatio, 0) / mockFundData.length;
    const medianDrawdown = mockFundData.map(fund => fund.maxDrawdown).sort((a, b) => a - b)[Math.floor(mockFundData.length / 2)];
    const avgVolatility = mockFundData.reduce((sum, fund) => sum + fund.volatility, 0) / mockFundData.length;
    const riskAlerts = mockFundData.filter(fund => fund.riskScore < 50).length;
    
    document.getElementById('avg-sharpe').textContent = avgSharpe.toFixed(2);
    document.getElementById('median-drawdown').textContent = medianDrawdown.toFixed(2) + '%';
    document.getElementById('avg-volatility').textContent = avgVolatility.toFixed(2) + '%';
    document.getElementById('risk-alerts').textContent = riskAlerts;
}

// 生成风险预警列表
function generateRiskAlerts() {
    const container = document.getElementById('risk-alerts-list');
    const highRiskFunds = mockFundData.filter(fund => fund.riskScore < 50);
    
    if (highRiskFunds.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-center py-8">暂无高风险预警基金</p>';
        return;
    }
    
    container.innerHTML = '';
    highRiskFunds.forEach(fund => {
        const alertItem = document.createElement('div');
        alertItem.className = 'flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg';
        
        alertItem.innerHTML = `
            <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                    <h4 class="text-white font-semibold">${fund.name}</h4>
                    <span class="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">高风险</span>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <span class="text-gray-400">年化收益:</span>
                        <span class="text-white ml-1">${fund.annualReturn.toFixed(2)}%</span>
                    </div>
                    <div>
                        <span class="text-gray-400">最大回撤:</span>
                        <span class="text-red-400 ml-1">${fund.maxDrawdown.toFixed(2)}%</span>
                    </div>
                    <div>
                        <span class="text-gray-400">波动率:</span>
                        <span class="text-yellow-400 ml-1">${fund.volatility.toFixed(2)}%</span>
                    </div>
                    <div>
                        <span class="text-gray-400">VaR(95%):</span>
                        <span class="text-red-400 ml-1">${fund.var95.toFixed(2)}%</span>
                    </div>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="viewFundDetail('${fund.id}')" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors">
                    查看详情
                </button>
                <button onclick="addToPortfolio('${fund.id}')" class="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors">
                    加入组合
                </button>
            </div>
        `;
        
        container.appendChild(alertItem);
    });
}

// 生成推荐投资组合
function generateRecommendedPortfolio() {
    const goal = document.querySelector('.investment-goal-btn.active').dataset.goal;
    const riskTolerance = parseInt(document.getElementById('risk-tolerance').value);
    const horizon = document.getElementById('investment-horizon').value;
    
    let recommendedFunds = [];
    
    switch (goal) {
        case 'conservative':
            recommendedFunds = mockFundData.filter(fund => 
                fund.riskLevel === '低风险' || fund.riskLevel === '中低风险'
            ).slice(0, 3);
            break;
        case 'balanced':
            recommendedFunds = mockFundData.filter(fund => 
                fund.riskLevel === '中风险' || fund.riskLevel === '中低风险'
            ).slice(0, 3);
            break;
        case 'growth':
            recommendedFunds = mockFundData.filter(fund => 
                fund.riskLevel === '中风险' || fund.riskLevel === '中高风险'
            ).slice(0, 3);
            break;
        case 'aggressive':
            recommendedFunds = mockFundData.filter(fund => 
                fund.riskLevel === '高风险' || fund.riskLevel === '中高风险'
            ).slice(0, 3);
            break;
    }
    
    // 根据风险承受能力调整权重
    const weights = adjustWeightsByRiskTolerance(recommendedFunds, riskTolerance);
    
    currentPortfolio = recommendedFunds.map((fund, index) => ({
        fund: fund,
        weight: weights[index]
    }));
    
    renderRecommendedPortfolio();
    updatePortfolioAnalysis();
}

// 根据风险承受能力调整权重
function adjustWeightsByRiskTolerance(funds, riskTolerance) {
    const baseWeights = [40, 35, 25]; // 基础权重分配
    const adjustment = (riskTolerance - 5) * 3; // 根据风险承受能力调整
    
    return baseWeights.map((weight, index) => {
        const adjustedWeight = weight + (index === 0 ? adjustment : -adjustment / 2);
        return Math.max(10, Math.min(60, adjustedWeight));
    });
}

// 渲染推荐投资组合
function renderRecommendedPortfolio() {
    const container = document.getElementById('recommended-portfolio');
    container.innerHTML = '';
    
    if (currentPortfolio.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-center py-4">暂无推荐基金</p>';
        return;
    }
    
    currentPortfolio.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        portfolioItem.innerHTML = `
            <div class="flex-1">
                <h5 class="text-white font-medium mb-1">${item.fund.name}</h5>
                <p class="text-sm text-gray-400">${item.fund.type} · ${item.fund.riskLevel}</p>
            </div>
            <div class="flex items-center space-x-3">
                <div class="text-right">
                    <p class="text-sm text-white font-semibold">${item.fund.annualReturn.toFixed(2)}%</p>
                    <p class="text-xs text-gray-400">年化收益</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-white font-semibold">${item.weight}%</p>
                    <p class="text-xs text-gray-400">权重</p>
                </div>
                <button onclick="removeFromPortfolio('${item.fund.id}')" class="text-red-400 hover:text-red-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;
        
        container.appendChild(portfolioItem);
    });
    
    updatePortfolioRiskChart();
}

// 更新组合分析
function updatePortfolioAnalysis() {
    if (currentPortfolio.length === 0) return;
    
    const totalWeight = currentPortfolio.reduce((sum, item) => sum + item.weight, 0);
    const expectedReturn = currentPortfolio.reduce((sum, item) => 
        sum + (item.fund.annualReturn * item.weight / totalWeight), 0);
    const portfolioVolatility = Math.sqrt(currentPortfolio.reduce((sum, item) => 
        sum + Math.pow(item.fund.volatility * item.weight / totalWeight, 2), 0));
    const sharpeRatio = (expectedReturn - 2.5) / portfolioVolatility; // 假设无风险利率2.5%
    const var95 = currentPortfolio.reduce((sum, item) => 
        sum + (item.fund.var95 * item.weight / totalWeight), 0);
    
    document.getElementById('expected-return').textContent = expectedReturn.toFixed(2) + '%';
    document.getElementById('portfolio-volatility').textContent = portfolioVolatility.toFixed(2) + '%';
    document.getElementById('portfolio-sharpe').textContent = sharpeRatio.toFixed(2);
    document.getElementById('portfolio-var').textContent = var95.toFixed(2) + '%';
}

// 优化组合配置
function optimizePortfolio() {
    if (currentPortfolio.length === 0) {
        showToast('请先添加基金到组合', 'warning');
        return;
    }
    
    // 简单的权重优化算法
    const totalReturn = currentPortfolio.reduce((sum, item) => sum + item.fund.annualReturn, 0);
    const optimizedWeights = currentPortfolio.map(item => 
        (item.fund.annualReturn / totalReturn * 100).toFixed(1));
    
    currentPortfolio.forEach((item, index) => {
        item.weight = parseFloat(optimizedWeights[index]);
    });
    
    renderRecommendedPortfolio();
    updatePortfolioAnalysis();
    showToast('组合已优化', 'success');
}

// 运行压力测试
function runStressTest() {
    runScenario('market-crash');
}

// 运行特定场景测试
function runScenario(scenario) {
    const scenarios = {
        'market-crash': {
            name: '市场崩盘场景',
            impact: [-30, -25, -15, -5, -35],
            color: '#e53e3e'
        },
        'interest-rate-rise': {
            name: '加息周期场景',
            impact: [-15, -5, -20, -2, -10],
            color: '#dd6b20'
        },
        'economic-recession': {
            name: '经济衰退场景',
            impact: [-20, -15, -8, -1, -25],
            color: '#805ad5'
        }
    };
    
    const selectedScenario = scenarios[scenario];
    
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: selectedScenario.name,
            textStyle: {
                color: '#e2e8f0',
                fontSize: 18
            },
            left: 'center',
            top: 20
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(26, 54, 93, 0.9)',
            borderColor: '#d69e2e',
            textStyle: {
                color: '#e2e8f0'
            },
            formatter: function(params) {
                return params[0].name + '<br/>' +
                       '预期损失: ' + params[0].value.toFixed(2) + '%';
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: mockFundData.slice(0, 5).map(fund => fund.name),
            axisLine: {
                lineStyle: {
                    color: '#4a5568'
                }
            },
            axisLabel: {
                color: '#a0aec0',
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: '预期损失(%)',
            nameTextStyle: {
                color: '#a0aec0'
            },
            axisLine: {
                lineStyle: {
                    color: '#4a5568'
                }
            },
            axisLabel: {
                color: '#a0aec0',
                formatter: '{value}%'
            },
            splitLine: {
                lineStyle: {
                    color: '#2d3748',
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '预期损失',
                type: 'bar',
                data: selectedScenario.impact,
                itemStyle: {
                    color: selectedScenario.color
                },
                label: {
                    show: true,
                    position: 'top',
                    color: '#e2e8f0',
                    formatter: '{c}%'
                }
            }
        ]
    };
    
    stressTestChart.setOption(option);
}

// 生成风险评估报告
function generateReport() {
    showToast('风险评估报告生成中...', 'info');
    
    setTimeout(() => {
        showToast('报告已生成，下载功能开发中', 'success');
    }, 2000);
}

// 查看基金详情
function viewFundDetail(fundId) {
    localStorage.setItem('selectedFundId', fundId);
    window.location.href = 'analysis.html';
}

// 添加到投资组合
function addToPortfolio(fundId) {
    const fund = mockFundData.find(f => f.id === fundId);
    if (!fund) return;
    
    const existingIndex = currentPortfolio.findIndex(item => item.fund.id === fundId);
    if (existingIndex !== -1) {
        showToast('该基金已在组合中', 'warning');
        return;
    }
    
    if (currentPortfolio.length >= 4) {
        showToast('组合最多只能包含4只基金', 'warning');
        return;
    }
    
    // 计算新权重
    const newWeight = currentPortfolio.length > 0 ? 
        Math.max(10, 100 - currentPortfolio.reduce((sum, item) => sum + item.weight, 0)) : 100;
    
    currentPortfolio.push({
        fund: fund,
        weight: newWeight
    });
    
    renderRecommendedPortfolio();
    updatePortfolioAnalysis();
    showToast('已添加到投资组合', 'success');
}

// 从投资组合中移除
function removeFromPortfolio(fundId) {
    currentPortfolio = currentPortfolio.filter(item => item.fund.id !== fundId);
    
    // 重新分配权重
    if (currentPortfolio.length > 0) {
        const equalWeight = 100 / currentPortfolio.length;
        currentPortfolio.forEach(item => {
            item.weight = equalWeight;
        });
    }
    
    renderRecommendedPortfolio();
    updatePortfolioAnalysis();
    showToast('已从组合中移除', 'info');
}

// 显示提示消息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    switch (type) {
        case 'success':
            toast.classList.add('bg-green-600', 'text-white');
            break;
        case 'warning':
            toast.classList.add('bg-yellow-600', 'text-white');
            break;
        case 'error':
            toast.classList.add('bg-red-600', 'text-white');
            break;
        default:
            toast.classList.add('bg-blue-600', 'text-white');
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 设置滚动显示动画
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// 窗口大小变化处理
window.addEventListener('resize', function() {
    if (riskMatrixChart) riskMatrixChart.resize();
    if (portfolioRiskChart) portfolioRiskChart.resize();
    if (stressTestChart) stressTestChart.resize();
});

// 错误处理
window.addEventListener('error', function(event) {
    console.error('JavaScript错误:', event.error);
    showToast('系统出现错误，请刷新页面重试', 'error');
});

console.log('风险评估页面已加载完成');