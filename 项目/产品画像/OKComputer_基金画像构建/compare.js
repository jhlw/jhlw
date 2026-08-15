// 基金对比页面 JavaScript 逻辑

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
        industries: [
            { name: '信息技术', value: 25.6 },
            { name: '金融', value: 18.3 },
            { name: '消费', value: 15.2 },
            { name: '医疗保健', value: 12.8 },
            { name: '工业', value: 10.4 },
            { name: '材料', value: 8.7 },
            { name: '房地产', value: 5.8 },
            { name: '其他', value: 3.2 }
        ],
        topHoldings: [
            { name: '贵州茅台', weight: 8.45, change: 2.34 },
            { name: '五粮液', weight: 6.78, change: 1.56 },
            { name: '中国平安', weight: 5.23, change: -0.89 },
            { name: '招商银行', weight: 4.67, change: 0.45 },
            { name: '腾讯控股', weight: 4.12, change: 1.23 }
        ]
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
        industries: [
            { name: '金融', value: 35.2 },
            { name: '信息技术', value: 20.8 },
            { name: '消费', value: 18.5 },
            { name: '工业', value: 12.3 },
            { name: '医疗保健', value: 8.9 },
            { name: '材料', value: 3.8 },
            { name: '房地产', value: 0.5 }
        ],
        topHoldings: [
            { name: '贵州茅台', weight: 5.23, change: 2.34 },
            { name: '中国平安', weight: 4.89, change: -0.89 },
            { name: '招商银行', weight: 4.12, change: 0.45 },
            { name: '五粮液', weight: 3.78, change: 1.56 },
            { name: '兴业银行', weight: 3.45, change: -0.23 }
        ]
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
        industries: [
            { name: '金融债', value: 45.6 },
            { name: '企业债', value: 28.3 },
            { name: '国债', value: 15.2 },
            { name: '可转债', value: 7.8 },
            { name: '其他', value: 3.1 }
        ],
        topHoldings: [
            { name: '21国债(10)', weight: 8.45, change: 0.15 },
            { name: '20国开(15)', weight: 7.23, change: 0.08 },
            { name: '19农发(12)', weight: 6.89, change: 0.12 },
            { name: '21进出(08)', weight: 5.67, change: 0.05 },
            { name: '20国债(12)', weight: 4.78, change: 0.09 }
        ]
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
        industries: [
            { name: '银行存款', value: 60.5 },
            { name: '同业存单', value: 25.8 },
            { name: '债券回购', value: 10.2 },
            { name: '其他', value: 3.5 }
        ],
        topHoldings: [
            { name: '银行存款', weight: 45.6, change: 0.01 },
            { name: '同业存单', weight: 25.8, change: 0.02 },
            { name: '国债逆回购', weight: 15.4, change: 0.01 },
            { name: '央行票据', weight: 8.9, change: 0.01 },
            { name: '政策性金融债', weight: 4.3, change: 0.02 }
        ]
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
        industries: [
            { name: '信息技术', value: 35.8 },
            { name: '医疗保健', value: 22.4 },
            { name: '消费', value: 18.9 },
            { name: '工业', value: 12.3 },
            { name: '材料', value: 7.8 },
            { name: '其他', value: 2.8 }
        ],
        topHoldings: [
            { name: '宁德时代', weight: 9.23, change: 4.56 },
            { name: '药明康德', weight: 7.89, change: 2.34 },
            { name: '隆基绿能', weight: 6.45, change: 3.21 },
            { name: '比亚迪', weight: 5.87, change: 2.89 },
            { name: '爱尔眼科', weight: 5.12, change: 1.78 }
        ]
    }
];

// 全局变量
let compareList = [];
let radarChart = null;
let riskReturnChart = null;
let industryComparisonChart = null;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化应用
function initializeApp() {
    loadCompareList();
    renderComparisonCards();
    initializeCharts();
    setupEventListeners();
    setupScrollReveal();
}

// 加载对比列表
function loadCompareList() {
    const savedList = JSON.parse(localStorage.getItem('compareList') || '[]');
    compareList = savedList.map(id => mockFundData.find(fund => fund.id === id)).filter(Boolean);
}

