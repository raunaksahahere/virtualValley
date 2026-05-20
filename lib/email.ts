export function hasEmailConfig() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.RESEND_FROM_EMAIL &&
      process.env.ADMIN_EMAIL,
  );
}

export function renderEmailShell(title: string, body: string) {
  return `
    <div style="background:#000000;padding:32px 16px;font-family:Arial,sans-serif;color:#FFFFFF;">
      <div style="max-width:640px;margin:0 auto;border:1px solid rgba(201,168,76,0.35);border-radius:20px;padding:32px;background:#0A0A0A;">
        <div style="font-size:12px;letter-spacing:0.35em;text-transform:uppercase;color:#C9A84C;">Virtual Valley</div>
        <h1 style="font-size:28px;line-height:1.2;margin:16px 0 8px;color:#FFFFFF;">${title}</h1>
        <div style="font-size:15px;line-height:1.8;color:#E5E5E5;">${body}</div>
      </div>
    </div>
  `;
}

export function renderRows(rows: Array<{ label: string; value: string }>) {
  return rows
    .map(
      (row) => `
        <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);">
          <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#C9A84C;">${row.label}</div>
          <div style="margin-top:6px;color:#FFFFFF;">${row.value}</div>
        </div>
      `,
    )
    .join("");
}
