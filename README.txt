TASKPAY REAL
- Uses Supabase for real users, balances, tasks, deposits, withdrawals and transactions.
- Deposit numbers: MTN 0792881002 (Louise), Airtel 0733993830 (Jeanne).
- Deposit is manual verification: user sends money, enters transaction ID, admin approves.
- Withdraw is a real database request; actual MTN/Airtel payout is manual until a payment API is connected.
- Never put a Supabase secret/service key, database password, or mobile-money PIN in frontend files.
Steps: create Supabase project -> run supabase.sql -> put URL and publishable key in config.js -> upload files.
