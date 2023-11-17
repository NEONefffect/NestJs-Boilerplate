import config from "config";

interface restorePassword {
  firstName: string;
  token: string;
}

export const generateRestorePasswordEmail = (options: restorePassword) => `
Hi, <strong>${options.firstName}</strong>
<br>
We received a request to reset your account password.
<br>

Please, follow this link: <a href="${config.USER_PORTAL_HOST}/reset-password?token=${options.token}">${config.USER_PORTAL_HOST}</a>
<br>
If you didn't request this, please ignore this email. Your password won't reset until you access the link above and enter a new one.
`;
export const generateConfirmedEmail = (options: {
  fullName: string;
  token: string;
}) => `
Hi, <strong>${options.fullName}</strong>
For email confirmation, please visit this link: <a href="${config.USER_PORTAL_HOST}/confirm-email?token=${options.token}">${config.USER_PORTAL_HOST}</a>
<br> 
If you didn't request this, please ignore this email.
`;
