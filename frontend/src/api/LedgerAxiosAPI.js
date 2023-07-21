import axiosInstance from './axiosInstance';

const LedgerAxiosApi = {
    createExpense: async (categoryId, expenseAmount, expenseDate, expenseContent) => {
        const expenseData = [
            {
                expenseAmount: expenseAmount,
                expenseDate: expenseDate,
                expenseContent: expenseContent,
                categoryId: categoryId,
            },
        ];
        try {
            const response = await axiosInstance.post('/ledger/expense', expenseData);
            return response.data;
        } catch (error) {
            console.error('Request Error:', error);
        }
    },

    createIncome: async (categoryIncomeId, incomeAmount, incomeDate, incomeContent) => {
        const IncomeData = [
            {
                incomeAmount: incomeAmount,
                incomeDate: incomeDate,
                incomeContent: incomeContent,
                categoryIncomeId: categoryIncomeId,
            },
        ];
        try {
            const response = await axiosInstance.post('/ledger/income', IncomeData);
            return response.data;
        } catch (error) {
            console.error('Request Error:', error);
        }
    },

    getDailyIncome: async () => {
        try {
            return await axiosInstance.get('/ledger/income/monthly');
        } catch (e) {
            throw e;
        }
    },
    getDailyExpense: async () => {
        try {
            return await axiosInstance.get('/ledger/expense/monthly');
        } catch (e) {
            throw e;
        }
    },

    getTodayExpense: async (expenseDate) => {
        try {
            return await axiosInstance.get(`/ledger/get/today/expense/${expenseDate}`);
        } catch (e) {
            throw e;
        }
    },

    getTodayIncome: async (IncomeDate) => {
        try {
            return await axiosInstance.get(`/ledger/get/today/income/${IncomeDate}`);
        } catch (e) {
            throw e;
        }
    },
    changeExpense: async (categoryId, expenseAmount, expenseDate, expenseContent, expenseId) => {
        const expenseData = {
            expenseAmount: expenseAmount,
            expenseDate: expenseDate,
            expenseContent: expenseContent,
            categoryId: categoryId,
        };
        console.log('expenseData', expenseData);
        try {
            const response = await axiosInstance.put(`/ledger/expense/update/${expenseId}`, expenseData);
            return response.data;
        } catch (error) {
            console.error('Request Error:', error);
        }
    },
    changeIncome: async (categoryIncomeId, incomeAmount, incomeDate, incomeContent, incomeId) => {
        const IncomeData = {
            incomeAmount: incomeAmount,
            incomeDate: incomeDate,
            incomeContent: incomeContent,
            categoryIncomeId: categoryIncomeId,
        };
        console.log('IncomeData', IncomeData);
        try {
            const response = await axiosInstance.put(`/ledger/income/update/${incomeId}`, IncomeData);
            return response.data;
        } catch (error) {
            console.error('Request Error:', error);
        }
    },

    deleteExpense: async (expenseId) => {
        try {
            const response = await axiosInstance.delete(`/ledger/expense/delete/${expenseId}`);
            return response.data;
        } catch (error) {
            console.error('Request Error:', error);
        }
    },
    deleteIncome: async (incomeId) => {
        try {
            const response = await axiosInstance.delete(`/ledger/income/delete/${incomeId}`);
            return response.data;
        } catch (error) {
            console.error('Request Error:', error);
        }
    },
};

export default LedgerAxiosApi;
