// 基金产品画像系统 - 主要JavaScript逻辑

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
        starRating: 4
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
        starRating: 5
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
        starRating: 5
    },
    {
        id: '000009',
        name: '中欧医疗健康混合A',
        type: '混合型',
        riskLevel: '中高风险',
        nav: 2.8765,
        dailyChange: 3.21,
        annualReturn: 25.43,
        size: 189.2,
        establishDate: '2016-09-29',
        manager: '郑十一',
        company: '中欧基金',
        starRating: 4
    },
    {
        id: '000010',
        name: '工银瑞信文体产业股票',
        type: '股票型',
        riskLevel: '高风险',
        nav: 1.9876,
        dailyChange: -2.34,
        annualReturn: 16.89,
        size: 98.7,
        establishDate: '2015-12-30',
        manager: '冯十二',
        company: '工银瑞信基金',
        starRating: 3
    },
    {
        id: '000011',
        name: '华安创业板50ETF',
        type: '指数型',
        riskLevel: '高风险',
        nav: 1.5432,
        dailyChange: 5.67,
        annualReturn: 19.87,
        size: 156.3,
        establishDate: '2016-06-30',
        manager: '陈十三',
        company: '华安基金',
        starRating: 4
    },
    {
        id: '000012',
        name: '国泰中证全指证券公司ETF',
        type: '指数型',
        riskLevel: '高风险',
        nav: 0.9876,
        dailyChange: -3.45,
        annualReturn: 14.23,
        size: 87.4,
        establishDate: '2014-10-20',
        manager: '褚十四',
        company: '国泰基金',
        starRating: 3
    },
    {
        id: '000013',
        name: '鹏华新兴产业混合',
        type: '混合型',
        riskLevel: '中高风险',
        nav: 3.2109,
        dailyChange: 1.78,
        annualReturn: 21.56,
        size: 145.8,
        establishDate: '2011-06-15',
        manager: '卫十五',
        company: '鹏华基金',
        starRating: 4
    },
    {
        id: '000014',
        name: '银华富裕主题混合',
        type: '混合型',
        riskLevel: '中风险',
        nav: 4.5678,
        dailyChange: 0.89,
        annualReturn: 17.34,
        size: 267.9,
        establishDate: '2006-11-16',
        manager: '蒋十六',
        company: '银华基金',
        starRating: 5
    },
    {
        id: '000015',
        name: '景顺长城新兴成长混合',
        type: '混合型',
        riskLevel: '中高风险',
        nav: 5.4321,
        dailyChange: 2.45,
        annualReturn: 26.78,
        size: 378.2,
        establishDate: '2006-06-28',
        manager: '沈十七',
        company: '景顺长城基金',
        starRating: 5
    }
];

// 全局变量
let currentFunds = [...mockFundData];
let filteredFunds = [...mockFundData];
let currentPage = 1;
const fundsPerPage = 9;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化应用
function initializeApp() {
    setupEventListeners();
    renderFundList();
    animateStats();
    setupScrollReveal();
    updateFilterTags();
}

