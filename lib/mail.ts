import { Resend } from "resend";


export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirmation email",
    html: `<p>OTP: ${token}</p>`,
  });
};
