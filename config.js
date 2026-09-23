<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>TaskPay Admin</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

<main>

  <div class="card">
    <h1>Admin Panel</h1>
    <p id="status">Checking login...</p>
  </div>

  <div class="card">
    <h2>Deposits zitegereje</h2>
    <div id="deposits">Loading...</div>
  </div>

  <div class="card">
    <h2>Withdrawals zitegereje</h2>
    <div id="withdrawals">Loading...</div>
  </div>

</main>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="config.js"></script>

<script>
const client = window.supabase.createClient(
  window.TASKPAY_CONFIG.SUPABASE_URL,
  window.TASKPAY_CONFIG.SUPABASE_PUBLISHABLE_KEY
);

async function loadAdmin() {

  const status = document.getElementById("status");
  const deposits = document.getElementById("deposits");
  const withdrawals = document.getElementById("withdrawals");

  const result = await client.auth.getSession();
  const session = result.data.session;

  if (!session) {
    status.innerHTML =
      'Nturi winjiye. <a href="login.html">Kanda hano winjire</a>.';

    deposits.textContent = "Login required";
    withdrawals.textContent = "Login required";
    return;
  }

  const user = session.user;

  const profileResult = await client
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profileResult.error) {
    console.error(profileResult.error);
    status.textContent = "Habaye ikibazo mu kubona profile.";
    return;
  }

  const profile = profileResult.data;

  if (!profile) {
    status.textContent = "Profile ntiyabonetse.";
    return;
  }

  if (profile.role !== "admin") {
    status.textContent = "Nturi admin.";
    deposits.textContent = "Access denied";
    withdrawals.textContent = "Access denied";
    return;
  }

  status.textContent = "Wemejwe nka ADMIN.";

  deposits.textContent = "Nta deposits zitegereje.";
  withdrawals.textContent = "Nta withdrawals zitegereje.";
}

loadAdmin();
</script>

</body>
</html>
