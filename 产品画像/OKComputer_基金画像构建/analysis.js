// 基金分析页面 JavaScript 逻辑

// 模拟基金数据（与main.js中的数据保持一致）
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
        starRating: 4
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
        starRating: 5
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
        starRating: 4
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
        starRating: 5
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
        starRating: 4
    }
];

// 当前选中的基金
let currentFund = mockFundData[0];

// 图表实例
let performanceChart = null;
let industryChart = null;
let comparisonChart = null;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化应用
function initializeApp() {
    loadSelectedFund();
    setupEventListeners();
    initializeCharts();
    setupScrollReveal();
    setupFundSearch();
}

// 加载选中的基金
function loadSelectedFund() {
    const selectedFundId = localStorage.getItem('selectedFundId');
    if (selectedFundId) {
        const fund = mockFundData.find(f => f.id === selectedFundId);
        if (fund) {
            currentFund = fund;
        }
    }
    
    updateFundInfo();
}

// 更新基金信息显示
function updateFundInfo() {
    document.getElementById('fund-name').textContent = currentFund.name;
    document.getElementById('fund-code').textContent = currentFund.id;
    document.getElementById('current-nav').textContent = currentFund.nav.toFixed(4);
    
    const dailyChangeElement = document.getElementById('daily-change');
    const dailyChangeValue = currentFund.dailyChange >= 0 ? `+${currentFund.dailyChange.toFixed(2)}%` : `${currentFund.dailyChange.toFixed(2)}%`;
    dailyChangeElement.textContent = dailyChangeValue;
    dailyChangeElement.className = currentFund.dailyChange >= 0 ? 'text-xl font-bold positive' : 'text-xl font-bold negative';
    
    document.getElementById('annual-return').textContent = currentFund.annualReturn.toFixed(2) + '%';
    document.getElementById('fund-size').textContent = currentFund.size.toFixed(1) + '亿';
    document.getElementById('fund-type').textContent = currentFund.type;
    document.getElementById('risk-level').textContent = currentFund.riskLevel;
    document.getElementById('fund-manager').textContent = '基金经理：' + currentFund.manager;
    document.getElementById('fund-company').textContent = currentFund.company;
    
    // 更新星级评分
    const starsContainer = document.getElementById('fund-stars');
    starsContainer.innerHTML = generateStars(currentFund.starRating);
    
    // 检查收藏状态
    checkFavoriteStatus();
}

// 生成星级评分
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
        } else {
            stars += '<svg class="w-5 h-5 text-gray-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
        }
    }
    return stars;
}

// 设置事件监听器
function setupEventListeners() {
    // 时间段选择器
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            timeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updatePerformanceChart(this.dataset.period);
        });
    });
}

// 设置基金搜索功能
function setupFundSearch() {
    const searchInput = document.getElementById('fund-search');
    const dropdown = document.getElementById('fund-dropdown');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            dropdown.classList.remove('show');
            return;
        }
        
        const matchedFunds = mockFundData.filter(fund => 
            fund.name.toLowerCase().includes(searchTerm) ||
            fund.id.includes(searchTerm)
        );
        
        if (matchedFunds.length > 0) {
            renderFundDropdown(matchedFunds);
            dropdown.classList.add('show');
        } else {
            dropdown.classList.remove('show');
        }
    });
    
    // 点击外部关闭下拉框
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
}

// 渲染基金搜索下拉框
function renderFundDropdown(funds) {
    const dropdown = document.getElementById('fund-dropdown');
    dropdown.innerHTML = '';
    
    funds.forEach(fund => {
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
            currentFund = fund;
            updateFundInfo();
            updateAllCharts();
            dropdown.classList.remove('show');
            document.getElementById('fund-search').value = '';
        });
        
        dropdown.appendChild(option);
    });
}

// 初始化图表
function initializeCharts() {
    initPerformanceChart();
    initIndustryChart();
    initComparisonChart();
}

// 初始化业绩走势图
function initPerformanceChart() {
    const chartDom = document.getElementById('performance-chart');
    performanceChart = echarts.init(chartDom);
    updatePerformanceChart('1M');
}

// 更新业绩走势图
function updatePerformanceChart(period) {
    // 生成模拟数据
    const data = generatePerformanceData(period);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.dates,
            axisLine: {
                lineStyle: {
                    color: '#4a5568'
                }
            },
            axisLabel: {
                color: '#a0aec0'
            }
        },
        yAxis: {
            type: 'value',
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
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(26, 54, 93, 0.9)',
            borderColor: '#d69e2e',
            textStyle: {
                color: '#e2e8f0'
            },
            formatter: function(params) {
                let result = params[0].name + '<br/>';
                params.forEach(param => {
                    result += param.marker + param.seriesName + ': ' + param.value.toFixed(2) + '%<br/>';
                });
                return result;
            }
        },
        legend: {
            data: ['基金收益', '同类平均', '基准指数'],
            textStyle: {
                color: '#e2e8f0'
            },
            top: 10
        },
        series: [
            {
                name: '基金收益',
                type: 'line',
                data: data.fundReturns,
                lineStyle: {
                    color: '#d69e2e',
                    width: 3
                },
                itemStyle: {
                    color: '#d69e2e'
                },
                symbol: 'circle',
                symbolSize: 6
            },
            {
                name: '同类平均',
                type: 'line',
                data: data.categoryAvg,
                lineStyle: {
                    color: '#3182ce',
                    width: 2
                },
                itemStyle: {
                    color: '#3182ce'
                },
                symbol: 'circle',
                symbolSize: 4
            },
            {
                name: '基准指数',
                type: 'line',
                data: data.benchmark,
                lineStyle: {
                    color: '#38a169',
                    width: 2,
                    type: 'dashed'
                },
                itemStyle: {
                    color: '#38a169'
                },
                symbol: 'circle',
                symbolSize: 4
            }
        ]
    };
    
    performanceChart.setOption(option);
}

