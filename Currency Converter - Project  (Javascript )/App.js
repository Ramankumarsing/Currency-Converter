document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('currency-form');
  const amountInput = document.getElementById('amount');
  const fromCurrencySelect = document.getElementById('from-currency');
  const toCurrencySelect = document.getElementById('to-currency');
  const exchangeRateMsg = document.getElementById('exchange-rate-msg');
  const convertedAmount = document.getElementById('converted-amount');

  form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;
      const amount = amountInput.value;

      if (fromCurrency === toCurrency) {
          exchangeRateMsg.textContent = 'Please select different currencies.';
          convertedAmount.textContent = '';
          return;
      }

      const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

      if (exchangeRate === null) {
          exchangeRateMsg.textContent = 'Failed to fetch exchange rate. Please try again later.';
          convertedAmount.textContent = '';
          return;
      }

      exchangeRateMsg.textContent = `1 ${fromCurrency} = ${exchangeRate.toFixed(2)} ${toCurrency}`;
      const result = (amount * exchangeRate).toFixed(2);
      convertedAmount.textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
  });

  async function getExchangeRate(fromCurrency, toCurrency) {
      try {
          const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
          const data = await response.json();

          if (data && data.rates && data.rates[toCurrency]) {
              return data.rates[toCurrency];
          } else {
              return null;
          }
      } catch (error) {
          console.error('Error fetching exchange rate:', error);
          return null;
      }
  }
});


