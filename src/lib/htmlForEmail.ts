export const htmlForContactEmail = (firstName: string, lastName: string, email: string, message: string) => {
    return `<h1>New Contact Message</h1>
   <p><b>Name:</b> ${firstName} ${lastName}</p>
   <p><b>Email:</b> ${email}</p>
   <p><b>Message:</b> ${message}</p>`
}