// 生成业绩数据
function generatePerformanceData(period) {
    const dates = [];
    const fundReturns = [];
    const categoryAvg = [];
    const benchmark = [];
    
    let dataPoints;
    switch (period) {
        case '1M': dataPoints = 30; break;
        case '3M': dataPoints = 90; break;
        case '6M': dataPoints = 180; break;
        case '1Y': dataPoints = 365; break;
        case '3Y': dataPoints = 365 * 3; break;
        case '5Y': dataPoints = 365 * 5; break;
        default: dataPoints = 30;
    }
    
    const step = Math.max(1, Math.floor(dataPoints / 30));
    
    for (let i = 0; i < Math.min(dataPoints, 365); i += step) {
        const date = new Date();
        date.setDate(date.getDate() - (dataPoints - i));
        dates.push(date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }));
        
        // 生成模拟收益数据
        const baseReturn = currentFund.annualReturn / 365 * i;
        const volatility = 0.02;
        const fundReturn = baseReturn + (Math.random() - 0.5) * volatility * 100;
        const categoryReturn = baseReturn * 0.9 + (Math.random() - 0.5) * volatility * 80;
        const benchmarkReturn = baseReturn * 0.8 + (Math.random() - 0.5) * volatility * 60;
        
        fundReturns.push(fundReturn);
        categoryAvg.push(categoryReturn);
        benchmark.push(benchmarkReturn);
    }
    
    return { dates, fundReturns, categoryAvg, benchmark };
}

// 初始化行业分布图
function initIndustryChart() {
    const chartDom = document.getElementById('industry-chart');
    industryChart = echarts.init(chartDom);
    
    const data = [
        { value: 25.6, name: '信息技术' },
        { value: 18.3, name: '金融' },
        { value: 15.2, name: '消费' },
        { value: 12.8, name: '医疗保健' },
        { value: 10.4, name: '工业' },
        { value: 8.7, name: '材料' },
        { value: 5.8, name: '房地产' },
        { value: 3.2, name: '其他' }
    ];
    
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
                name: '行业分布',
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
                data: data,
                color: ['#d69e2e', '#3182ce', '#38a169', '#dd6b20', '#9f7aea', '#ed8936', '#38b2ac', '#718096']
            }
        ]
    };
    
    industryChart.setOption(option);
}

// 初始化同类对比图
function initComparisonChart() {
    const chartDom = document.getElementById('comparison-chart');
    comparisonChart = echarts.init(chartDom);
    
    const funds = ['华夏成长混合', '同类平均', '广发稳健增长', '富国天惠成长'];
    const returns = [15.67, 12.34, 13.89, 14.23];
    const risks = [22.15, 20.56, 19.87, 21.34];
    
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
                symbolSize: function(data) {
                    return data[2] || 15;
                },
                data: [
                    { value: [risks[0], returns[0], 20], name: funds[0], itemStyle: { color: '#d69e2e' } },
                    { value: [risks[1], returns[1], 15], name: funds[1], itemStyle: { color: '#3182ce' } },
                    { value: [risks[2], returns[2], 15], name: funds[2], itemStyle: { color: '#38a169' } },
                    { value: [risks[3], returns[3], 15], name: funds[3], itemStyle: { color: '#dd6b20' } }
                ],
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
    
    comparisonChart.setOption(option);
}

// 更新所有图表
function updateAllCharts() {
    updatePerformanceChart('1M');
    // 其他图表可以根据需要更新
}

// 添加到对比
function addToCompare() {
    let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    
    if (compareList.includes(currentFund.id)) {
        showToast('该基金已在对比列表中', 'warning');
        return;
    }
    
    if (compareList.length >= 4) {
        showToast('最多只能对比4只基金', 'warning');
        return;
    }
    
    compareList.push(currentFund.id);
    localStorage.setItem('compareList', JSON.stringify(compareList));
    showToast('已添加到对比列表', 'success');
}

// 切换收藏状态
function toggleFavorite() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.includes(currentFund.id)) {
        favorites = favorites.filter(id => id !== currentFund.id);
        showToast('已取消收藏', 'info');
    } else {
        favorites.push(currentFund.id);
        showToast('已添加到收藏', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    checkFavoriteStatus();
}

// 检查收藏状态
function checkFavoriteStatus() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteBtn = document.getElementById('favorite-btn');
    
    if (favorites.includes(currentFund.id)) {
        favoriteBtn.classList.add('bg-red-500', 'border-red-500', 'text-white');
        favoriteBtn.classList.remove('border-gray-600', 'text-gray-300');
    } else {
        favoriteBtn.classList.remove('bg-red-500', 'border-red-500', 'text-white');
        favoriteBtn.classList.add('border-gray-600', 'text-gray-300');
    }
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
    if (performanceChart) performanceChart.resize();
    if (industryChart) industryChart.resize();
    if (comparisonChart) comparisonChart.resize();
});

// 错误处理
window.addEventListener('error', function(event) {
    console.error('JavaScript错误:', event.error);
    showToast('系统出现错误，请刷新页面重试', 'error');
});

console.log('基金分析页面已加载完成');