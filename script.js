const SUPABASE_URL = 'https://owmwindeocegmjnlgble.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93bXdpbmRlb2NlZ21qbmxnYmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4Mzg3NDAsImV4cCI6MjEwNzQxNDc0MH0.ZkzdaZmkKA_hi9Dr-shAFM2XzsNsjb7dR7Jh4tu8NZc';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function appData() {
  const now = new Date();
  const currentYearStr = now.getFullYear().toString();
  const currentMonthStr = String(now.getMonth() + 1).padStart(2, '0');
  const currentDayStr = String(now.getDate()).padStart(2, '0');

  return {
    authStatus: 'checking', // 'checking', 'approved', 'forbidden'
    currentUserName: '',
    currentAccountGroup: '',
    currentAuthUid: '',

    trackerSubView: 'list',
    timeDimension: 'month',
    yearSummaryMode: 'category',
    monthlyFilterCategory: 'all',
    filterCategoryTab: 'expense',
    
    selectedYear: currentYearStr,
    selectedMonth: currentMonthStr,
    searchQuery: '',
    
    incomeCategories: ['薪水', '兼職', '獎金', '紅包', '中獎'],
    expenseCategories: ['飲食', '住家', '交通', '購物', '醫療', '旅遊', 'Pet麻糬', '電信費', '電費', '水費', '瓦斯費', '手續費', '娛樂'],
    currencyOptions: ['TWD', 'USD', 'JPY', 'EUR', 'CNY', 'HKD', 'GBP', 'AUD', 'KRW'],
    
    categoryStyles: {
      '飲食': { icon: 'fa-solid fa-utensils', bgClass: 'bg-amber-100 text-amber-600', textClass: 'text-amber-500' },
      '住家': { icon: 'fa-solid fa-house', bgClass: 'bg-indigo-100 text-indigo-600', textClass: 'text-indigo-500' },
      '交通': { icon: 'fa-solid fa-car', bgClass: 'bg-blue-100 text-blue-600', textClass: 'text-blue-500' },
      '購物': { icon: 'fa-solid fa-bag-shopping', bgClass: 'bg-pink-100 text-pink-600', textClass: 'text-pink-500' },
      '醫療': { icon: 'fa-solid fa-notes-medical', bgClass: 'bg-red-100 text-red-600', textClass: 'text-red-500' },
      '旅遊': { icon: 'fa-solid fa-plane', bgClass: 'bg-sky-100 text-sky-600', textClass: 'text-sky-500' },
      'Pet麻糬': { icon: 'fa-solid fa-carrot', bgClass: 'bg-orange-100 text-orange-600', textClass: 'text-orange-500' },
      '電信費': { icon: 'fa-solid fa-mobile-screen-button', bgClass: 'bg-cyan-100 text-cyan-600', textClass: 'text-cyan-500' },
      '電費': { icon: 'fa-solid fa-bolt', bgClass: 'bg-yellow-100 text-yellow-600', textClass: 'text-yellow-500' },
      '水費': { icon: 'fa-solid fa-droplet', bgClass: 'bg-teal-100 text-teal-600', textClass: 'text-teal-500' },
      '瓦斯費': { icon: 'fa-solid fa-fire', bgClass: 'bg-rose-100 text-rose-600', textClass: 'text-rose-500' },
      '手續費': { icon: 'fa-solid fa-receipt', bgClass: 'bg-slate-200 text-slate-700', textClass: 'text-slate-600' },
      '娛樂': { icon: 'fa-solid fa-gamepad', bgClass: 'bg-purple-100 text-purple-600', textClass: 'text-purple-500' },
      '薪水': { icon: 'fa-solid fa-money-bill-wave', bgClass: 'bg-emerald-100 text-emerald-600', textClass: 'text-emerald-500' },
      '兼職': { icon: 'fa-solid fa-briefcase', bgClass: 'bg-green-100 text-green-600', textClass: 'text-green-500' },
      '獎金': { icon: 'fa-solid fa-trophy', bgClass: 'bg-yellow-100 text-yellow-600', textClass: 'text-yellow-500' },
      '紅包': { icon: 'fa-solid fa-envelope-open-text', bgClass: 'bg-red-100 text-red-600', textClass: 'text-red-500' },
      '中獎': { icon: 'fa-solid fa-gift', bgClass: 'bg-fuchsia-100 text-fuchsia-600', textClass: 'text-fuchsia-500' }
    },

    monthOptions: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    
    showDatePickerModal: false,
    pickerMode: 'day',
    pickerYear: currentYearStr,
    pickerMonth: currentMonthStr,
    pickerDay: currentDayStr,
    pickerSelectedDateStr: `${currentYearStr}-${currentMonthStr}-${currentDayStr}`,

    showCategoryPickerModal: false,
    showCurrencyPickerModal: false,
    showFilterYearModal: false,
    showFilterMonthModal: false,
    showFilterCategoryModal: false,

    openFilterYearModal() { this.showFilterYearModal = true; },
    selectFilterYear(y) { this.selectedYear = y; this.showFilterYearModal = false; },
    openFilterMonthModal() { this.showFilterMonthModal = true; },
    selectFilterMonth(m) { this.selectedMonth = m; this.showFilterMonthModal = false; },
    openFilterCategoryModal() { this.showFilterCategoryModal = true; },
    selectFilterCategory(cat) { this.monthlyFilterCategory = cat; this.showFilterCategoryModal = false; },
    openCategoryPickerModal() { this.showCategoryPickerModal = true; },
    selectCategory(cat) { this.editForm.category = cat; this.showCategoryPickerModal = false; },
    openCurrencyPickerModal() { this.showCurrencyPickerModal = true; },
    selectCurrency(cur) {
      this.editForm.currency = cur;
      if (cur === 'TWD') this.editForm.exchangeRate = 1;
      this.showCurrencyPickerModal = false;
    },

    get allowedPickerYears() {
      const cy = new Date().getFullYear();
      const years = [];
      for (let y = cy - 3; y <= cy + 3; y++) years.push(String(y));
      return years;
    },

    get pickerCalendarCells() {
      const y = parseInt(this.pickerYear, 10);
      const m = parseInt(this.pickerMonth, 10);
      const firstDayIndex = new Date(y, m - 1, 1).getDay();
      const totalDays = new Date(y, m, 0).getDate();
      const cells = [];
      for (let i = 0; i < firstDayIndex; i++) cells.push({ key: 'p-empty-' + i, day: null, dateStr: '' });
      for (let d = 1; d <= totalDays; d++) {
        const dStr = String(d).padStart(2, '0');
        cells.push({ key: 'p-day-' + d, day: dStr, dateStr: `${this.pickerYear}-${this.pickerMonth}-${dStr}` });
      }
      return cells;
    },

    openDatePickerModal() {
      const parts = this.editForm.date.split('-');
      if (parts.length === 3) {
        this.pickerYear = parts[0];
        this.pickerMonth = parts[1];
        this.pickerDay = parts[2];
      }
      this.pickerSelectedDateStr = this.editForm.date;
      this.pickerMode = 'day';
      this.showDatePickerModal = true;
    },

    selectPickerYear(y) {
      const cy = new Date().getFullYear();
      const yNum = parseInt(y, 10);
      if (yNum < cy - 3 || yNum > cy + 3) return;
      this.pickerYear = y;
      this.pickerMode = 'month';
    },

    selectPickerMonth(m) {
      this.pickerMonth = m;
      this.pickerMode = 'day';
      this.updatePickerDaysCount();
    },

    pickerChangeMonthOffset(offset) {
      let mNum = parseInt(this.pickerMonth, 10) + offset;
      let yNum = parseInt(this.pickerYear, 10);
      if (mNum > 12) { mNum = 1; yNum++; }
      else if (mNum < 1) { mNum = 12; yNum--; }
      const cy = new Date().getFullYear();
      if (yNum < cy - 3 || yNum > cy + 3) return;
      this.pickerYear = String(yNum);
      this.pickerMonth = String(mNum).padStart(2, '0');
      this.updatePickerDaysCount();
    },

    updatePickerDaysCount() {
      const y = parseInt(this.pickerYear, 10);
      const m = parseInt(this.pickerMonth, 10);
      const totalDays = new Date(y, m, 0).getDate();
      let dNum = parseInt(this.pickerDay, 10);
      if (isNaN(dNum) || dNum > totalDays) dNum = totalDays;
      this.pickerDay = String(dNum).padStart(2, '0');
      this.pickerSelectedDateStr = `${this.pickerYear}-${this.pickerMonth}-${this.pickerDay}`;
    },

    selectPickerDay(dayStr) {
      this.pickerDay = dayStr;
      this.pickerSelectedDateStr = `${this.pickerYear}-${this.pickerMonth}-${this.pickerDay}`;
      this.confirmDatePicker();
    },

    confirmDatePicker() {
      this.editForm.date = this.pickerSelectedDateStr;
      this.showDatePickerModal = false;
    },

    showEditModal: false,
    showConfirmModal: false,
    isAddingNew: false,
    editForm: { id: '', type: 'expense', date: `${currentYearStr}-${currentMonthStr}-${currentDayStr}`, category: '飲食', amount: '', currency: 'TWD', exchangeRate: 1, note: '' },

    showCalcModal: false,
    calcDisplay: '0',
    calcExpression: '',
    calcResetNext: false,
    calcHasCalculated: true,

    records: [],
    loading: false,
    loadingText: '處理中...',

    toast: { show: false, message: '', type: 'success' },
    showToast(message, type = 'success') {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => { this.toast.show = false; }, 3000);
    },

    async initApp() {
      const urlParams = new URLSearchParams(window.location.search);
      const uid = urlParams.get('uid');

      if (!uid) {
        this.authStatus = 'forbidden';
        return;
      }

      this.loadingText = '驗證身分中...';
      this.loading = true;

      try {
        const { data, error } = await supabaseClient
          .from('allowed_users')
          .select('*')
          .eq('uid', uid)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          this.authStatus = 'forbidden';
          this.loading = false;
          return;
        }

        this.currentAuthUid = data.uid;
        this.currentUserName = data.name;       
        this.currentAccountGroup = data.account_group; 
        this.authStatus = 'approved';

        await this.loadSupabaseData();
        this.initRealtimeSync();
      } catch (e) {
        console.error(e);
        this.authStatus = 'forbidden';
      } finally {
        this.loading = false;
      }
    },

    async loadSupabaseData() {
      this.loadingText = '資料載入中...';
      this.loading = true;
      try {
        const { data, error } = await supabaseClient
          .from('MoneyTracker')
          .select('*, allowed_users(uid, name, account_group)')
          .order('date', { ascending: false });

        if (error) throw error;
        
        const allData = data || [];
        this.records = allData.filter(r => {
          const group = r.allowed_users ? r.allowed_users.account_group : null;
          return group === this.currentAccountGroup;
        });
      } catch (e) {
        this.showToast('載入資料失敗', 'danger');
      } finally {
        this.loading = false;
      }
      if (this.availableYears.length > 0 && !this.availableYears.includes(this.selectedYear)) {
        this.selectedYear = this.availableYears[0];
      }
    },

    async refreshApp() {
      await this.loadSupabaseData();
      this.showToast('資料已重新整理', 'info');
    },

    initRealtimeSync() {
      supabaseClient
        .channel('public:MoneyTracker')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'MoneyTracker' },
          async (payload) => {
            await this.loadSupabaseData();
          }
        )
        .subscribe();
    },

    getCategoryStyle(category) {
      return this.categoryStyles[category] || { icon: 'fa-solid fa-tags', bgClass: 'bg-slate-100 text-slate-600', textClass: 'text-slate-500' };
    },

    formatDateStr(str) {
      if (!str) return '';
      let cleanStr = String(str);
      if (cleanStr.includes('T')) cleanStr = cleanStr.split('T')[0];
      return cleanStr.substring(0, 10);
    },

    get availableYears() {
      const yearsSet = new Set();
      this.records.forEach(r => {
        const dateStr = this.formatDateStr(r.date);
        if (dateStr && dateStr.length >= 4) {
          const yStr = dateStr.substring(0, 4);
          const yNum = parseInt(yStr, 10);
          const cy = new Date().getFullYear();
          if (!isNaN(yNum) && yNum >= cy - 3 && yNum <= cy + 3) yearsSet.add(yStr);
        }
      });
      const nowY = String(new Date().getFullYear());
      if (yearsSet.size === 0) yearsSet.add(nowY);
      return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
    },

    get periodLabelText() {
      return this.timeDimension === 'month' ? `${this.selectedYear}年${parseInt(this.selectedMonth, 10)}月` : `${this.selectedYear}年`;
    },

    get currentFilterPrefix() {
      return this.timeDimension === 'month' ? `${this.selectedYear}-${this.selectedMonth}` : `${this.selectedYear}`;
    },

    get editCategories() {
      return this.editForm.type === 'expense' ? this.expenseCategories : this.incomeCategories;
    },

    setEditFormType(type) {
      this.editForm.type = type;
      const cats = type === 'expense' ? this.expenseCategories : this.incomeCategories;
      if (!cats.includes(this.editForm.category)) this.editForm.category = cats[0];
    },

    isExpense(item) {
      return item.type === 'expense' || Number(item.amount || 0) < 0;
    },

    getConvertedAmount(item) {
      const rawAmt = Math.abs(Number(item.amount || 0));
      const rate = Number(item.exchangeRate || 1);
      return Math.round(rawAmt * rate);
    },

    formatAmount(item) {
      const converted = this.getConvertedAmount(item);
      return (this.isExpense(item) ? '-$' : '+$') + converted.toLocaleString();
    },

    get periodRecords() {
      const prefix = this.currentFilterPrefix;
      if (!prefix) return [];
      return this.records.filter(r => {
        const dateStr = this.formatDateStr(r.date);
        return dateStr.startsWith(prefix);
      }).sort((a, b) => {
        const dateA = this.formatDateStr(a.date);
        const dateB = this.formatDateStr(b.date);
        if (dateA !== dateB) return dateB.localeCompare(dateA);
        return (b.created_at || '').localeCompare(a.created_at || '');
      });
    },

    get filteredPeriodRecords() {
      if (!this.searchQuery) return this.periodRecords;
      const q = this.searchQuery.toLowerCase();
      return this.periodRecords.filter(r => {
        return (r.category || '').toLowerCase().includes(q) || 
               (r.note || '').toLowerCase().includes(q);
      });
    },

    get periodIncome() {
      return this.periodRecords.filter(r => !this.isExpense(r)).reduce((sum, r) => sum + this.getConvertedAmount(r), 0);
    },

    get periodExpense() {
      return this.periodRecords.filter(r => this.isExpense(r)).reduce((sum, r) => sum + this.getConvertedAmount(r), 0);
    },

    get periodNet() { return this.periodIncome - this.periodExpense; },

    get cumulativeTotal() {
      let prefix = this.currentFilterPrefix;
      return this.records.filter(r => {
        const dateStr = this.formatDateStr(r.date);
        if (!dateStr) return false;
        return dateStr <= (this.timeDimension === 'month' ? `${prefix}-31` : `${prefix}-12-31`);
      }).reduce((sum, r) => {
        const converted = this.getConvertedAmount(r);
        return sum + (this.isExpense(r) ? -converted : converted);
      }, 0);
    },

    get monthlySummaryList() {
      if (this.timeDimension !== 'year') return [];
      const monthMap = {};
      this.monthOptions.forEach(m => { monthMap[m] = { income: 0, expense: 0, total: 0 }; });

      this.periodRecords.forEach(r => {
        const cat = r.category || '';
        if (this.monthlyFilterCategory !== 'all' && cat !== this.monthlyFilterCategory) return;
        const dateStr = this.formatDateStr(r.date);
        if (dateStr && dateStr.length >= 7) {
          const m = dateStr.substring(5, 7);
          if (monthMap[m]) {
            const converted = this.getConvertedAmount(r);
            if (this.isExpense(r)) {
              monthMap[m].expense += converted;
              monthMap[m].total -= converted;
            } else {
              monthMap[m].income += converted;
              monthMap[m].total += converted;
            }
          }
        }
      });

      return this.monthOptions.map(m => ({
        month: m,
        income: monthMap[m].income,
        expense: monthMap[m].expense,
        net: monthMap[m].income - monthMap[m].expense,
        total: monthMap[m].total
      }));
    },

    get incomeCategorySummaryList() {
      const totalSum = this.periodIncome;
      const map = {};
      this.periodRecords.forEach(r => {
        if (!this.isExpense(r)) {
          const cat = r.category || '未分類';
          map[cat] = (map[cat] || 0) + this.getConvertedAmount(r);
        }
      });
      return Object.keys(map).map(cat => ({
        category: cat,
        amount: map[cat],
        percent: totalSum > 0 ? ((map[cat] / totalSum) * 100).toFixed(1) : 0
      })).sort((a, b) => b.amount - a.amount);
    },

    get expenseCategorySummaryList() {
      const totalSum = this.periodExpense;
      const map = {};
      this.periodRecords.forEach(r => {
        if (this.isExpense(r)) {
          const cat = r.category || '未分類';
          map[cat] = (map[cat] || 0) + this.getConvertedAmount(r);
        }
      });
      return Object.keys(map).map(cat => ({
        category: cat,
        amount: map[cat],
        percent: totalSum > 0 ? ((map[cat] / totalSum) * 100).toFixed(1) : 0
      })).sort((a, b) => b.amount - a.amount);
    },

    openAddModal() {
      this.isAddingNew = true;
      const cy = new Date().getFullYear().toString();
      const cm = String(new Date().getMonth() + 1).padStart(2, '0');
      const cd = String(new Date().getDate()).padStart(2, '0');
      
      this.editForm = { 
        id: '', 
        type: 'expense', 
        date: `${cy}-${cm}-${cd}`, 
        category: this.expenseCategories[0], 
        amount: '', 
        currency: 'TWD', 
        exchangeRate: 1, 
        note: '' 
      };
      this.showEditModal = true;
    },

    openEditModal(item) {
      this.isAddingNew = false;
      this.editForm = {
        id: item.id,
        type: this.isExpense(item) ? 'expense' : 'income',
        date: this.formatDateStr(item.date),
        category: item.category,
        amount: Math.abs(Number(item.amount || 0)),
        currency: item.currency || 'TWD',
        exchangeRate: item.exchangeRate !== undefined ? Number(item.exchangeRate) : 1,
        note: item.note || ''
      };
      this.showEditModal = true;
    },

    async handleModalSubmit() {
      if (this.isAddingNew) await this.addRecord();
      else await this.updateRecord();
    },

    async addRecord() {
      if (this.loading || !this.editForm.amount || this.editForm.amount <= 0) return;
      this.loadingText = '新增儲存中...';
      this.loading = true;
      const addedYear = this.editForm.date.substring(0, 4);
      const addedMonth = this.editForm.date.substring(5, 7);
      const finalCurrency = this.editForm.currency || 'TWD';
      const finalRate = finalCurrency === 'TWD' ? 1 : (Number(this.editForm.exchangeRate) || 1);

      try {
        const { data, error } = await supabaseClient
          .from('MoneyTracker')
          .insert([{
            auth_uid: this.currentAuthUid,
            type: this.editForm.type,
            date: this.editForm.date,
            category: this.editForm.category,
            amount: Number(this.editForm.amount),
            currency: finalCurrency,
            exchangeRate: finalRate,
            note: this.editForm.note
          }])
          .select('*, allowed_users(uid, name, account_group)');

        if (error) throw error;
        if (data && data.length > 0) {
          this.records.unshift(data[0]);
        }
        this.selectedYear = addedYear;
        this.selectedMonth = addedMonth;
        this.showToast('紀錄新增成功！', 'success');
      } catch (e) {
        this.showToast('寫入失敗', 'danger');
      } finally {
        this.loading = false;
        this.showEditModal = false;
      }
    },

    async updateRecord() {
      if (this.loading) return;
      this.loadingText = '紀錄更新中...';
      this.loading = true;
      const finalCurrency = this.editForm.currency || 'TWD';
      const finalRate = finalCurrency === 'TWD' ? 1 : (Number(this.editForm.exchangeRate) || 1);

      try {
        const { data, error } = await supabaseClient
          .from('MoneyTracker')
          .update({
            type: this.editForm.type,
            date: this.editForm.date,
            category: this.editForm.category,
            amount: Number(this.editForm.amount),
            currency: finalCurrency,
            exchangeRate: finalRate,
            note: this.editForm.note
          })
          .eq('id', this.editForm.id)
          .select('*, allowed_users(uid, name, account_group)');

        if (error) throw error;
        if (data && data.length > 0) {
          const idx = this.records.findIndex(r => r.id === this.editForm.id);
          if (idx !== -1) this.records[idx] = data[0];
        }
        this.showToast('紀錄已更新！', 'info');
      } catch (e) {
        this.showToast('更新失敗', 'danger');
      } finally {
        this.loading = false;
        this.showEditModal = false;
      }
    },

    promptDeleteRecord() { if (!this.isAddingNew) this.showConfirmModal = true; },

    async confirmDeleteRecord() {
      this.showConfirmModal = false;
      const targetId = this.editForm.id;
      this.loadingText = '刪除中...';
      this.loading = true;
      try {
        const { error } = await supabaseClient.from('MoneyTracker').delete().eq('id', targetId);
        if (error) throw error;
        this.records = this.records.filter(r => r.id !== targetId);
        this.showToast('已刪除紀錄', 'danger');
      } catch (e) {
        this.showToast('刪除失敗', 'danger');
      } finally {
        this.loading = false;
        this.showEditModal = false;
      }
    },

    openCalculator() {
      this.calcDisplay = this.editForm.amount !== '' ? String(this.editForm.amount) : '0';
      this.calcExpression = '';
      this.calcResetNext = true;
      this.calcHasCalculated = true;
      this.showCalcModal = true;
    },

    calcClear() { this.calcDisplay = '0'; this.calcExpression = ''; this.calcResetNext = false; this.calcHasCalculated = false; },
    calcBackSpace() {
      if (this.calcResetNext) return;
      this.calcDisplay = this.calcDisplay.length > 1 ? this.calcDisplay.slice(0, -1) : '0';
    },
    calcAppendNumber(num) {
      if (this.calcResetNext) { this.calcDisplay = num; this.calcResetNext = false; }
      else if (this.calcDisplay === '0') { this.calcDisplay = num; }
      else {
        if (num === '.' && this.calcDisplay.includes('.')) return;
        this.calcDisplay += num;
      }
      if (this.calcExpression !== '') this.calcHasCalculated = false;
    },
    calcAppendOperator(op) {
      if (this.calcExpression !== '' && !this.calcResetNext) this.calcCalculate();
      this.calcExpression = this.calcDisplay + ' ' + op;
      this.calcResetNext = true;
      this.calcHasCalculated = false;
    },
    calcCalculate() {
      if (!this.calcExpression) return;
      try {
        const fullExpr = this.calcExpression + ' ' + this.calcDisplay;
        const sanitized = fullExpr.replace(/×/g, '*').replace(/÷/g, '/');
        const result = Function('"use strict";return (' + sanitized + ')')();
        if (!isFinite(result)) { this.showToast('運算錯誤', 'danger'); this.calcClear(); return; }
        this.calcDisplay = String(parseFloat(Number(result).toFixed(6)));
        this.calcExpression = fullExpr + ' =';
        this.calcResetNext = true;
        this.calcHasCalculated = true;
      } catch (e) { this.showToast('格式錯誤', 'danger'); this.calcClear(); }
    },
    calcConfirm() {
      if (!this.calcHasCalculated && this.calcExpression !== '') return;
      const val = parseFloat(this.calcDisplay);
      if (!isNaN(val) && val > 0) this.editForm.amount = parseFloat(val.toFixed(6));
      this.showCalcModal = false;
    }

  }
}