// 渲染对比卡片
function renderComparisonCards() {
    const container = document.getElementById('comparison-cards');
    container.innerHTML = '';
    
    // 渲染已选择的基金
    compareList.forEach((fund, index) => {
        const card = createCompareFundCard(fund, index);
        container.appendChild(card);
    });
    
    // 渲染添加按钮
    if (compareList.length < 4) {
        const addCard = createAddFundCard();
        container.appendChild(addCard);
    }
    
    // 更新对比表格和图表
    updateComparisonTable();
    updateAllCharts();
}

// 创建对比基金卡片
function createCompareFundCard(fund, index) {
    const card = document.createElement('div');
    card.className = 'compare-fund-card glass-card p-6';
    
    const dailyChangeClass = fund.dailyChange >= 0 ? 'positive' : 'negative';
    const dailyChangeSymbol = fund.dailyChange >= 0 ? '+' : '';
    
    card.innerHTML = `
        <div class="remove-btn" onclick="removeFromComparison(${index})">
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </div>
        
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white truncate">${fund.name}</h3>
            <div class="flex items-center space-x-1">
                ${generateStars(fund.starRating)}
            </div>
        </div>
        
        <div class="space-y-3 mb-4">
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-400">基金代码</span>
                <span class="text-sm font-medium text-white">${fund.id}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-400">最新净值</span>
                <span class="text-sm font-medium text-white">${fund.nav.toFixed(4)}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-400">日涨跌幅</span>
                <span class="text-sm font-medium ${dailyChangeClass}">${dailyChangeSymbol}${fund.dailyChange.toFixed(2)}%</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm text-gray-400">年化收益</span>
                <span class="text-sm font-medium text-green-400">${fund.annualReturn.toFixed(2)}%</span>
            </div>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">${fund.type}</span>
            <span class="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">${fund.riskLevel}</span>
        </div>
        
        <div class="text-xs text-gray-400">
            <p>${fund.company}</p>
            <p>基金经理：${fund.manager}</p>
        </div>
    `;
    
    return card;
}

// 创建添加基金卡片
function createAddFundCard() {
    const card = document.createElement('div');
    card.className = 'add-fund-card glass-card p-6 flex flex-col items-center justify-center text-center';
    
    card.innerHTML = `
        <div class="w-16 h-16 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">添加基金</h3>
        <p class="text-sm text-gray-400">点击选择要对比的基金</p>
    `;
    
    card.addEventListener('click', function() {
        openFundSearch();
    });
    
    return card;
}

// 生成星级评分
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
        } else {
            stars += '<svg class="w-4 h-4 text-gray-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
        }
    }
    return stars;
}

// 设置事件监听器
function setupEventListeners() {
    // 模态框搜索
    const modalSearch = document.getElementById('modal-fund-search');
    modalSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        updateModalFundList(searchTerm);
    });
}

// 打开基金搜索
function openFundSearch() {
    document.getElementById('fund-search-modal').classList.add('show');
    updateModalFundList('');
}

// 关闭基金搜索
function closeFundSearch() {
    document.getElementById('fund-search-modal').classList.remove('show');
}