// 设置事件监听器
function setupEventListeners() {
    // 搜索输入
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // 排序选择
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // 收益范围滑块
    const returnRange = document.getElementById('return-range');
    if (returnRange) {
        returnRange.addEventListener('input', updateReturnValue);
    }
    
    // 筛选器
    const fundTypeFilters = document.querySelectorAll('.fund-type-filter');
    const riskFilters = document.querySelectorAll('.risk-filter');
    
    fundTypeFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    riskFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // 加载更多按钮
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreFunds);
    }
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 处理搜索
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredFunds = [...currentFunds];
    } else {
        filteredFunds = currentFunds.filter(fund => 
            fund.name.toLowerCase().includes(searchTerm) ||
            fund.id.includes(searchTerm) ||
            fund.company.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    renderFundList();
}

// 处理排序
function handleSort(event) {
    const sortType = event.target.value;
    
    switch (sortType) {
        case 'return-desc':
            filteredFunds.sort((a, b) => b.annualReturn - a.annualReturn);
            break;
        case 'return-asc':
            filteredFunds.sort((a, b) => a.annualReturn - b.annualReturn);
            break;
        case 'risk-asc':
            filteredFunds.sort((a, b) => {
                const riskOrder = { '低风险': 1, '中低风险': 2, '中风险': 3, '中高风险': 4, '高风险': 5 };
                return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
            });
            break;
        case 'risk-desc':
            filteredFunds.sort((a, b) => {
                const riskOrder = { '低风险': 1, '中低风险': 2, '中风险': 3, '中高风险': 4, '高风险': 5 };
                return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
            });
            break;
        case 'size-desc':
            filteredFunds.sort((a, b) => b.size - a.size);
            break;
        case 'size-asc':
            filteredFunds.sort((a, b) => a.size - b.size);
            break;
    }
    
    currentPage = 1;
    renderFundList();
}

// 更新收益范围显示值
function updateReturnValue(event) {
    const value = event.target.value;
    const returnValueElement = document.getElementById('return-value');
    if (returnValueElement) {
        returnValueElement.textContent = value + '%';
    }
}

// 应用筛选器
function applyFilters() {
    const selectedTypes = Array.from(document.querySelectorAll('.fund-type-filter:checked')).map(cb => cb.value);
    const selectedRisks = Array.from(document.querySelectorAll('.risk-filter:checked')).map(cb => cb.value);
    const maxReturn = parseFloat(document.getElementById('return-range').value);
    const sizeFilter = document.getElementById('size-filter').value;
    
    filteredFunds = mockFundData.filter(fund => {
        // 类型筛选
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(fund.type);
        
        // 风险等级筛选
        const riskMatch = selectedRisks.length === 0 || selectedRisks.includes(fund.riskLevel);
        
        // 收益范围筛选
        const returnMatch = fund.annualReturn <= maxReturn;
        
        // 规模筛选
        let sizeMatch = true;
        if (sizeFilter !== 'all') {
            switch (sizeFilter) {
                case 'small':
                    sizeMatch = fund.size < 10;
                    break;
                case 'medium':
                    sizeMatch = fund.size >= 10 && fund.size <= 100;
                    break;
                case 'large':
                    sizeMatch = fund.size > 100;
                    break;
            }
        }
        
        return typeMatch && riskMatch && returnMatch && sizeMatch;
    });
    
    currentFunds = [...filteredFunds];
    currentPage = 1;
    renderFundList();
    updateFilterTags();
}

// 清除筛选器
function clearFilters() {
    // 重置所有筛选器
    document.querySelectorAll('.fund-type-filter').forEach(cb => cb.checked = true);
    document.querySelectorAll('.risk-filter').forEach(cb => cb.checked = true);
    document.getElementById('return-range').value = 50;
    document.getElementById('return-value').textContent = '50%';
    document.getElementById('size-filter').value = 'all';
    document.getElementById('search-input').value = '';
    
    // 重置数据
    filteredFunds = [...mockFundData];
    currentFunds = [...mockFundData];
    currentPage = 1;
    renderFundList();
    updateFilterTags();
}

// 更新筛选标签
function updateFilterTags() {
    const filterTagsContainer = document.getElementById('filter-tags');
    if (!filterTagsContainer) return;
    
    filterTagsContainer.innerHTML = '';
    
    const selectedTypes = Array.from(document.querySelectorAll('.fund-type-filter:checked')).map(cb => cb.value);
    const selectedRisks = Array.from(document.querySelectorAll('.risk-filter:checked')).map(cb => cb.value);
    
    selectedTypes.forEach(type => {
        const tag = createFilterTag(type, 'type');
        filterTagsContainer.appendChild(tag);
    });
    
    selectedRisks.forEach(risk => {
        const tag = createFilterTag(risk, 'risk');
        filterTagsContainer.appendChild(tag);
    });
}

// 创建筛选标签
function createFilterTag(text, type) {
    const tag = document.createElement('span');
    tag.className = 'filter-tag inline-flex items-center';
    tag.innerHTML = `
        ${text}
        <button onclick="removeFilterTag('${text}', '${type}')" class="ml-2 text-gray-600 hover:text-gray-800">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
    `;
    return tag;
}

// 移除筛选标签
function removeFilterTag(text, type) {
    if (type === 'type') {
        const checkbox = document.querySelector(`.fund-type-filter[value="${text}"]`);
        if (checkbox) checkbox.checked = false;
    } else if (type === 'risk') {
        const checkbox = document.querySelector(`.risk-filter[value="${text}"]`);
        if (checkbox) checkbox.checked = false;
    }
    applyFilters();
}

// 渲染基金列表
function renderFundList() {
    const fundList = document.getElementById('fund-list');
    if (!fundList) return;
    
    const startIndex = (currentPage - 1) * fundsPerPage;
    const endIndex = startIndex + fundsPerPage;
    const fundsToShow = filteredFunds.slice(0, endIndex);
    
    fundList.innerHTML = '';
    
    fundsToShow.forEach((fund, index) => {
        const fundCard = createFundCard(fund, index);
        fundList.appendChild(fundCard);
    });
    
    // 更新加载更多按钮
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        if (endIndex >= filteredFunds.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // 添加滚动动画
    setTimeout(() => {
        setupScrollReveal();
    }, 100);
}

// 创建基金卡片
function createFundCard(fund, index) {
    const card = document.createElement('div');
    card.className = 'fund-card glass-card p-6 scroll-reveal';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const dailyChangeClass = fund.dailyChange >= 0 ? 'positive' : 'negative';
    const dailyChangeSymbol = fund.dailyChange >= 0 ? '+' : '';
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-1 truncate">${fund.name}</h3>
                <p class="text-sm text-gray-400">${fund.id} · ${fund.company}</p>
            </div>
            <div class="flex items-center space-x-1">
                ${generateStars(fund.starRating)}
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <p class="text-xs text-gray-400 mb-1">最新净值</p>
                <p class="text-lg font-bold text-white">${fund.nav.toFixed(4)}</p>
            </div>
            <div>
                <p class="text-xs text-gray-400 mb-1">日涨跌幅</p>
                <p class="text-lg font-bold ${dailyChangeClass}">${dailyChangeSymbol}${fund.dailyChange.toFixed(2)}%</p>
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <p class="text-xs text-gray-400 mb-1">年化收益</p>
                <p class="text-sm font-semibold text-green-400">${fund.annualReturn.toFixed(2)}%</p>
            </div>
            <div>
                <p class="text-xs text-gray-400 mb-1">基金规模</p>
                <p class="text-sm font-semibold text-white">${fund.size.toFixed(1)}亿</p>
            </div>
        </div>
        
        <div class="flex items-center justify-between mb-4">
            <div class="flex space-x-2">
                <span class="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">${fund.type}</span>
                <span class="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">${fund.riskLevel}</span>
            </div>
            <p class="text-xs text-gray-400">${fund.establishDate}</p>
        </div>
        
        <div class="flex space-x-2">
            <button onclick="viewFundDetail('${fund.id}')" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors">
                查看详情
            </button>
            <button onclick="addToCompare('${fund.id}')" class="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded transition-colors">
                对比
            </button>
            <button onclick="toggleFavorite('${fund.id}')" class="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
            </button>
        </div>
    `;
    
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

// 加载更多基金
function loadMoreFunds() {
    currentPage++;
    renderFundList();
}

// 查看基金详情
function viewFundDetail(fundId) {
    // 存储选中的基金ID到localStorage
    localStorage.setItem('selectedFundId', fundId);
    // 跳转到分析页面
    window.location.href = 'analysis.html';
}

// 添加到对比
function addToCompare(fundId) {
    let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    
    if (compareList.includes(fundId)) {
        showToast('该基金已在对比列表中', 'warning');
        return;
    }
    
    if (compareList.length >= 4) {
        showToast('最多只能对比4只基金', 'warning');
        return;
    }
    
    compareList.push(fundId);
    localStorage.setItem('compareList', JSON.stringify(compareList));
    showToast('已添加到对比列表', 'success');
}

// 切换收藏状态
function toggleFavorite(fundId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.includes(fundId)) {
        favorites = favorites.filter(id => id !== fundId);
        showToast('已取消收藏', 'info');
    } else {
        favorites.push(fundId);
        showToast('已添加到收藏', 'success');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
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

// 动画化统计数据
function animateStats() {
    const stats = [
        { id: 'total-funds', target: 1248, suffix: '' },
        { id: 'avg-return', target: 8.47, suffix: '%' },
        { id: 'total-aum', target: 2.8, suffix: '万亿' },
        { id: 'up-down-ratio', target: 0, suffix: ':566', prefix: '682' }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateNumber(element, 0, stat.target, stat.suffix, stat.prefix);
        }
    });
}

// 数字动画
function animateNumber(element, start, end, suffix = '', prefix = '') {
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        if (suffix === '%') {
            element.textContent = prefix + current.toFixed(2) + suffix;
        } else if (suffix === '万亿') {
            element.textContent = prefix + current.toFixed(1) + suffix;
        } else {
            element.textContent = prefix + Math.floor(current) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
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

// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 切换视图（预留功能）
function toggleView() {
    showToast('视图切换功能开发中', 'info');
}

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        console.log('页面隐藏，暂停动画');
    } else {
        // 页面显示时恢复动画
        console.log('页面显示，恢复动画');
        setupScrollReveal();
    }
});

// 窗口大小变化处理
window.addEventListener('resize', debounce(function() {
    // 重新计算布局
    console.log('窗口大小变化，重新计算布局');
}, 250));

// 错误处理
window.addEventListener('error', function(event) {
    console.error('JavaScript错误:', event.error);
    showToast('系统出现错误，请刷新页面重试', 'error');
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(event) {
    console.error('未处理的Promise拒绝:', event.reason);
    showToast('数据处理出现错误', 'error');
});

console.log('基金产品画像系统已加载完成');