// 更新模态框基金列表
function updateModalFundList(searchTerm) {
    const container = document.getElementById('modal-fund-list');
    container.innerHTML = '';
    
    const availableFunds = mockFundData.filter(fund => 
        !compareList.some(cf => cf.id === fund.id) &&
        (searchTerm === '' || 
         fund.name.toLowerCase().includes(searchTerm) || 
         fund.id.includes(searchTerm))
    );
    
    availableFunds.forEach(fund => {
        const option = document.createElement('div');
        option.className = 'fund-option';
        option.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <p class="text-white font-medium">${fund.name}</p>
                    <p class="text-gray-400 text-sm">${fund.id} · ${fund.company}</p>
                </div>
                <div class="text-right">
                    <p class="text-white font-semibold">${fund.annualReturn.toFixed(2)}%</p>
                    <p class="text-gray-400 text-sm">${fund.type}</p>
                </div>
            </div>
        `;
        
        option.addEventListener('click', function() {
            addToComparison(fund);
            closeFundSearch();
        });
        
        container.appendChild(option);
    });
}

// 添加到对比
function addToComparison(fund) {
    if (compareList.length >= 4) {
        showToast('最多只能对比4只基金', 'warning');
        return;
    }
    
    compareList.push(fund);
    localStorage.setItem('compareList', JSON.stringify(compareList.map(f => f.id)));
    renderComparisonCards();
    showToast('已添加到对比列表', 'success');
}

// 从对比中移除
function removeFromComparison(index) {
    compareList.splice(index, 1);
    localStorage.setItem('compareList', JSON.stringify(compareList.map(f => f.id)));
    renderComparisonCards();
    showToast('已从对比列表中移除', 'info');
}

// 清空所有对比
function clearAllComparisons() {
    compareList = [];
    localStorage.removeItem('compareList');
    renderComparisonCards();
    showToast('已清空对比列表', 'info');
}

// 初始化图表
function initializeCharts() {
    initRadarChart();
    initRiskReturnChart();
    initIndustryComparisonChart();
}

// 初始化雷达图
function initRadarChart() {
    const chartDom = document.getElementById('radar-chart');
    radarChart = echarts.init(chartDom);
    updateRadarChart();
}

// 更新雷达图
function updateRadarChart() {
    if (compareList.length === 0) {
        radarChart.clear();
        return;
    }
    
    const indicators = [
        { name: '年化收益', max: 35 },
        { name: '夏普比率', max: 2.5 },
        { name: '风控能力', max: 100 },
        { name: '收益稳定性', max: 100 },
        { name: '规模优势', max: 100 },
        { name: '综合评级', max: 5 }
    ];
    
    const series = compareList.map((fund, index) => {
        const colors = ['#d69e2e', '#3182ce', '#38a169', '#dd6b20'];
        const riskScore = fund.riskLevel === '低风险' ? 90 : 
                         fund.riskLevel === '中低风险' ? 75 :
                         fund.riskLevel === '中风险' ? 60 :
                         fund.riskLevel === '中高风险' ? 40 : 20;
        
        return {
            name: fund.name,
            type: 'radar',
            data: [{
                value: [
                    fund.annualReturn,
                    fund.sharpeRatio,
                    riskScore,
                    85 - fund.volatility,
                    Math.min(fund.size / 5, 100),
                    fund.starRating
                ]
            }],
            itemStyle: {
                color: colors[index % colors.length]
            },
            lineStyle: {
                color: colors[index % colors.length],
                width: 2
            },
            areaStyle: {
                color: colors[index % colors.length],
                opacity: 0.1
            }
        };
    });
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            backgroundColor: 'rgba(26, 54, 93, 0.9)',
            borderColor: '#d69e2e',
            textStyle: {
                color: '#e2e8f0'
            }
        },
        legend: {
            data: compareList.map(f => f.name),
            textStyle: {
                color: '#e2e8f0'
            },
            bottom: 10
        },
        radar: {
            indicator: indicators,
            name: {
                textStyle: {
                    color: '#e2e8f0'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.05)']
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        series: series
    };
    
    radarChart.setOption(option);
}

// 初始化风险收益散点图
function initRiskReturnChart() {
    const chartDom = document.getElementById('risk-return-chart');
    riskReturnChart = echarts.init(chartDom);
    updateRiskReturnChart();
}

// 更新风险收益散点图
function updateRiskReturnChart() {
    if (compareList.length === 0) {
        riskReturnChart.clear();
        return;
    }
    
    const data = compareList.map((fund, index) => {
        const colors = ['#d69e2e', '#3182ce', '#38a169', '#dd6b20'];
        return {
            name: fund.name,
            value: [fund.volatility, fund.annualReturn],
            itemStyle: {
                color: colors[index % colors.length]
            },
            symbolSize: Math.max(15, fund.size / 10)
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
                return params.data.name + '<br/>' +
                       '年化收益: ' + params.data.value[1].toFixed(2) + '%<br/>' +
                       '波动率: ' + params.data.value[0].toFixed(2) + '%';
            }
        },
        series: [
            {
                type: 'scatter',
                data: data,
                label: {
                    show: true,
                    position: 'top',
                    color: '#e2e8f0',
                    fontSize: 12
                },
                emphasis: {
                    scale: 1.5
                }
            }
        ]
    };
    
    riskReturnChart.setOption(option);
}

// 初始化行业对比图
function initIndustryComparisonChart() {
    const chartDom = document.getElementById('industry-comparison-chart');
    industryComparisonChart = echarts.init(chartDom);
    updateIndustryComparisonChart();
}

// 更新行业对比图
function updateIndustryComparisonChart() {
    if (compareList.length === 0) {
        industryComparisonChart.clear();
        return;
    }
    
    const allIndustries = new Set();
    compareList.forEach(fund => {
        fund.industries.forEach(ind => allIndustries.add(ind.name));
    });
    
    const industries = Array.from(allIndustries);
    const series = compareList.map((fund, index) => {
        const colors = ['#d69e2e', '#3182ce', '#38a169', '#dd6b20'];
        const data = industries.map(industry => {
            const indData = fund.industries.find(i => i.name === industry);
            return indData ? indData.value : 0;
        });
        
        return {
            name: fund.name,
            type: 'bar',
            data: data,
            itemStyle: {
                color: colors[index % colors.length]
            }
        };
    });
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(26, 54, 93, 0.9)',
            borderColor: '#d69e2e',
            textStyle: {
                color: '#e2e8f0'
            }
        },
        legend: {
            data: compareList.map(f => f.name),
            textStyle: {
                color: '#e2e8f0'
            },
            bottom: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: industries,
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
            name: '占比(%)',
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
        series: series
    };
    
    industryComparisonChart.setOption(option);
}

// 更新对比表格
function updateComparisonTable() {
    const table = document.getElementById('comparison-table');
    const tbody = document.getElementById('comparison-table-body');
    
    // 更新表头
    const thead = table.querySelector('thead tr');
    thead.innerHTML = '<th class="w-48">对比项目</th>';
    compareList.forEach(fund => {
        thead.innerHTML += `<th class="text-center">${fund.name}</th>`;
    });
    
    // 更新表格内容
    const comparisonItems = [
        { label: '基金代码', key: 'id' },
        { label: '基金类型', key: 'type' },
        { label: '风险等级', key: 'riskLevel' },
        { label: '最新净值', key: 'nav', format: (v) => v.toFixed(4) },
        { label: '日涨跌幅', key: 'dailyChange', format: (v) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`, class: (v) => v >= 0 ? 'positive' : 'negative' },
        { label: '年化收益', key: 'annualReturn', format: (v) => `${v.toFixed(2)}%`, class: () => 'positive' },
        { label: '基金规模', key: 'size', format: (v) => `${v.toFixed(1)}亿` },
        { label: '成立日期', key: 'establishDate' },
        { label: '基金经理', key: 'manager' },
        { label: '管理公司', key: 'company' },
        { label: '夏普比率', key: 'sharpeRatio', format: (v) => v.toFixed(2) },
        { label: '最大回撤', key: 'maxDrawdown', format: (v) => `${v.toFixed(2)}%`, class: () => 'negative' },
        { label: '波动率', key: 'volatility', format: (v) => `${v.toFixed(2)}%` },
        { label: '信息比率', key: 'informationRatio', format: (v) => v.toFixed(2) },
        { label: '跟踪误差', key: 'trackingError', format: (v) => `${v.toFixed(2)}%` }
    ];
    
    tbody.innerHTML = '';
    comparisonItems.forEach(item => {
        const row = document.createElement('tr');
        let rowHTML = `<td class="font-medium text-gray-300">${item.label}</td>`;
        
        compareList.forEach(fund => {
            const value = fund[item.key];
            const formattedValue = item.format ? item.format(value) : value;
            const cellClass = item.class ? item.class(value) : '';
            rowHTML += `<td class="text-center ${cellClass}">${formattedValue}</td>`;
        });
        
        row.innerHTML = rowHTML;
        tbody.appendChild(row);
    });
}

// 更新所有图表
function updateAllCharts() {
    updateRadarChart();
    updateRiskReturnChart();
    updateIndustryComparisonChart();
}

// 导出对比报告
function exportComparison() {
    if (compareList.length === 0) {
        showToast('没有可导出的对比数据', 'warning');
        return;
    }
    
    showToast('对比报告导出功能开发中', 'info');
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
    if (radarChart) radarChart.resize();
    if (riskReturnChart) riskReturnChart.resize();
    if (industryComparisonChart) industryComparisonChart.resize();
});

// 错误处理
window.addEventListener('error', function(event) {
    console.error('JavaScript错误:', event.error);
    showToast('系统出现错误，请刷新页面重试', 'error');
});

console.log('基金对比页面已加载完成');